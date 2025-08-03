import { Car, Obstacle, Position } from '../types/game';

export const checkCollision = (car: Car, obstacle: Obstacle): boolean => {
  return (
    car.position.x < obstacle.position.x + obstacle.width &&
    car.position.x + car.width > obstacle.position.x &&
    car.position.y < obstacle.position.y + obstacle.height &&
    car.position.y + car.height > obstacle.position.y
  );
};

export const generateObstacle = (gameWidth: number, gameHeight: number): Obstacle => {
  const types: ('car' | 'barrier')[] = ['car', 'car', 'barrier'];
  const type = types[Math.floor(Math.random() * types.length)];
  const laneWidth = gameWidth / 4;
  const lane = Math.floor(Math.random() * 3); // 3 lanes
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    position: {
      x: laneWidth + (lane * laneWidth) - (type === 'car' ? 30 : 20),
      y: -100
    },
    width: type === 'car' ? 60 : 40,
    height: type === 'car' ? 120 : 80,
    type
  };
};

export const updateObstacles = (
  obstacles: Obstacle[],
  speed: number,
  gameHeight: number
): Obstacle[] => {
  return obstacles
    .map(obstacle => ({
      ...obstacle,
      position: {
        ...obstacle.position,
        y: obstacle.position.y + speed
      }
    }))
    .filter(obstacle => obstacle.position.y < gameHeight + 100);
};

export const getHighScore = (): number => {
  return parseInt(localStorage.getItem('carRaceHighScore') || '0');
};

export const saveHighScore = (score: number): void => {
  const currentHigh = getHighScore();
  if (score > currentHigh) {
    localStorage.setItem('carRaceHighScore', score.toString());
  }
};