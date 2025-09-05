import React, { useState } from 'react';
import type { Campaign, RollResult, StoryState, StoryChoice } from '../types';
import StoryGenerator from '../components/StoryGenerator';
import DiceRoller from '../components/DiceRoller';
import RollLog from '../components/RollLog';
import Tooltip from '../components/Tooltip';
import ShareModal from '../components/ShareModal';

interface CampaignViewProps {
  campaign: Campaign | null;
  onUpdateCampaign: (campaign: Campaign) => void;
  addToLog: (result: Omit<RollResult, 'id' | 'timestamp'>) => void;
  rollLog: RollResult[];
}

const CampaignView: React.FC<CampaignViewProps> = ({ campaign, onUpdateCampaign, addToLog, rollLog }) => {
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  
  if (!campaign) {
    return (
      <div className="max-w-md mx-auto text-center bg-gray-800/50 p-8 rounded-lg border border-purple-500/20">
        <h2 className="text-3xl font-bold text-white mb-4">No Active Campaign</h2>
        <p className="text-gray-400">Please go to the "Roster" tab to create a new campaign before you can begin your adventure.</p>
      </div>
    );
  }

  const handleSceneGenerated = (newStoryState: StoryState) => {
    onUpdateCampaign({
      ...campaign,
      storyState: newStoryState,
      storyLog: [...campaign.storyLog, newStoryState.narration],
    });
  };

  const handleChoice = (choice: StoryChoice) => {
    // This will trigger a re-render with the new prompt in the generator
    onUpdateCampaign({
      ...campaign,
      storyState: { narration: `Continuing from: "${choice.text}"`, choices: [] }
    });
    // A bit of a hack to pass the prompt to the generator
    setTimeout(() => {
        const generatorPrompt = document.getElementById('story-prompt') as HTMLTextAreaElement;
        if(generatorPrompt) {
            generatorPrompt.value = choice.prompt_for_next_scene;
            // Dispatch input event to notify React of the change
            generatorPrompt.dispatchEvent(new Event('input', { bubbles: true })); 
        }
    }, 0);
  };
  
  const currentPrompt = campaign.storyState?.choices.length === 0 ? '' : 'The story continues...';
  const canShare = campaign.storyState && campaign.storyState.choices.length > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* Main Story Panel */}
      <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-purple-500/20 space-y-6">
        <div className="flex justify-between items-center gap-4">
            <h2 className="text-3xl font-bold text-white truncate" title={campaign.name}>
                {campaign.name}
            </h2>
            {canShare && (
                <Tooltip tip="Share this scene with your players.">
                    <button
                    onClick={() => setShareModalOpen(true)}
                    className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md font-semibold transition-colors flex-shrink-0"
                    >
                    Share Scene
                    </button>
                </Tooltip>
            )}
        </div>
        
        {campaign.storyState ? (
          <div className="space-y-4">
            {campaign.storyState.sceneImage && (
              <div className="w-full aspect-video rounded-lg bg-gray-900 border-2 border-gray-600 overflow-hidden shadow-lg">
                <img src={`data:image/jpeg;base64,${campaign.storyState.sceneImage}`} alt="Current campaign scene" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="bg-gray-900/60 p-4 rounded-lg border border-gray-700 max-h-72 overflow-y-auto">
                <h3 className="text-xl font-bold text-purple-300 mb-2">DM Narration</h3>
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{campaign.storyState.narration}</p>
            </div>
            {campaign.storyState.choices.length > 0 && (
                 <div className="bg-gray-900/60 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-xl font-bold text-purple-300 mb-4">Player Choices</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {campaign.storyState.choices.map((choice, index) => (
                            <Tooltip key={index} tip={`Next Prompt: ${choice.prompt_for_next_scene}`} className="block w-full">
                                <button
                                    onClick={() => handleChoice(choice)}
                                    className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-md font-semibold transition-colors h-full"
                                >
                                    {choice.text}
                                </button>
                            </Tooltip>
                        ))}
                    </div>
                 </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-white">The Adventure Awaits</h3>
            <p className="text-gray-400 mt-2">Use the AI Story Generator to begin your tale.</p>
          </div>
        )}
      </div>

      {/* DM Tools */}
      <div className="flex flex-col gap-8">
        <StoryGenerator onSceneGenerated={handleSceneGenerated} currentPrompt={currentPrompt} />
        <DiceRoller onRoll={addToLog} />
        <RollLog log={rollLog} />
      </div>

      {isShareModalOpen && canShare && (
        <ShareModal campaign={campaign} onClose={() => setShareModalOpen(false)} />
      )}
    </div>
  );
};

export default CampaignView;