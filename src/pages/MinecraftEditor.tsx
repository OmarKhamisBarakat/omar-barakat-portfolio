import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Upload, 
  Download, 
  Trash2, 
  X, 
  Search, 
  Check, 
  Wand2, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { 
  MINECRAFT_ITEMS, 
  MINECRAFT_ENCHANTMENTS, 
  type MinecraftItem 
} from '../data/minecraftData';
import { 
  parseBedrockWorldZip, 
  exportModifiedWorldZip, 
  type InventoryState, 
  type ItemSlot, 
  type ParsedWorld 
} from '../lib/bedrockNbt';

const ITEMS_BY_ID = new Map(MINECRAFT_ITEMS.map(i => [i.id, i]));
const ENCHANTS_BY_ID = new Map(MINECRAFT_ENCHANTMENTS.map(e => [e.id, e]));

const ARMOR_ICONS = ['🪖', '👕', '👖', '👢'];

function getDisplayName(itemId: string): string {
  const it = ITEMS_BY_ID.get(itemId);
  if (it) return it.name;
  return itemId
    .replace('minecraft:', '')
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function getIconUrl(itemId: string): string {
  const name = getDisplayName(itemId).replace(/ /g, '_');
  return `https://minecraft.wiki/images/Invicon_${name}.png`;
}

function getEmoji(itemId: string): string {
  return ITEMS_BY_ID.get(itemId)?.emoji || '📦';
}

function toRoman(num: number): string {
  const romans = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  return romans[num] || String(num);
}

export default function MinecraftEditor() {
  const [world, setWorld] = useState<ParsedWorld | null>(null);
  const [inventory, setInventory] = useState<InventoryState>({
    hotbar: Array(9).fill(null),
    main: Array(27).fill(null),
    armor: Array(4).fill(null),
    offhand: [null]
  });

  const [selectedSlot, setSelectedSlot] = useState<{ section: 'hotbar' | 'main' | 'armor' | 'offhand'; index: number } | null>(null);
  const [editorItemId, setEditorItemId] = useState('');
  const [editorCount, setEditorCount] = useState(1);
  const [editorDamage, setEditorDamage] = useState(0);
  const [editorCustomName, setEditorCustomName] = useState('');
  const [editorEnchantments, setEditorEnchantments] = useState<{ id: number; lvl: number }[]>([]);

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerSearch, setPickerSearch] = useState('');
  const [pickerCategory, setPickerCategory] = useState('all');

  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const notify = (text: string, type: 'success' | 'error' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const categories = useMemo(() => {
    const set = new Set(MINECRAFT_ITEMS.map(i => i.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredPickerItems = useMemo(() => {
    let list = MINECRAFT_ITEMS;
    if (pickerCategory !== 'all') {
      list = list.filter(i => i.category === pickerCategory);
    }
    if (pickerSearch.trim()) {
      const q = pickerSearch.toLowerCase().trim();
      list = list.filter(i => i.name.toLowerCase().includes(q) || i.id.toLowerCase().includes(q));
    }
    return list;
  }, [pickerCategory, pickerSearch]);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setLoadingText('Parsing Bedrock world archive...');
    try {
      const parsed = await parseBedrockWorldZip(file, file.name);
      setWorld(parsed);
      setInventory(parsed.inventory);
      setSelectedSlot({ section: 'hotbar', index: 0 });
      loadItemIntoEditor(parsed.inventory.hotbar[0]);
      notify(`Loaded ${file.name} successfully!`);
    } catch (err: any) {
      notify(err.message || 'Failed to read world file', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const loadItemIntoEditor = (item: ItemSlot | null) => {
    if (item && item.name) {
      setEditorItemId(item.name);
      setEditorCount(item.count || 1);
      setEditorDamage(item.damage || 0);
      setEditorCustomName(item.customName || '');
      setEditorEnchantments(item.enchantments ? [...item.enchantments] : []);
    } else {
      setEditorItemId('');
      setEditorCount(1);
      setEditorDamage(0);
      setEditorCustomName('');
      setEditorEnchantments([]);
    }
  };

  const selectSlot = (section: 'hotbar' | 'main' | 'armor' | 'offhand', index: number) => {
    setSelectedSlot({ section, index });
    const it = inventory[section][index];
    loadItemIntoEditor(it);
  };

  const applyEditorChanges = () => {
    if (!selectedSlot) return;
    if (!editorItemId) {
      notify('Please select an item first', 'error');
      return;
    }

    const updatedItem: ItemSlot = {
      name: editorItemId,
      count: Math.max(1, Math.min(127, editorCount)),
      slot: selectedSlot.section === 'main' ? selectedSlot.index + 9 : selectedSlot.index,
      damage: editorDamage || 0,
      enchantments: [...editorEnchantments],
      customName: editorCustomName.trim()
    };

    setInventory(prev => {
      const next = { ...prev };
      const arr = [...next[selectedSlot.section]];
      arr[selectedSlot.index] = updatedItem;
      next[selectedSlot.section] = arr;
      return next;
    });

    notify('Slot updated!');
  };

  const clearCurrentSlot = () => {
    if (!selectedSlot) return;
    setInventory(prev => {
      const next = { ...prev };
      const arr = [...next[selectedSlot.section]];
      arr[selectedSlot.index] = null;
      next[selectedSlot.section] = arr;
      return next;
    });
    loadItemIntoEditor(null);
    notify('Slot cleared');
  };

  const fillEmptySlotsWithSponges = () => {
    let count = 0;
    setInventory(prev => {
      const next = { ...prev };
      const nextHotbar = [...next.hotbar];
      const nextMain = [...next.main];

      for (let i = 0; i < 9; i++) {
        if (!nextHotbar[i] || !nextHotbar[i]?.name) {
          nextHotbar[i] = { name: 'minecraft:sponge', count: 64, slot: i, damage: 0, enchantments: [] };
          count++;
        }
      }
      for (let i = 0; i < 27; i++) {
        if (!nextMain[i] || !nextMain[i]?.name) {
          nextMain[i] = { name: 'minecraft:sponge', count: 64, slot: i + 9, damage: 0, enchantments: [] };
          count++;
        }
      }

      next.hotbar = nextHotbar;
      next.main = nextMain;
      return next;
    });

    notify(`Filled ${count} empty slots with 64 Sponges!`);
  };

  const maxEnchantToolsNoSilkTouch = () => {
    const toolEnchants = [
      { id: 15, lvl: 5 },
      { id: 18, lvl: 3 },
      { id: 17, lvl: 3 },
      { id: 26, lvl: 1 }
    ];

    let upgraded = 0;
    const upgradeSlot = (item: ItemSlot | null, slotIdx: number): ItemSlot | null => {
      if (!item || !item.name) return item;
      const n = item.name.toLowerCase();
      if (n.includes('pickaxe') || n.includes('shovel') || n.includes('axe') || n.includes('hoe')) {
        upgraded++;
        return {
          ...item,
          enchantments: [...toolEnchants]
        };
      }
      return item;
    };

    setInventory(prev => ({
      ...prev,
      hotbar: prev.hotbar.map((it, idx) => upgradeSlot(it, idx)),
      main: prev.main.map((it, idx) => upgradeSlot(it, idx + 9))
    }));

    if (selectedSlot) {
      const it = inventory[selectedSlot.section][selectedSlot.index];
      if (it) loadItemIntoEditor(it);
    }

    notify(`Upgraded ${upgraded} tools with Max Enchants (No Silk Touch)!`);
  };

  const maxEnchantGodArmor = () => {
    const armorSets = [
      { name: 'minecraft:netherite_helmet', enchs: [{ id: 0, lvl: 4 }, { id: 6, lvl: 3 }, { id: 8, lvl: 1 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }, { id: 5, lvl: 3 }] },
      { name: 'minecraft:netherite_chestplate', enchs: [{ id: 0, lvl: 4 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }, { id: 5, lvl: 3 }] },
      { name: 'minecraft:netherite_leggings', enchs: [{ id: 0, lvl: 4 }, { id: 37, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }, { id: 5, lvl: 3 }] },
      { name: 'minecraft:netherite_boots', enchs: [{ id: 0, lvl: 4 }, { id: 2, lvl: 4 }, { id: 7, lvl: 3 }, { id: 36, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }, { id: 5, lvl: 3 }] }
    ];

    setInventory(prev => ({
      ...prev,
      armor: armorSets.map((cfg, i) => ({
        name: prev.armor[i]?.name || cfg.name,
        count: 1,
        slot: i,
        damage: 0,
        enchantments: cfg.enchs
      }))
    }));

    notify('Equipped God Armor Set with Max Enchants!');
  };

  const exportZip = async () => {
    if (!world) return;
    setIsLoading(true);
    setLoadingText('Packaging world into ZIP archive...');
    try {
      const blob = await exportModifiedWorldZip(world, inventory);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${world.baseName}_modified.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      notify('Export complete! World zip downloaded.');
    } catch (err: any) {
      notify(err.message || 'Export failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const loadDemoWorld = () => {
    const demo: InventoryState = {
      hotbar: [
        { name: 'minecraft:netherite_pickaxe', count: 1, slot: 0, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 18, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }] },
        { name: 'minecraft:netherite_shovel', count: 1, slot: 1, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 18, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }] },
        { name: 'minecraft:netherite_sword', count: 1, slot: 2, damage: 0, enchantments: [{ id: 9, lvl: 5 }, { id: 14, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }] },
        { name: 'minecraft:golden_apple', count: 64, slot: 3, damage: 0, enchantments: [] },
        { name: 'minecraft:firework_rocket', count: 64, slot: 4, damage: 0, enchantments: [] },
        null, null, null, null
      ],
      main: Array(27).fill(null),
      armor: [
        { name: 'minecraft:netherite_helmet', count: 1, slot: 0, damage: 0, enchantments: [{ id: 0, lvl: 4 }, { id: 6, lvl: 3 }, { id: 8, lvl: 1 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }] },
        { name: 'minecraft:netherite_chestplate', count: 1, slot: 1, damage: 0, enchantments: [{ id: 0, lvl: 4 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }, { id: 5, lvl: 3 }] },
        { name: 'minecraft:netherite_leggings', count: 1, slot: 2, damage: 0, enchantments: [{ id: 0, lvl: 4 }, { id: 37, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }] },
        { name: 'minecraft:netherite_boots', count: 1, slot: 3, damage: 0, enchantments: [{ id: 0, lvl: 4 }, { id: 2, lvl: 4 }, { id: 7, lvl: 3 }, { id: 36, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }] }
      ],
      offhand: [{ name: 'minecraft:totem_of_undying', count: 1, slot: 0, damage: 0, enchantments: [] }]
    };

    setInventory(demo);
    setSelectedSlot({ section: 'hotbar', index: 0 });
    loadItemIntoEditor(demo.hotbar[0]);
    notify('Loaded interactive demo inventory matrix!');
  };

  const renderSlot = (item: ItemSlot | null, section: 'hotbar' | 'main' | 'armor' | 'offhand', index: number) => {
    const isSelected = selectedSlot?.section === section && selectedSlot?.index === index;
    const isEnchanted = item && item.enchantments && item.enchantments.length > 0;

    return (
      <button
        key={`${section}-${index}`}
        onClick={() => selectSlot(section, index)}
        className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-xl border flex items-center justify-center transition-all cursor-pointer select-none
          ${isSelected 
            ? 'border-emerald-400 bg-emerald-950/40 ring-2 ring-pink-400/50 scale-105 shadow-lg shadow-emerald-950/50' 
            : 'border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]'}
          ${isEnchanted ? 'after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-tr after:from-purple-500/20 after:to-transparent after:pointer-events-none' : ''}`}
      >
        {item && item.name ? (
          <>
            <img 
              src={getIconUrl(item.name)} 
              alt={getDisplayName(item.name)}
              className="w-7 h-7 sm:w-9 sm:h-9 object-contain drop-shadow-md pixelated"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
                ((e.target as HTMLElement).nextElementSibling as HTMLElement).style.display = 'block';
              }}
            />
            <span className="text-xl hidden">{getEmoji(item.name)}</span>
            {item.count > 1 && (
              <span className="absolute bottom-1 right-1 sm:right-1.5 text-[10px] sm:text-xs font-mono font-bold text-white bg-black/70 px-1 py-0.5 rounded leading-none shadow">
                {item.count}
              </span>
            )}
            {isEnchanted && (
              <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 text-[8px] sm:text-[10px] text-purple-300">✨</span>
            )}
          </>
        ) : (
          <span className="text-white/20 text-xs font-mono">
            {section === 'armor' ? ARMOR_ICONS[index] : section === 'offhand' ? '🛡️' : index + (section === 'main' ? 9 : 1)}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white/90 p-3 sm:p-6 md:p-8 font-sans">
      <input 
        type="file" 
        ref={fileInputRef} 
        accept=".zip,.mcworld" 
        className="hidden" 
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFileUpload(f);
        }}
      />

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl font-medium shadow-2xl flex items-center gap-3 backdrop-blur-xl border ${
              notification.type === 'success' 
                ? 'bg-teal-950/80 border-teal-500/40 text-teal-200' 
                : 'bg-rose-950/80 border-rose-500/40 text-rose-200'
            }`}
          >
            {notification.type === 'success' ? <Check size={18} /> : <ShieldAlert size={18} />}
            <span className="text-xs sm:text-sm">{notification.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto flex flex-col gap-5 sm:gap-6">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/[0.02] border border-white/10 p-4 sm:p-5 rounded-3xl backdrop-blur-2xl">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-amber-500 flex items-center justify-center text-xl sm:text-2xl shadow-lg shadow-pink-500/20">
              ⛏️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-xl font-bold tracking-tight">Minecraft Bedrock Inventory Matrix</h1>
                <span className="bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[9px] sm:text-[10px] uppercase font-mono px-2 py-0.5 rounded-full tracking-wider">
                  UNLISTED // v2.0
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-white/50 font-mono mt-0.5">
                {world ? world.fileName : 'Direct .zip / .mcworld Player Inventory Manipulator'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] text-white px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-medium border border-white/10 transition-all cursor-pointer"
            >
              <Upload size={15} />
              <span>{world ? 'Change World' : 'Upload World'}</span>
            </button>

            {world && (
              <button
                onClick={exportZip}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-pink-400 hover:brightness-110 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-pink-600/30 transition-all cursor-pointer"
              >
                <Download size={15} />
                <span>Export ZIP</span>
              </button>
            )}
          </div>
        </header>

        {!world && (
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 text-center flex flex-col items-center justify-center gap-5 py-12 sm:py-16 backdrop-blur-xl">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full max-w-xl border-2 border-dashed border-white/20 hover:border-pink-400/60 rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center gap-4 bg-white/[0.015] hover:bg-white/[0.04] transition-all cursor-pointer group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                📂
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white/90">Drop Bedrock World File Here</h3>
                <p className="text-xs sm:text-sm text-white/50 mt-1">Supports iOS exports, .mcworld and .zip files</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/50">
              <span>Or test with an interactive preview:</span>
              <button
                onClick={loadDemoWorld}
                className="flex items-center gap-1.5 text-teal-400 hover:text-teal-300 font-semibold cursor-pointer underline underline-offset-4"
              >
                Load Demo Inventory <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}

        <div className="bg-white/[0.02] border border-white/10 p-3 sm:p-4 rounded-3xl flex flex-wrap items-center gap-2 sm:gap-3 backdrop-blur-xl">
          <span className="text-[11px] sm:text-xs font-mono uppercase text-white/50 px-1 sm:px-2 flex items-center gap-1.5">
            <Wand2 size={13} /> Presets:
          </span>
          <button
            onClick={fillEmptySlotsWithSponges}
            className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
          >
            🧽 Fill 64 Sponges
          </button>
          <button
            onClick={maxEnchantToolsNoSilkTouch}
            className="flex items-center gap-1.5 bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
          >
            ⚔️ Max Enchants (No Silk Touch)
          </button>
          <button
            onClick={maxEnchantGodArmor}
            className="flex items-center gap-1.5 bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border border-pink-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
          >
            🛡️ God Armor
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 p-4 sm:p-6 rounded-3xl flex flex-col gap-5 sm:gap-6 backdrop-blur-2xl">
            <div>
              <span className="text-xs font-mono uppercase text-white/50 block mb-2.5">Equipment & Offhand</span>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {inventory.armor.map((it, idx) => renderSlot(it, 'armor', idx))}
                <div className="w-[1px] h-8 sm:h-10 bg-white/10 mx-1 sm:mx-2" />
                {renderSlot(inventory.offhand[0], 'offhand', 0)}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-white/50 block mb-2.5">Storage Inventory (27 Slots)</span>
              <div className="grid grid-cols-9 gap-1.5 sm:gap-3 overflow-x-auto pb-2">
                {inventory.main.map((it, idx) => renderSlot(it, 'main', idx))}
              </div>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-white/10">
              <span className="text-xs font-mono uppercase text-pink-400 block mb-2.5">Hotbar (Active Slots 1-9)</span>
              <div className="grid grid-cols-9 gap-1.5 sm:gap-3 overflow-x-auto pb-2">
                {inventory.hotbar.map((it, idx) => renderSlot(it, 'hotbar', idx))}
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 p-4 sm:p-6 rounded-3xl flex flex-col gap-5 backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-white/90">Slot Inspector</h3>
                <p className="text-xs text-white/50 font-mono mt-0.5">
                  {selectedSlot 
                    ? `${selectedSlot.section.toUpperCase()} #${selectedSlot.index + (selectedSlot.section === 'main' ? 9 : 1)}` 
                    : 'Select a slot'}
                </p>
              </div>
              {editorItemId && (
                <button
                  onClick={clearCurrentSlot}
                  className="p-1.5 sm:p-2 text-rose-400 hover:bg-rose-950/40 rounded-xl transition-all cursor-pointer"
                  title="Clear Slot"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            {selectedSlot ? (
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setIsPickerOpen(true)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.06] border border-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-950/60 border border-white/10 flex items-center justify-center">
                      {editorItemId ? (
                        <img 
                          src={getIconUrl(editorItemId)} 
                          alt="" 
                          className="w-6 h-6 object-contain drop-shadow pixelated"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      ) : (
                        <span>📦</span>
                      )}
                    </div>
                    <div className="text-left">
                      <div className="text-xs sm:text-sm font-semibold text-white/80">
                        {editorItemId ? getDisplayName(editorItemId) : 'Choose Item...'}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-white/50 font-mono">
                        {editorItemId || 'Click to browse 436+ items'}
                      </div>
                    </div>
                  </div>
                  <Search size={15} className="text-white/50 group-hover:text-white transition-colors" />
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-white/50 block mb-1">Count</label>
                    <input
                      type="number"
                      min={1}
                      max={127}
                      value={editorCount}
                      onChange={(e) => setEditorCount(parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-white/90 focus:outline-none focus:border-emerald-400 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono uppercase text-white/50 block mb-1">Damage</label>
                    <input
                      type="number"
                      min={0}
                      value={editorDamage}
                      onChange={(e) => setEditorDamage(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-white/90 focus:outline-none focus:border-emerald-400 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-white/50 block mb-1">Custom Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Legendary Pickaxe"
                    value={editorCustomName}
                    onChange={(e) => setEditorCustomName(e.target.value)}
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-white/90 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="flex flex-col gap-2.5">
                  <label className="text-[11px] font-mono uppercase text-white/50">Enchantments ({editorEnchantments.length})</label>
                  <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto pr-1">
                    {editorEnchantments.map((ench, idx) => {
                      const def = ENCHANTS_BY_ID.get(ench.id);
                      return (
                        <div 
                          key={ench.id} 
                          className="flex items-center justify-between bg-slate-950/60 border border-white/5 px-2.5 py-1.5 rounded-xl text-xs"
                        >
                          <span className="text-purple-300 font-medium">
                            {def?.name || `#${ench.id}`} {toRoman(ench.lvl)}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min={1}
                              max={def?.maxLevel || 10}
                              value={ench.lvl}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 1;
                                setEditorEnchantments(prev => {
                                  const next = [...prev];
                                  next[idx].lvl = val;
                                  return next;
                                });
                              }}
                              className="w-10 bg-slate-900 border border-white/10 rounded px-1 py-0.5 text-center font-mono text-xs"
                            />
                            <button
                              onClick={() => setEditorEnchantments(prev => prev.filter((_, i) => i !== idx))}
                              className="text-rose-400 hover:text-rose-300 p-0.5 cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <select
                    onChange={(e) => {
                      const id = parseInt(e.target.value);
                      if (isNaN(id)) return;
                      const def = ENCHANTS_BY_ID.get(id);
                      setEditorEnchantments(prev => [...prev, { id, lvl: def?.maxLevel || 1 }]);
                      e.target.value = '';
                    }}
                    defaultValue=""
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white/70 focus:outline-none focus:border-purple-400 cursor-pointer"
                  >
                    <option value="" disabled>+ Add Enchantment...</option>
                    {MINECRAFT_ENCHANTMENTS.filter(e => !editorEnchantments.some(x => x.id === e.id)).map(e => (
                      <option key={e.id} value={e.id}>
                        {e.name} (Max {toRoman(e.maxLevel)})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={applyEditorChanges}
                  className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-2.5 rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-pink-600/30 cursor-pointer mt-1"
                >
                  ✓ Apply Changes to Slot
                </button>
              </div>
            ) : (
              <div className="text-center text-white/40 text-xs sm:text-sm py-10">
                Click any slot in the inventory matrix to inspect and customize.
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isPickerOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-4 sm:p-6 flex flex-col gap-3.5 max-h-[85vh] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl">📦</span>
                  <h3 className="font-bold text-base sm:text-lg text-white/90">Select Item</h3>
                </div>
                <button 
                  onClick={() => setIsPickerOpen(false)}
                  className="p-1.5 text-white/50 hover:text-white rounded-xl cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" />
                <input
                  type="text"
                  placeholder="Search 436+ items (e.g. netherite, sponge, sword)..."
                  value={pickerSearch}
                  onChange={(e) => setPickerSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white/90 focus:outline-none focus:border-emerald-400"
                  autoFocus
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setPickerCategory(cat)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                      pickerCategory === cat 
                        ? 'bg-emerald-500 text-slate-950 font-bold' 
                        : 'bg-white/[0.06] text-white/70 hover:bg-white/[0.1]'
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 overflow-y-auto p-1 flex-1 max-h-96">
                {filteredPickerItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setEditorItemId(item.id);
                      if (editorCount > item.maxStack) setEditorCount(item.maxStack);
                      setIsPickerOpen(false);
                    }}
                    className="flex flex-col items-center gap-1 p-2 rounded-2xl bg-slate-950/60 hover:bg-emerald-950/50 border border-white/5 hover:border-pink-500/50 transition-all cursor-pointer text-center group"
                  >
                    <img 
                      src={getIconUrl(item.id)} 
                      alt="" 
                      className="w-8 h-8 object-contain drop-shadow pixelated group-hover:scale-110 transition-transform"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                    <span className="text-[10px] sm:text-[11px] font-medium text-white/70 line-clamp-1">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
