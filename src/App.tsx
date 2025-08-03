import React from 'react';
import Game from './components/Game';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">
            🏎️ SPEED RACER
          </h1>
          <p className="text-gray-300 text-lg">
            The ultimate car racing experience
          </p>
        </div>
        
        <Game />
        
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-400 mb-2">Pro Tips:</div>
          <div className="text-xs text-gray-500 space-y-1 max-w-sm mx-auto">
            <div>• Use arrow keys or WASD to control your car</div>
            <div>• Avoid crashes to keep your score multiplier high</div>
            <div>• Speed increases over time - stay alert!</div>
            <div>• Beat your high score and become the ultimate racer</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;