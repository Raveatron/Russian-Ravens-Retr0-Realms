import React from 'react';
import type { Campaign, Character, RollResult } from '../types';
import CharacterPortrait from '../components/CharacterPortrait';
import Tooltip from '../components/Tooltip';

interface PartyRosterProps {
  campaign: Campaign | null;
  onUpdateCampaign: (campaign: Campaign | null) => void;
  addToLog: (result: Omit<RollResult, 'id' | 'timestamp'>) => void;
}

const PartyRoster: React.FC<PartyRosterProps> = ({ campaign, onUpdateCampaign, addToLog }) => {
  const [campaignName, setCampaignName] = React.useState('');
  const [isImporting, setIsImporting] = React.useState(false);
  const [importCode, setImportCode] = React.useState('');

  const handleCreateCampaign = () => {
    if (!campaignName.trim()) {
      alert("Please enter a name for your campaign.");
      return;
    }
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name: campaignName.trim(),
      party: [],
      storyState: null,
      storyLog: [],
    };
    onUpdateCampaign(newCampaign);
  };
  
  const handleConfirmImport = () => {
      if (campaign && importCode) {
          try {
              const decoded = atob(importCode);
              const newCharacter: Character = JSON.parse(decoded);
              
              if(newCharacter.id && newCharacter.name && newCharacter.abilityScores) {
                  // Avoid duplicates
                  if(campaign.party.some(c => c.id === newCharacter.id)) {
                      alert(`${newCharacter.name} is already in the party.`);
                      return;
                  }
                  const updatedCampaign = { ...campaign, party: [...campaign.party, newCharacter].sort((a,b) => a.name.localeCompare(b.name)) };
                  onUpdateCampaign(updatedCampaign);
                  addToLog({
                      notation: 'New Party Member',
                      total: 0,
                      rolls: [],
                      reason: `${newCharacter.name} has joined the campaign!`,
                  });
                  setIsImporting(false);
                  setImportCode('');
              } else {
                  throw new Error("Invalid character structure");
              }
          } catch (e) {
              alert("Invalid character code. Please ask the player for a new one.");
              console.error(e);
          }
      }
  }

  const handleDeleteCampaign = () => {
    if (window.confirm("Are you sure you want to delete this entire campaign and all its characters? This cannot be undone.")) {
        onUpdateCampaign(null);
    }
  }
  
  const handleDeleteCharacter = (characterId: string, characterName: string) => {
    if (campaign && window.confirm(`Are you sure you want to remove ${characterName} from the party? This cannot be undone.`)) {
        const updatedParty = campaign.party.filter(char => char.id !== characterId);
        const updatedCampaign = { ...campaign, party: updatedParty };
        onUpdateCampaign(updatedCampaign);
        addToLog({
            notation: 'Party Member Removed',
            total: 0,
            rolls: [],
            reason: `${characterName} has been removed from the campaign.`,
        });
    }
  };

  if (!campaign) {
    return (
      <div className="max-w-md mx-auto text-center bg-gray-800/50 p-8 rounded-lg border border-purple-500/20">
        <h2 className="text-3xl font-bold text-white mb-4">Start a New Campaign</h2>
        <p className="text-gray-400 mb-6">Give your new adventure a name to begin.</p>
        <input
          type="text"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
          placeholder="e.g., The Dragon's Curse"
          className="w-full bg-gray-900/80 border border-gray-600 rounded-md p-3 text-white focus:ring-purple-500 focus:border-purple-500 mb-4"
        />
        <button onClick={handleCreateCampaign} className="w-full px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition-colors">
          Create Campaign
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-white">{campaign.name} - Party Roster</h2>
            <div className="flex gap-2">
                <Tooltip tip="Add a player's character to the roster using a code.">
                    <button onClick={() => setIsImporting(!isImporting)} className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md font-semibold transition-colors">
                        {isImporting ? 'Cancel Import' : 'Import Character'}
                    </button>
                </Tooltip>
                <Tooltip tip="Delete this entire campaign and all characters.">
                    <button onClick={handleDeleteCampaign} className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded-md font-semibold transition-colors">
                        Delete Campaign
                    </button>
                </Tooltip>
            </div>
        </div>

        {isImporting && (
             <div className="my-6 bg-gray-900/60 p-6 rounded-lg border border-purple-500/30 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-2">Import Character from Code</h3>
                <p className="text-gray-400 mb-4">Ask your player to use the "Export" button on their character sheet and paste the code here.</p>
                <form onSubmit={(e) => { e.preventDefault(); handleConfirmImport(); }} className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="text"
                        value={importCode}
                        onChange={(e) => setImportCode(e.target.value)}
                        placeholder="Paste character code..."
                        aria-label="Character Code"
                        className="flex-grow bg-gray-800/80 border border-gray-600 rounded-md p-3 text-white focus:ring-purple-500 focus:border-purple-500"
                        required
                    />
                    <button type="submit" className="px-8 py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
                        Confirm Import
                    </button>
                </form>
            </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {campaign.party.length === 0 ? (
                <p className="text-gray-400 col-span-full text-center py-8">Your party is empty. Import a character to get started.</p>
            ) : (
                 campaign.party.map(char => (
                    <div key={char.id} className="relative bg-gray-800/70 p-4 rounded-lg border border-gray-700 flex flex-col items-center text-center">
                        <Tooltip tip={`Remove ${char.name} from party`}>
                            <button 
                                onClick={() => handleDeleteCharacter(char.id, char.name)}
                                className="absolute top-2 right-2 z-10 p-1 bg-red-800 hover:bg-red-700 text-white rounded-full text-xs font-bold w-6 h-6 flex items-center justify-center transition-transform hover:scale-110"
                                aria-label={`Delete ${char.name}`}
                            >
                                &times;
                            </button>
                        </Tooltip>
                        <div className="w-32 h-32 mb-4">
                            <CharacterPortrait name={char.name} portrait={char.portrait} />
                        </div>
                        <h3 className="text-xl font-bold text-white">{char.name}</h3>
                        <p className="text-gray-400">{char.race} {char.charClass}</p>
                        <p className="text-sm mt-2"><span className="text-red-400">HP:</span> {char.hp.current} / {char.hp.max}</p>
                    </div>
                ))
            )}
        </div>
        <div className="mt-8 text-center text-gray-500 italic">
            <p>Character creation and editing is handled by the players. Ask your players to use the "Player" mode to create their characters and "Export" them to get a code you can import here.</p>
        </div>
    </div>
  );
};

export default PartyRoster;