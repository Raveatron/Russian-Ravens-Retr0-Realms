import React, { useMemo, useState } from 'react';
import type { Campaign, PlayerState } from '../types';
import Tooltip from './Tooltip';

interface ShareModalProps {
  campaign: Campaign;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ campaign, onClose }) => {
  const [copied, setCopied] = useState(false);

  const { shareUrl, encodedData, qrUrl } = useMemo(() => {
    if (!campaign.storyState) return { shareUrl: '', encodedData: '', qrUrl: '' };

    const playerState: PlayerState = {
      campaignName: campaign.name,
      narration: campaign.storyState.narration,
      choices: campaign.storyState.choices,
      sceneImage: campaign.storyState.sceneImage,
    };

    const encoded = btoa(JSON.stringify(playerState));
    const url = `${window.location.origin}${window.location.pathname}#player_data=${encoded}`;
    const qr = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(url)}`;
    
    return { shareUrl: url, encodedData: encoded, qrUrl: qr };
  }, [campaign]);

  const handleCopy = () => {
    navigator.clipboard.writeText(encodedData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
    >
      <div 
        className="bg-gray-800 rounded-lg p-6 border border-purple-500 w-full max-w-lg text-center relative shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button 
            onClick={onClose} 
            className="absolute top-2 right-2 px-3 py-1 bg-red-700 hover:bg-red-600 rounded-full text-white font-bold"
            aria-label="Close share modal"
        >&times;</button>
        <h2 id="share-modal-title" className="text-2xl font-bold text-white mb-4">Share Scene with Players</h2>
        <p className="text-gray-400 mb-6">Players can scan the QR code with their device or enter the code manually to view the current scene.</p>
        
        <div className="flex justify-center mb-6">
            <img src={qrUrl} alt="QR Code for sharing" className="bg-white p-2 rounded-md" />
        </div>

        <div>
            <label htmlFor="share-code" className="text-sm font-semibold text-gray-300 block mb-2">Campaign Code</label>
            <div className="flex gap-2">
                <input 
                    id="share-code"
                    type="text" 
                    readOnly 
                    value={encodedData} 
                    className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white truncate"
                />
                <Tooltip tip={copied ? "Copied!" : "Copy code"}>
                    <button onClick={handleCopy} className="px-4 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition-colors">
                        {copied ? '✔' : 'Copy'}
                    </button>
                </Tooltip>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;