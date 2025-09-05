import React, { useState } from 'react';
import type { Character } from '../types';
import { RACES, CLASSES, ABILITIES } from '../constants';
import AIFeatures from './AIFeatures';
import Tooltip from './Tooltip';

interface CharacterCreatorProps {
  onCharacterCreate: (character: Character) => void;
}

const calculateModifier = (score: number): number => Math.floor((score - 10) / 2);

const rollAbilityScore = (): number => {
  const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
  rolls.sort((a, b) => a - b);
  rolls.shift(); // Drop the lowest
  return rolls.reduce((sum, roll) => sum + roll, 0);
};

const CharacterCreator: React.FC<CharacterCreatorProps> = ({ onCharacterCreate }) => {
  const [name, setName] = useState('');
  const [race, setRace] = useState(RACES[0]);
  const [charClass, setCharClass] = useState(CLASSES[0]);
  const [scores, setScores] = useState<Record<string, number> | null>(null);
  const [maxHp, setMaxHp] = useState(10);
  const [ac, setAc] = useState(10);
  const [xpToNextLevel, setXpToNextLevel] = useState(300);
  const [portrait, setPortrait] = useState<string | undefined>(undefined);
  const [backstory, setBackstory] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !race || !charClass || !scores) {
      alert("Please fill out all fields and roll for stats.");
      return;
    }

    const abilityScores: Character['abilityScores'] = ABILITIES.reduce((acc, ability) => {
        acc[ability as keyof Character['abilityScores']] = {
            score: scores[ability],
            modifier: calculateModifier(scores[ability]),
        };
        return acc;
    }, {} as Character['abilityScores']);

    onCharacterCreate({
        id: `${Date.now()}-${name}`,
        name,
        race,
        charClass,
        abilityScores,
        inventory: [],
        hp: { current: maxHp, max: maxHp },
        ac,
        xp: { current: 0, nextLevel: xpToNextLevel },
        spells: [],
        weapons: [],
        armor: [],
        currency: { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 },
        portrait,
        backstory,
    });
  };

  // FIX: Implement handleRollStats to generate ability scores.
  const handleRollStats = () => {
    const newScores: Record<string, number> = {};
    ABILITIES.forEach(ability => {
        newScores[ability] = rollAbilityScore();
    });
    setScores(newScores);
  };

  const isFormComplete = name && race && charClass;

  return (
    <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6 text-center tracking-wide">Create a New Hero</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <label htmlFor="name" className="block text-gray-300 mb-2">Character Name</label>
            <Tooltip tip="Enter the name your character will be known by." className="block w-full">
                <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-900/80 border border-gray-600 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500"
                required
                />
            </Tooltip>
          </div>
          <div>
            <label htmlFor="race" className="block text-gray-300 mb-2">Race</label>
            <Tooltip tip="Choose your character's ancestry. This influences their abilities and culture." className="block w-full">
                <select id="race" value={race} onChange={(e) => setRace(e.target.value)} className="w-full bg-gray-900/80 border border-gray-600 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500">
                {RACES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
            </Tooltip>
          </div>
          <div>
            <label htmlFor="charClass" className="block text-gray-300 mb-2">Class</label>
            <Tooltip tip="Choose your character's profession. This determines their skills and combat style." className="block w-full">
                <select id="charClass" value={charClass} onChange={(e) => setCharClass(e.target.value)} className="w-full bg-gray-900/80 border border-gray-600 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500">
                {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </Tooltip>
          </div>
        </div>

        {isFormComplete && (
            <AIFeatures 
                character={{ name, race, charClass }} 
                onPortraitGenerated={setPortrait}
                onBackstoryGenerated={setBackstory}
            />
        )}

        <div className="text-center pt-4">
            <Tooltip tip="Randomly generate your character's six ability scores. This is the traditional D&D method!">
                <button
                    type="button"
                    onClick={handleRollStats}
                    disabled={!isFormComplete}
                    className="px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition-colors disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    Roll for Stats (4d6 drop lowest)
                </button>
            </Tooltip>
        </div>

        {scores && (
          <>
            <div className="pt-4">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Ability Scores</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
                {ABILITIES.map(ability => (
                  <div key={ability} className="bg-gray-900/70 p-3 rounded-lg border border-gray-600">
                    <div className="text-sm text-purple-300 uppercase">{ability.substring(0,3)}</div>
                    <div className="text-3xl font-bold">{scores[ability]}</div>
                    <div className="text-lg text-gray-200">{calculateModifier(scores[ability]) >= 0 ? `+${calculateModifier(scores[ability])}` : calculateModifier(scores[ability])}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
                <h3 className="text-xl font-bold text-white mb-4 text-center">Vitals</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="maxHp" className="block text-gray-300 mb-2">Max HP</label>
                        <Tooltip tip="Set your character's maximum Hit Points. When HP reaches 0, you're knocked out!">
                            <input
                            id="maxHp"
                            type="number"
                            value={maxHp}
                            onChange={(e) => setMaxHp(Math.max(1, parseInt(e.target.value, 10) || 1))}
                            className="w-full bg-gray-900/80 border border-gray-600 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500"
                            />
                        </Tooltip>
                    </div>
                    <div>
                        <label htmlFor="ac" className="block text-gray-300 mb-2">Armor Class</label>
                         <Tooltip tip="Set your character's Armor Class. Enemies must roll higher than this number to hit you.">
                            <input
                            id="ac"
                            type="number"
                            value={ac}
                            onChange={(e) => setAc(Math.max(1, parseInt(e.target.value, 10) || 1))}
                            className="w-full bg-gray-900/80 border border-gray-600 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500"
                            />
                        </Tooltip>
                    </div>
                    <div>
                        <label htmlFor="xpToNextLevel" className="block text-gray-300 mb-2">XP for Next Level</label>
                         <Tooltip tip="Set the experience points needed to reach the next level. The default for level 1 is 300 XP.">
                            <input
                            id="xpToNextLevel"
                            type="number"
                            value={xpToNextLevel}
                            onChange={(e) => setXpToNextLevel(Math.max(1, parseInt(e.target.value, 10) || 1))}
                            className="w-full bg-gray-900/80 border border-gray-600 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500"
                            />
                        </Tooltip>
                    </div>
                </div>
            </div>
          </>
        )}

        {scores && (
            <div className="text-center pt-6">
                <Tooltip tip="Finalize your choices and create your hero.">
                    <button 
                    type="submit"
                    className="w-full md:w-auto px-12 py-4 bg-green-700 text-white font-bold rounded-lg hover:bg-green-600 transition-colors text-lg"
                    >
                        Create Character
                    </button>
                </Tooltip>
            </div>
        )}
      </form>
    </div>
  );
};

export default CharacterCreator;