import React from 'react';
import { Trophy, Zap } from 'lucide-react';
import { GameState } from '../types/game';

interface GameUIProps {
  gameState: GameState;
}

const GameUI: React.FC<GameUIProps> = ({ gameState }) => {
  return (
    <div className="absolute top-4 left-4 right-4 z-30 flex justify-between items-start">
      {/* Score */}
      <div className="bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm">
        <div className="text-white text-lg font-bold">
          Score: <span className="text-yellow-400">{gameState.score}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300 text-sm">
          <Trophy size={16} />
          <span>Best: {gameState.highScore}</span>
        </div>
      </div>
      
      {/* Speed indicator */}
      <div className="bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-white">
          <Zap size={20} className="text-yellow-400" />
          <div className="text-lg font-bold">
            {Math.round(gameState.speed * 10)} mph
          </div>
        </div>
        {/* Speed bar */}
        <div className="w-20 h-2 bg-gray-700 rounded-full mt-1">
          <div 
            className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((gameState.speed / 15) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default GameUI;