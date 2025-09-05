import React, { useState, useEffect } from 'react';
import DMView from './views/DMView';
import PlayerView from './views/PlayerView';
import ModeSelector from './components/ModeSelector';

const App: React.FC = () => {
    const [mode, setMode] = useState<'selector' | 'dm' | 'player'>('selector');

    // This effect will check for player data in the hash for deep linking via QR code/URL
    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash.startsWith('#player_data=')) {
                setMode('player');
            }
        };
        handleHashChange(); // Check on initial load
        window.addEventListener('hashchange', handleHashChange, false);
        return () => {
            window.removeEventListener('hashchange', handleHashChange, false);
        };
    }, []);

    const handleSelectMode = (selectedMode: 'dm' | 'player') => {
        // Clear hash when switching modes manually to avoid conflicts
        if (window.location.hash) {
            window.history.pushState("", document.title, window.location.pathname + window.location.search);
        }
        setMode(selectedMode);
    };
    
    const handleSwitchRole = () => {
        // Clear hash when returning to the selector
        if (window.location.hash) {
            window.history.pushState("", document.title, window.location.pathname + window.location.search);
        }
        setMode('selector');
    }

    switch (mode) {
        case 'player':
            return <PlayerView onSwitchRole={handleSwitchRole} />;
        case 'dm':
            return <DMView onSwitchRole={handleSwitchRole} />;
        default:
            return <ModeSelector onSelectMode={handleSelectMode} />;
    }
};

export default App;
