export interface MinecraftItem {
  id: string;
  name: string;
  category: string;
  maxStack: number;
  enchantable: boolean;
  emoji: string;
}

export interface MinecraftEnchantment {
  id: number;
  identifier: string;
  name: string;
  maxLevel: number;
  applicableTo: string[];
}

export const MINECRAFT_ITEMS: MinecraftItem[] = [
  {
    "id": "minecraft:diamond_sword",
    "name": "Diamond Sword",
    "category": "weapons",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u2694\ufe0f"
  },
  {
    "id": "minecraft:netherite_sword",
    "name": "Netherite Sword",
    "category": "weapons",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u2694\ufe0f"
  },
  {
    "id": "minecraft:iron_sword",
    "name": "Iron Sword",
    "category": "weapons",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u2694\ufe0f"
  },
  {
    "id": "minecraft:golden_sword",
    "name": "Golden Sword",
    "category": "weapons",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u2694\ufe0f"
  },
  {
    "id": "minecraft:stone_sword",
    "name": "Stone Sword",
    "category": "weapons",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u2694\ufe0f"
  },
  {
    "id": "minecraft:wooden_sword",
    "name": "Wooden Sword",
    "category": "weapons",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u2694\ufe0f"
  },
  {
    "id": "minecraft:bow",
    "name": "Bow",
    "category": "weapons",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83c\udff9"
  },
  {
    "id": "minecraft:crossbow",
    "name": "Crossbow",
    "category": "weapons",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83c\udff9"
  },
  {
    "id": "minecraft:trident",
    "name": "Trident",
    "category": "weapons",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udd31"
  },
  {
    "id": "minecraft:mace",
    "name": "Mace",
    "category": "weapons",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udd28"
  },
  {
    "id": "minecraft:diamond_pickaxe",
    "name": "Diamond Pickaxe",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u26cf\ufe0f"
  },
  {
    "id": "minecraft:netherite_pickaxe",
    "name": "Netherite Pickaxe",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u26cf\ufe0f"
  },
  {
    "id": "minecraft:iron_pickaxe",
    "name": "Iron Pickaxe",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u26cf\ufe0f"
  },
  {
    "id": "minecraft:golden_pickaxe",
    "name": "Golden Pickaxe",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u26cf\ufe0f"
  },
  {
    "id": "minecraft:stone_pickaxe",
    "name": "Stone Pickaxe",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u26cf\ufe0f"
  },
  {
    "id": "minecraft:wooden_pickaxe",
    "name": "Wooden Pickaxe",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u26cf\ufe0f"
  },
  {
    "id": "minecraft:diamond_axe",
    "name": "Diamond Axe",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83e\ude93"
  },
  {
    "id": "minecraft:netherite_axe",
    "name": "Netherite Axe",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83e\ude93"
  },
  {
    "id": "minecraft:iron_axe",
    "name": "Iron Axe",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83e\ude93"
  },
  {
    "id": "minecraft:golden_axe",
    "name": "Golden Axe",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83e\ude93"
  },
  {
    "id": "minecraft:stone_axe",
    "name": "Stone Axe",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83e\ude93"
  },
  {
    "id": "minecraft:wooden_axe",
    "name": "Wooden Axe",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83e\ude93"
  },
  {
    "id": "minecraft:diamond_shovel",
    "name": "Diamond Shovel",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83e\ude8f"
  },
  {
    "id": "minecraft:netherite_shovel",
    "name": "Netherite Shovel",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83e\ude8f"
  },
  {
    "id": "minecraft:iron_shovel",
    "name": "Iron Shovel",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83e\ude8f"
  },
  {
    "id": "minecraft:golden_shovel",
    "name": "Golden Shovel",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83e\ude8f"
  },
  {
    "id": "minecraft:stone_shovel",
    "name": "Stone Shovel",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83e\ude8f"
  },
  {
    "id": "minecraft:wooden_shovel",
    "name": "Wooden Shovel",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83e\ude8f"
  },
  {
    "id": "minecraft:diamond_hoe",
    "name": "Diamond Hoe",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83c\udf3e"
  },
  {
    "id": "minecraft:netherite_hoe",
    "name": "Netherite Hoe",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83c\udf3e"
  },
  {
    "id": "minecraft:iron_hoe",
    "name": "Iron Hoe",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83c\udf3e"
  },
  {
    "id": "minecraft:golden_hoe",
    "name": "Golden Hoe",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83c\udf3e"
  },
  {
    "id": "minecraft:stone_hoe",
    "name": "Stone Hoe",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83c\udf3e"
  },
  {
    "id": "minecraft:wooden_hoe",
    "name": "Wooden Hoe",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83c\udf3e"
  },
  {
    "id": "minecraft:fishing_rod",
    "name": "Fishing Rod",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83c\udfa3"
  },
  {
    "id": "minecraft:flint_and_steel",
    "name": "Flint and Steel",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udd25"
  },
  {
    "id": "minecraft:shears",
    "name": "Shears",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u2702\ufe0f"
  },
  {
    "id": "minecraft:shield",
    "name": "Shield",
    "category": "tools",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udee1\ufe0f"
  },
  {
    "id": "minecraft:spyglass",
    "name": "Spyglass",
    "category": "tools",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83d\udd2d"
  },
  {
    "id": "minecraft:compass",
    "name": "Compass",
    "category": "tools",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udded"
  },
  {
    "id": "minecraft:recovery_compass",
    "name": "Recovery Compass",
    "category": "tools",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udded"
  },
  {
    "id": "minecraft:clock",
    "name": "Clock",
    "category": "tools",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd50"
  },
  {
    "id": "minecraft:lead",
    "name": "Lead",
    "category": "tools",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udea2"
  },
  {
    "id": "minecraft:name_tag",
    "name": "Name Tag",
    "category": "tools",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udff7\ufe0f"
  },
  {
    "id": "minecraft:diamond_helmet",
    "name": "Diamond Helmet",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u26d1\ufe0f"
  },
  {
    "id": "minecraft:netherite_helmet",
    "name": "Netherite Helmet",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u26d1\ufe0f"
  },
  {
    "id": "minecraft:iron_helmet",
    "name": "Iron Helmet",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u26d1\ufe0f"
  },
  {
    "id": "minecraft:golden_helmet",
    "name": "Golden Helmet",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u26d1\ufe0f"
  },
  {
    "id": "minecraft:chainmail_helmet",
    "name": "Chainmail Helmet",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u26d1\ufe0f"
  },
  {
    "id": "minecraft:leather_helmet",
    "name": "Leather Helmet",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\u26d1\ufe0f"
  },
  {
    "id": "minecraft:turtle_helmet",
    "name": "Turtle Shell",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc22"
  },
  {
    "id": "minecraft:diamond_chestplate",
    "name": "Diamond Chestplate",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc55"
  },
  {
    "id": "minecraft:netherite_chestplate",
    "name": "Netherite Chestplate",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc55"
  },
  {
    "id": "minecraft:iron_chestplate",
    "name": "Iron Chestplate",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc55"
  },
  {
    "id": "minecraft:golden_chestplate",
    "name": "Golden Chestplate",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc55"
  },
  {
    "id": "minecraft:chainmail_chestplate",
    "name": "Chainmail Chestplate",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc55"
  },
  {
    "id": "minecraft:leather_chestplate",
    "name": "Leather Tunic",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc55"
  },
  {
    "id": "minecraft:elytra",
    "name": "Elytra",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83e\udebd"
  },
  {
    "id": "minecraft:diamond_leggings",
    "name": "Diamond Leggings",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc56"
  },
  {
    "id": "minecraft:netherite_leggings",
    "name": "Netherite Leggings",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc56"
  },
  {
    "id": "minecraft:iron_leggings",
    "name": "Iron Leggings",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc56"
  },
  {
    "id": "minecraft:golden_leggings",
    "name": "Golden Leggings",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc56"
  },
  {
    "id": "minecraft:chainmail_leggings",
    "name": "Chainmail Leggings",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc56"
  },
  {
    "id": "minecraft:leather_leggings",
    "name": "Leather Pants",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc56"
  },
  {
    "id": "minecraft:diamond_boots",
    "name": "Diamond Boots",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc62"
  },
  {
    "id": "minecraft:netherite_boots",
    "name": "Netherite Boots",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc62"
  },
  {
    "id": "minecraft:iron_boots",
    "name": "Iron Boots",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc62"
  },
  {
    "id": "minecraft:golden_boots",
    "name": "Golden Boots",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc62"
  },
  {
    "id": "minecraft:chainmail_boots",
    "name": "Chainmail Boots",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc62"
  },
  {
    "id": "minecraft:leather_boots",
    "name": "Leather Boots",
    "category": "armor",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udc62"
  },
  {
    "id": "minecraft:apple",
    "name": "Apple",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf4e"
  },
  {
    "id": "minecraft:golden_apple",
    "name": "Golden Apple",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf4f"
  },
  {
    "id": "minecraft:enchanted_golden_apple",
    "name": "Enchanted Golden Apple",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2728"
  },
  {
    "id": "minecraft:bread",
    "name": "Bread",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf5e"
  },
  {
    "id": "minecraft:cooked_beef",
    "name": "Steak",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udd69"
  },
  {
    "id": "minecraft:beef",
    "name": "Raw Beef",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udd69"
  },
  {
    "id": "minecraft:cooked_porkchop",
    "name": "Cooked Porkchop",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf56"
  },
  {
    "id": "minecraft:porkchop",
    "name": "Raw Porkchop",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf56"
  },
  {
    "id": "minecraft:cooked_chicken",
    "name": "Cooked Chicken",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf57"
  },
  {
    "id": "minecraft:chicken",
    "name": "Raw Chicken",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf57"
  },
  {
    "id": "minecraft:cooked_mutton",
    "name": "Cooked Mutton",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf56"
  },
  {
    "id": "minecraft:mutton",
    "name": "Raw Mutton",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf56"
  },
  {
    "id": "minecraft:cooked_cod",
    "name": "Cooked Cod",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc1f"
  },
  {
    "id": "minecraft:cod",
    "name": "Raw Cod",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc1f"
  },
  {
    "id": "minecraft:cooked_salmon",
    "name": "Cooked Salmon",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc20"
  },
  {
    "id": "minecraft:salmon",
    "name": "Raw Salmon",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc20"
  },
  {
    "id": "minecraft:cooked_rabbit",
    "name": "Cooked Rabbit",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc30"
  },
  {
    "id": "minecraft:rabbit",
    "name": "Raw Rabbit",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc30"
  },
  {
    "id": "minecraft:carrot",
    "name": "Carrot",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udd55"
  },
  {
    "id": "minecraft:golden_carrot",
    "name": "Golden Carrot",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udd55"
  },
  {
    "id": "minecraft:potato",
    "name": "Potato",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udd54"
  },
  {
    "id": "minecraft:baked_potato",
    "name": "Baked Potato",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udd54"
  },
  {
    "id": "minecraft:melon_slice",
    "name": "Melon Slice",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf48"
  },
  {
    "id": "minecraft:sweet_berries",
    "name": "Sweet Berries",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\uded0"
  },
  {
    "id": "minecraft:glow_berries",
    "name": "Glow Berries",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2728"
  },
  {
    "id": "minecraft:beetroot",
    "name": "Beetroot",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udd6c"
  },
  {
    "id": "minecraft:mushroom_stew",
    "name": "Mushroom Stew",
    "category": "food",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83c\udf72"
  },
  {
    "id": "minecraft:rabbit_stew",
    "name": "Rabbit Stew",
    "category": "food",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83c\udf72"
  },
  {
    "id": "minecraft:beetroot_soup",
    "name": "Beetroot Soup",
    "category": "food",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83c\udf72"
  },
  {
    "id": "minecraft:suspicious_stew",
    "name": "Suspicious Stew",
    "category": "food",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83c\udf72"
  },
  {
    "id": "minecraft:pumpkin_pie",
    "name": "Pumpkin Pie",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udd67"
  },
  {
    "id": "minecraft:cookie",
    "name": "Cookie",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf6a"
  },
  {
    "id": "minecraft:cake",
    "name": "Cake",
    "category": "food",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83c\udf82"
  },
  {
    "id": "minecraft:dried_kelp",
    "name": "Dried Kelp",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf3f"
  },
  {
    "id": "minecraft:spider_eye",
    "name": "Spider Eye",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc41\ufe0f"
  },
  {
    "id": "minecraft:rotten_flesh",
    "name": "Rotten Flesh",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udddf"
  },
  {
    "id": "minecraft:poisonous_potato",
    "name": "Poisonous Potato",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udd54"
  },
  {
    "id": "minecraft:chorus_fruit",
    "name": "Chorus Fruit",
    "category": "food",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe3"
  },
  {
    "id": "minecraft:honey_bottle",
    "name": "Honey Bottle",
    "category": "food",
    "maxStack": 16,
    "enchantable": false,
    "emoji": "\ud83c\udf6f"
  },
  {
    "id": "minecraft:diamond",
    "name": "Diamond",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc8e"
  },
  {
    "id": "minecraft:emerald",
    "name": "Emerald",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc9a"
  },
  {
    "id": "minecraft:gold_ingot",
    "name": "Gold Ingot",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udd47"
  },
  {
    "id": "minecraft:iron_ingot",
    "name": "Iron Ingot",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\ude99"
  },
  {
    "id": "minecraft:copper_ingot",
    "name": "Copper Ingot",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\ude99"
  },
  {
    "id": "minecraft:netherite_ingot",
    "name": "Netherite Ingot",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b1b"
  },
  {
    "id": "minecraft:netherite_scrap",
    "name": "Netherite Scrap",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b1b"
  },
  {
    "id": "minecraft:ancient_debris",
    "name": "Ancient Debris",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfeb"
  },
  {
    "id": "minecraft:coal",
    "name": "Coal",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u26ab"
  },
  {
    "id": "minecraft:charcoal",
    "name": "Charcoal",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u26ab"
  },
  {
    "id": "minecraft:raw_iron",
    "name": "Raw Iron",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udea8"
  },
  {
    "id": "minecraft:raw_gold",
    "name": "Raw Gold",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udea8"
  },
  {
    "id": "minecraft:raw_copper",
    "name": "Raw Copper",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udea8"
  },
  {
    "id": "minecraft:lapis_lazuli",
    "name": "Lapis Lazuli",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd35"
  },
  {
    "id": "minecraft:redstone",
    "name": "Redstone Dust",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd34"
  },
  {
    "id": "minecraft:quartz",
    "name": "Nether Quartz",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u25fb\ufe0f"
  },
  {
    "id": "minecraft:amethyst_shard",
    "name": "Amethyst Shard",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe3"
  },
  {
    "id": "minecraft:flint",
    "name": "Flint",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udea8"
  },
  {
    "id": "minecraft:stick",
    "name": "Stick",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udeb5"
  },
  {
    "id": "minecraft:string",
    "name": "String",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\uddf5"
  },
  {
    "id": "minecraft:feather",
    "name": "Feather",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udeb6"
  },
  {
    "id": "minecraft:leather",
    "name": "Leather",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe4"
  },
  {
    "id": "minecraft:bone",
    "name": "Bone",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\uddb4"
  },
  {
    "id": "minecraft:bone_meal",
    "name": "Bone Meal",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\uddb4"
  },
  {
    "id": "minecraft:gunpowder",
    "name": "Gunpowder",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udca5"
  },
  {
    "id": "minecraft:blaze_rod",
    "name": "Blaze Rod",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd25"
  },
  {
    "id": "minecraft:blaze_powder",
    "name": "Blaze Powder",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd25"
  },
  {
    "id": "minecraft:ghast_tear",
    "name": "Ghast Tear",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udca7"
  },
  {
    "id": "minecraft:ender_pearl",
    "name": "Ender Pearl",
    "category": "materials",
    "maxStack": 16,
    "enchantable": false,
    "emoji": "\ud83d\udfe2"
  },
  {
    "id": "minecraft:ender_eye",
    "name": "Eye of Ender",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc41\ufe0f"
  },
  {
    "id": "minecraft:nether_star",
    "name": "Nether Star",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b50"
  },
  {
    "id": "minecraft:prismarine_shard",
    "name": "Prismarine Shard",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd37"
  },
  {
    "id": "minecraft:prismarine_crystals",
    "name": "Prismarine Crystals",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd37"
  },
  {
    "id": "minecraft:phantom_membrane",
    "name": "Phantom Membrane",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udd87"
  },
  {
    "id": "minecraft:nautilus_shell",
    "name": "Nautilus Shell",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc1a"
  },
  {
    "id": "minecraft:heart_of_the_sea",
    "name": "Heart of the Sea",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc99"
  },
  {
    "id": "minecraft:echo_shard",
    "name": "Echo Shard",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd0a"
  },
  {
    "id": "minecraft:disc_fragment_5",
    "name": "Disc Fragment",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udcbf"
  },
  {
    "id": "minecraft:gold_nugget",
    "name": "Gold Nugget",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udd47"
  },
  {
    "id": "minecraft:iron_nugget",
    "name": "Iron Nugget",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\ude99"
  },
  {
    "id": "minecraft:slime_ball",
    "name": "Slimeball",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe2"
  },
  {
    "id": "minecraft:honeycomb",
    "name": "Honeycomb",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf6f"
  },
  {
    "id": "minecraft:ink_sac",
    "name": "Ink Sac",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u26ab"
  },
  {
    "id": "minecraft:glow_ink_sac",
    "name": "Glow Ink Sac",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2728"
  },
  {
    "id": "minecraft:experience_bottle",
    "name": "Bottle o' Enchanting",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\uddea"
  },
  {
    "id": "minecraft:breeze_rod",
    "name": "Breeze Rod",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf2c\ufe0f"
  },
  {
    "id": "minecraft:trial_key",
    "name": "Trial Key",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udddd\ufe0f"
  },
  {
    "id": "minecraft:ominous_trial_key",
    "name": "Ominous Trial Key",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udddd\ufe0f"
  },
  {
    "id": "minecraft:arrow",
    "name": "Arrow",
    "category": "combat",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u27a1\ufe0f"
  },
  {
    "id": "minecraft:spectral_arrow",
    "name": "Spectral Arrow",
    "category": "combat",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2728"
  },
  {
    "id": "minecraft:tipped_arrow",
    "name": "Tipped Arrow",
    "category": "combat",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u27a1\ufe0f"
  },
  {
    "id": "minecraft:firework_rocket",
    "name": "Firework Rocket",
    "category": "combat",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf86"
  },
  {
    "id": "minecraft:totem_of_undying",
    "name": "Totem of Undying",
    "category": "combat",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83d\uddff"
  },
  {
    "id": "minecraft:wind_charge",
    "name": "Wind Charge",
    "category": "combat",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf2c\ufe0f"
  },
  {
    "id": "minecraft:potion",
    "name": "Potion",
    "category": "potions",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83e\uddea"
  },
  {
    "id": "minecraft:splash_potion",
    "name": "Splash Potion",
    "category": "potions",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83e\uddea"
  },
  {
    "id": "minecraft:lingering_potion",
    "name": "Lingering Potion",
    "category": "potions",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83e\uddea"
  },
  {
    "id": "minecraft:glass_bottle",
    "name": "Glass Bottle",
    "category": "potions",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf76"
  },
  {
    "id": "minecraft:dragon_breath",
    "name": "Dragon's Breath",
    "category": "potions",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc32"
  },
  {
    "id": "minecraft:brewing_stand",
    "name": "Brewing Stand",
    "category": "potions",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2697\ufe0f"
  },
  {
    "id": "minecraft:cauldron",
    "name": "Cauldron",
    "category": "potions",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udea3"
  },
  {
    "id": "minecraft:nether_wart",
    "name": "Nether Wart",
    "category": "potions",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf3f"
  },
  {
    "id": "minecraft:fermented_spider_eye",
    "name": "Fermented Spider Eye",
    "category": "potions",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc41\ufe0f"
  },
  {
    "id": "minecraft:magma_cream",
    "name": "Magma Cream",
    "category": "potions",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe0"
  },
  {
    "id": "minecraft:glistering_melon_slice",
    "name": "Glistering Melon Slice",
    "category": "potions",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf48"
  },
  {
    "id": "minecraft:rabbit_foot",
    "name": "Rabbit's Foot",
    "category": "potions",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc30"
  },
  {
    "id": "minecraft:sugar",
    "name": "Sugar",
    "category": "potions",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf6c"
  },
  {
    "id": "minecraft:bucket",
    "name": "Bucket",
    "category": "tools",
    "maxStack": 16,
    "enchantable": false,
    "emoji": "\ud83e\udea3"
  },
  {
    "id": "minecraft:water_bucket",
    "name": "Water Bucket",
    "category": "tools",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83e\udea3"
  },
  {
    "id": "minecraft:lava_bucket",
    "name": "Lava Bucket",
    "category": "tools",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83e\udea3"
  },
  {
    "id": "minecraft:powder_snow_bucket",
    "name": "Powder Snow Bucket",
    "category": "tools",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83e\udea3"
  },
  {
    "id": "minecraft:milk_bucket",
    "name": "Milk Bucket",
    "category": "food",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83e\udd5b"
  },
  {
    "id": "minecraft:torch",
    "name": "Torch",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd26"
  },
  {
    "id": "minecraft:soul_torch",
    "name": "Soul Torch",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd26"
  },
  {
    "id": "minecraft:lantern",
    "name": "Lantern",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udfee"
  },
  {
    "id": "minecraft:soul_lantern",
    "name": "Soul Lantern",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udfee"
  },
  {
    "id": "minecraft:crafting_table",
    "name": "Crafting Table",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd27"
  },
  {
    "id": "minecraft:furnace",
    "name": "Furnace",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd25"
  },
  {
    "id": "minecraft:blast_furnace",
    "name": "Blast Furnace",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd25"
  },
  {
    "id": "minecraft:smoker",
    "name": "Smoker",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd25"
  },
  {
    "id": "minecraft:enchanting_table",
    "name": "Enchanting Table",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udcd6"
  },
  {
    "id": "minecraft:anvil",
    "name": "Anvil",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd29"
  },
  {
    "id": "minecraft:chest",
    "name": "Chest",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udce6"
  },
  {
    "id": "minecraft:ender_chest",
    "name": "Ender Chest",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udce6"
  },
  {
    "id": "minecraft:shulker_box",
    "name": "Shulker Box",
    "category": "blocks",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83d\udce6"
  },
  {
    "id": "minecraft:barrel",
    "name": "Barrel",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udee2\ufe0f"
  },
  {
    "id": "minecraft:hopper",
    "name": "Hopper",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b07\ufe0f"
  },
  {
    "id": "minecraft:dropper",
    "name": "Dropper",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b07\ufe0f"
  },
  {
    "id": "minecraft:dispenser",
    "name": "Dispenser",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u27a1\ufe0f"
  },
  {
    "id": "minecraft:observer",
    "name": "Observer",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc40"
  },
  {
    "id": "minecraft:piston",
    "name": "Piston",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b06\ufe0f"
  },
  {
    "id": "minecraft:sticky_piston",
    "name": "Sticky Piston",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b06\ufe0f"
  },
  {
    "id": "minecraft:tnt",
    "name": "TNT",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udde8"
  },
  {
    "id": "minecraft:redstone_block",
    "name": "Redstone Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe5"
  },
  {
    "id": "minecraft:diamond_block",
    "name": "Diamond Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc8e"
  },
  {
    "id": "minecraft:gold_block",
    "name": "Gold Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe8"
  },
  {
    "id": "minecraft:iron_block",
    "name": "Iron Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b1c"
  },
  {
    "id": "minecraft:emerald_block",
    "name": "Emerald Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc9a"
  },
  {
    "id": "minecraft:netherite_block",
    "name": "Netherite Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b1b"
  },
  {
    "id": "minecraft:lapis_block",
    "name": "Lapis Lazuli Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd35"
  },
  {
    "id": "minecraft:copper_block",
    "name": "Copper Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe7"
  },
  {
    "id": "minecraft:coal_block",
    "name": "Coal Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b1b"
  },
  {
    "id": "minecraft:stone",
    "name": "Stone",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udea8"
  },
  {
    "id": "minecraft:cobblestone",
    "name": "Cobblestone",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udea8"
  },
  {
    "id": "minecraft:deepslate",
    "name": "Deepslate",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udea8"
  },
  {
    "id": "minecraft:cobbled_deepslate",
    "name": "Cobbled Deepslate",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udea8"
  },
  {
    "id": "minecraft:granite",
    "name": "Granite",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udea8"
  },
  {
    "id": "minecraft:diorite",
    "name": "Diorite",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udea8"
  },
  {
    "id": "minecraft:andesite",
    "name": "Andesite",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udea8"
  },
  {
    "id": "minecraft:tuff",
    "name": "Tuff",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udea8"
  },
  {
    "id": "minecraft:calcite",
    "name": "Calcite",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b1c"
  },
  {
    "id": "minecraft:sandstone",
    "name": "Sandstone",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe8"
  },
  {
    "id": "minecraft:red_sandstone",
    "name": "Red Sandstone",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe7"
  },
  {
    "id": "minecraft:dirt",
    "name": "Dirt",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfeb"
  },
  {
    "id": "minecraft:grass_block",
    "name": "Grass Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe9"
  },
  {
    "id": "minecraft:sand",
    "name": "Sand",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe8"
  },
  {
    "id": "minecraft:gravel",
    "name": "Gravel",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b1c"
  },
  {
    "id": "minecraft:clay_ball",
    "name": "Clay Ball",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe4"
  },
  {
    "id": "minecraft:brick",
    "name": "Brick",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\uddf1"
  },
  {
    "id": "minecraft:glass",
    "name": "Glass",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\ude9f"
  },
  {
    "id": "minecraft:glass_pane",
    "name": "Glass Pane",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\ude9f"
  },
  {
    "id": "minecraft:oak_log",
    "name": "Oak Log",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udeb5"
  },
  {
    "id": "minecraft:spruce_log",
    "name": "Spruce Log",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udeb5"
  },
  {
    "id": "minecraft:birch_log",
    "name": "Birch Log",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udeb5"
  },
  {
    "id": "minecraft:jungle_log",
    "name": "Jungle Log",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udeb5"
  },
  {
    "id": "minecraft:acacia_log",
    "name": "Acacia Log",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udeb5"
  },
  {
    "id": "minecraft:dark_oak_log",
    "name": "Dark Oak Log",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udeb5"
  },
  {
    "id": "minecraft:mangrove_log",
    "name": "Mangrove Log",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udeb5"
  },
  {
    "id": "minecraft:cherry_log",
    "name": "Cherry Log",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udeb5"
  },
  {
    "id": "minecraft:crimson_stem",
    "name": "Crimson Stem",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udeb5"
  },
  {
    "id": "minecraft:warped_stem",
    "name": "Warped Stem",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udeb5"
  },
  {
    "id": "minecraft:oak_planks",
    "name": "Oak Planks",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfeb"
  },
  {
    "id": "minecraft:spruce_planks",
    "name": "Spruce Planks",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfeb"
  },
  {
    "id": "minecraft:birch_planks",
    "name": "Birch Planks",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfeb"
  },
  {
    "id": "minecraft:jungle_planks",
    "name": "Jungle Planks",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfeb"
  },
  {
    "id": "minecraft:acacia_planks",
    "name": "Acacia Planks",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfeb"
  },
  {
    "id": "minecraft:dark_oak_planks",
    "name": "Dark Oak Planks",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfeb"
  },
  {
    "id": "minecraft:mangrove_planks",
    "name": "Mangrove Planks",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfeb"
  },
  {
    "id": "minecraft:cherry_planks",
    "name": "Cherry Planks",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfeb"
  },
  {
    "id": "minecraft:bamboo_planks",
    "name": "Bamboo Planks",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfeb"
  },
  {
    "id": "minecraft:crimson_planks",
    "name": "Crimson Planks",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfeb"
  },
  {
    "id": "minecraft:warped_planks",
    "name": "Warped Planks",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfeb"
  },
  {
    "id": "minecraft:obsidian",
    "name": "Obsidian",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b1b"
  },
  {
    "id": "minecraft:crying_obsidian",
    "name": "Crying Obsidian",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc9c"
  },
  {
    "id": "minecraft:netherrack",
    "name": "Netherrack",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe5"
  },
  {
    "id": "minecraft:soul_sand",
    "name": "Soul Sand",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe4"
  },
  {
    "id": "minecraft:soul_soil",
    "name": "Soul Soil",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe4"
  },
  {
    "id": "minecraft:glowstone",
    "name": "Glowstone",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe1"
  },
  {
    "id": "minecraft:sea_lantern",
    "name": "Sea Lantern",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd35"
  },
  {
    "id": "minecraft:end_stone",
    "name": "End Stone",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe8"
  },
  {
    "id": "minecraft:purpur_block",
    "name": "Purpur Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe3"
  },
  {
    "id": "minecraft:sponge",
    "name": "Sponge",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe1"
  },
  {
    "id": "minecraft:bookshelf",
    "name": "Bookshelf",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udcda"
  },
  {
    "id": "minecraft:chiseled_bookshelf",
    "name": "Chiseled Bookshelf",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udcda"
  },
  {
    "id": "minecraft:moss_block",
    "name": "Moss Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe9"
  },
  {
    "id": "minecraft:mud",
    "name": "Mud",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfeb"
  },
  {
    "id": "minecraft:packed_mud",
    "name": "Packed Mud",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfeb"
  },
  {
    "id": "minecraft:mud_bricks",
    "name": "Mud Bricks",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\uddf1"
  },
  {
    "id": "minecraft:sculk",
    "name": "Sculk",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf11"
  },
  {
    "id": "minecraft:sculk_sensor",
    "name": "Sculk Sensor",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf11"
  },
  {
    "id": "minecraft:sculk_catalyst",
    "name": "Sculk Catalyst",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf11"
  },
  {
    "id": "minecraft:sculk_shrieker",
    "name": "Sculk Shrieker",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf11"
  },
  {
    "id": "minecraft:amethyst_block",
    "name": "Amethyst Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe3"
  },
  {
    "id": "minecraft:copper_ore",
    "name": "Copper Ore",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe7"
  },
  {
    "id": "minecraft:iron_ore",
    "name": "Iron Ore",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udea8"
  },
  {
    "id": "minecraft:gold_ore",
    "name": "Gold Ore",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe8"
  },
  {
    "id": "minecraft:diamond_ore",
    "name": "Diamond Ore",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc8e"
  },
  {
    "id": "minecraft:emerald_ore",
    "name": "Emerald Ore",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc9a"
  },
  {
    "id": "minecraft:lapis_ore",
    "name": "Lapis Lazuli Ore",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd35"
  },
  {
    "id": "minecraft:redstone_ore",
    "name": "Redstone Ore",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd34"
  },
  {
    "id": "minecraft:coal_ore",
    "name": "Coal Ore",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u26ab"
  },
  {
    "id": "minecraft:nether_gold_ore",
    "name": "Nether Gold Ore",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe8"
  },
  {
    "id": "minecraft:nether_quartz_ore",
    "name": "Nether Quartz Ore",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u25fb\ufe0f"
  },
  {
    "id": "minecraft:rail",
    "name": "Rail",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udee4\ufe0f"
  },
  {
    "id": "minecraft:powered_rail",
    "name": "Powered Rail",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udee4\ufe0f"
  },
  {
    "id": "minecraft:detector_rail",
    "name": "Detector Rail",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udee4\ufe0f"
  },
  {
    "id": "minecraft:activator_rail",
    "name": "Activator Rail",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udee4\ufe0f"
  },
  {
    "id": "minecraft:minecart",
    "name": "Minecart",
    "category": "tools",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83d\ude83"
  },
  {
    "id": "minecraft:chest_minecart",
    "name": "Chest Minecart",
    "category": "tools",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83d\ude83"
  },
  {
    "id": "minecraft:hopper_minecart",
    "name": "Hopper Minecart",
    "category": "tools",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83d\ude83"
  },
  {
    "id": "minecraft:tnt_minecart",
    "name": "TNT Minecart",
    "category": "tools",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83d\ude83"
  },
  {
    "id": "minecraft:oak_boat",
    "name": "Oak Boat",
    "category": "tools",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83d\udea3"
  },
  {
    "id": "minecraft:spruce_boat",
    "name": "Spruce Boat",
    "category": "tools",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83d\udea3"
  },
  {
    "id": "minecraft:birch_boat",
    "name": "Birch Boat",
    "category": "tools",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83d\udea3"
  },
  {
    "id": "minecraft:saddle",
    "name": "Saddle",
    "category": "tools",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83d\udc34"
  },
  {
    "id": "minecraft:redstone_torch",
    "name": "Redstone Torch",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd34"
  },
  {
    "id": "minecraft:repeater",
    "name": "Redstone Repeater",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd34"
  },
  {
    "id": "minecraft:comparator",
    "name": "Redstone Comparator",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd34"
  },
  {
    "id": "minecraft:lever",
    "name": "Lever",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd27"
  },
  {
    "id": "minecraft:stone_button",
    "name": "Stone Button",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd18"
  },
  {
    "id": "minecraft:oak_door",
    "name": "Oak Door",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udeaa"
  },
  {
    "id": "minecraft:iron_door",
    "name": "Iron Door",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udeaa"
  },
  {
    "id": "minecraft:oak_trapdoor",
    "name": "Oak Trapdoor",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udeaa"
  },
  {
    "id": "minecraft:iron_trapdoor",
    "name": "Iron Trapdoor",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udeaa"
  },
  {
    "id": "minecraft:oak_fence",
    "name": "Oak Fence",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udfd7\ufe0f"
  },
  {
    "id": "minecraft:oak_fence_gate",
    "name": "Oak Fence Gate",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udfd7\ufe0f"
  },
  {
    "id": "minecraft:oak_stairs",
    "name": "Oak Stairs",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udcd0"
  },
  {
    "id": "minecraft:stone_stairs",
    "name": "Stone Stairs",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udcd0"
  },
  {
    "id": "minecraft:cobblestone_stairs",
    "name": "Cobblestone Stairs",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udcd0"
  },
  {
    "id": "minecraft:ladder",
    "name": "Ladder",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\ude9c"
  },
  {
    "id": "minecraft:scaffolding",
    "name": "Scaffolding",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udfd7\ufe0f"
  },
  {
    "id": "minecraft:oak_sign",
    "name": "Oak Sign",
    "category": "blocks",
    "maxStack": 16,
    "enchantable": false,
    "emoji": "\ud83e\udea7"
  },
  {
    "id": "minecraft:painting",
    "name": "Painting",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\uddbc\ufe0f"
  },
  {
    "id": "minecraft:item_frame",
    "name": "Item Frame",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\uddbc\ufe0f"
  },
  {
    "id": "minecraft:glow_item_frame",
    "name": "Glow Item Frame",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2728"
  },
  {
    "id": "minecraft:flower_pot",
    "name": "Flower Pot",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udeb4"
  },
  {
    "id": "minecraft:armor_stand",
    "name": "Armor Stand",
    "category": "blocks",
    "maxStack": 16,
    "enchantable": false,
    "emoji": "\ud83d\uddff"
  },
  {
    "id": "minecraft:bed",
    "name": "Bed",
    "category": "blocks",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83d\udecf\ufe0f"
  },
  {
    "id": "minecraft:respawn_anchor",
    "name": "Respawn Anchor",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2693"
  },
  {
    "id": "minecraft:conduit",
    "name": "Conduit",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd2e"
  },
  {
    "id": "minecraft:bell",
    "name": "Bell",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd14"
  },
  {
    "id": "minecraft:beacon",
    "name": "Beacon",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd26"
  },
  {
    "id": "minecraft:lodestone",
    "name": "Lodestone",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\uddf2"
  },
  {
    "id": "minecraft:lightning_rod",
    "name": "Lightning Rod",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u26a1"
  },
  {
    "id": "minecraft:daylight_detector",
    "name": "Daylight Detector",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2600\ufe0f"
  },
  {
    "id": "minecraft:jukebox",
    "name": "Jukebox",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udfb5"
  },
  {
    "id": "minecraft:note_block",
    "name": "Note Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udfb6"
  },
  {
    "id": "minecraft:tripwire_hook",
    "name": "Tripwire Hook",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\ude9d"
  },
  {
    "id": "minecraft:target",
    "name": "Target",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udfaf"
  },
  {
    "id": "minecraft:decorated_pot",
    "name": "Decorated Pot",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udffa"
  },
  {
    "id": "minecraft:hay_block",
    "name": "Hay Bale",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf3e"
  },
  {
    "id": "minecraft:wheat",
    "name": "Wheat",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf3e"
  },
  {
    "id": "minecraft:wheat_seeds",
    "name": "Wheat Seeds",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf31"
  },
  {
    "id": "minecraft:beetroot_seeds",
    "name": "Beetroot Seeds",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf31"
  },
  {
    "id": "minecraft:melon_seeds",
    "name": "Melon Seeds",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf31"
  },
  {
    "id": "minecraft:pumpkin_seeds",
    "name": "Pumpkin Seeds",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf31"
  },
  {
    "id": "minecraft:cocoa_beans",
    "name": "Cocoa Beans",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe4"
  },
  {
    "id": "minecraft:bamboo",
    "name": "Bamboo",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf8b"
  },
  {
    "id": "minecraft:kelp",
    "name": "Kelp",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf3f"
  },
  {
    "id": "minecraft:vine",
    "name": "Vines",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf3f"
  },
  {
    "id": "minecraft:lily_pad",
    "name": "Lily Pad",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf3f"
  },
  {
    "id": "minecraft:sugar_cane",
    "name": "Sugar Cane",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf3f"
  },
  {
    "id": "minecraft:cactus",
    "name": "Cactus",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf35"
  },
  {
    "id": "minecraft:pumpkin",
    "name": "Pumpkin",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf83"
  },
  {
    "id": "minecraft:melon_block",
    "name": "Melon",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf48"
  },
  {
    "id": "minecraft:dandelion",
    "name": "Dandelion",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf3c"
  },
  {
    "id": "minecraft:poppy",
    "name": "Poppy",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf3a"
  },
  {
    "id": "minecraft:blue_orchid",
    "name": "Blue Orchid",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf38"
  },
  {
    "id": "minecraft:sunflower",
    "name": "Sunflower",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf3b"
  },
  {
    "id": "minecraft:rose_bush",
    "name": "Rose Bush",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf39"
  },
  {
    "id": "minecraft:wither_rose",
    "name": "Wither Rose",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udd40"
  },
  {
    "id": "minecraft:torchflower",
    "name": "Torchflower",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf38"
  },
  {
    "id": "minecraft:pitcher_plant",
    "name": "Pitcher Plant",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf31"
  },
  {
    "id": "minecraft:brown_mushroom",
    "name": "Brown Mushroom",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf44"
  },
  {
    "id": "minecraft:red_mushroom",
    "name": "Red Mushroom",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf44"
  },
  {
    "id": "minecraft:oak_sapling",
    "name": "Oak Sapling",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf31"
  },
  {
    "id": "minecraft:spruce_sapling",
    "name": "Spruce Sapling",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf32"
  },
  {
    "id": "minecraft:birch_sapling",
    "name": "Birch Sapling",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf33"
  },
  {
    "id": "minecraft:jungle_sapling",
    "name": "Jungle Sapling",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf34"
  },
  {
    "id": "minecraft:acacia_sapling",
    "name": "Acacia Sapling",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf33"
  },
  {
    "id": "minecraft:dark_oak_sapling",
    "name": "Dark Oak Sapling",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf33"
  },
  {
    "id": "minecraft:cherry_sapling",
    "name": "Cherry Sapling",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf38"
  },
  {
    "id": "minecraft:mangrove_propagule",
    "name": "Mangrove Propagule",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf31"
  },
  {
    "id": "minecraft:egg",
    "name": "Egg",
    "category": "materials",
    "maxStack": 16,
    "enchantable": false,
    "emoji": "\ud83e\udd5a"
  },
  {
    "id": "minecraft:snowball",
    "name": "Snowball",
    "category": "materials",
    "maxStack": 16,
    "enchantable": false,
    "emoji": "\u2744\ufe0f"
  },
  {
    "id": "minecraft:book",
    "name": "Book",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udcd6"
  },
  {
    "id": "minecraft:enchanted_book",
    "name": "Enchanted Book",
    "category": "materials",
    "maxStack": 1,
    "enchantable": true,
    "emoji": "\ud83d\udcd7"
  },
  {
    "id": "minecraft:writable_book",
    "name": "Book and Quill",
    "category": "materials",
    "maxStack": 1,
    "enchantable": false,
    "emoji": "\ud83d\udcdd"
  },
  {
    "id": "minecraft:map",
    "name": "Empty Map",
    "category": "tools",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\uddfa\ufe0f"
  },
  {
    "id": "minecraft:filled_map",
    "name": "Map",
    "category": "tools",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\uddfa\ufe0f"
  },
  {
    "id": "minecraft:paper",
    "name": "Paper",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udcc4"
  },
  {
    "id": "minecraft:white_dye",
    "name": "White Dye",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b1c"
  },
  {
    "id": "minecraft:orange_dye",
    "name": "Orange Dye",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe7"
  },
  {
    "id": "minecraft:magenta_dye",
    "name": "Magenta Dye",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfea"
  },
  {
    "id": "minecraft:light_blue_dye",
    "name": "Light Blue Dye",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd35"
  },
  {
    "id": "minecraft:yellow_dye",
    "name": "Yellow Dye",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe8"
  },
  {
    "id": "minecraft:lime_dye",
    "name": "Lime Dye",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe9"
  },
  {
    "id": "minecraft:pink_dye",
    "name": "Pink Dye",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\ude77"
  },
  {
    "id": "minecraft:gray_dye",
    "name": "Gray Dye",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b1c"
  },
  {
    "id": "minecraft:light_gray_dye",
    "name": "Light Gray Dye",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b1c"
  },
  {
    "id": "minecraft:cyan_dye",
    "name": "Cyan Dye",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd35"
  },
  {
    "id": "minecraft:purple_dye",
    "name": "Purple Dye",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe3"
  },
  {
    "id": "minecraft:blue_dye",
    "name": "Blue Dye",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd35"
  },
  {
    "id": "minecraft:brown_dye",
    "name": "Brown Dye",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfeb"
  },
  {
    "id": "minecraft:green_dye",
    "name": "Green Dye",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe9"
  },
  {
    "id": "minecraft:red_dye",
    "name": "Red Dye",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe5"
  },
  {
    "id": "minecraft:black_dye",
    "name": "Black Dye",
    "category": "materials",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b1b"
  },
  {
    "id": "minecraft:white_wool",
    "name": "White Wool",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc11"
  },
  {
    "id": "minecraft:orange_wool",
    "name": "Orange Wool",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe7"
  },
  {
    "id": "minecraft:red_wool",
    "name": "Red Wool",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe5"
  },
  {
    "id": "minecraft:blue_wool",
    "name": "Blue Wool",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd35"
  },
  {
    "id": "minecraft:green_wool",
    "name": "Green Wool",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe9"
  },
  {
    "id": "minecraft:yellow_wool",
    "name": "Yellow Wool",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe8"
  },
  {
    "id": "minecraft:purple_wool",
    "name": "Purple Wool",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe3"
  },
  {
    "id": "minecraft:pink_wool",
    "name": "Pink Wool",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\ude77"
  },
  {
    "id": "minecraft:black_wool",
    "name": "Black Wool",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b1b"
  },
  {
    "id": "minecraft:white_concrete",
    "name": "White Concrete",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b1c"
  },
  {
    "id": "minecraft:white_terracotta",
    "name": "White Terracotta",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b1c"
  },
  {
    "id": "minecraft:white_glazed_terracotta",
    "name": "White Glazed Terracotta",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b1c"
  },
  {
    "id": "minecraft:ice",
    "name": "Ice",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\uddca"
  },
  {
    "id": "minecraft:packed_ice",
    "name": "Packed Ice",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\uddca"
  },
  {
    "id": "minecraft:blue_ice",
    "name": "Blue Ice",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\uddca"
  },
  {
    "id": "minecraft:snow_block",
    "name": "Snow Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2744\ufe0f"
  },
  {
    "id": "minecraft:prismarine",
    "name": "Prismarine",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd37"
  },
  {
    "id": "minecraft:dark_prismarine",
    "name": "Dark Prismarine",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd37"
  },
  {
    "id": "minecraft:quartz_block",
    "name": "Quartz Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u25fb\ufe0f"
  },
  {
    "id": "minecraft:bricks",
    "name": "Bricks",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\uddf1"
  },
  {
    "id": "minecraft:stone_bricks",
    "name": "Stone Bricks",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\uddf1"
  },
  {
    "id": "minecraft:nether_bricks",
    "name": "Nether Bricks",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\uddf1"
  },
  {
    "id": "minecraft:basalt",
    "name": "Basalt",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udea8"
  },
  {
    "id": "minecraft:blackstone",
    "name": "Blackstone",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b1b"
  },
  {
    "id": "minecraft:pointed_dripstone",
    "name": "Pointed Dripstone",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udea8"
  },
  {
    "id": "minecraft:dripstone_block",
    "name": "Dripstone Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udea8"
  },
  {
    "id": "minecraft:spore_blossom",
    "name": "Spore Blossom",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf38"
  },
  {
    "id": "minecraft:azalea",
    "name": "Azalea",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf33"
  },
  {
    "id": "minecraft:glow_lichen",
    "name": "Glow Lichen",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2728"
  },
  {
    "id": "minecraft:froglight",
    "name": "Froglight",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc38"
  },
  {
    "id": "minecraft:candle",
    "name": "Candle",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd6f\ufe0f"
  },
  {
    "id": "minecraft:chain",
    "name": "Chain",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u26d3\ufe0f"
  },
  {
    "id": "minecraft:iron_bars",
    "name": "Iron Bars",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd29"
  },
  {
    "id": "minecraft:tinted_glass",
    "name": "Tinted Glass",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\ude9f"
  },
  {
    "id": "minecraft:campfire",
    "name": "Campfire",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udfd5\ufe0f"
  },
  {
    "id": "minecraft:soul_campfire",
    "name": "Soul Campfire",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udfd5\ufe0f"
  },
  {
    "id": "minecraft:shroomlight",
    "name": "Shroomlight",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83c\udf44"
  },
  {
    "id": "minecraft:end_rod",
    "name": "End Rod",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd26"
  },
  {
    "id": "minecraft:chorus_flower",
    "name": "Chorus Flower",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe3"
  },
  {
    "id": "minecraft:dragon_egg",
    "name": "Dragon Egg",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83e\udd5a"
  },
  {
    "id": "minecraft:spawner",
    "name": "Monster Spawner",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc79"
  },
  {
    "id": "minecraft:command_block",
    "name": "Command Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe7"
  },
  {
    "id": "minecraft:structure_block",
    "name": "Structure Block",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd27"
  },
  {
    "id": "minecraft:barrier",
    "name": "Barrier",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udeab"
  },
  {
    "id": "minecraft:bedrock",
    "name": "Bedrock",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2b1b"
  },
  {
    "id": "minecraft:end_portal_frame",
    "name": "End Portal Frame",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udfe9"
  },
  {
    "id": "minecraft:trial_spawner",
    "name": "Trial Spawner",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udc79"
  },
  {
    "id": "minecraft:vault",
    "name": "Vault",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd12"
  },
  {
    "id": "minecraft:heavy_core",
    "name": "Heavy Core",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\u2699\ufe0f"
  },
  {
    "id": "minecraft:crafter",
    "name": "Crafter",
    "category": "blocks",
    "maxStack": 64,
    "enchantable": false,
    "emoji": "\ud83d\udd27"
  }
];

