import React from 'react';
import { Car as CarType } from '../types/game';

interface CarProps {
  car: CarType;
}

const Car: React.FC<CarProps> = ({ car }) => {
  return (
    <div
      className="absolute transition-all duration-100 ease-out z-20"
      style={{
        left: `${car.position.x}px`,
        top: `${car.position.y}px`,
        width: `${car.width}px`,
        height: `${car.height}px`,
      }}
    >
      <div className="w-full h-full relative">
        {/* Car body */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-500 to-red-700 rounded-lg shadow-lg">
          {/* Car highlights */}
          <div className="absolute top-2 left-2 right-2 h-4 bg-gradient-to-b from-red-300 to-red-400 rounded-sm opacity-80"></div>
          {/* Windshield */}
          <div className="absolute top-1 left-3 right-3 h-3 bg-gradient-to-b from-blue-200 to-blue-400 rounded-sm opacity-90"></div>
          {/* Side windows */}
          <div className="absolute top-6 left-1 w-2 h-8 bg-gradient-to-r from-blue-300 to-blue-500 rounded-sm opacity-80"></div>
          <div className="absolute top-6 right-1 w-2 h-8 bg-gradient-to-l from-blue-300 to-blue-500 rounded-sm opacity-80"></div>
          {/* Wheels */}
          <div className="absolute -left-1 top-4 w-2 h-6 bg-gray-800 rounded-sm"></div>
          <div className="absolute -right-1 top-4 w-2 h-6 bg-gray-800 rounded-sm"></div>
          <div className="absolute -left-1 bottom-8 w-2 h-6 bg-gray-800 rounded-sm"></div>
          <div className="absolute -right-1 bottom-8 w-2 h-6 bg-gray-800 rounded-sm"></div>
          {/* Headlights */}
          <div className="absolute bottom-1 left-2 w-2 h-2 bg-yellow-300 rounded-full shadow-glow"></div>
          <div className="absolute bottom-1 right-2 w-2 h-2 bg-yellow-300 rounded-full shadow-glow"></div>
        </div>
      </div>
    </div>
  );
};

export default Car;