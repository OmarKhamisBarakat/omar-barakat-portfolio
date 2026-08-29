import { useState, useMemo, useRef } from 'react';
import { saveAs } from 'file-saver';
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
  ArrowRight,
  Zap,
  Boxes,
  Swords,
  Layers,
  ChevronDown
} from 'lucide-react';
import { 
  MINECRAFT_ITEMS, 
  MINECRAFT_ENCHANTMENTS 
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

const ARMOR_ICONS = ['🪖', '🦺', '👖', '🥾'];

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
  const [presetsOpen, setPresetsOpen] = useState(true);
  const [presetTab, setPresetTab] = useState<'sets' | 'loadouts' | 'enchants' | 'fill'>('sets');
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

    const orig = inventory[selectedSlot.section][selectedSlot.index];
    const updatedItem: ItemSlot = {
      name: editorItemId,
      count: Math.max(1, Math.min(127, editorCount)),
      slot: selectedSlot.section === 'main' ? selectedSlot.index + 9 : selectedSlot.index,
      damage: editorDamage || 0,
      enchantments: [...editorEnchantments],
      customName: editorCustomName.trim(),
      _raw: (orig && orig.name === editorItemId) ? orig._raw : undefined
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

  // Helper to add items to the first available empty inventory slots
  const addItemsToInventory = (items: ItemSlot[], label: string) => {
    let added = 0;
    setInventory(prev => {
      const next = { ...prev };
      const nextHotbar = [...next.hotbar];
      const nextMain = [...next.main];

      for (const item of items) {
        let placed = false;
        // Try hotbar first
        for (let i = 0; i < 9; i++) {
          if (!nextHotbar[i] || !nextHotbar[i]?.name) {
            nextHotbar[i] = { ...item, slot: i };
            placed = true;
            added++;
            break;
          }
        }
        // Then try main inventory
        if (!placed) {
          for (let i = 0; i < 27; i++) {
            if (!nextMain[i] || !nextMain[i]?.name) {
              nextMain[i] = { ...item, slot: i + 9 };
              placed = true;
              added++;
              break;
            }
          }
        }
      }

      next.hotbar = nextHotbar;
      next.main = nextMain;
      return next;
    });

    if (added === items.length) {
      notify(`Added ${added} items (${label}) to inventory!`);
    } else {
      notify(`Added ${added}/${items.length} items (${label}) — inventory full!`, 'error');
    }
  };

  // Preset definitions for full equipment sets
  const addFullNetheriteSetToInventory = () => {
    const armorEnchs = [
      { id: 0, lvl: 4 }, // Protection IV
      { id: 17, lvl: 3 }, // Unbreaking III
      { id: 26, lvl: 1 }, // Mending
      { id: 5, lvl: 3 }  // Thorns III
    ];

    const items: ItemSlot[] = [
      // Netherite Armor Set
      { name: 'minecraft:netherite_helmet', count: 1, slot: 0, damage: 0, enchantments: [...armorEnchs, { id: 6, lvl: 3 }, { id: 8, lvl: 1 }], customName: 'God Netherite Helmet' },
      { name: 'minecraft:netherite_chestplate', count: 1, slot: 0, damage: 0, enchantments: [...armorEnchs], customName: 'God Netherite Chestplate' },
      { name: 'minecraft:netherite_leggings', count: 1, slot: 0, damage: 0, enchantments: [...armorEnchs, { id: 37, lvl: 3 }], customName: 'God Netherite Leggings' },
      { name: 'minecraft:netherite_boots', count: 1, slot: 0, damage: 0, enchantments: [...armorEnchs, { id: 2, lvl: 4 }, { id: 7, lvl: 3 }, { id: 36, lvl: 3 }], customName: 'God Netherite Boots' },
      // Netherite Tools & Weapons
      { name: 'minecraft:netherite_sword', count: 1, slot: 0, damage: 0, enchantments: [{ id: 9, lvl: 5 }, { id: 14, lvl: 3 }, { id: 13, lvl: 2 }, { id: 12, lvl: 2 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }], customName: 'God Netherite Sword' },
      { name: 'minecraft:netherite_pickaxe', count: 1, slot: 0, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 18, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }], customName: 'Fortune Netherite Pickaxe' },
      { name: 'minecraft:netherite_pickaxe', count: 1, slot: 0, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 16, lvl: 1 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }], customName: 'Silk Touch Netherite Pickaxe' },
      { name: 'minecraft:netherite_axe', count: 1, slot: 0, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 9, lvl: 5 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }], customName: 'God Netherite Axe' },
      { name: 'minecraft:netherite_shovel', count: 1, slot: 0, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 16, lvl: 1 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }], customName: 'God Netherite Shovel' },
      { name: 'minecraft:netherite_hoe', count: 1, slot: 0, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 18, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }], customName: 'God Netherite Hoe' }
    ];

    addItemsToInventory(items, 'Full Netherite Armor & Tools');
  };

  const addFullDiamondSetToInventory = () => {
    const armorEnchs = [
      { id: 0, lvl: 4 },
      { id: 17, lvl: 3 },
      { id: 26, lvl: 1 },
      { id: 5, lvl: 3 }
    ];

    const items: ItemSlot[] = [
      { name: 'minecraft:diamond_helmet', count: 1, slot: 0, damage: 0, enchantments: [...armorEnchs, { id: 6, lvl: 3 }, { id: 8, lvl: 1 }], customName: 'God Diamond Helmet' },
      { name: 'minecraft:diamond_chestplate', count: 1, slot: 0, damage: 0, enchantments: [...armorEnchs], customName: 'God Diamond Chestplate' },
      { name: 'minecraft:diamond_leggings', count: 1, slot: 0, damage: 0, enchantments: [...armorEnchs, { id: 37, lvl: 3 }], customName: 'God Diamond Leggings' },
      { name: 'minecraft:diamond_boots', count: 1, slot: 0, damage: 0, enchantments: [...armorEnchs, { id: 2, lvl: 4 }, { id: 7, lvl: 3 }], customName: 'God Diamond Boots' },
      { name: 'minecraft:diamond_sword', count: 1, slot: 0, damage: 0, enchantments: [{ id: 9, lvl: 5 }, { id: 14, lvl: 3 }, { id: 13, lvl: 2 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }], customName: 'God Diamond Sword' },
      { name: 'minecraft:diamond_pickaxe', count: 1, slot: 0, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 18, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }], customName: 'God Diamond Pickaxe' },
      { name: 'minecraft:diamond_axe', count: 1, slot: 0, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 9, lvl: 5 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }], customName: 'God Diamond Axe' },
      { name: 'minecraft:diamond_shovel', count: 1, slot: 0, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }], customName: 'God Diamond Shovel' },
      { name: 'minecraft:diamond_hoe', count: 1, slot: 0, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 18, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }], customName: 'God Diamond Hoe' }
    ];

    addItemsToInventory(items, 'Full Diamond Armor & Tools');
  };

  const addFullNetheriteArmorOnly = () => {
    const armorEnchs = [{ id: 0, lvl: 4 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }, { id: 5, lvl: 3 }];
    const items: ItemSlot[] = [
      { name: 'minecraft:netherite_helmet', count: 1, slot: 0, damage: 0, enchantments: [...armorEnchs, { id: 6, lvl: 3 }, { id: 8, lvl: 1 }] },
      { name: 'minecraft:netherite_chestplate', count: 1, slot: 0, damage: 0, enchantments: [...armorEnchs] },
      { name: 'minecraft:netherite_leggings', count: 1, slot: 0, damage: 0, enchantments: [...armorEnchs, { id: 37, lvl: 3 }] },
      { name: 'minecraft:netherite_boots', count: 1, slot: 0, damage: 0, enchantments: [...armorEnchs, { id: 2, lvl: 4 }, { id: 7, lvl: 3 }, { id: 36, lvl: 3 }] }
    ];
    addItemsToInventory(items, 'Netherite Armor Set');
  };

  const addFullNetheriteToolsOnly = () => {
    const items: ItemSlot[] = [
      { name: 'minecraft:netherite_sword', count: 1, slot: 0, damage: 0, enchantments: [{ id: 9, lvl: 5 }, { id: 14, lvl: 3 }, { id: 13, lvl: 2 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }] },
      { name: 'minecraft:netherite_pickaxe', count: 1, slot: 0, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 18, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }] },
      { name: 'minecraft:netherite_axe', count: 1, slot: 0, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 9, lvl: 5 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }] },
      { name: 'minecraft:netherite_shovel', count: 1, slot: 0, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 16, lvl: 1 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }] },
      { name: 'minecraft:netherite_hoe', count: 1, slot: 0, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 18, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }] }
    ];
    addItemsToInventory(items, 'Netherite Tools & Weapons');
  };

  // Fill empty slots with specific blocks / consumables
  const fillEmptyWith = (itemId: string, count: number, label: string) => {
    let filled = 0;
    setInventory(prev => {
      const next = { ...prev };
      const h = [...next.hotbar];
      const m = [...next.main];
      for (let i = 0; i < 9; i++) {
        if (!h[i] || !h[i]?.name) {
          h[i] = { name: itemId, count, slot: i, damage: 0, enchantments: [] };
          filled++;
        }
      }
      for (let i = 0; i < 27; i++) {
        if (!m[i] || !m[i]?.name) {
          m[i] = { name: itemId, count, slot: i + 9, damage: 0, enchantments: [] };
          filled++;
        }
      }
      next.hotbar = h;
      next.main = m;
      return next;
    });
    notify(`Filled ${filled} empty slots with ${label}!`);
  };

  // Complete specialized kits
  const equipMinerKit = () => {
    const items: ItemSlot[] = [
      { name: 'minecraft:netherite_pickaxe', count: 1, slot: 0, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 18, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }], customName: 'Ore Miner (Fortune III)' },
      { name: 'minecraft:netherite_pickaxe', count: 1, slot: 0, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 16, lvl: 1 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }], customName: 'Silk Quarry (Silk Touch)' },
      { name: 'minecraft:netherite_shovel', count: 1, slot: 0, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }] },
      { name: 'minecraft:torch', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:torch', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:water_bucket', count: 1, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:ender_chest', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:cooked_beef', count: 64, slot: 0, damage: 0, enchantments: [] }
    ];
    addItemsToInventory(items, 'Master Miner Kit');
  };

  const equipRedstoneKit = () => {
    const items: ItemSlot[] = [
      { name: 'minecraft:redstone', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:repeater', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:comparator', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:sticky_piston', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:piston', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:observer', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:hopper', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:redstone_block', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:redstone_torch', count: 64, slot: 0, damage: 0, enchantments: [] }
    ];
    addItemsToInventory(items, 'Redstone Engineer Kit');
  };

  const equipBuilderKit = () => {
    const items: ItemSlot[] = [
      { name: 'minecraft:quartz_block', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:diamond_block', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:glass', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:sea_lantern', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:shulker_box', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:stone_bricks', count: 64, slot: 0, damage: 0, enchantments: [] }
    ];
    addItemsToInventory(items, 'Master Builder Kit');
  };

  const equipEndRaiderKit = () => {
    const items: ItemSlot[] = [
      { name: 'minecraft:elytra', count: 1, slot: 0, damage: 0, enchantments: [{ id: 17, lvl: 3 }, { id: 26, lvl: 1 }] },
      { name: 'minecraft:firework_rocket', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:firework_rocket', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:firework_rocket', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:ender_pearl', count: 16, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:ender_pearl', count: 16, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:enchanted_golden_apple', count: 64, slot: 0, damage: 0, enchantments: [] },
      { name: 'minecraft:bow', count: 1, slot: 0, damage: 0, enchantments: [{ id: 19, lvl: 5 }, { id: 22, lvl: 1 }, { id: 21, lvl: 1 }, { id: 17, lvl: 3 }] },
      { name: 'minecraft:arrow', count: 64, slot: 0, damage: 0, enchantments: [] }
    ];
    addItemsToInventory(items, 'End Raider & Dragon Kit');
  };

  // Max Enchant Functions
  const maxEnchantToolsFortune = () => {
    const toolEnchants = [
      { id: 15, lvl: 5 }, // Efficiency V
      { id: 18, lvl: 3 }, // Fortune III
      { id: 17, lvl: 3 }, // Unbreaking III
      { id: 26, lvl: 1 }  // Mending
    ];

    let upgraded = 0;
    const upgradeSlot = (item: ItemSlot | null): ItemSlot | null => {
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
      hotbar: prev.hotbar.map(it => upgradeSlot(it)),
      main: prev.main.map(it => upgradeSlot(it))
    }));

    if (selectedSlot) {
      const it = inventory[selectedSlot.section][selectedSlot.index];
      if (it) loadItemIntoEditor(it);
    }

    notify(`Upgraded ${upgraded} tools with Max Enchants (Fortune III)!`);
  };

  const maxEnchantToolsSilkTouch = () => {
    const toolEnchants = [
      { id: 15, lvl: 5 }, // Efficiency V
      { id: 16, lvl: 1 }, // Silk Touch
      { id: 17, lvl: 3 }, // Unbreaking III
      { id: 26, lvl: 1 }  // Mending
    ];

    let upgraded = 0;
    const upgradeSlot = (item: ItemSlot | null): ItemSlot | null => {
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
      hotbar: prev.hotbar.map(it => upgradeSlot(it)),
      main: prev.main.map(it => upgradeSlot(it))
    }));

    notify(`Upgraded ${upgraded} tools with Max Enchants (Silk Touch)!`);
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
        enchantments: cfg.enchs,
        customName: 'God ' + getDisplayName(cfg.name)
      }))
    }));

    notify('Equipped God Netherite Armor Set!');
  };

  const maxEnchantOverpowered32k = () => {
    const sword32k = [
      { id: 9, lvl: 255 }, // Sharpness 255
      { id: 14, lvl: 10 }, // Looting X
      { id: 13, lvl: 10 }, // Fire Aspect X
      { id: 12, lvl: 10 }, // Knockback X
      { id: 17, lvl: 255 }, // Unbreaking 255
      { id: 26, lvl: 1 }   // Mending
    ];

    let upgraded = 0;
    setInventory(prev => ({
      ...prev,
      hotbar: prev.hotbar.map(it => {
        if (it && it.name && it.name.toLowerCase().includes('sword')) {
          upgraded++;
          return { ...it, enchantments: [...sword32k], customName: '⚡ 32K One-Shot Blade ⚡' };
        }
        return it;
      }),
      main: prev.main.map(it => {
        if (it && it.name && it.name.toLowerCase().includes('sword')) {
          upgraded++;
          return { ...it, enchantments: [...sword32k], customName: '⚡ 32K One-Shot Blade ⚡' };
        }
        return it;
      })
    }));

    notify(`Upgraded ${upgraded} swords to 32k Overpowered Level (Sharpness 255)!`);
  };

  const maxEnchantSword = () => {
    const swordEnchs = [
      { id: 9, lvl: 5 },
      { id: 11, lvl: 2 },
      { id: 12, lvl: 2 },
      { id: 13, lvl: 2 },
      { id: 14, lvl: 3 },
      { id: 17, lvl: 3 },
      { id: 26, lvl: 1 }
    ];
    let upgraded = 0;
    setInventory(prev => ({
      ...prev,
      hotbar: prev.hotbar.map(it => {
        if (it && it.name && it.name.toLowerCase().includes('sword')) { upgraded++; return { ...it, enchantments: [...swordEnchs] }; }
        return it;
      }),
      main: prev.main.map(it => {
        if (it && it.name && it.name.toLowerCase().includes('sword')) { upgraded++; return { ...it, enchantments: [...swordEnchs] }; }
        return it;
      })
    }));
    notify(`Upgraded ${upgraded} swords with God Sword enchants!`);
  };

  const maxEnchantBow = () => {
    const bowEnchs = [
      { id: 19, lvl: 5 },
      { id: 20, lvl: 1 },
      { id: 21, lvl: 1 },
      { id: 22, lvl: 2 },
      { id: 17, lvl: 3 },
      { id: 26, lvl: 1 }
    ];
    let upgraded = 0;
    setInventory(prev => ({
      ...prev,
      hotbar: prev.hotbar.map(it => {
        if (it && it.name && it.name.toLowerCase().includes('bow') && !it.name.toLowerCase().includes('bowl')) { upgraded++; return { ...it, enchantments: [...bowEnchs] }; }
        return it;
      }),
      main: prev.main.map(it => {
        if (it && it.name && it.name.toLowerCase().includes('bow') && !it.name.toLowerCase().includes('bowl')) { upgraded++; return { ...it, enchantments: [...bowEnchs] }; }
        return it;
      })
    }));
    notify(`Upgraded ${upgraded} bows with God Bow enchants!`);
  };

  const maxEnchantTrident = () => {
    const tridentEnchs = [
      { id: 29, lvl: 3 },
      { id: 30, lvl: 1 },
      { id: 32, lvl: 5 },
      { id: 17, lvl: 3 },
      { id: 26, lvl: 1 }
    ];
    let upgraded = 0;
    setInventory(prev => ({
      ...prev,
      hotbar: prev.hotbar.map(it => {
        if (it && it.name && it.name.toLowerCase().includes('trident')) { upgraded++; return { ...it, enchantments: [...tridentEnchs] }; }
        return it;
      }),
      main: prev.main.map(it => {
        if (it && it.name && it.name.toLowerCase().includes('trident')) { upgraded++; return { ...it, enchantments: [...tridentEnchs] }; }
        return it;
      })
    }));
    notify(`Upgraded ${upgraded} tridents with God Trident enchants!`);
  };

  const maxEnchantCrossbow = () => {
    const crossbowEnchs = [
      { id: 33, lvl: 4 },
      { id: 34, lvl: 1 },
      { id: 35, lvl: 3 },
      { id: 17, lvl: 3 },
      { id: 26, lvl: 1 }
    ];
    let upgraded = 0;
    setInventory(prev => ({
      ...prev,
      hotbar: prev.hotbar.map(it => {
        if (it && it.name && it.name.toLowerCase().includes('crossbow')) { upgraded++; return { ...it, enchantments: [...crossbowEnchs] }; }
        return it;
      }),
      main: prev.main.map(it => {
        if (it && it.name && it.name.toLowerCase().includes('crossbow')) { upgraded++; return { ...it, enchantments: [...crossbowEnchs] }; }
        return it;
      })
    }));
    notify(`Upgraded ${upgraded} crossbows with God Crossbow enchants!`);
  };

  const pvpLoadout = () => {
    const swordEnchs = [{ id: 9, lvl: 5 }, { id: 11, lvl: 2 }, { id: 14, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }];
    const armorEnchs = (extra: {id:number;lvl:number}[]) => [{ id: 0, lvl: 4 }, { id: 5, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }, ...extra];
    setInventory({
      hotbar: [
        { name: 'minecraft:netherite_sword', count: 1, slot: 0, damage: 0, enchantments: swordEnchs },
        { name: 'minecraft:ender_pearl', count: 16, slot: 1, damage: 0, enchantments: [] },
        { name: 'minecraft:enchanted_golden_apple', count: 64, slot: 2, damage: 0, enchantments: [] },
        { name: 'minecraft:enchanted_golden_apple', count: 64, slot: 3, damage: 0, enchantments: [] },
        { name: 'minecraft:enchanted_golden_apple', count: 64, slot: 4, damage: 0, enchantments: [] },
        { name: 'minecraft:enchanted_golden_apple', count: 64, slot: 5, damage: 0, enchantments: [] },
        { name: 'minecraft:enchanted_golden_apple', count: 64, slot: 6, damage: 0, enchantments: [] },
        { name: 'minecraft:enchanted_golden_apple', count: 64, slot: 7, damage: 0, enchantments: [] },
        { name: 'minecraft:totem_of_undying', count: 1, slot: 8, damage: 0, enchantments: [] }
      ],
      main: [
        ...Array(9).fill(null).map((_, i) => ({ name: 'minecraft:totem_of_undying', count: 1, slot: i + 9, damage: 0, enchantments: [] as {id:number;lvl:number}[] })),
        ...Array(9).fill(null).map((_, i) => ({ name: 'minecraft:enchanted_golden_apple', count: 64, slot: i + 18, damage: 0, enchantments: [] as {id:number;lvl:number}[] })),
        ...Array(9).fill(null).map((_, i) => ({ name: 'minecraft:ender_pearl', count: 16, slot: i + 27, damage: 0, enchantments: [] as {id:number;lvl:number}[] }))
      ],
      armor: [
        { name: 'minecraft:netherite_helmet', count: 1, slot: 0, damage: 0, enchantments: armorEnchs([{ id: 6, lvl: 3 }, { id: 8, lvl: 1 }]) },
        { name: 'minecraft:netherite_chestplate', count: 1, slot: 1, damage: 0, enchantments: armorEnchs([]) },
        { name: 'minecraft:netherite_leggings', count: 1, slot: 2, damage: 0, enchantments: armorEnchs([{ id: 37, lvl: 3 }]) },
        { name: 'minecraft:netherite_boots', count: 1, slot: 3, damage: 0, enchantments: armorEnchs([{ id: 2, lvl: 4 }, { id: 7, lvl: 3 }, { id: 36, lvl: 3 }]) }
      ],
      offhand: [{ name: 'minecraft:totem_of_undying', count: 1, slot: 0, damage: 0, enchantments: [] }]
    });
    setSelectedSlot({ section: 'hotbar', index: 0 });
    notify('PvP Loadout equipped! Full totems, gaps, pearls.');
  };

  const survivalStarterKit = () => {
    setInventory(prev => {
      const next = { ...prev };
      next.hotbar = [
        { name: 'minecraft:netherite_pickaxe', count: 1, slot: 0, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 18, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }] },
        { name: 'minecraft:netherite_axe', count: 1, slot: 1, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 18, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }] },
        { name: 'minecraft:netherite_shovel', count: 1, slot: 2, damage: 0, enchantments: [{ id: 15, lvl: 5 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }] },
        { name: 'minecraft:netherite_sword', count: 1, slot: 3, damage: 0, enchantments: [{ id: 9, lvl: 5 }, { id: 14, lvl: 3 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }] },
        { name: 'minecraft:bow', count: 1, slot: 4, damage: 0, enchantments: [{ id: 19, lvl: 5 }, { id: 22, lvl: 2 }, { id: 17, lvl: 3 }, { id: 26, lvl: 1 }] },
        { name: 'minecraft:enchanted_golden_apple', count: 64, slot: 5, damage: 0, enchantments: [] },
        { name: 'minecraft:cooked_beef', count: 64, slot: 6, damage: 0, enchantments: [] },
        { name: 'minecraft:torch', count: 64, slot: 7, damage: 0, enchantments: [] },
        { name: 'minecraft:crafting_table', count: 1, slot: 8, damage: 0, enchantments: [] }
      ];
      return next;
    });
    setSelectedSlot({ section: 'hotbar', index: 0 });
    notify('Survival Starter Kit equipped!');
  };

  const clearAllSlots = () => {
    setInventory({
      hotbar: Array(9).fill(null),
      main: Array(27).fill(null),
      armor: Array(4).fill(null),
      offhand: [null]
    });
    loadItemIntoEditor(null);
    setSelectedSlot(null);
    notify('All slots cleared!');
  };

  const exportZip = async () => {
    if (!world) return;
    setIsLoading(true);
    setLoadingText('Packaging world into ZIP archive...');
    try {
      const blob = await exportModifiedWorldZip(world, inventory);
      saveAs(blob, `${world.baseName}_modified.zip`);
      notify('Export complete! ZIP downloaded.');
    } catch (err: any) {
      notify(err.message || 'Export failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const exportMcWorld = async () => {
    if (!world) return;
    setIsLoading(true);
    setLoadingText('Packaging for iOS Minecraft import (.mcworld)...');
    try {
      const blob = await exportModifiedWorldZip(world, inventory);
      saveAs(blob, `${world.baseName}_modified.mcworld`);
      notify('Export complete! Tap the .mcworld file on iOS to auto-open in Minecraft.');
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
        { name: 'minecraft:enchanted_golden_apple', count: 64, slot: 3, damage: 0, enchantments: [] },
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
    notify('Loaded interactive demo world!');
  };

  const renderSlot = (item: ItemSlot | null, section: 'hotbar' | 'main' | 'armor' | 'offhand', index: number) => {
    const isSelected = selectedSlot?.section === section && selectedSlot?.index === index;
    const isEnchanted = item?.enchantments && item.enchantments.length > 0;

    return (
      <button
        key={`${section}-${index}`}
        onClick={() => selectSlot(section, index)}
        className={`relative aspect-square rounded-xl border flex items-center justify-center p-1 sm:p-1.5 transition-all cursor-pointer select-none
          ${isSelected 
            ? 'border-emerald-400 bg-emerald-950/40 ring-2 ring-emerald-400/50 scale-105 shadow-lg shadow-emerald-950/50' 
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
              <Sparkles size={11} className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 text-purple-300 pointer-events-none" />
            )}
          </>
        ) : (
          <span className="text-white/25 text-xs font-mono select-none">
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
        accept=".zip,.mcworld,.dat" 
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
                ? 'bg-teal-950/90 border-teal-500/40 text-teal-200' 
                : 'bg-rose-950/90 border-rose-500/40 text-rose-200'
            }`}
          >
            {notification.type === 'success' ? <Check size={18} /> : <ShieldAlert size={18} />}
            <span className="text-xs sm:text-sm">{notification.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoading && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
            <p className="text-sm sm:text-base font-mono text-emerald-300">{loadingText}</p>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto flex flex-col gap-5 sm:gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.02] border border-white/10 p-4 sm:p-6 rounded-3xl backdrop-blur-2xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-2xl">
              📦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white/95">Bedrock Inventory Matrix</h1>
                <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold uppercase">
                  iOS & PC
                </span>
              </div>
              <p className="text-xs text-white/50 font-mono mt-0.5">
                {world ? world.fileName : 'Direct .mcworld / .zip Player Inventory Editor'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] text-white/90 border border-white/10 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              <Upload size={15} />
              <span>{world ? 'Change World' : 'Upload World'}</span>
            </button>

            {world && (
              <>
                <button
                  onClick={exportMcWorld}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/25 cursor-pointer"
                >
                  <Download size={15} />
                  <span>Save .mcworld (iOS)</span>
                </button>
                <button
                  onClick={exportZip}
                  className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] text-white/80 border border-white/10 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer"
                >
                  <span>Export .zip</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Upload Hero */}
        {!world && (
          <div className="bg-white/[0.02] border border-dashed border-emerald-500/30 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center text-center gap-5 backdrop-blur-xl">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-emerald-950/20 transition-all border border-transparent hover:border-emerald-500/30"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-3xl">
                <Upload size={32} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white/90">Choose or Drop Bedrock World File Here</h3>
                <p className="text-xs sm:text-sm text-white/50 mt-1">Supports iOS exports, .mcworld and .zip files</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/50">
              <span>Or test with an interactive preview:</span>
              <button
                onClick={loadDemoWorld}
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer underline underline-offset-4"
              >
                Load Demo Inventory <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}

        {/* Comprehensive Presets Engine */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-white/5">
            <button
              onClick={() => setPresetsOpen(!presetsOpen)}
              className="flex items-center gap-2 cursor-pointer text-left group"
            >
              <span className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Wand2 size={15} />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xs sm:text-sm text-white/90 group-hover:text-emerald-300 transition-colors">
                    Presets, Sets & Super Loadouts
                  </h3>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] px-2 py-0.5 rounded-full font-bold">
                    28 PRESETS
                  </span>
                </div>
                <p className="text-[11px] text-white/45 hidden sm:block">
                  Add full gear sets, max out enchantments, or fill empty storage in 1-click
                </p>
              </div>
              <ChevronDown size={16} className={`text-white/40 ml-2 transition-transform ${presetsOpen ? 'rotate-180' : ''}`} />
            </button>

            {presetsOpen && (
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
                <button
                  onClick={() => setPresetTab('sets')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    presetTab === 'sets' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Boxes size={13} />
                  <span className="hidden sm:inline">Gear</span> Sets
                </button>
                <button
                  onClick={() => setPresetTab('loadouts')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    presetTab === 'loadouts' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Layers size={13} />
                  Loadouts
                </button>
                <button
                  onClick={() => setPresetTab('enchants')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    presetTab === 'enchants' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Sparkles size={13} />
                  Enchant
                </button>
                <button
                  onClick={() => setPresetTab('fill')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    presetTab === 'fill' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Zap size={13} />
                  Fill All
                </button>
              </div>
            )}
          </div>

          <AnimatePresence>
            {presetsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-3.5 sm:p-5 flex flex-col gap-4">
                  {/* TAB 1: FULL SETS INTO INVENTORY */}
                  {presetTab === 'sets' && (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase text-emerald-400 tracking-wider">
                          Add Complete Gear Sets to Available Slots
                        </span>
                        <span className="text-[10px] text-white/40">Places into hotbar & backpack</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                        <button 
                          onClick={addFullNetheriteSetToInventory}
                          className="flex flex-col gap-1.5 p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-left transition-all cursor-pointer group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xl">🛡️⚔️</span>
                            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded">10 ITEMS</span>
                          </div>
                          <span className="font-bold text-xs sm:text-sm text-emerald-200 group-hover:text-emerald-100">
                            Full Netherite Set
                          </span>
                          <span className="text-[10px] text-emerald-300/60 leading-tight">
                            God Armor (Prot IV) + Sword, Pickaxe, Axe, Shovel, Hoe
                          </span>
                        </button>

                        <button 
                          onClick={addFullDiamondSetToInventory}
                          className="flex flex-col gap-1.5 p-3 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-left transition-all cursor-pointer group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xl">💎⚔️</span>
                            <span className="text-[9px] bg-cyan-500/20 text-cyan-300 font-bold px-1.5 py-0.5 rounded">9 ITEMS</span>
                          </div>
                          <span className="font-bold text-xs sm:text-sm text-cyan-200 group-hover:text-cyan-100">
                            Full Diamond Set
                          </span>
                          <span className="text-[10px] text-cyan-300/60 leading-tight">
                            Full Max-Enchanted Diamond Armor + Tool Suite
                          </span>
                        </button>

                        <button 
                          onClick={addFullNetheriteArmorOnly}
                          className="flex flex-col gap-1.5 p-3 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-left transition-all cursor-pointer group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xl">🪖🦺</span>
                            <span className="text-[9px] bg-indigo-500/20 text-indigo-300 font-bold px-1.5 py-0.5 rounded">4 PIECES</span>
                          </div>
                          <span className="font-bold text-xs sm:text-sm text-indigo-200 group-hover:text-indigo-100">
                            Netherite Armor Only
                          </span>
                          <span className="text-[10px] text-indigo-300/60 leading-tight">
                            Helmet, Chestplate, Leggings & Boots (Prot IV)
                          </span>
                        </button>

                        <button 
                          onClick={addFullNetheriteToolsOnly}
                          className="flex flex-col gap-1.5 p-3 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-left transition-all cursor-pointer group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xl">⛏️🪓</span>
                            <span className="text-[9px] bg-purple-500/20 text-purple-300 font-bold px-1.5 py-0.5 rounded">5 TOOLS</span>
                          </div>
                          <span className="font-bold text-xs sm:text-sm text-purple-200 group-hover:text-purple-100">
                            Netherite Tools Only
                          </span>
                          <span className="text-[10px] text-purple-300/60 leading-tight">
                            God Sword, Pickaxe, Axe, Shovel, and Hoe
                          </span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: SPECIALIZED LOADOUTS */}
                  {presetTab === 'loadouts' && (
                    <div className="flex flex-col gap-3">
                      <span className="text-[11px] font-mono uppercase text-teal-400 tracking-wider">
                        Full Themed Activity Loadouts
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        <button 
                          onClick={pvpLoadout}
                          className="flex items-start gap-3 p-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-left transition-all cursor-pointer"
                        >
                          <span className="text-2xl">⚔️</span>
                          <div>
                            <div className="font-bold text-xs sm:text-sm text-rose-200">PvP Master Kit</div>
                            <div className="text-[10px] text-rose-300/60 mt-0.5">Full Totems, Enchanted Gaps, Pearls & Netherite</div>
                          </div>
                        </button>

                        <button 
                          onClick={equipMinerKit}
                          className="flex items-start gap-3 p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-left transition-all cursor-pointer"
                        >
                          <span className="text-2xl">⛏️</span>
                          <div>
                            <div className="font-bold text-xs sm:text-sm text-amber-200">Deep Miner Kit</div>
                            <div className="text-[10px] text-amber-300/60 mt-0.5">Fortune + Silk Pickaxes, Torches, Ender Chest, Steaks</div>
                          </div>
                        </button>

                        <button 
                          onClick={equipEndRaiderKit}
                          className="flex items-start gap-3 p-3 rounded-2xl bg-fuchsia-500/10 hover:bg-fuchsia-500/20 border border-fuchsia-500/30 text-left transition-all cursor-pointer"
                        >
                          <span className="text-2xl">🪽</span>
                          <div>
                            <div className="font-bold text-xs sm:text-sm text-fuchsia-200">End & Dragon Raider</div>
                            <div className="text-[10px] text-fuchsia-300/60 mt-0.5">Elytra, 3x Stacks Fireworks, Pearls, Infinity Bow</div>
                          </div>
                        </button>

                        <button 
                          onClick={equipRedstoneKit}
                          className="flex items-start gap-3 p-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-left transition-all cursor-pointer"
                        >
                          <span className="text-2xl">🔴</span>
                          <div>
                            <div className="font-bold text-xs sm:text-sm text-red-200">Redstone Engineer</div>
                            <div className="text-[10px] text-red-300/60 mt-0.5">Repeaters, Comparators, Pistons, Observers, Hoppers</div>
                          </div>
                        </button>

                        <button 
                          onClick={equipBuilderKit}
                          className="flex items-start gap-3 p-3 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-left transition-all cursor-pointer"
                        >
                          <span className="text-2xl">🏛️</span>
                          <div>
                            <div className="font-bold text-xs sm:text-sm text-blue-200">Master Builder</div>
                            <div className="text-[10px] text-blue-300/60 mt-0.5">Quartz, Sea Lanterns, Diamond Blocks, Shulkers</div>
                          </div>
                        </button>

                        <button 
                          onClick={survivalStarterKit}
                          className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-left transition-all cursor-pointer"
                        >
                          <span className="text-2xl">🎒</span>
                          <div>
                            <div className="font-bold text-xs sm:text-sm text-emerald-200">Survival Starter</div>
                            <div className="text-[10px] text-emerald-300/60 mt-0.5">Core Tools, Food, Torches, Bed, Crafting Table</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: WEAPON & ARMOR ENCHANTERS */}
                  {presetTab === 'enchants' && (
                    <div className="flex flex-col gap-3">
                      <span className="text-[11px] font-mono uppercase text-purple-400 tracking-wider">
                        Upgrade Existing Items with Maximum Enchantments
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={maxEnchantToolsFortune} className="flex items-center gap-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          ⛏️ All Tools (Fortune III)
                        </button>
                        <button onClick={maxEnchantToolsSilkTouch} className="flex items-center gap-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          🪨 All Tools (Silk Touch)
                        </button>
                        <button onClick={maxEnchantSword} className="flex items-center gap-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          ⚔️ God Swords (Sharp V)
                        </button>
                        <button onClick={maxEnchantBow} className="flex items-center gap-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          🏹 God Bows (Power V + Flame)
                        </button>
                        <button onClick={maxEnchantTrident} className="flex items-center gap-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          🔱 God Tridents (Channeling)
                        </button>
                        <button onClick={maxEnchantCrossbow} className="flex items-center gap-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          🎯 God Crossbows (Multishot)
                        </button>
                        <button onClick={maxEnchantGodArmor} className="flex items-center gap-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          🛡️ Equip God Netherite Armor
                        </button>
                        <button onClick={maxEnchantOverpowered32k} className="flex items-center gap-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-amber-500/10">
                          ⚡ 32K Overpowered Weapon (Sharpness 255)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: FILL ALL EMPTY SLOTS */}
                  {presetTab === 'fill' && (
                    <div className="flex flex-col gap-3">
                      <span className="text-[11px] font-mono uppercase text-amber-400 tracking-wider">
                        Fill All Empty Slots Across Hotbar and Storage
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => fillEmptyWith('minecraft:sponge', 64, '64 Sponges')} className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          🧽 64 Sponges
                        </button>
                        <button onClick={() => fillEmptyWith('minecraft:diamond_block', 64, '64 Diamond Blocks')} className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          💎 64 Diamond Blocks
                        </button>
                        <button onClick={() => fillEmptyWith('minecraft:netherite_block', 64, '64 Netherite Blocks')} className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          ⬛ 64 Netherite Blocks
                        </button>
                        <button onClick={() => fillEmptyWith('minecraft:emerald_block', 64, '64 Emerald Blocks')} className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          🟩 64 Emerald Blocks
                        </button>
                        <button onClick={() => fillEmptyWith('minecraft:experience_bottle', 64, '64 Exp Bottles')} className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          🌟 64 Exp Bottles
                        </button>
                        <button onClick={() => fillEmptyWith('minecraft:totem_of_undying', 1, 'Totems of Undying')} className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          🗿 Totems of Undying
                        </button>
                        <button onClick={() => fillEmptyWith('minecraft:enchanted_golden_apple', 64, '64 Enchanted Apples')} className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          🍎 64 Enchanted Apples
                        </button>
                        <button onClick={() => fillEmptyWith('minecraft:ender_pearl', 16, '16 Ender Pearls')} className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          🔮 16 Ender Pearls
                        </button>
                        <button onClick={() => fillEmptyWith('minecraft:firework_rocket', 64, '64 Fireworks')} className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          🚀 64 Fireworks
                        </button>
                        <button onClick={() => fillEmptyWith('minecraft:shulker_box', 64, '64 Shulker Boxes')} className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          📦 64 Shulker Boxes
                        </button>
                        <button onClick={() => fillEmptyWith('minecraft:obsidian', 64, '64 Obsidian')} className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          🧱 64 Obsidian
                        </button>
                        <button onClick={() => fillEmptyWith('minecraft:cooked_beef', 64, '64 Steaks')} className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          🥩 64 Steaks
                        </button>
                        <button onClick={() => fillEmptyWith('minecraft:dirt', 64, '64 Dirt')} className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer">
                          🟫 64 Dirt
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Reset Actions */}
                  <div className="border-t border-white/5 pt-2.5 flex items-center justify-between">
                    <span className="text-[11px] text-white/40">Need to start fresh?</span>
                    <button 
                      onClick={clearAllSlots} 
                      className="flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                    >
                      <Trash2 size={13} /> Clear All 36 Slots
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Matrix & Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* Inventory Panel */}
          <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 p-4 sm:p-6 rounded-3xl flex flex-col gap-5 sm:gap-6 backdrop-blur-2xl">
            <div>
              <span className="text-xs font-mono uppercase text-white/50 block mb-2.5">Armor & Offhand Equipment</span>
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {inventory.armor.map((it, idx) => renderSlot(it, 'armor', idx))}
                </div>
                <div className="w-px h-10 bg-white/10" />
                {renderSlot(inventory.offhand[0], 'offhand', 0)}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-white/50 block mb-2.5">Storage Backpack (Slots 9–35)</span>
              <div className="grid grid-cols-9 gap-1.5 sm:gap-2.5 overflow-x-auto pb-1">
                {inventory.main.map((it, idx) => renderSlot(it, 'main', idx))}
              </div>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-white/10">
              <span className="text-xs font-mono uppercase text-emerald-400 block mb-2.5">Hotbar (Active Slots 1–9)</span>
              <div className="grid grid-cols-9 gap-1.5 sm:gap-2.5 overflow-x-auto pb-1">
                {inventory.hotbar.map((it, idx) => renderSlot(it, 'hotbar', idx))}
              </div>
            </div>
          </div>

          {/* Slot Inspector Panel */}
          <div className="bg-white/[0.02] border border-white/10 p-4 sm:p-6 rounded-3xl flex flex-col gap-5 backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-white/90">Slot Inspector</h3>
                <p className="text-xs text-emerald-300 font-mono mt-0.5">
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
                        {editorItemId || 'Click to browse 430+ items'}
                      </div>
                    </div>
                  </div>
                  <Search size={15} className="text-white/50 group-hover:text-white transition-colors" />
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-mono uppercase text-white/50">Count</label>
                      <button
                        type="button"
                        onClick={() => {
                          const item = ITEMS_BY_ID.get(editorItemId);
                          setEditorCount(item?.maxStack || 64);
                        }}
                        className="text-[10px] font-mono font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-1.5 py-0.5 rounded transition-all cursor-pointer"
                      >
                        MAX {ITEMS_BY_ID.get(editorItemId)?.maxStack ? `(${ITEMS_BY_ID.get(editorItemId)?.maxStack})` : ''}
                      </button>
                    </div>
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
                  <label className="text-[11px] font-mono uppercase text-white/50 block mb-1">Custom Display Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Blade of the Nether"
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
                              max={def?.maxLevel || 255}
                              value={ench.lvl}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 1;
                                setEditorEnchantments(prev => {
                                  const next = [...prev];
                                  next[idx].lvl = val;
                                  return next;
                                });
                              }}
                              className="w-12 bg-slate-900 border border-white/10 rounded px-1 py-0.5 text-center font-mono text-xs"
                            />
                            <button
                              onClick={() => {
                                setEditorEnchantments(prev => prev.filter((_, i) => i !== idx));
                              }}
                              className="text-rose-400 hover:text-rose-300 p-0.5 cursor-pointer"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-1.5">
                    <select
                      onChange={(e) => {
                        const id = parseInt(e.target.value);
                        if (!id) return;
                        const def = ENCHANTS_BY_ID.get(id);
                        if (def && !editorEnchantments.some(x => x.id === id)) {
                          setEditorEnchantments(prev => [...prev, { id, lvl: def.maxLevel }]);
                        }
                        e.target.value = '';
                      }}
                      defaultValue=""
                      className="flex-1 bg-slate-950/60 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white/80 focus:outline-none focus:border-emerald-400 cursor-pointer"
                    >
                      <option value="" disabled>+ Add Enchantment...</option>
                      {MINECRAFT_ENCHANTMENTS
                        .filter(e => !editorEnchantments.some(x => x.id === e.id))
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(e => (
                          <option key={e.id} value={e.id}>
                            {e.name} (Max {toRoman(e.maxLevel)})
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={applyEditorChanges}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-2.5 rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/25 cursor-pointer mt-1"
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

      {/* Item Search Modal */}
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
                  placeholder="Search 430+ items (e.g. netherite, sponge, sword)..."
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
                    className="flex flex-col items-center gap-1 p-2 rounded-2xl bg-slate-950/60 hover:bg-emerald-950/50 border border-white/5 hover:border-emerald-500/50 transition-all cursor-pointer text-center group"
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
