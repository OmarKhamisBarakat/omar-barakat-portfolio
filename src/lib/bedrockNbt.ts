import JSZip from 'jszip';

export interface ItemSlot {
  name: string;
  count: number;
  slot: number;
  damage: number;
  enchantments: { id: number; lvl: number }[];
  customName?: string;
}

export interface InventoryState {
  hotbar: (ItemSlot | null)[];
  main: (ItemSlot | null)[];
  armor: (ItemSlot | null)[];
  offhand: (ItemSlot | null)[];
}

export interface ParsedWorld {
  fileName: string;
  baseName: string;
  zip: JSZip;
  logFileName: string;
  logData: Uint8Array;
  nbtOffset: number;
  nbtLength: number;
  valLenOffset: number;
  valLenByteCount: number;
  recordHeaderOffset: number;
  inventory: InventoryState;
  rawRootNbt: any;
}

const TAG = {
  End: 0,
  Byte: 1,
  Short: 2,
  Int: 3,
  Long: 4,
  Float: 5,
  Double: 6,
  ByteArray: 7,
  String: 8,
  List: 9,
  Compound: 10,
  IntArray: 11,
  LongArray: 12
};

export class NbtReader {
  buffer: Uint8Array;
  offset = 0;
  view: DataView;

  constructor(buffer: Uint8Array) {
    this.buffer = buffer;
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  }

  readByte(): number {
    const val = this.view.getInt8(this.offset);
    this.offset += 1;
    return val;
  }

  readUByte(): number {
    const val = this.view.getUint8(this.offset);
    this.offset += 1;
    return val;
  }

  readShort(): number {
    const val = this.view.getInt16(this.offset, true);
    this.offset += 2;
    return val;
  }

  readInt(): number {
    const val = this.view.getInt32(this.offset, true);
    this.offset += 4;
    return val;
  }

  readLong(): bigint {
    const low = this.view.getInt32(this.offset, true);
    const high = this.view.getInt32(this.offset + 4, true);
    this.offset += 8;
    return BigInt(high) * 4294967296n + BigInt(low >>> 0);
  }

  readFloat(): number {
    const val = this.view.getFloat32(this.offset, true);
    this.offset += 4;
    return val;
  }

  readDouble(): number {
    const val = this.view.getFloat64(this.offset, true);
    this.offset += 8;
    return val;
  }

  readString(): string {
    const len = this.view.getUint16(this.offset, true);
    this.offset += 2;
    const strBytes = this.buffer.subarray(this.offset, this.offset + len);
    this.offset += len;
    return new TextDecoder('utf-8').decode(strBytes);
  }

  readTag(type: number): any {
    switch (type) {
      case TAG.Byte: return { type: TAG.Byte, value: this.readByte() };
      case TAG.Short: return { type: TAG.Short, value: this.readShort() };
      case TAG.Int: return { type: TAG.Int, value: this.readInt() };
      case TAG.Long: return { type: TAG.Long, value: this.readLong() };
      case TAG.Float: return { type: TAG.Float, value: this.readFloat() };
      case TAG.Double: return { type: TAG.Double, value: this.readDouble() };
      case TAG.ByteArray: {
        const len = this.readInt();
        const data = this.buffer.subarray(this.offset, this.offset + len);
        this.offset += len;
        return { type: TAG.ByteArray, value: new Uint8Array(data) };
      }
      case TAG.String: return { type: TAG.String, value: this.readString() };
      case TAG.List: {
        const itemType = this.readUByte();
        const len = this.readInt();
        const list: any[] = [];
        for (let i = 0; i < len; i++) {
          list.push(this.readTag(itemType));
        }
        return { type: TAG.List, itemType, value: list };
      }
      case TAG.Compound: {
        const map: Record<string, any> = {};
        while (this.offset < this.buffer.length) {
          const t = this.readUByte();
          if (t === TAG.End) break;
          const name = this.readString();
          map[name] = this.readTag(t);
        }
        return { type: TAG.Compound, value: map };
      }
      case TAG.IntArray: {
        const len = this.readInt();
        const arr: number[] = [];
        for (let i = 0; i < len; i++) arr.push(this.readInt());
        return { type: TAG.IntArray, value: arr };
      }
      case TAG.LongArray: {
        const len = this.readInt();
        const arr: bigint[] = [];
        for (let i = 0; i < len; i++) arr.push(this.readLong());
        return { type: TAG.LongArray, value: arr };
      }
      default:
        throw new Error('Unknown NBT tag type');
    }
  }

