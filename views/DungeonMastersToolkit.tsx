import React, { useState, useMemo } from 'react';
import { SRD_SPELLS } from '../data/srd-spells';
import { SRD_WEAPONS } from '../data/srd-weapons';
import { SRD_ITEMS } from '../data/srd-items';
import { SRD_MONSTERS } from '../data/srd-monsters';
import type { Monster, Spell } from '../types';

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 font-bold transition-colors rounded-t-md ${active ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700/50'}`}
    >
        {children}
    </button>
);

const DungeonMastersToolkit: React.FC = () => {
    const [activeTab, setActiveTab] = useState('monsters');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMonsters = useMemo(() => SRD_MONSTERS.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm]);
    const filteredSpells = useMemo(() => SRD_SPELLS.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm]);
    const allItems = useMemo(() => [...SRD_WEAPONS, ...SRD_ITEMS.flatMap(c => c.items)], []);
    const filteredItems = useMemo(() => allItems.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm, allItems]);

    return (
        <div className="max-w-7xl mx-auto text-gray-200">
            <div className="flex space-x-2 border-b-2 border-gray-700">
                <TabButton active={activeTab === 'monsters'} onClick={() => setActiveTab('monsters')}>Bestiary</TabButton>
                <TabButton active={activeTab === 'spells'} onClick={() => setActiveTab('spells')}>Spells</TabButton>
                <TabButton active={activeTab === 'items'} onClick={() => setActiveTab('items')}>Items</TabButton>
            </div>
             <div className="bg-gray-800/50 p-4 rounded-b-lg border border-t-0 border-gray-700">
                <input 
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full p-2 mb-4 bg-gray-900 border border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500"
                />

                <div className="max-h-[60vh] overflow-y-auto pr-2">
                    {activeTab === 'monsters' && (
                        <div className="space-y-4">
                            {filteredMonsters.map(monster => <MonsterCard key={monster.name} monster={monster} />)}
                        </div>
                    )}
                     {activeTab === 'spells' && (
                        <div className="space-y-2">
                            {filteredSpells.map(spell => <SpellCard key={spell.name} spell={spell} />)}
                        </div>
                    )}
                     {activeTab === 'items' && (
                        <ul className="space-y-2">
                            {filteredItems.map(item => <li key={item.name} className="p-2 bg-gray-900/70 rounded-md">{item.name}</li>)}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

const MonsterCard: React.FC<{ monster: Monster }> = ({ monster }) => (
    <details className="bg-gray-900/70 rounded-lg p-4 border border-gray-700 group">
        <summary className="font-bold text-xl text-purple-300 cursor-pointer">{monster.name} <span className="text-sm font-normal text-gray-400">CR {monster.cr}</span></summary>
        <div className="mt-4 pt-4 border-t border-gray-600 space-y-2 text-sm">
           <p><em>{monster.size} {monster.type}, {monster.alignment}</em></p>
           <p><strong>Armor Class:</strong> {monster.ac}</p>
           <p><strong>Hit Points:</strong> {monster.hp}</p>
           <p><strong>Speed:</strong> {monster.speed}</p>
           <div className="grid grid-cols-6 gap-2 text-center my-2">
                {['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map((stat, i) => (
                    <div key={stat} className="bg-gray-800 p-2 rounded">
                        <div className="font-bold">{stat}</div>
                        <div>{monster.stats[i]} ({Math.floor((monster.stats[i] - 10) / 2) >= 0 ? '+' : ''}{Math.floor((monster.stats[i] - 10) / 2)})</div>
                    </div>
                ))}
            </div>
            {monster.senses && <p><strong>Senses:</strong> {monster.senses}</p>}
            {monster.languages && <p><strong>Languages:</strong> {monster.languages}</p>}
            <div className="space-y-2 mt-4">
                <h4 className="font-bold text-lg text-purple-400 border-b border-gray-600 pb-1">Actions</h4>
                {monster.actions.map(action => (
                    <div key={action.name}>
                        <p><strong><em>{action.name}.</em></strong> {action.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </details>
);

const SpellCard: React.FC<{ spell: Spell }> = ({ spell }) => (
     <details className="bg-gray-900/70 rounded-lg p-3 border border-gray-700 group">
        <summary className="font-semibold cursor-pointer">{spell.name} <span className="text-sm font-normal text-gray-400">({spell.level === 0 ? 'Cantrip' : `Lvl ${spell.level}`})</span></summary>
        <p className="mt-2 pt-2 border-t border-gray-600 text-sm whitespace-pre-wrap">{spell.description}</p>
     </details>
);

export default DungeonMastersToolkit;