export const MINECRAFT_ENCHANTMENTS: MinecraftEnchantment[] = [
  {
    "id": 0,
    "identifier": "protection",
    "name": "Protection",
    "maxLevel": 4,
    "applicableTo": [
      "helmet",
      "chestplate",
      "leggings",
      "boots"
    ]
  },
  {
    "id": 1,
    "identifier": "fire_protection",
    "name": "Fire Protection",
    "maxLevel": 4,
    "applicableTo": [
      "helmet",
      "chestplate",
      "leggings",
      "boots"
    ]
  },
  {
    "id": 2,
    "identifier": "feather_falling",
    "name": "Feather Falling",
    "maxLevel": 4,
    "applicableTo": [
      "boots"
    ]
  },
  {
    "id": 3,
    "identifier": "blast_protection",
    "name": "Blast Protection",
    "maxLevel": 4,
    "applicableTo": [
      "helmet",
      "chestplate",
      "leggings",
      "boots"
    ]
  },
  {
    "id": 4,
    "identifier": "projectile_protection",
    "name": "Projectile Protection",
    "maxLevel": 4,
    "applicableTo": [
      "helmet",
      "chestplate",
      "leggings",
      "boots"
    ]
  },
  {
    "id": 5,
    "identifier": "thorns",
    "name": "Thorns",
    "maxLevel": 3,
    "applicableTo": [
      "chestplate"
    ]
  },
  {
    "id": 6,
    "identifier": "respiration",
    "name": "Respiration",
    "maxLevel": 3,
    "applicableTo": [
      "helmet"
    ]
  },
  {
    "id": 7,
    "identifier": "depth_strider",
    "name": "Depth Strider",
    "maxLevel": 3,
    "applicableTo": [
      "boots"
    ]
  },
  {
    "id": 8,
    "identifier": "aqua_affinity",
    "name": "Aqua Affinity",
    "maxLevel": 1,
    "applicableTo": [
      "helmet"
    ]
  },
  {
    "id": 9,
    "identifier": "sharpness",
    "name": "Sharpness",
    "maxLevel": 5,
    "applicableTo": [
      "sword",
      "axe"
    ]
  },
  {
    "id": 10,
    "identifier": "smite",
    "name": "Smite",
    "maxLevel": 5,
    "applicableTo": [
      "sword",
      "axe"
    ]
  },
  {
    "id": 11,
    "identifier": "bane_of_arthropods",
    "name": "Bane of Arthropods",
    "maxLevel": 5,
    "applicableTo": [
      "sword",
      "axe"
    ]
  },
  {
    "id": 12,
    "identifier": "knockback",
    "name": "Knockback",
    "maxLevel": 2,
    "applicableTo": [
      "sword"
    ]
  },
  {
    "id": 13,
    "identifier": "fire_aspect",
    "name": "Fire Aspect",
    "maxLevel": 2,
    "applicableTo": [
      "sword"
    ]
  },
  {
    "id": 14,
    "identifier": "looting",
    "name": "Looting",
    "maxLevel": 3,
    "applicableTo": [
      "sword"
    ]
  },
  {
    "id": 15,
    "identifier": "efficiency",
    "name": "Efficiency",
    "maxLevel": 5,
    "applicableTo": [
      "pickaxe",
      "shovel",
      "axe",
      "hoe"
    ]
  },
  {
    "id": 16,
    "identifier": "silk_touch",
    "name": "Silk Touch",
    "maxLevel": 1,
    "applicableTo": [
      "pickaxe",
      "shovel",
      "axe",
      "hoe"
    ]
  },
  {
    "id": 17,
    "identifier": "unbreaking",
    "name": "Unbreaking",
    "maxLevel": 3,
    "applicableTo": [
      "all"
    ]
  },
  {
    "id": 18,
    "identifier": "fortune",
    "name": "Fortune",
    "maxLevel": 3,
    "applicableTo": [
      "pickaxe",
      "shovel",
      "axe",
      "hoe"
    ]
  },
  {
    "id": 19,
    "identifier": "power",
    "name": "Power",
    "maxLevel": 5,
    "applicableTo": [
      "bow"
    ]
  },
  {
    "id": 20,
    "identifier": "punch",
    "name": "Punch",
    "maxLevel": 2,
    "applicableTo": [
      "bow"
    ]
  },
  {
    "id": 21,
    "identifier": "flame",
    "name": "Flame",
    "maxLevel": 1,
    "applicableTo": [
      "bow"
    ]
  },
  {
    "id": 22,
    "identifier": "infinity",
    "name": "Infinity",
    "maxLevel": 1,
    "applicableTo": [
      "bow"
    ]
  },
  {
    "id": 23,
    "identifier": "luck_of_the_sea",
    "name": "Luck of the Sea",
    "maxLevel": 3,
    "applicableTo": [
      "fishing_rod"
    ]
  },
  {
    "id": 24,
    "identifier": "lure",
    "name": "Lure",
    "maxLevel": 3,
    "applicableTo": [
      "fishing_rod"
    ]
  },
  {
    "id": 25,
    "identifier": "frost_walker",
    "name": "Frost Walker",
    "maxLevel": 2,
    "applicableTo": [
      "boots"
    ]
  },
  {
    "id": 26,
    "identifier": "mending",
    "name": "Mending",
    "maxLevel": 1,
    "applicableTo": [
      "all"
    ]
  },
  {
    "id": 27,
    "identifier": "curse_of_binding",
    "name": "Curse of Binding",
    "maxLevel": 1,
    "applicableTo": [
      "all"
    ]
  },
  {
    "id": 28,
    "identifier": "curse_of_vanishing",
    "name": "Curse of Vanishing",
    "maxLevel": 1,
    "applicableTo": [
      "all"
    ]
  },
  {
    "id": 29,
    "identifier": "impaling",
    "name": "Impaling",
    "maxLevel": 5,
    "applicableTo": [
      "trident"
    ]
  },
  {
    "id": 30,
    "identifier": "riptide",
    "name": "Riptide",
    "maxLevel": 3,
    "applicableTo": [
      "trident"
    ]
  },
  {
    "id": 31,
    "identifier": "loyalty",
    "name": "Loyalty",
    "maxLevel": 3,
    "applicableTo": [
      "trident"
    ]
  },
  {
    "id": 32,
    "identifier": "channeling",
    "name": "Channeling",
    "maxLevel": 1,
    "applicableTo": [
      "trident"
    ]
  },
  {
    "id": 33,
    "identifier": "multishot",
    "name": "Multishot",
    "maxLevel": 1,
    "applicableTo": [
      "crossbow"
    ]
  },
  {
    "id": 34,
    "identifier": "piercing",
    "name": "Piercing",
    "maxLevel": 4,
    "applicableTo": [
      "crossbow"
    ]
  },
  {
    "id": 35,
    "identifier": "quick_charge",
    "name": "Quick Charge",
    "maxLevel": 3,
    "applicableTo": [
      "crossbow"
    ]
  },
  {
    "id": 36,
    "identifier": "soul_speed",
    "name": "Soul Speed",
    "maxLevel": 3,
    "applicableTo": [
      "boots"
    ]
  },
  {
    "id": 37,
    "identifier": "swift_sneak",
    "name": "Swift Sneak",
    "maxLevel": 3,
    "applicableTo": [
      "leggings"
    ]
  }
];