  readRoot(): any {
    const rootType = this.readUByte();
    if (rootType !== TAG.Compound) {
      throw new Error('Expected compound root tag');
    }
    const rootName = this.readString();
    const data = this.readTag(TAG.Compound);
    return { name: rootName, ...data };
  }
}

export class NbtWriter {
  chunks: Uint8Array[] = [];

  writeByte(val: number) {
    const buf = new Uint8Array(1);
    new DataView(buf.buffer).setInt8(0, val);
    this.chunks.push(buf);
  }

  writeUByte(val: number) {
    const buf = new Uint8Array([val & 0xff]);
    this.chunks.push(buf);
  }

  writeShort(val: number) {
    const buf = new Uint8Array(2);
    new DataView(buf.buffer).setInt16(0, val, true);
    this.chunks.push(buf);
  }

  writeInt(val: number) {
    const buf = new Uint8Array(4);
    new DataView(buf.buffer).setInt32(0, val, true);
    this.chunks.push(buf);
  }

  writeLong(val: bigint | number) {
    const buf = new Uint8Array(8);
    const view = new DataView(buf.buffer);
    const big = BigInt(val);
    const low = Number(big & 0xffffffffn);
    const high = Number((big >> 32n) & 0xffffffffn);
    view.setInt32(0, low, true);
    view.setInt32(4, high, true);
    this.chunks.push(buf);
  }

  writeFloat(val: number) {
    const buf = new Uint8Array(4);
    new DataView(buf.buffer).setFloat32(0, val, true);
    this.chunks.push(buf);
  }

  writeDouble(val: number) {
    const buf = new Uint8Array(8);
    new DataView(buf.buffer).setFloat64(0, val, true);
    this.chunks.push(buf);
  }

  writeString(str: string) {
    const encoded = new TextEncoder().encode(str);
    const lenBuf = new Uint8Array(2);
    new DataView(lenBuf.buffer).setUint16(0, encoded.length, true);
    this.chunks.push(lenBuf);
    this.chunks.push(encoded);
  }

  writeTag(tag: any) {
    switch (tag.type) {
      case TAG.Byte: this.writeByte(tag.value); break;
      case TAG.Short: this.writeShort(tag.value); break;
      case TAG.Int: this.writeInt(tag.value); break;
      case TAG.Long: this.writeLong(tag.value); break;
      case TAG.Float: this.writeFloat(tag.value); break;
      case TAG.Double: this.writeDouble(tag.value); break;
      case TAG.ByteArray:
        this.writeInt(tag.value.length);
        this.chunks.push(new Uint8Array(tag.value));
        break;
      case TAG.String: this.writeString(tag.value); break;
      case TAG.List:
        this.writeUByte(tag.itemType);
        this.writeInt(tag.value.length);
        for (const item of tag.value) {
          this.writeTag(item);
        }
        break;
      case TAG.Compound:
        for (const [k, v] of Object.entries<any>(tag.value)) {
          this.writeUByte(v.type);
          this.writeString(k);
          this.writeTag(v);
        }
        this.writeUByte(TAG.End);
        break;
      case TAG.IntArray:
        this.writeInt(tag.value.length);
        for (const v of tag.value) this.writeInt(v);
        break;
      case TAG.LongArray:
        this.writeInt(tag.value.length);
        for (const v of tag.value) this.writeLong(v);
        break;
    }
  }

  writeRoot(root: any): Uint8Array {
    this.writeUByte(TAG.Compound);
    this.writeString(root.name || '');
    this.writeTag(root);
    
    let totalLen = 0;
    for (const c of this.chunks) totalLen += c.length;
    const result = new Uint8Array(totalLen);
    let offset = 0;
    for (const c of this.chunks) {
      result.set(c, offset);
      offset += c.length;
    }
    return result;
  }
}

