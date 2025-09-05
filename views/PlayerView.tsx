import React, { useState, useEffect, useCallback } from 'react';
import type { PlayerState, Character, RollResult } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import Tooltip from '../components/Tooltip';
import CharacterCreator from '../components/CharacterCreator';
import CharacterSheet from '../components/CharacterSheet';
import DiceRoller from '../components/DiceRoller';
import RollLog from '../components/RollLog';

interface PlayerViewProps {
  onSwitchRole: () => void;
}

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 font-bold transition-colors rounded-t-md ${active ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700/50'}`}
    >
        {children}
    </button>
);

const PlayerView: React.FC<PlayerViewProps> = ({ onSwitchRole }) => {
  const [character, setCharacter] = useLocalStorage<Character | null>('dnd-player-character', null);
  const [activeTab, setActiveTab] = useState('character');
  
  const [code, setCode] = useState('');
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rollLog, setRollLog] = useState<RollResult[]>([]);
  const [customAction, setCustomAction] = useState('');

  const addToLog = useCallback((result: Omit<RollResult, 'id' | 'timestamp'>) => {
    const newEntry: RollResult = {
      ...result,
      id: Date.now() + Math.random(),
      timestamp: new Date(),
    };
    setRollLog(prevLog => [newEntry, ...prevLog].slice(0, 50));
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#player_data=')) {
      const data = hash.substring('#player_data='.length);
      handleJoin(data);
      setActiveTab('campaign');
    }
  }, []);

  const handleJoin = (joinCode: string) => {
    setError(null);
    if (!joinCode.trim()) {
      setError('Please enter a campaign code.');
      return;
    }
    try {
      const decodedJson = atob(joinCode);
      const parsedState: PlayerState = JSON.parse(decodedJson);
      if (parsedState && parsedState.campaignName && parsedState.narration && Array.isArray(parsedState.choices)) {
        setPlayerState(parsedState);
        setCode(joinCode);
      } else {
        throw new Error('Invalid campaign code structure.');
      }
    } catch (e) {
      console.error('Failed to parse campaign code:', e);
      setError('Invalid or corrupted campaign code. Please get a new one from your DM.');
      setPlayerState(null);
    }
  };
  
  const handleCampaignFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleJoin(code);
  }
  
  const handleCustomActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAction.trim()) {
        alert(`You've told your DM you want to: "${customAction}". Await their response!`);
        setCustomAction('');
    }
  };

  if (!character) {
    return (
        <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-3xl">
                 <CharacterCreator onCharacterCreate={(newChar) => setCharacter(newChar)} />
            </div>
             <Tooltip tip="Return to the role selection screen.">
                <button
                    onClick={onSwitchRole}
                    className="mt-8 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md font-semibold transition-colors"
                >
                    Switch Role
                </button>
            </Tooltip>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8 text-gray-200">
      <header className="w-full max-w-7xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white tracking-wider" style={{fontFamily: "'Cinzel', serif"}}>Player Dashboard</h1>
        <Tooltip tip="Return to the role selection screen.">
            <button
                onClick={onSwitchRole}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md font-semibold transition-colors"
            >
                Switch Role
            </button>
        </Tooltip>
      </header>

       <div className="flex space-x-2 border-b-2 border-gray-700 max-w-7xl mx-auto">
            <TabButton active={activeTab === 'character'} onClick={() => setActiveTab('character')}>Character</TabButton>
            <TabButton active={activeTab === 'campaign'} onClick={() => setActiveTab('campaign')}>Campaign</TabButton>
        </div>

      <main className="w-full max-w-7xl mx-auto mt-6">
       {activeTab === 'character' && (
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2">
                    <CharacterSheet 
                        character={character}
                        onUpdate={setCharacter}
                        onDelete={() => {
                           if(window.confirm('Are you sure you want to delete this character permanently?')) {
                               setCharacter(null);
                           }
                        }}
                        onSkillCheck={addToLog}
                    />
               </div>
                <div className="flex flex-col gap-8">
                    <DiceRoller onRoll={addToLog} />
                    <RollLog log={rollLog} />
                </div>
           </div>
       )}

       {activeTab === 'campaign' && (
           <div className="max-w-4xl mx-auto">
             {!playerState ? (
                <div className="bg-gray-800/50 p-8 rounded-lg border border-purple-500/20 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Join a Campaign</h2>
                    <p className="text-gray-400 mb-6">Enter the Campaign Code provided by your Dungeon Master.</p>
                    <form onSubmit={handleCampaignFormSubmit} className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Paste code here..."
                        aria-label="Campaign Code"
                        className="flex-grow bg-gray-900/80 border border-gray-600 rounded-md p-3 text-white focus:ring-purple-500 focus:border-purple-500"
                    />
                    <button type="submit" className="px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition-colors">
                        Join
                    </button>
                    </form>
                    {error && <p className="text-red-400 mt-4">{error}</p>}
                </div>
                ) : (
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-purple-500/20 space-y-6">
                    <h2 className="text-3xl font-bold text-white text-center">{playerState.campaignName}</h2>
                    
                    {playerState.sceneImage && (
                        <div className="w-full aspect-video rounded-lg bg-gray-900 border-2 border-gray-600 overflow-hidden shadow-lg">
                           <img src={`data:image/jpeg;base64,${playerState.sceneImage}`} alt="Current campaign scene" className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className="bg-gray-900/60 p-4 rounded-lg border border-gray-700 max-h-60 overflow-y-auto">
                        <h3 className="text-xl font-bold text-purple-300 mb-2">The Story So Far...</h3>
                        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{playerState.narration}</p>
                    </div>

                    {playerState.choices && playerState.choices.length > 0 && (
                        <div className="bg-gray-900/60 p-4 rounded-lg border border-gray-700">
                            <h3 className="text-xl font-bold text-purple-300 mb-4">What do you do?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {playerState.choices.map((choice, index) => (
                                    <button
                                        key={index}
                                        onClick={() => alert(`You have chosen: "${choice.text}". Tell your DM so they can proceed!`)}
                                        className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-md font-semibold transition-colors h-full"
                                    >
                                        {choice.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="bg-gray-900/60 p-4 rounded-lg border border-gray-700">
                        <h3 className="text-xl font-bold text-purple-300 mb-2">Or, take a custom action:</h3>
                        <p className="text-sm text-gray-400 mb-4">Describe an action not listed above. Your DM will adjudicate the outcome.</p>
                        <form onSubmit={handleCustomActionSubmit}>
                            <input
                                type="text"
                                value={customAction}
                                onChange={(e) => setCustomAction(e.target.value)}
                                placeholder="e.g., 'I want to inspect the strange runes on the wall.'"
                                className="w-full bg-gray-800/80 border border-gray-600 rounded-md p-3 text-white focus:ring-purple-500 focus:border-purple-500"
                            />
                            <button type="submit" className="mt-2 w-full px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition-colors">
                                Submit Custom Action
                            </button>
                        </form>
                    </div>
                    
                    {(!playerState.choices || playerState.choices.length === 0) && (
                        <p className="text-center text-sm text-gray-500 pt-4">Waiting for the DM to share the next scene...</p>
                    )}
                </div>
                )}
           </div>
       )}
      </main>
    </div>
  );
};

export default PlayerView;