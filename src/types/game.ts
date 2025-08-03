export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  isPlaying: boolean;
  isGameOver: boolean;
  score: number;
  speed: number;
  highScore: number;
}

export interface Car {
  position: Position;
  width: number;
  height: number;
}

export interface Obstacle {
  id: string;
  position: Position;
  width: number;
  height: number;
  type: 'car' | 'barrier';
}

export interface GameConfig {
  roadWidth: number;
  carSpeed: number;
  obstacleSpeed: number;
  obstacleSpawnRate: number;
  maxSpeed: number;
  speedIncrement: number;
}