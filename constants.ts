
export const RACES = [
  "Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", 
  "Halfling", "Half-Orc", "Human", "Tiefling"
];

export const CLASSES = [
  "Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", 
  "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"
];

export const ABILITIES = [
  "Strength", "Dexterity", "Constitution", 
  "Intelligence", "Wisdom", "Charisma"
];

export const SKILLS = [
    { name: "Acrobatics", ability: "Dexterity" },
    { name: "Animal Handling", ability: "Wisdom" },
    { name: "Arcana", ability: "Intelligence" },
    { name: "Athletics", ability: "Strength" },
    { name: "Deception", ability: "Charisma" },
    { name: "History", ability: "Intelligence" },
    { name: "Insight", ability: "Wisdom" },
    { name: "Intimidation", ability: "Charisma" },
    { name: "Investigation", ability: "Intelligence" },
    { name: "Medicine", ability: "Wisdom" },
    { name: "Nature", ability: "Intelligence" },
    { name: "Perception", ability: "Wisdom" },
    { name: "Performance", ability: "Charisma" },
    { name: "Persuasion", ability: "Charisma" },
    { name: "Religion", ability: "Intelligence" },
    { name: "Sleight of Hand", ability: "Dexterity" },
    { name: "Stealth", ability: "Dexterity" },
    { name: "Survival", ability: "Wisdom" },
] as const;
