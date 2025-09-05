import React, { useState, useCallback } from 'react';
import type { Campaign, RollResult } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import PartyRoster from './PartyRoster';
import CampaignView from './CampaignView';
import DungeonMastersToolkit from './DungeonMastersToolkit';
import Guide from './Guide';
import Tooltip from '../components/Tooltip';

interface DMViewProps {
    onSwitchRole: () => void;
}

const DMView: React.FC<DMViewProps> = ({ onSwitchRole }) => {
  const [campaign, setCampaign] = useLocalStorage<Campaign | null>('dnd-campaign', null);
  const [rollLog, setRollLog] = useLocalStorage<RollResult[]>('dnd-roll-log', []);
  const [activeView, setActiveView] = useState('roster');

  const addToLog = useCallback((result: Omit<RollResult, 'id' | 'timestamp'>) => {
    const newEntry: RollResult = {
      ...result,
      id: Date.now() + Math.random(),
      timestamp: new Date(),
    };
    setRollLog(prevLog => [newEntry, ...prevLog].slice(0, 50)); // Keep last 50 rolls
  }, [setRollLog]);
  
  const handleUpdateCampaign = (updatedCampaign: Campaign | null) => {
    setCampaign(updatedCampaign);
  };

  const NavButton: React.FC<{view: string, label: string, onClick: () => void}> = ({ view, label, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-bold transition-colors ${
        activeView === view
          ? 'bg-purple-600 text-white'
          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
      }`}
    >
      {label}
    </button>
  );

  const renderContent = () => {
    switch(activeView) {
      case 'roster':
        return <PartyRoster campaign={campaign} onUpdateCampaign={handleUpdateCampaign} addToLog={addToLog}/>;
      case 'campaign':
        return <CampaignView campaign={campaign} onUpdateCampaign={handleUpdateCampaign} addToLog={addToLog} rollLog={rollLog} />;
      case 'toolkit':
        return <DungeonMastersToolkit />;
      case 'guide':
        return <Guide />;
      default:
        return <PartyRoster campaign={campaign} onUpdateCampaign={handleUpdateCampaign} addToLog={addToLog}/>;
    }
  }

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8">
      <header className="mb-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center gap-4">
            {/* Spacer for centering title */}
            <div className="w-32 flex-shrink-0" aria-hidden="true"></div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-wider text-center" style={{textShadow: '2px 2px 6px #805AD5'}}>Russian Raven's Retro Realms</h1>
            <div className="w-32 flex-shrink-0 flex justify-end">
                <Tooltip tip="Return to the role selection screen.">
                    <button
                        onClick={onSwitchRole}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md font-semibold transition-colors"
                    >
                        Switch Role
                    </button>
                </Tooltip>
            </div>
        </div>
        <nav className="mt-4 flex justify-center gap-4">
          <Tooltip tip="Manage your party of adventurers. Create, view, and edit characters.">
            <NavButton view="roster" label="Roster" onClick={() => setActiveView('roster')} />
          </Tooltip>
           <Tooltip tip="Run your campaign with the AI Story Generator and integrated tools.">
            <NavButton view="campaign" label="Campaign" onClick={() => setActiveView('campaign')} />
          </Tooltip>
          <Tooltip tip="Access tools for the Dungeon Master, like a bestiary and spell list.">
            <NavButton view="toolkit" label="DM's Toolkit" onClick={() => setActiveView('toolkit')} />
          </Tooltip>
           <Tooltip tip="New to D&D? Read this quick-start guide to learn the basics.">
            <NavButton view="guide" label="Guide" onClick={() => setActiveView('guide')} />
          </Tooltip>
        </nav>
      </header>

      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default DMView;