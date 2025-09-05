import type { Spell } from '../types';

export const SRD_SPELLS: Spell[] = [
  // Cantrips (Level 0)
  {
    name: "Acid Splash",
    level: 0,
    description: "You hurl a bubble of acid. Choose one creature within range, or choose two creatures within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage."
  },
  {
    name: "Blade Ward",
    level: 0,
    description: "You extend your hand and trace a sigil of warding in the air. Until the end of your next turn, you have resistance against bludgeoning, piercing, and slashing damage dealt by weapon attacks."
  },
  {
    name: "Chill Touch",
    level: 0,
    description: "You create a ghostly, skeletal hand in the space of a creature within range. Make a ranged spell attack against the creature to assail it with the chill of the grave. On a hit, the target takes 1d8 necrotic damage, and it can't regain hit points until the start of your next turn. Until then, the hand clings to the target."
  },
  {
    name: "Dancing Lights",
    level: 0,
    description: "You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration. You can also combine the four lights into one glowing vaguely humanoid form of Medium size."
  },
  {
    name: "Druidcraft",
    level: 0,
    description: "Whispering to the spirits of nature, you create one of the following effects within range: ... (full description omitted for brevity)"
  },
  {
    name: "Eldritch Blast",
    level: 0,
    description: "A beam of crackling energy streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 force damage."
  },
  {
    name: "Fire Bolt",
    level: 0,
    description: "You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn't being worn or carried."
  },
  {
    name: "Guidance",
    level: 0,
    description: "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one ability check of its choice. It can roll the die before or after making the ability check. The spell then ends."
  },
  {
    name: "Light",
    level: 0,
    description: "You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the light."
  },
  {
    name: "Mage Hand",
    level: 0,
    description: "A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again."
  },
  {
    name: "Mending",
    level: 0,
    description: "This spell repairs a single break or tear in an object you touch, such as a broken chain link, two halves of a broken key, a torn cloak, or a leaking wineskin. As long as the break or tear is no larger than 1 foot in any dimension, you mend it, leaving no trace of the former damage."
  },
  {
    name: "Message",
    level: 0,
    description: "You point your finger toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear."
  },
  {
    name: "Minor Illusion",
    level: 0,
    description: "You create a sound or an image of an object within range that lasts for the duration. The illusion also ends if you dismiss it as an action or cast this spell again."
  },
  {
    name: "Poison Spray",
    level: 0,
    description: "You extend your hand toward a creature you can see within range and project a puff of noxious gas from your palm. The creature must succeed on a Constitution saving throw or take 1d12 poison damage."
  },
  {
    name: "Prestidigitation",
    level: 0,
    description: "This spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical effects within range: ... (full description omitted for brevity)"
  },
  {
    name: "Ray of Frost",
    level: 0,
    description: "A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn."
  },
  {
    name: "Resistance",
    level: 0,
    description: "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one saving throw of its choice. It can roll the die before or after making the saving throw. The spell then ends."
  },
  {
    name: "Sacred Flame",
    level: 0,
    description: "Flame-like radiance descends on a creature that you can see within range. The target must succeed on a Dexterity saving throw or take 1d8 radiant damage. The target gains no benefit from cover for this saving throw."
  },
  {
    name: "Shillelagh",
    level: 0,
    description: "The wood of a club or quarterstaff you are holding is imbued with nature's power. For the duration, you can use your spellcasting ability instead of Strength for the attack and damage rolls of melee attacks using that weapon, and the weapon's damage die becomes a d8. The weapon also becomes magical, if it isn't already."
  },
  {
    name: "Shocking Grasp",
    level: 0,
    description: "Lightning springs from your hand to deliver a shock to a creature you try to touch. Make a melee spell attack against the target. You have advantage on the attack roll if the target is wearing armor made of metal. On a hit, the target takes 1d8 lightning damage, and it can't take reactions until the start of its next turn."
  },
  {
    name: "Spare the Dying",
    level: 0,
    description: "You touch a living creature that has 0 hit points. The creature becomes stable. This spell has no effect on undead or constructs."
  },
  {
    name: "Thaumaturgy",
    level: 0,
    description: "You manifest a minor wonder, a sign of supernatural power, within range. You create one of the following magical effects within range: ... (full description omitted for brevity)"
  },
  {
    name: "True Strike",
    level: 0,
    description: "You extend your hand and point a finger at a target in range. Your magic grants you a brief insight into the target's defenses. On your next turn, you gain advantage on your first attack roll against the target, provided that this spell hasn't ended."
  },
  {
    name: "Vicious Mockery",
    level: 0,
    description: "You unleash a string of insults laced with subtle enchantments at a creature you can see within range. If the target can hear you (though it need not understand you), it must succeed on a Wisdom saving throw or take 1d4 psychic damage and have disadvantage on the next attack roll it makes before the end of its next turn."
  },
  // Level 1 Spells
  {
    name: "Alarm",
    level: 1,
    description: "You set an alarm against unwanted intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot cube. Until the spell ends, an alarm alerts you whenever a Tiny or larger creature touches or enters the warded area."
  },
  {
    name: "Animal Friendship",
    level: 1,
    description: "This spell lets you convince a beast that you mean it no harm. Choose a beast that you can see within range. It must see and hear you. If the beast's Intelligence is 4 or higher, the spell fails. Otherwise, the beast must succeed on a Wisdom saving throw or be charmed by you for the spell's duration."
  },
  {
    name: "Bane",
    level: 1,
    description: "Up to three creatures of your choice that you can see within range must make Charisma saving throws. Whenever a target that fails this saving throw makes an attack roll or a saving throw before the spell ends, the target must roll a d4 and subtract the number rolled from the attack roll or saving throw."
  },
  {
    name: "Bless",
    level: 1,
    description: "You bless up to three creatures of your choice within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target can roll a d4 and add the number rolled to the attack roll or saving throw."
  },
  {
    name: "Burning Hands",
    level: 1,
    description: "As you hold your hands with thumbs touching and fingers spread, a thin sheet of flames shoots forth from your outstretched fingertips. Each creature in a 15-foot cone must make a Dexterity saving throw. A creature takes 3d6 fire damage on a failed save, or half as much damage on a successful one."
  },
  {
    name: "Charm Person",
    level: 1,
    description: "You attempt to charm a humanoid you can see within range. It must make a Wisdom saving throw, and does so with advantage if you or your companions are fighting it. If it fails the saving throw, it is charmed by you until the spell ends or until you or your companions do anything harmful to it."
  },
  {
    name: "Command",
    level: 1,
    description: "You speak a one-word command to a creature you can see within range. The target must succeed on a Wisdom saving throw or follow the command on its next turn."
  },
  {
    name: "Comprehend Languages",
    level: 1,
    description: "For the duration, you understand the literal meaning of any spoken language that you hear. You also understand any written language that you see, but you must be touching the surface on which the words are written. It takes about 1 minute to read one page of text."
  },
  {
    name: "Create or Destroy Water",
    level: 1,
    description: "You either create or destroy water. Create Water: You create up to 10 gallons of clean water within range in an open container. Alternatively, the water falls as rain in a 30-foot cube within range. Destroy Water: You destroy up to 10 gallons of water in an open container within range."
  },
  {
    name: "Cure Wounds",
    level: 1,
    description: "A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs."
  },
  {
    name: "Detect Evil and Good",
    level: 1,
    description: "For the duration, you know if there is an aberration, celestial, elemental, fey, fiend, or undead within 30 feet of you, as well as where the creature is located."
  },
  {
    name: "Detect Magic",
    level: 1,
    description: "For the duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic, and you learn its school of magic, if any."
  },
  {
    name: "Detect Poison and Disease",
    level: 1,
    description: "For the duration, you can sense the presence and location of poisons, poisonous creatures, and diseases within 30 feet of you."
  },
  {
    name: "Disguise Self",
    level: 1,
    description: "You make yourself—including your clothing, armor, weapons, and other belongings on your person—look different until the spell ends or until you use your action to dismiss it."
  },
  {
    name: "Divine Favor",
    level: 1,
    description: "Your prayer empowers you with divine radiance. Until the spell ends, your weapon attacks deal an extra 1d4 radiant damage on a hit."
  },
  {
    name: "Entangle",
    level: 1,
    description: "Grasping weeds and vines sprout from the ground in a 20-foot square starting from a point within range. For the duration, these plants turn the ground in the area into difficult terrain."
  },
  {
    name: "Expeditious Retreat",
    level: 1,
    description: "This spell allows you to move at an incredible pace. When you cast this spell, and then as a bonus action on each of your turns until the spell ends, you can take the Dash action."
  },
  {
    name: "Faerie Fire",
    level: 1,
    description: "Each object in a 20-foot cube within range is outlined in blue, green, or violet light (your choice). Any creature in the area when the spell is cast is also outlined in light if it fails a Dexterity saving throw."
  },
  {
    name: "False Life",
    level: 1,
    description: "Bolstering yourself with a necromantic facsimile of life, you gain 1d4 + 4 temporary hit points for the duration."
  },
  {
    name: "Feather Fall",
    level: 1,
    description: "Choose up to five falling creatures within range. A falling creature's rate of descent slows to 60 feet per round until the spell ends. If the creature lands before the spell ends, it takes no falling damage and can land on its feet, and the spell ends for that creature."
  },
  {
    name: "Find Familiar",
    level: 1,
    description: "You gain the service of a familiar, a spirit that takes an animal form you choose: bat, cat, crab, frog (toad), hawk, lizard, octopus, owl, poisonous snake, fish (quipper), rat, raven, sea horse, spider, or weasel."
  },
  {
    name: "Floating Disk",
    level: 1,
    description: "This spell creates a circular, horizontal plane of force, 3 feet in diameter and 1 inch thick, that floats 3 feet above the ground in an unoccupied space of your choice that you can see within range."
  },
  {
    name: "Fog Cloud",
    level: 1,
    description: "You create a 20-foot-radius sphere of fog centered on a point within range. The sphere spreads around corners, and its area is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it."
  },
  {
    name: "Goodberry",
    level: 1,
    description: "Up to ten berries appear in your hand and are infused with magic for the duration. A creature can use its action to eat one berry. Eating a berry restores 1 hit point, and the berry provides enough nourishment to sustain a creature for one day."
  },
  {
    name: "Grease",
    level: 1,
    description: "Slick grease covers the ground in a 10-foot square centered on a point within range and turns it into difficult terrain for the duration."
  },
  {
    name: "Guiding Bolt",
    level: 1,
    description: "A flash of light streaks toward a creature of your choice within range. Make a ranged spell attack against the target. On a hit, the target takes 4d6 radiant damage, and the next attack roll made against this target before the end of your next turn has advantage."
  },
  {
    name: "Healing Word",
    level: 1,
    description: "A creature of your choice that you can see within range regains hit points equal to 1d4 + your spellcasting ability modifier. This spell has no effect on undead or constructs."
  },
  {
    name: "Heroism",
    level: 1,
    description: "A willing creature you touch is imbued with bravery. Until the spell ends, the creature is immune to being frightened and gains temporary hit points equal to your spellcasting ability modifier at the start of each of its turns."
  },
  {
    name: "Hideous Laughter",
    level: 1,
    description: "A creature of your choice that you can see within range perceives everything as hilariously funny and falls into fits of laughter if this spell affects it. The target must succeed on a Wisdom saving throw or fall prone, becoming incapacitated and unable to stand up for the duration."
  },
  {
    name: "Hunter's Mark",
    level: 1,
    description: "You choose a creature you can see within range and mystically mark it as your quarry. Until the spell ends, you deal an extra 1d6 damage to the target whenever you hit it with a weapon attack, and you have advantage on any Wisdom (Perception) or Wisdom (Survival) check you make to find it."
  },
  {
    name: "Identify",
    level: 1,
    description: "You choose one object that you must touch throughout the casting of the spell. If it is a magic item or some other magic-imbued object, you learn its properties and how to use them, whether it requires attunement to use, and how many charges it has, if any."
  },
  {
    name: "Illusory Script",
    level: 1,
    description: "You write on parchment, paper, or some other suitable writing material and imbue it with a potent illusion that lasts for the duration."
  },
  {
    name: "Inflict Wounds",
    level: 1,
    description: "Make a melee spell attack against a creature you can reach. On a hit, the target takes 3d10 necrotic damage."
  },
  {
    name: "Jump",
    level: 1,
    description: "You touch a creature. The creature's jump distance is tripled until the spell ends."
  },
  {
    name: "Longstrider",
    level: 1,
    description: "You touch a creature. The target's speed increases by 10 feet until the spell ends."
  },
  {
    name: "Mage Armor",
    level: 1,
    description: "You touch a willing creature who isn't wearing armor, and a protective magical force surrounds it until the spell ends. The target's base AC becomes 13 + its Dexterity modifier."
  },
  {
    name: "Magic Missile",
    level: 1,
    description: "You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4 + 1 force damage to its target. The darts all strike simultaneously, and you can direct them to hit one creature or several."
  },
  {
    name: "Protection from Evil and Good",
    level: 1,
    description: "Until the spell ends, one willing creature you touch is protected against certain types of creatures: aberrations, celestials, elementals, fey, fiends, and undead."
  },
  {
    name: "Purify Food and Drink",
    level: 1,
    description: "All nonmagical food and drink within a 5-foot-radius sphere centered on a point of your choice within range is purified and rendered free of poison and disease."
  },
  {
    name: "Sanctuary",
    level: 1,
    description: "You ward a creature within range against attack. Until the spell ends, any creature who targets the warded creature with an attack or a harmful spell must first make a Wisdom saving throw."
  },
  {
    name: "Shield",
    level: 1,
    description: "An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from magic missile."
  },
  {
    name: "Shield of Faith",
    level: 1,
    description: "A shimmering field appears and surrounds a creature of your choice within range, granting it a +2 bonus to AC for the duration."
  },
  {
    name: "Silent Image",
    level: 1,
    description: "You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 15-foot cube. The image appears at a spot within range and lasts for the duration."
  },
  {
    name: "Sleep",
    level: 1,
    description: "This spell sends creatures into a magical slumber. Roll 5d8; the total is how many hit points of creatures this spell can affect. Creatures within 20 feet of a point you choose within range are affected in ascending order of their current hit points."
  },
  {
    name: "Speak with Animals",
    level: 1,
    description: "You gain the ability to comprehend and verbally communicate with beasts for the duration. The knowledge and awareness of many beasts is limited by their intelligence, but at a minimum, beasts can give you information about nearby locations and monsters, including whatever they can see, hear, or smell."
  },
  {
    name: "Thunderwave",
    level: 1,
    description: "A wave of thunderous force sweeps out from you. Each creature in a 15-foot cube originating from you must make a Constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away from you."
  },
  {
    name: "Unseen Servant",
    level: 1,
    description: "This spell creates an invisible, mindless, shapeless force that performs simple tasks at your command until the spell ends."
  },
  // Level 2 Spells
  {
    name: "Aid",
    level: 2,
    description: "Your spell bolsters your allies with toughness and resolve. Choose up to three creatures within range. Each target's hit point maximum and current hit points increase by 5 for the duration."
  },
  {
    name: "Arcane Lock",
    level: 2,
    description: "You touch a closed door, window, gate, chest, or other entryway, and it becomes locked for the duration. You and the creatures you designate when you cast this spell can open the object normally."
  },
  {
    name: "Barkskin",
    level: 2,
    description: "You touch a willing creature. Until the spell ends, the target's skin has a rough, bark-like appearance, and the target's AC can't be less than 16, regardless of what kind of armor it is wearing."
  },
  {
    name: "Blur",
    level: 2,
    description: "Your body becomes blurred, shifting and wavering to all who can see you. For the duration, any creature has disadvantage on attack rolls against you."
  },
  {
    name: "Darkness",
    level: 2,
    description: "Magical darkness spreads from a point you choose within range to fill a 15-foot-radius sphere for the duration. The darkness spreads around corners. A creature with darkvision can't see through this darkness, and nonmagical light can't illuminate it."
  },
  {
    name: "Detect Thoughts",
    level: 2,
    description: "For the duration, you can read the thoughts of certain creatures. When you cast the spell and as your action on each turn until the spell ends, you can focus your mind on any one creature that you can see within 30 feet of you."
  },
  {
    name: "Enhance Ability",
    level: 2,
    description: "You touch a creature and bestow upon it a magical enhancement. Choose one of the following effects; the target gains that effect for the duration."
  },
  {
    name: "Find Steed",
    level: 2,
    description: "You summon a spirit that assumes the form of an unusually intelligent, strong, and loyal steed, creating a long-lasting bond with it."
  },
  {
    name: "Flaming Sphere",
    level: 2,
    description: "A 5-foot-diameter sphere of fire appears in an unoccupied space of your choice within range and lasts for the duration. Any creature that ends its turn within 5 feet of the sphere must make a Dexterity saving throw. The creature takes 2d6 fire damage on a failed save, or half as much damage on a successful one."
  },
  {
    name: "Hold Person",
    level: 2,
    description: "Choose a humanoid that you can see within range. The target must succeed on a Wisdom saving throw or be paralyzed for the duration."
  },
  {
    name: "Invisibility",
    level: 2,
    description: "A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target's person."
  },
  {
    name: "Lesser Restoration",
    level: 2,
    description: "You touch a creature and can end either one disease or one condition afflicting it. The condition can be blinded, deafened, paralyzed, or poisoned."
  },
  {
    name: "Levitate",
    level: 2,
    description: "One creature or object of your choice that you can see within range rises vertically, up to 20 feet, and remains suspended there for the duration."
  },
  {
    name: "Magic Weapon",
    level: 2,
    description: "You touch a nonmagical weapon. Until the spell ends, that weapon becomes a magic weapon with a +1 bonus to attack rolls and damage rolls."
  },
  {
    name: "Misty Step",
    level: 2,
    description: "Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space that you can see."
  },
  {
    name: "Prayer of Healing",
    level: 2,
    description: "Up to six creatures of your choice that you can see within range each regain hit points equal to 2d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs."
  },
  {
    name: "Scorching Ray",
    level: 2,
    description: "You create three rays of fire and hurl them at targets within range. You can hurl them at one target or several. Make a ranged spell attack for each ray. On a hit, the target takes 2d6 fire damage."
  },
  {
    name: "See Invisibility",
    level: 2,
    description: "For the duration, you see invisible creatures and objects as if they were visible, and you can see into the Ethereal Plane."
  },
  {
    name: "Shatter",
    level: 2,
    description: "A sudden loud ringing noise, painfully intense, erupts from a point of your choice within range. Each creature in a 10-foot-radius sphere centered on that point must make a Constitution saving throw. A creature takes 3d8 thunder damage on a failed save, or half as much damage on a successful one."
  },
  {
    name: "Silence",
    level: 2,
    description: "For the duration, no sound can be created within or pass through a 20-foot-radius sphere centered on a point you choose within range."
  },
  {
    name: "Spiritual Weapon",
    level: 2,
    description: "You create a floating, spectral weapon within range that lasts for the duration or until you cast this spell again. When you cast the spell, you can make a melee spell attack against a creature within 5 feet of the weapon."
  },
  {
    name: "Suggestion",
    level: 2,
    description: "You suggest a course of activity (limited to a sentence or two) and magically influence a creature you can see within range that can hear and understand you."
  },
  {
    name: "Web",
    level: 2,
    description: "You conjure a mass of thick, sticky webbing at a point of your choice within range. The webs fill a 20-foot cube from that point for the duration."
  },
  // Level 3 Spells
  {
    name: "Animate Dead",
    level: 3,
    description: "This spell creates an undead servant. Choose a pile of bones or a corpse of a Medium or Small humanoid within range. Your spell imbues the target with a foul mimicry of life, raising it as an undead creature."
  },
  {
    name: "Beacon of Hope",
    level: 3,
    description: "This spell bestows hope and vitality. Choose any number of creatures within range. For the duration, each target has advantage on Wisdom saving throws and death saving throws, and regains the maximum number of hit points possible from any healing."
  },
  {
    name: "Counterspell",
    level: 3,
    description: "You attempt to interrupt a creature in the process of casting a spell. If the creature is casting a spell of 3rd level or lower, its spell fails and has no effect. If it is casting a spell of 4th level or higher, make an ability check using your spellcasting ability."
  },
  {
    name: "Dispel Magic",
    level: 3,
    description: "Choose one creature, object, or magical effect within range. Any spell of 3rd level or lower on the target ends. For each spell of 4th level or higher on the target, make an ability check using your spellcasting ability."
  },
  {
    name: "Fireball",
    level: 3,
    description: "A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one."
  },
  {
    name: "Fly",
    level: 3,
    description: "You touch a willing creature. The target gains a flying speed of 60 feet for the duration. When the spell ends, the target falls if it is still aloft, unless it can stop the fall."
  },
  {
    name: "Haste",
    level: 3,
    description: "Choose a willing creature that you can see within range. Until the spell ends, the target's speed is doubled, it gains a +2 bonus to AC, it has advantage on Dexterity saving throws, and it gains an additional action on each of its turns."
  },
  {
    name: "Lightning Bolt",
    level: 3,
    description: "A stroke of lightning forming a line 100 feet long and 5 feet wide blasts out from you in a direction you choose. Each creature in the line must make a Dexterity saving throw. A creature takes 8d6 lightning damage on a failed save, or half as much damage on a successful one."
  },
  {
    name: "Mass Healing Word",
    level: 3,
    description: "As you call out words of restoration, up to six creatures of your choice that you can see within range regain hit points equal to 1d4 + your spellcasting ability modifier. This spell has no effect on undead or constructs."
  },
  {
    name: "Revivify",
    level: 3,
    description: "You touch a creature that has died within the last minute. That creature returns to life with 1 hit point. This spell can't return to life a creature that has died of old age, nor can it restore any missing body parts."
  },
  {
    name: "Slow",
    level: 3,
    description: "You alter time around up to six creatures of your choice in a 40-foot cube within range. Each target must succeed on a Wisdom saving throw or be affected by this spell for the duration."
  },
  {
    name: "Speak with Dead",
    level: 3,
    description: "You grant the semblance of life and intelligence to a corpse of your choice within range, allowing it to answer the questions you pose. The corpse must still have a mouth and can't be undead."
  },
  // Level 4 Spells
  {
    name: "Blight",
    level: 4,
    description: "Necromantic energy washes over a creature of your choice that you can see within range, draining moisture and vitality from it. The target must make a Constitution saving throw. The target takes 8d8 necrotic damage on a failed save, or half as much damage on a successful one. This spell has no effect on undead or constructs."
  },
  {
    name: "Dimension Door",
    level: 4,
    description: "You teleport yourself from your current location to any other spot within range. You arrive at exactly the spot desired. It can be a place you can see, one you can visualize, or one you can describe by stating distance and direction."
  },
  {
    name: "Greater Invisibility",
    level: 4,
    description: "You or a creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target's person."
  },
  {
    name: "Ice Storm",
    level: 4,
    description: "A hail of rock-hard ice pounds to the ground in a 20-foot-radius, 40-foot-high cylinder centered on a point within range. Each creature in the cylinder must make a Dexterity saving throw. A creature takes 2d8 bludgeoning damage and 4d6 cold damage on a failed save, or half as much damage on a successful one."
  },
  {
    name: "Polymorph",
    level: 4,
    description: "This spell transforms a creature that you can see within range into a new form. An unwilling creature must make a Wisdom saving throw to avoid the effect. The spell has no effect on a shapechanger or a creature with 0 hit points."
  },
  {
    name: "Stoneskin",
    level: 4,
    description: "This spell turns the flesh of a willing creature you touch as hard as stone. Until the spell ends, the target has resistance to nonmagical bludgeoning, piercing, and slashing damage."
  },
  // Level 5 Spells
  {
    name: "Animate Objects",
    level: 5,
    description: "Objects come to life at your command. Choose up to ten nonmagical objects within range that are not being worn or carried. Medium targets count as two objects, Large targets count as four, and Huge targets count as eight. You can't animate any object larger than Huge. Each target animates and becomes a creature under your control until the spell ends or until reduced to 0 hit points."
  },
  {
    name: "Cloudkill",
    level: 5,
    description: "You create a 20-foot-radius sphere of poisonous, yellow-green fog centered on a point you choose within range. The fog spreads around corners. It lasts for the duration or until strong wind disperses the fog, ending the spell. Its area is heavily obscured."
  },
  {
    name: "Cone of Cold",
    level: 5,
    description: "A blast of cold air erupts from your hands. Each creature in a 60-foot cone must make a Constitution saving throw. A creature takes 8d8 cold damage on a failed save, or half as much damage on a successful one."
  },
  {
    name: "Flame Strike",
    level: 5,
    description: "A vertical column of divine fire roars down from the heavens in a location you specify. Each creature in a 10-foot-radius, 40-foot-high cylinder centered on a point within range must make a Dexterity saving throw. A creature takes 4d6 fire damage and 4d6 radiant damage on a failed save, or half as much damage on a successful one."
  },
  {
    name: "Mass Cure Wounds",
    level: 5,
    description: "A wave of healing energy washes out from a point of your choice within range. Choose up to six creatures in a 30-foot-radius sphere centered on that point. Each target regains hit points equal to 3d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs."
  },
  {
    name: "Raise Dead",
    level: 5,
    description: "You return a dead creature you touch to life, provided that it has been dead for no more than 10 days. If the creature's soul is both willing and at liberty to rejoin the body, the creature returns to life with 1 hit point."
  },
  // And so on for higher level spells...
];
