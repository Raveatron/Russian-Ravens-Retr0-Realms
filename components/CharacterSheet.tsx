import React, { useState, useMemo, useEffect } from 'react';
import type { Character, RollResult, Spell, Weapon } from '../types';
import { SKILLS, ABILITIES } from '../constants';
import { SRD_ITEMS } from '../data/srd-items';
import { SRD_WEAPONS } from '../data/srd-weapons';
import { SRD_SPELLS } from '../data/srd-spells';
import { SRD_ARMOR } from '../data/srd-armor';
import CharacterPortrait from './CharacterPortrait';
import Tooltip from './Tooltip';

interface CharacterSheetProps {
  character: Character;
  onSkillCheck: (result: Omit<RollResult, 'id' | 'timestamp'>) => void;
  onDelete: () => void;
  onUpdate: (character: Character) => void;
}

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 font-bold transition-colors rounded-t-md ${active ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700/50'}`}
    >
        {children}
    </button>
);


const CharacterSheet: React.FC<CharacterSheetProps> = ({ character, onSkillCheck, onDelete, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('core');
  const [exportCopied, setExportCopied] = useState(false);

  // Inventory State
  const [itemName, setItemName] = useState(SRD_ITEMS[0]?.items[0]?.name || '');
  const [itemQuantity, setItemQuantity] = useState(1);
  
  // Spellbook State
  const [spellName, setSpellName] = useState(SRD_SPELLS[0]?.name || '');

  // Weapon State
  const [weaponName, setWeaponName] = useState(SRD_WEAPONS[0]?.name || '');
  const [weaponAtkBonus, setWeaponAtkBonus] = useState('+0');
  const [weaponDamage, setWeaponDamage] = useState(SRD_WEAPONS[0]?.damage || '1d4');
  
  // Armor State
  const [armorName, setArmorName] = useState(SRD_ARMOR[0]?.name || '');
  const [armorAc, setArmorAc] = useState(SRD_ARMOR[0]?.ac || '');
  const [armorProperties, setArmorProperties] = useState(SRD_ARMOR[0]?.properties || '');

  const selectedSpell = useMemo(() => SRD_SPELLS.find(s => s.name === spellName), [spellName]);

  useEffect(() => {
    const selectedWeapon = SRD_WEAPONS.find(w => w.name === weaponName);
    if (selectedWeapon) {
        setWeaponDamage(selectedWeapon.damage);
    }
  }, [weaponName]);

  useEffect(() => {
    const selectedArmor = SRD_ARMOR.find(a => a.name === armorName);
    if (selectedArmor) {
        setArmorAc(selectedArmor.ac);
        setArmorProperties(selectedArmor.properties);
    }
  }, [armorName]);


  const handleRoll = (skillName: string, modifier: number) => {
    const roll = Math.floor(Math.random() * 20) + 1;
    onSkillCheck({
      notation: `1d20 + ${modifier}`,
      total: roll + modifier,
      rolls: [roll],
      reason: `${character.name}'s ${skillName} Check`,
    });
  };

  const handleUpdate = (field: string, value: any) => {
      const keys = field.split('.');
      const newCharacter = JSON.parse(JSON.stringify(character));
      let current = newCharacter;
      for(let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      onUpdate(newCharacter);
  };
  
  // Vitals Handler
  const handleVitalsChange = (field: 'hp.current' | 'hp.max' | 'ac' | 'xp.current' | 'xp.nextLevel', value: number) => {
    const newCharacter = { ...character };
    switch (field) {
      case 'hp.current':
        newCharacter.hp.current = Math.max(0, Math.min(value, newCharacter.hp.max));
        break;
      case 'hp.max':
        newCharacter.hp.max = Math.max(1, value);
        newCharacter.hp.current = Math.min(newCharacter.hp.current, newCharacter.hp.max);
        break;
      case 'ac':
        newCharacter.ac = Math.max(0, value);
        break;
      case 'xp.current':
        newCharacter.xp.current = Math.max(0, value);
        break;
      case 'xp.nextLevel':
        newCharacter.xp.nextLevel = Math.max(1, value);
        break;
    }
    onUpdate(newCharacter);
  };

  const handleExport = () => {
    const charString = JSON.stringify(character);
    const encoded = btoa(charString);
    navigator.clipboard.writeText(encoded);
    setExportCopied(true);
    setTimeout(() => setExportCopied(false), 2500);
  }

  const hpPercentage = character.hp.max > 0 ? (character.hp.current / character.hp.max) * 100 : 0;
  const xpPercentage = character.xp.nextLevel > 0 ? (character.xp.current / character.xp.nextLevel) * 100 : 0;
  
  const groupedSpells = useMemo(() => {
    return character.spells.reduce((acc, spell) => {
        const level = spell.level;
        if (!acc[level]) {
            acc[level] = [];
        }
        acc[level].push(spell);
        return acc;
    }, {} as Record<number, Spell[]>);
  }, [character.spells]);
  
  return (
    <div className="text-gray-200 relative space-y-6 max-w-5xl mx-auto bg-gray-800/50 p-6 rounded-lg shadow-lg border border-purple-500/20">
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <Tooltip tip={exportCopied ? "Character code copied!" : "Copy a code to share this character with your DM."}>
            <button
                onClick={handleExport}
                className="px-3 py-1 bg-sky-700 hover:bg-sky-600 text-white rounded-md text-sm font-semibold transition-colors"
            >
                {exportCopied ? 'Copied ✔' : 'Export'}
            </button>
        </Tooltip>
        <Tooltip tip="Delete this character permanently.">
            <button 
            onClick={onDelete}
            className="px-3 py-1 bg-red-800 hover:bg-red-700 text-white rounded-md text-sm font-semibold transition-colors"
            >
            Delete
            </button>
        </Tooltip>
      </div>

      <div className="text-center">
        <h2 className="text-4xl font-bold text-white">{character.name}</h2>
        <p className="text-lg text-gray-300">{character.race} {character.charClass}</p>
      </div>

      <div className="flex space-x-2 border-b-2 border-gray-700">
        <TabButton active={activeTab === 'core'} onClick={() => setActiveTab('core')}>Core</TabButton>
        <TabButton active={activeTab === 'equipment'} onClick={() => setActiveTab('equipment')}>Equipment</TabButton>
        <TabButton active={activeTab === 'spellbook'} onClick={() => setActiveTab('spellbook')}>Spellbook</TabButton>
        <TabButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>Profile</TabButton>
      </div>

      <div className="bg-gray-800/50 p-4 rounded-b-lg border border-t-0 border-gray-700">
        {activeTab === 'core' && (
             <div className="space-y-6">
                 {/* Vitals Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-900/70 p-3 rounded-lg border border-gray-600">
                        <label className="text-lg font-bold text-purple-300 uppercase tracking-wider">HP</label>
                        <div className="flex items-center justify-center gap-2 my-2">
                             <Tooltip tip="Your current Hit Points. You are knocked out at 0.">
                                <input type="number" aria-label="Current HP" value={character.hp.current} onChange={(e) => handleVitalsChange('hp.current', parseInt(e.target.value, 10) || 0)} className="w-20 text-center bg-gray-800/80 border border-gray-600 rounded-md p-1 text-white text-2xl font-bold" />
                             </Tooltip>
                            <span className="text-2xl">/</span>
                            <Tooltip tip="Your maximum Hit Points.">
                                <input type="number" aria-label="Maximum HP" value={character.hp.max} onChange={(e) => handleVitalsChange('hp.max', parseInt(e.target.value, 10) || 1)} className="w-20 text-center bg-gray-800/80 border border-gray-600 rounded-md p-1 text-white text-2xl font-bold" />
                            </Tooltip>
                        </div>
                        <div className="w-full bg-red-900/50 rounded-full h-2.5 border border-gray-600"><div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${hpPercentage}%` }}></div></div>
                    </div>
                    <div className="bg-gray-900/70 p-3 rounded-lg border border-gray-600 flex flex-col justify-center items-center">
                        <label className="text-lg font-bold text-purple-300 uppercase tracking-wider">Armour Class</label>
                        <Tooltip tip="Your total Armor Class. An enemy must roll this number or higher to hit you.">
                             <input type="number" aria-label="Armor Class" value={character.ac} onChange={(e) => handleVitalsChange('ac', parseInt(e.target.value, 10) || 0)} className="w-24 text-center bg-gray-800/80 border border-gray-600 rounded-md p-1 text-white text-4xl font-bold mt-2" />
                        </Tooltip>
                    </div>
                    <div className="bg-gray-900/70 p-3 rounded-lg border border-gray-600">
                        <label className="text-lg font-bold text-purple-300 uppercase tracking-wider">XP</label>
                        <div className="flex items-center justify-center gap-2 my-2">
                            <Tooltip tip="Your current Experience Points.">
                                <input type="number" aria-label="Current XP" value={character.xp.current} onChange={(e) => handleVitalsChange('xp.current', parseInt(e.target.value, 10) || 0)} className="w-24 text-center bg-gray-800/80 border border-gray-600 rounded-md p-1 text-white text-xl font-bold" />
                            </Tooltip>
                            <span className="text-xl">/</span>
                            <Tooltip tip="The XP needed to reach the next level.">
                                <input type="number" aria-label="XP to next level" value={character.xp.nextLevel} onChange={(e) => handleVitalsChange('xp.nextLevel', parseInt(e.target.value, 10) || 1)} className="w-24 text-center bg-gray-800/80 border border-gray-600 rounded-md p-1 text-white text-xl font-bold" />
                            </Tooltip>
                        </div>
                        <div className="w-full bg-sky-900/50 rounded-full h-2.5 border border-gray-600"><div className="bg-sky-500 h-2.5 rounded-full" style={{ width: `${xpPercentage}%` }}></div></div>
                    </div>
                </div>

                {/* Scores & Skills */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <h3 className="text-2xl font-bold text-white mb-4 text-center border-b-2 border-gray-700 pb-2">Scores</h3>
                        <div className="grid grid-cols-3 gap-2 text-center">
                            {ABILITIES.map(ability => {
                                const key = ability as keyof typeof character.abilityScores;
                                const { score, modifier } = character.abilityScores[key];
                                return (
                                <Tooltip key={ability} tip={`${ability} Score: ${score}. Modifier: ${modifier >= 0 ? `+${modifier}` : modifier}`}>
                                    <div className="bg-gray-900/70 p-3 rounded-lg border border-gray-600">
                                        <div className="text-sm text-purple-300 uppercase">{ability.substring(0,3)}</div>
                                        <div className="text-3xl font-bold">{score}</div>
                                        <div className="text-lg text-gray-200">{modifier >= 0 ? `+${modifier}` : modifier}</div>
                                    </div>
                                </Tooltip>
                                );
                            })}
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold text-white mb-4 text-center border-b-2 border-gray-700 pb-2">Skills</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                        {SKILLS.map(skill => {
                            const abilityKey = skill.ability as keyof typeof character.abilityScores;
                            const modifier = character.abilityScores[abilityKey].modifier;
                            return (
                            <li key={skill.name} className="flex justify-between items-center bg-gray-900/60 p-2 rounded-md">
                                <span className="font-semibold">{skill.name} <span className="text-purple-300 text-sm">({skill.ability.substring(0,3)})</span></span>
                                <div className="flex items-center space-x-3">
                                <span className="font-bold text-lg">{modifier >= 0 ? `+${modifier}` : modifier}</span>
                                <Tooltip tip={`Roll a ${skill.name} check (1d20 + ${modifier})`}>
                                    <button onClick={() => handleRoll(skill.name, modifier)} className="px-3 py-1 bg-purple-700 text-white rounded hover:bg-purple-600 transition-colors font-bold text-sm">Roll</button>
                                </Tooltip>
                                </div>
                            </li>
                            );
                        })}
                        </ul>
                    </div>
                </div>
            </div>
        )}
        {activeTab === 'equipment' && (
            <div className="space-y-6">
                 {/* Currency & Weapons */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4 text-center border-b-2 border-gray-700 pb-2">Currency</h3>
                        <div className="grid grid-cols-5 gap-2 text-center bg-gray-900/60 p-4 rounded-md">
                            {(Object.keys(character.currency) as Array<keyof typeof character.currency>).map(coin => (
                                <div key={coin}>
                                    <label className="text-sm font-bold text-purple-300 uppercase">{coin}</label>
                                    <Tooltip tip={`Your ${coin.toUpperCase()} pieces. Click to edit.`}>
                                        <input type="number" value={character.currency[coin]} onChange={(e) => handleUpdate(`currency.${coin}`, parseInt(e.target.value, 10) || 0)} className="w-full text-center bg-gray-800/80 border border-gray-600 rounded-md p-1 text-white font-bold mt-1" />
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4 text-center border-b-2 border-gray-700 pb-2">Weapons</h3>
                        <div className="bg-gray-900/60 p-4 rounded-md">
                            <ul className="space-y-2 mb-4 max-h-24 overflow-y-auto pr-2">
                                {character.weapons.map((w, i) => (
                                <li key={`${w.name}-${i}`} className="grid grid-cols-3 gap-2 items-center bg-gray-800/70 p-2 rounded-md text-sm">
                                    <span className="font-semibold col-span-1">{w.name}</span>
                                    <span className="text-center font-bold">{w.atkBonus}</span>
                                    <div className="flex justify-end items-center gap-2">
                                        <span className="text-center font-bold">{w.damage}</span>
                                        <button onClick={() => handleUpdate('weapons', character.weapons.filter((_, index) => index !== i))} className="px-2 py-0.5 bg-red-800 text-white rounded hover:bg-red-700 transition-colors font-bold text-xs">&times;</button>
                                    </div>
                                </li>
                                ))}
                            </ul>
                            <form onSubmit={(e) => { e.preventDefault(); handleUpdate('weapons', [...character.weapons, {name: weaponName, atkBonus: weaponAtkBonus, damage: weaponDamage}].sort((a,b) => a.name.localeCompare(b.name))) }} className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-3 gap-2 items-end">
                                <div className="col-span-3 sm:col-span-1"><label className="text-sm text-gray-300 mb-1 block">Weapon</label><select value={weaponName} onChange={e => setWeaponName(e.target.value)} className="w-full bg-gray-900/80 border border-gray-600 rounded-md p-2 text-white"><option value="">Select...</option>{SRD_WEAPONS.map(w => <option key={w.name} value={w.name}>{w.name}</option>)}</select></div>
                                <div className="col-span-3 sm:col-span-1"><label className="text-sm text-gray-300 mb-1 block">Atk Bonus</label><input type="text" value={weaponAtkBonus} onChange={e => setWeaponAtkBonus(e.target.value)} className="w-full bg-gray-900/80 border border-gray-600 rounded-md p-2 text-white" /></div>
                                <div className="col-span-3 sm:col-span-1"><label className="text-sm text-gray-300 mb-1 block">Damage</label><input type="text" value={weaponDamage} onChange={e => setWeaponDamage(e.target.value)} className="w-full bg-gray-900/80 border border-gray-600 rounded-md p-2 text-white" /></div>
                                <button type="submit" className="col-span-3 mt-2 w-full px-4 py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">Add Weapon</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Armor */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-4 text-center border-b-2 border-gray-700 pb-2">Armor</h3>
                    <div className="bg-gray-900/60 p-4 rounded-md">
                        <ul className="space-y-2 mb-4 max-h-24 overflow-y-auto pr-2">
                            {character.armor.map((a, i) => (
                            <li key={`${a.name}-${i}`} className="grid grid-cols-3 gap-2 items-center bg-gray-800/70 p-2 rounded-md text-sm">
                                <span className="font-semibold col-span-1">{a.name}</span>
                                <span className="text-center font-bold">{a.ac}</span>
                                <div className="flex justify-end items-center gap-2">
                                    <span className="text-right text-xs text-gray-400 truncate" title={a.properties}>{a.properties || '—'}</span>
                                    <button onClick={() => handleUpdate('armor', character.armor.filter((_, index) => index !== i))} className="flex-shrink-0 px-2 py-0.5 bg-red-800 text-white rounded hover:bg-red-700 transition-colors font-bold text-xs">&times;</button>
                                </div>
                            </li>
                            ))}
                        </ul>
                        <form onSubmit={(e) => { e.preventDefault(); handleUpdate('armor', [...character.armor, {name: armorName, ac: armorAc, properties: armorProperties}].sort((a,b) => a.name.localeCompare(b.name))) }} className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-2 items-end">
                            <div className="sm:col-span-2"><label className="text-sm text-gray-300 mb-1 block">Armor</label><select value={armorName} onChange={e => setArmorName(e.target.value)} className="w-full bg-gray-900/80 border border-gray-600 rounded-md p-2 text-white"><option value="">Select...</option>{SRD_ARMOR.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}</select></div>
                            <div><label className="text-sm text-gray-300 mb-1 block">AC / Bonus</label><input type="text" value={armorAc} onChange={e => setArmorAc(e.target.value)} className="w-full bg-gray-900/80 border border-gray-600 rounded-md p-2 text-white" /></div>
                            <div><label className="text-sm text-gray-300 mb-1 block">Properties</label><input type="text" value={armorProperties} onChange={e => setArmorProperties(e.target.value)} className="w-full bg-gray-900/80 border border-gray-600 rounded-md p-2 text-white" placeholder="e.g. Stealth Disadvantage"/></div>
                            <button type="submit" className="sm:col-span-2 mt-2 w-full px-4 py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">Add Armor</button>
                        </form>
                    </div>
                </div>

                {/* Inventory */}
                 <div>
                    <h3 className="text-2xl font-bold text-white mb-4 text-center border-b-2 border-gray-700 pb-2">Inventory</h3>
                    <div className="bg-gray-900/60 p-4 rounded-md">
                        <ul className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-2">
                            {character.inventory.map((item, index) => (<li key={`${item.name}-${index}`} className="flex justify-between items-center bg-gray-800/70 p-2 rounded-md"><span className="font-semibold">{item.name}</span><div className="flex items-center space-x-3"><span className="font-bold text-lg">x{item.quantity}</span><button onClick={() => handleUpdate('inventory', character.inventory.filter((_, i) => i !== index))} className="px-2 py-0.5 bg-red-800 text-white rounded hover:bg-red-700 font-bold text-xs">&times;</button></div></li>))}
                        </ul>
                        <form onSubmit={e => { e.preventDefault(); const existing = character.inventory.find(i => i.name === itemName); if (existing) { handleUpdate('inventory', character.inventory.map(i => i.name === itemName ? {...i, quantity: i.quantity + itemQuantity} : i)); } else { handleUpdate('inventory', [...character.inventory, {name: itemName, quantity: itemQuantity}].sort((a,b) => a.name.localeCompare(b.name))); } }} className="mt-4 pt-4 border-t border-gray-700 flex flex-col sm:flex-row gap-2 items-stretch sm:items-end">
                            <div className="flex-grow"><select id="itemName" value={itemName} onChange={e => setItemName(e.target.value)} className="w-full bg-gray-900/80 border border-gray-600 rounded-md p-2 text-white h-full">{SRD_ITEMS.map(c => <optgroup label={c.category} key={c.category}>{c.items.map(i => <option key={i.name} value={i.name}>{i.name}</option>)}</optgroup>)}</select></div>
                            <div className="w-full sm:w-auto"><input id="itemQuantity" type="number" value={itemQuantity} onChange={e => setItemQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))} min="1" className="w-full sm:w-24 bg-gray-900/80 border border-gray-600 rounded-md p-2 text-white" required/></div>
                            <button type="submit" className="w-full sm:w-auto px-4 py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-green-600">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        )}
        {activeTab === 'spellbook' && (
             <div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center border-b-2 border-gray-700 pb-2">Spellbook</h3>
                <div className="bg-gray-900/60 p-4 rounded-md">
                    {character.spells.length === 0 ? <p className="text-gray-400 text-center py-2">Your spellbook is empty.</p> : (
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {Object.entries(groupedSpells).map(([level, spells]) => (
                            <div key={level}>
                                <h4 className="text-lg font-bold text-purple-300 sticky top-0 bg-gray-900/80 backdrop-blur-sm py-1 px-2 rounded-t-md">{parseInt(level) === 0 ? 'Cantrips' : `Level ${level}`}</h4>
                                <ul className="space-y-2 p-2 bg-gray-800/50 rounded-b-md">
                                    {spells.map(spell => (
                                    <li key={spell.name}><details className="bg-gray-900/70 p-2 rounded-md group"><summary className="flex justify-between items-center cursor-pointer"><span className="font-semibold">{spell.name}</span><button onClick={e => { e.preventDefault(); handleUpdate('spells', character.spells.filter(s => s.name !== spell.name)); }} className="px-2 py-0.5 bg-red-800 text-white rounded hover:bg-red-700 font-bold text-xs opacity-0 group-hover:opacity-100">&times;</button></summary><p className="mt-2 pt-2 border-t border-gray-700 text-gray-300 text-sm whitespace-pre-wrap">{spell.description}</p></details></li>))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    )}
                    <form onSubmit={e => { e.preventDefault(); if(selectedSpell && !character.spells.find(s => s.name === selectedSpell.name)) { handleUpdate('spells', [...character.spells, selectedSpell].sort((a,b) => a.level - b.level || a.name.localeCompare(b.name))) } }} className="mt-4 pt-4 border-t border-gray-700 space-y-4">
                        <div><label htmlFor="spellName" className="block text-gray-300 mb-1 text-sm">Spell Name</label><select id="spellName" value={spellName} onChange={e => setSpellName(e.target.value)} className="w-full bg-gray-900/80 border border-gray-600 rounded-md p-2 text-white">{SRD_SPELLS.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}</select></div>
                        {selectedSpell && (<>
                            <p className="text-gray-300 text-sm">Level: <span className="font-bold">{selectedSpell.level === 0 ? 'Cantrip' : selectedSpell.level}</span></p>
                            <p className="text-gray-300 text-sm">Description:</p>
                            <p className="text-gray-300 text-sm whitespace-pre-wrap bg-gray-900/70 p-2 rounded-md h-24 overflow-y-auto">{selectedSpell.description}</p>
                        </>)}
                        <button type="submit" className="w-full px-4 py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-green-600">Add Spell</button>
                    </form>
                </div>
            </div>
        )}
        {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                     <h3 className="text-2xl font-bold text-white mb-4 text-center border-b-2 border-gray-700 pb-2">Portrait</h3>
                    <CharacterPortrait name={character.name} portrait={character.portrait} />
                </div>
                <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold text-white mb-4 text-center border-b-2 border-gray-700 pb-2">Backstory & Notes</h3>
                    <div className="space-y-4">
                        <div className="bg-gray-900/60 p-4 rounded-md">
                            <h4 className="font-bold text-lg text-purple-300">Backstory</h4>
                            <p className="text-gray-300 whitespace-pre-wrap mt-2 text-sm max-h-48 overflow-y-auto">{character.backstory || 'No backstory generated.'}</p>
                        </div>
                         <div className="bg-gray-900/60 p-4 rounded-md">
                            <h4 className="font-bold text-lg text-purple-300">Notes</h4>
                            <Tooltip tip="Jot down notes from your sessions, character thoughts, or quest reminders. This is not saved with your character data." className="block w-full">
                                <textarea 
                                    className="w-full h-48 bg-gray-800/80 border border-gray-600 rounded-md p-2 text-white mt-2"
                                    placeholder="Keep your session notes here..."
                                ></textarea>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default CharacterSheet;