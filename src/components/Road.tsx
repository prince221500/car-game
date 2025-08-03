import React from 'react';

interface RoadProps {
  width: number;
  height: number;
  offset: number;
}

const Road: React.FC<RoadProps> = ({ width, height, offset }) => {
  const laneWidth = width / 4;
  
  return (
    <div className="absolute inset-0 bg-gray-800 overflow-hidden">
      {/* Road surface */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900"></div>
      
      {/* Lane markings */}
      {[1, 2, 3].map((lane) => (
        <div
          key={lane}
          className="absolute w-1 bg-white opacity-80"
          style={{
            left: `${lane * laneWidth}px`,
            top: 0,
            height: '100%',
          }}
        >
          {/* Dashed line segments */}
          {Array.from({ length: Math.ceil(height / 60) + 2 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-8 bg-white"
              style={{
                top: `${(i * 60) - (offset % 60)}px`,
              }}
            />
          ))}
        </div>
      ))}
      
      {/* Road edges */}
      <div className="absolute left-0 top-0 w-2 h-full bg-yellow-400"></div>
      <div className="absolute right-0 top-0 w-2 h-full bg-yellow-400"></div>
      
      {/* Side grass/terrain */}
      <div className="absolute -left-20 top-0 w-20 h-full bg-green-600 opacity-40"></div>
      <div className="absolute -right-20 top-0 w-20 h-full bg-green-600 opacity-40"></div>
    </div>
  );
};

export default Road;