import React, { useState, useEffect, useCallback, useRef } from 'react';
import Car from './Car';
import Obstacle from './Obstacle';
import Road from './Road';
import GameUI from './GameUI';
import GameScreen from './GameScreen';
import { 
  GameState, 
  Car as CarType, 
  Obstacle as ObstacleType,
  GameConfig 
} from '../types/game';
import { 
  checkCollision, 
  generateObstacle, 
  updateObstacles,
  getHighScore,
  saveHighScore 
} from '../utils/gameLogic';

const GAME_CONFIG: GameConfig = {
  roadWidth: 400,
  carSpeed: 5,
  obstacleSpeed: 3,
  obstacleSpawnRate: 0.02,
  maxSpeed: 15,
  speedIncrement: 0.01
};

const Game: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number>();
  const lastSpawnRef = useRef<number>(0);
  const roadOffsetRef = useRef<number>(0);
  
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isGameOver: false,
    score: 0,
    speed: GAME_CONFIG.obstacleSpeed,
    highScore: getHighScore()
  });

  const [car, setCar] = useState<CarType>({
    position: { x: 170, y: 400 },
    width: 60,
    height: 120
  });

  const [obstacles, setObstacles] = useState<ObstacleType[]>([]);
  const [keys, setKeys] = useState<Set<string>>(new Set());

  const gameHeight = 600;
  const gameWidth = GAME_CONFIG.roadWidth;

  const resetGame = useCallback(() => {
    setCar({
      position: { x: 170, y: 400 },
      width: 60,
      height: 120
    });
    setObstacles([]);
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      isGameOver: false,
      score: 0,
      speed: GAME_CONFIG.obstacleSpeed
    }));
    roadOffsetRef.current = 0;
    lastSpawnRef.current = 0;
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      isGameOver: false
    }));
  }, [resetGame]);

  const endGame = useCallback(() => {
    setGameState(prev => {
      saveHighScore(prev.score);
      return {
        ...prev,
        isPlaying: false,
        isGameOver: true,
        highScore: Math.max(prev.highScore, prev.score)
      };
    });
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    setKeys(prev => new Set(prev).add(e.key.toLowerCase()));
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    setKeys(prev => {
      const newKeys = new Set(prev);
      newKeys.delete(e.key.toLowerCase());
      return newKeys;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const gameLoop = useCallback(() => {
    if (!gameState.isPlaying) return;

    setGameState(prev => ({
      ...prev,
      score: prev.score + 1,
      speed: Math.min(prev.speed + GAME_CONFIG.speedIncrement, GAME_CONFIG.maxSpeed)
    }));

    // Update road offset for animation
    roadOffsetRef.current += gameState.speed;

    // Move car based on input
    setCar(prev => {
      let newX = prev.position.x;
      let newY = prev.position.y;

      if (keys.has('arrowleft') || keys.has('a')) {
        newX = Math.max(10, newX - GAME_CONFIG.carSpeed);
      }
      if (keys.has('arrowright') || keys.has('d')) {
        newX = Math.min(gameWidth - prev.width - 10, newX + GAME_CONFIG.carSpeed);
      }
      if (keys.has('arrowup') || keys.has('w')) {
        newY = Math.max(50, newY - GAME_CONFIG.carSpeed);
      }
      if (keys.has('arrowdown') || keys.has('s')) {
        newY = Math.min(gameHeight - prev.height - 50, newY + GAME_CONFIG.carSpeed);
      }

      return {
        ...prev,
        position: { x: newX, y: newY }
      };
    });

    // Spawn obstacles
    if (Math.random() < GAME_CONFIG.obstacleSpawnRate + (gameState.speed * 0.001)) {
      const now = Date.now();
      if (now - lastSpawnRef.current > 1000) {
        setObstacles(prev => [...prev, generateObstacle(gameWidth, gameHeight)]);
        lastSpawnRef.current = now;
      }
    }

    // Update obstacles
    setObstacles(prev => updateObstacles(prev, gameState.speed, gameHeight));

    // Check collisions
    setObstacles(prev => {
      const currentCar = car;
      for (const obstacle of prev) {
        if (checkCollision(currentCar, obstacle)) {
          endGame();
          break;
        }
      }
      return prev;
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState.isPlaying, gameState.speed, keys, car, endGame, gameWidth, gameHeight]);

  useEffect(() => {
    if (gameState.isPlaying) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState.isPlaying, gameLoop]);

  return (
    <div className="relative w-full max-w-md mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
      <div
        ref={gameRef}
        className="relative"
        style={{ width: `${gameWidth}px`, height: `${gameHeight}px` }}
      >
        {/* Road */}
        <Road width={gameWidth} height={gameHeight} offset={roadOffsetRef.current} />
        
        {/* Game objects */}
        <Car car={car} />
        {obstacles.map(obstacle => (
          <Obstacle key={obstacle.id} obstacle={obstacle} />
        ))}
        
        {/* UI */}
        {gameState.isPlaying && <GameUI gameState={gameState} />}
        
        {/* Game screens */}
        <GameScreen
          gameState={gameState}
          onStart={startGame}
          onRestart={resetGame}
        />
      </div>
    </div>
  );
};

export default Game;