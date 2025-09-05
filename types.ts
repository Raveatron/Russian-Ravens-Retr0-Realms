export interface AbilityScore {
  score: number;
  modifier: number;
}

export interface Spell {
  name: string;
  level: number;
  description: string;
}

export interface Weapon {
    name: string;
    atkBonus: string;
    damage: string;
}

export interface Armor {
    name: string;
    ac: string;
    properties: string;
}

export interface Currency {
    cp: number;
    sp: number;
    ep: number;
    gp: number;
    pp: number;
}

export interface Character {
  id: string;
  name: string;
  race: string;
  charClass: string;
  abilityScores: {
    Strength: AbilityScore;
    Dexterity: AbilityScore;
    Constitution: AbilityScore;
    Intelligence: AbilityScore;
    Wisdom: AbilityScore;
    Charisma: AbilityScore;
  };
  inventory: { name: string; quantity: number }[];
  hp: {
    current: number;
    max: number;
  };
  ac: number;
  xp: {
    current: number;
    nextLevel: number;
  };
  spells: Spell[];
  weapons: Weapon[];
  armor: Armor[];
  currency: Currency;
  portrait?: string;
  backstory?: string;
}

export interface RollResult {
  id: number;
  timestamp: Date;
  notation: string;
  total: number;
  rolls: number[];
  reason?: string;
}

export enum Dice {
    d4 = 4,
    d6 = 6,
    d8 = 8,
    d10 = 10,
    d12 = 12,
    d20 = 20,
    d100 = 100
}

export interface Monster {
  name: string;
  size: string;
  type: string;
  alignment: string;
  ac: number;
  hp: string;
  speed: string;
  stats: [number, number, number, number, number, number]; // STR, DEX, CON, INT, WIS, CHA
  skills?: string;
  senses?: string;
  languages?: string;
  cr: string;
  traits?: { name: string; desc: string }[];
  actions: { name: string; desc: string }[];
}

export interface StoryChoice {
    text: string;
    prompt_for_next_scene: string;
}

export interface StoryState {
  narration: string;
  choices: StoryChoice[];
  sceneImage?: string;
}

export interface Campaign {
  id: string;
  name: string;
  party: Character[];
  storyState: StoryState | null;
  storyLog: string[];
}

export interface PlayerState {
    campaignName: string;
    narration: string;
    choices: StoryChoice[];
    sceneImage?: string;
}