import type { Monster } from '../types';

export const SRD_MONSTERS: Monster[] = [
    {
        name: "Goblin",
        size: "Small",
        type: "humanoid (goblinoid)",
        alignment: "neutral evil",
        ac: 15,
        hp: "7 (2d6)",
        speed: "30 ft.",
        stats: [8, 14, 10, 10, 8, 8],
        skills: "Stealth +6",
        senses: "darkvision 60 ft., passive Perception 9",
        languages: "Common, Goblin",
        cr: "1/4",
        traits: [
            {
                name: "Nimble Escape",
                desc: "The goblin can take the Disengage or Hide action as a bonus action on each of its turns."
            }
        ],
        actions: [
            {
                name: "Scimitar",
                desc: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage."
            },
            {
                name: "Shortbow",
                desc: "Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
            }
        ]
    },
    {
        name: "Orc",
        size: "Medium",
        type: "humanoid (orc)",
        alignment: "chaotic evil",
        ac: 13,
        hp: "15 (2d8 + 6)",
        speed: "30 ft.",
        stats: [16, 12, 16, 7, 11, 10],
        skills: "Intimidation +2",
        senses: "darkvision 60 ft., passive Perception 10",
        languages: "Common, Orc",
        cr: "1/2",
        traits: [
            {
                name: "Aggressive",
                desc: "As a bonus action on its turn, the orc can move up to its speed toward a hostile creature that it can see."
            }
        ],
        actions: [
            {
                name: "Greataxe",
                desc: "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (1d12 + 3) slashing damage."
            },
            {
                name: "Javelin",
                desc: "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 6 (1d6 + 3) piercing damage."
            }
        ]
    },
    {
        name: "Skeleton",
        size: "Medium",
        type: "undead",
        alignment: "lawful evil",
        ac: 13,
        hp: "13 (2d8 + 4)",
        speed: "30 ft.",
        stats: [10, 14, 15, 6, 8, 5],
        senses: "darkvision 60 ft., passive Perception 9",
        languages: "understands all languages it knew in life but can't speak",
        cr: "1/4",
        traits: [
            {
                name: "Damage Vulnerabilities",
                desc: "Bludgeoning"
            },
            {
                name: "Damage Immunities",
                desc: "Poison"
            },
             {
                name: "Condition Immunities",
                desc: "Exhaustion, Poisoned"
            }
        ],
        actions: [
            {
                name: "Shortsword",
                desc: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
            },
            {
                name: "Shortbow",
                desc: "Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage."
            }
        ]
    },
    {
        name: "Adult Black Dragon",
        size: "Huge",
        type: "dragon",
        alignment: "chaotic evil",
        ac: 19,
        hp: "195 (17d12 + 85)",
        speed: "40 ft., fly 80 ft., swim 40 ft.",
        stats: [23, 14, 21, 14, 13, 17],
        skills: "Perception +11, Stealth +7",
        senses: "blindsight 60 ft., darkvision 120 ft., passive Perception 21",
        languages: "Common, Draconic",
        cr: "14",
        traits: [
            {
                name: "Amphibious",
                desc: "The dragon can breathe air and water."
            },
            {
                name: "Legendary Resistance (3/Day)",
                desc: "If the dragon fails a saving throw, it can choose to succeed instead."
            }
        ],
        actions: [
            {
                name: "Multiattack",
                desc: "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws."
            },
            {
                name: "Bite",
                desc: "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 4 (1d8) acid damage."
            },
            {
                name: "Claw",
                desc: "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage."
            },
             {
                name: "Acid Breath (Recharge 5-6)",
                desc: "The dragon exhales acid in a 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 54 (12d8) acid damage on a failed save, or half as much damage on a successful one."
            }
        ]
    }
]
