import React from 'react';
import type { RollResult } from '../types';

interface RollLogProps {
  log: RollResult[];
}

const RollLog: React.FC<RollLogProps> = ({ log }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-purple-500/20 h-96 flex flex-col">
      <h3 className="text-xl font-bold text-white mb-4 text-center flex-shrink-0">Roll Log</h3>
      <div className="overflow-y-auto flex-grow pr-2">
        {log.length === 0 ? (
          <p className="text-gray-400 text-center mt-4">No rolls yet. Get started!</p>
        ) : (
          <ul className="space-y-3">
            {log.map((entry, index) => (
              <li
                key={entry.id}
                className={`p-2 rounded-md transition-all duration-500 ${index === 0 ? 'bg-purple-500/20 animate-pulse-once border border-purple-400' : 'bg-gray-800/50 border border-gray-700'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-purple-300">{entry.reason}</span>
                  {entry.total > 0 && <span className="text-2xl font-bold text-white">{entry.total}</span>}
                </div>
                {entry.rolls.length > 0 && (
                    <p className="text-sm text-gray-400">
                    <span className="font-semibold">{entry.notation}</span>: [{entry.rolls.join(', ')}]
                    </p>
                )}
                
              </li>
            ))}
          </ul>
        )}
      </div>
      <style>{`
        @keyframes pulse-once {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        .animate-pulse-once {
            animation: pulse-once 0.7s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default RollLog;