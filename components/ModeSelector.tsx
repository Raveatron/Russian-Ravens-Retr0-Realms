import React from 'react';

interface ModeSelectorProps {
  onSelectMode: (mode: 'dm' | 'player') => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelectMode }) => {
  const title = "Russian Raven's Retro Realms";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <div className="w-full h-full flex flex-col items-center justify-center p-4 min-h-screen">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-wider mb-4 fantasy-title">
          {title.split('').map((char, index) => (
            <span
              key={index}
              className="wavy-char"
              style={{ '--char-index': index } as React.CSSProperties}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        <p className="text-2xl text-white mb-8 italic subtitle-fade-in fantasy-subtitle">
          Where Imagination Has No Limits!!!
        </p>
        <p className="text-lg text-gray-300 mb-6">Choose your role to begin the adventure.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <button
            onClick={() => onSelectMode('dm')}
            className="p-8 rounded-lg bg-gray-800/50 border-2 border-purple-500/50 transition-all duration-300 ease-in-out hover:scale-105 hover:border-purple-400 dm-button"
            aria-label="Select Dungeon Master role"
          >
            <h2 data-text="Dungeon Master" className="text-3xl font-bold text-white mb-2">Dungeon Master</h2>
            <p data-text="Create worlds, weave stories, and guide the players on their epic quests. You control the game.">Create worlds, weave stories, and guide the players on their epic quests. You control the game.</p>
          </button>
          <button
            onClick={() => onSelectMode('player')}
            className="p-8 rounded-lg bg-gray-800/50 border-2 border-purple-500/50 transition-all duration-300 ease-in-out hover:scale-105 hover:border-white relative overflow-hidden player-button"
            aria-label="Select Player role"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Player</h2>
            <p className="text-gray-400">Become a hero, make choices that shape the story, and face the dangers of the world with your party.</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeSelector;