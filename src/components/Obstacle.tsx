import React from 'react';
import { Obstacle as ObstacleType } from '../types/game';

interface ObstacleProps {
  obstacle: ObstacleType;
}

const Obstacle: React.FC<ObstacleProps> = ({ obstacle }) => {
  if (obstacle.type === 'car') {
    return (
      <div
        className="absolute z-10"
        style={{
          left: `${obstacle.position.x}px`,
          top: `${obstacle.position.y}px`,
          width: `${obstacle.width}px`,
          height: `${obstacle.height}px`,
        }}
      >
        <div className="w-full h-full relative">
          {/* Enemy car body */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg shadow-lg">
            {/* Car highlights */}
            <div className="absolute bottom-2 left-2 right-2 h-4 bg-gradient-to-t from-blue-300 to-blue-400 rounded-sm opacity-80"></div>
            {/* Rear windshield */}
            <div className="absolute bottom-1 left-3 right-3 h-3 bg-gradient-to-t from-blue-200 to-blue-400 rounded-sm opacity-90"></div>
            {/* Wheels */}
            <div className="absolute -left-1 top-4 w-2 h-6 bg-gray-800 rounded-sm"></div>
            <div className="absolute -right-1 top-4 w-2 h-6 bg-gray-800 rounded-sm"></div>
            <div className="absolute -left-1 bottom-8 w-2 h-6 bg-gray-800 rounded-sm"></div>
            <div className="absolute -right-1 bottom-8 w-2 h-6 bg-gray-800 rounded-sm"></div>
            {/* Taillights */}
            <div className="absolute top-1 left-2 w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute z-10"
      style={{
        left: `${obstacle.position.x}px`,
        top: `${obstacle.position.y}px`,
        width: `${obstacle.width}px`,
        height: `${obstacle.height}px`,
      }}
    >
      <div className="w-full h-full bg-gradient-to-b from-orange-500 to-orange-700 rounded border-2 border-orange-400 shadow-lg">
        {/* Warning stripes */}
        <div className="absolute inset-1 bg-repeating-stripes opacity-80"></div>
        <div className="absolute top-2 left-2 right-2 h-1 bg-yellow-400 rounded"></div>
        <div className="absolute bottom-2 left-2 right-2 h-1 bg-yellow-400 rounded"></div>
      </div>
    </div>
  );
};

export default Obstacle;