function parseItem(itemTag: any): ItemSlot | null {
  if (!itemTag || !itemTag.value) return null;
  const val = itemTag.value;
  const name = val.Name?.value || '';
  if (!name || name === 'minecraft:air') return null;

  const count = Number(val.Count?.value ?? 1);
  const slot = Number(val.Slot?.value ?? 0);
  const damage = Number(val.Damage?.value ?? 0);
  const enchantments: { id: number; lvl: number }[] = [];
  let customName = '';

  const extra = val.tag?.value;
  if (extra) {
    const enchList = extra.ench?.value;
    if (Array.isArray(enchList)) {
      for (const e of enchList) {
        const id = Number(e.value?.id?.value ?? 0);
        const lvl = Number(e.value?.lvl?.value ?? 1);
        enchantments.push({ id, lvl });
      }
    }
    const display = extra.display?.value;
    if (display && display.Name?.value) {
      customName = String(display.Name.value);
    }
  }

  return { name, count, slot, damage, enchantments, customName };
}

function dictToNbtItem(item: ItemSlot, slotIndex: number): any {
  const itemCompound: Record<string, any> = {
    Name: { type: TAG.String, value: item.name },
    Count: { type: TAG.Byte, value: Math.max(1, Math.min(127, item.count)) },
    Slot: { type: TAG.Byte, value: slotIndex },
    Damage: { type: TAG.Short, value: item.damage || 0 },
    WasPickedUp: { type: TAG.Byte, value: 0 }
  };

  const extra: Record<string, any> = {};
  if (item.enchantments && item.enchantments.length > 0) {
    extra.ench = {
      type: TAG.List,
      itemType: TAG.Compound,
      value: item.enchantments.map(e => ({
        type: TAG.Compound,
        value: {
          id: { type: TAG.Short, value: e.id },
          lvl: { type: TAG.Short, value: e.lvl }
        }
      }))
    };
  }

  if (item.customName) {
    extra.display = {
      type: TAG.Compound,
      value: {
        Name: { type: TAG.String, value: item.customName }
      }
    };
  }

  if (Object.keys(extra).length > 0) {
    itemCompound.tag = { type: TAG.Compound, value: extra };
  }

  return { type: TAG.Compound, value: itemCompound };
}

function makeEmptyNbtItem(slotIndex: number): any {
  return {
    type: TAG.Compound,
    value: {
      Name: { type: TAG.String, value: '' },
      Count: { type: TAG.Byte, value: 0 },
      Slot: { type: TAG.Byte, value: slotIndex },
      Damage: { type: TAG.Short, value: 0 }
    }
  };
}

export function parseInventoryFromNbt(root: any): InventoryState {
  const result: InventoryState = {
    hotbar: Array(9).fill(null),
    main: Array(27).fill(null),
    armor: Array(4).fill(null),
    offhand: [null]
  };

  const invTag = root.value?.Inventory;
  if (invTag && Array.isArray(invTag.value)) {
    for (const itemTag of invTag.value) {
      const item = parseItem(itemTag);
      if (item) {
        if (item.slot >= 0 && item.slot <= 8) {
          result.hotbar[item.slot] = item;
        } else if (item.slot >= 9 && item.slot <= 35) {
          result.main[item.slot - 9] = item;
        }
      }
    }
  }

  const armorTag = root.value?.Armor;
  if (armorTag && Array.isArray(armorTag.value)) {
    for (let i = 0; i < Math.min(4, armorTag.value.length); i++) {
      const item = parseItem(armorTag.value[i]);
      if (item) {
        item.slot = i;
        result.armor[i] = item;
      }
    }
  }

  const offhandTag = root.value?.Offhand;
  if (offhandTag && Array.isArray(offhandTag.value) && offhandTag.value.length > 0) {
    const item = parseItem(offhandTag.value[0]);
    if (item) {
      item.slot = 0;
      result.offhand[0] = item;
    }
  }

  return result;
}

