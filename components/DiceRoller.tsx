import React, { useState } from 'react';
import type { RollResult } from '../types';
import { Dice } from '../types';
import Tooltip from './Tooltip';

interface DiceRollerProps {
  onRoll: (result: Omit<RollResult, 'id' | 'timestamp'>) => void;
}

const DiceButton: React.FC<{ sides: number, onRoll: (sides: number) => void }> = ({ sides, onRoll }) => (
    <Tooltip tip={`Roll a ${sides}-sided die.`}>
        <button
        onClick={() => onRoll(sides)}
        className="w-full h-16 bg-gray-700 text-white font-bold text-xl rounded-lg border-2 border-gray-600 hover:bg-gray-600 hover:border-purple-400 transition-all duration-200"
        >
        d{sides}
        </button>
    </Tooltip>
);

const DiceRoller: React.FC<DiceRollerProps> = ({ onRoll }) => {
  const [quantity, setQuantity] = useState(1);

  const handleRoll = (sides: number) => {
    if (quantity < 1) return;
    const rolls = Array.from({ length: quantity }, () => Math.floor(Math.random() * sides) + 1);
    const total = rolls.reduce((sum, roll) => sum + roll, 0);

    onRoll({
      notation: `${quantity}d${sides}`,
      total,
      rolls,
      reason: 'Manual Roll',
    });
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-purple-500/20">
      <h3 className="text-xl font-bold text-white mb-4 text-center">Dice Roller</h3>
      
      <div className="flex items-center mb-4">
        <label htmlFor="quantity" className="text-gray-300 mr-2">Qty:</label>
        <Tooltip tip="Set the number of dice to roll at once.">
            <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                min="1"
                className="w-20 bg-gray-900/80 border border-gray-600 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500"
            />
        </Tooltip>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <DiceButton sides={Dice.d4} onRoll={handleRoll} />
        <DiceButton sides={Dice.d6} onRoll={handleRoll} />
        <DiceButton sides={Dice.d8} onRoll={handleRoll} />
        <DiceButton sides={Dice.d10} onRoll={handleRoll} />
        <DiceButton sides={Dice.d12} onRoll={handleRoll} />
        <DiceButton sides={Dice.d20} onRoll={handleRoll} />
        <div className="col-span-3">
            <DiceButton sides={Dice.d100} onRoll={handleRoll} />
        </div>
      </div>
    </div>
  );
};

export default DiceRoller;
