import React from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { GameState } from '../types/game';

interface GameScreenProps {
  gameState: GameState;
  onStart: () => void;
  onRestart: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameState, onStart, onRestart }) => {
  if (!gameState.isPlaying && !gameState.isGameOver) {
    return (
      <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40">
        <div className="text-center bg-gray-900 rounded-2xl p-8 border-2 border-gray-700 shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            🏎️ SPEED RACER
          </h1>
          <p className="text-gray-300 mb-6 max-w-md">
            Race through traffic, avoid obstacles, and set new records!
          </p>
          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-2">Controls:</div>
            <div className="text-xs text-gray-500 space-y-1">
              <div>← → Arrow Keys or A/D to steer</div>
              <div>↑ ↓ Arrow Keys or W/S for speed</div>
            </div>
          </div>
          {gameState.highScore > 0 && (
            <div className="mb-4 text-yellow-400">
              🏆 Best Score: {gameState.highScore}
            </div>
          )}
          <button
            onClick={onStart}
            className="flex items-center gap-2 mx-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Play size={20} />
            START RACE
          </button>
        </div>
      </div>
    );
  }

  if (gameState.isGameOver) {
    const isNewRecord = gameState.score > 0 && gameState.score >= gameState.highScore;
    
    return (
      <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40">
        <div className="text-center bg-gray-900 rounded-2xl p-8 border-2 border-gray-700 shadow-2xl">
          <h2 className="text-3xl font-bold text-red-500 mb-4">
            💥 CRASH!
          </h2>
          {isNewRecord && (
            <div className="text-yellow-400 text-xl mb-2">
              🎉 NEW RECORD! 🎉
            </div>
          )}
          <div className="text-white text-xl mb-2">
            Final Score: <span className="text-yellow-400 font-bold">{gameState.score}</span>
          </div>
          <div className="text-gray-400 mb-6">
            Best: {gameState.highScore}
          </div>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 mx-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <RotateCcw size={20} />
            RACE AGAIN
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default GameScreen;