export async function parseBedrockWorldZip(file: File | Blob, fileName: string): Promise<ParsedWorld> {
  const zip = await JSZip.loadAsync(file);
  const baseName = fileName.replace(/\.(zip|mcworld)$/i, '');

  let playerKeyOffset = -1;
  let logFileName = '';
  let logData: Uint8Array | null = null;

  const searchTarget = new TextEncoder().encode('~local_player');

  const files = Object.keys(zip.files);
  for (const f of files) {
    if (f.includes('db/') && (f.endsWith('.log') || f.endsWith('.ldb'))) {
      const bytes = await zip.files[f].async('uint8array');
      const idx = findSubarray(bytes, searchTarget);
      if (idx !== -1) {
        playerKeyOffset = idx;
        logFileName = f;
        logData = bytes;
        break;
      }
    }
  }

  if (!logData || playerKeyOffset === -1) {
    throw new Error('Could not find local player data in world archive');
  }

  let nbtOffset = -1;
  for (let i = playerKeyOffset + searchTarget.length; i < Math.min(logData.length - 3, playerKeyOffset + searchTarget.length + 100); i++) {
    if (logData[i] === 10 && logData[i + 1] === 0 && logData[i + 2] === 0) {
      nbtOffset = i;
      break;
    }
  }

  if (nbtOffset === -1) {
    throw new Error('Could not parse player NBT header');
  }

  const nbtBytes = logData.subarray(nbtOffset);
  const reader = new NbtReader(nbtBytes);
  const rawRootNbt = reader.readRoot();
  const nbtLength = reader.offset;

  const valLenOffset = playerKeyOffset + searchTarget.length;
  const valLenByteCount = nbtOffset - valLenOffset;
  const recordHeaderOffset = Math.max(0, playerKeyOffset - 7);

  const inventory = parseInventoryFromNbt(rawRootNbt);

  return {
    fileName,
    baseName,
    zip,
    logFileName,
    logData,
    nbtOffset,
    nbtLength,
    valLenOffset,
    valLenByteCount,
    recordHeaderOffset,
    inventory,
    rawRootNbt
  };
}

export async function exportModifiedWorldZip(world: ParsedWorld, updatedInventory: InventoryState): Promise<Blob> {
  const invItems: any[] = [];
  for (let s = 0; s < 9; s++) {
    const it = updatedInventory.hotbar[s];
    if (it && it.name) invItems.push(dictToNbtItem(it, s));
  }
  for (let s = 0; s < 27; s++) {
    const it = updatedInventory.main[s];
    if (it && it.name) invItems.push(dictToNbtItem(it, s + 9));
  }

  world.rawRootNbt.value.Inventory = {
    type: TAG.List,
    itemType: TAG.Compound,
    value: invItems
  };

  const armorItems: any[] = [];
  for (let i = 0; i < 4; i++) {
    const it = updatedInventory.armor[i];
    if (it && it.name) armorItems.push(dictToNbtItem(it, i));
    else armorItems.push(makeEmptyNbtItem(i));
  }
  world.rawRootNbt.value.Armor = {
    type: TAG.List,
    itemType: TAG.Compound,
    value: armorItems
  };

  const offhandIt = updatedInventory.offhand[0];
  world.rawRootNbt.value.Offhand = {
    type: TAG.List,
    itemType: TAG.Compound,
    value: [offhandIt && offhandIt.name ? dictToNbtItem(offhandIt, 0) : makeEmptyNbtItem(0)]
  };

  const writer = new NbtWriter();
  const newNbtBytes = writer.writeRoot(world.rawRootNbt);

  function encodeVarint(val: number): Uint8Array {
    const bytes: number[] = [];
    let num = val;
    while (num >= 0x80) {
      bytes.push((num & 0x7f) | 0x80);
      num >>>= 7;
    }
    bytes.push(num & 0x7f);
    return new Uint8Array(bytes);
  }

  const newVarint = encodeVarint(newNbtBytes.length);

  const before = world.logData.subarray(0, world.valLenOffset);
  const after = world.logData.subarray(world.nbtOffset + world.nbtLength);

  const updatedLog = new Uint8Array(before.length + newVarint.length + newNbtBytes.length + after.length);
  let cur = 0;
  updatedLog.set(before, cur); cur += before.length;
  updatedLog.set(newVarint, cur); cur += newVarint.length;
  updatedLog.set(newNbtBytes, cur); cur += newNbtBytes.length;
  updatedLog.set(after, cur);

  world.zip.file(world.logFileName, updatedLog);

  return await world.zip.generateAsync({ type: 'blob', mimeType: 'application/zip', compression: 'DEFLATE' });
}

function findSubarray(haystack: Uint8Array, needle: Uint8Array): number {
  outer: for (let i = 0; i <= haystack.length - needle.length; i++) {
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) continue outer;
    }
    return i;
  }
  return -1;
}
