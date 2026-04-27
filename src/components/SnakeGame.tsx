import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, Zap, RotateCcw } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [glitchLevel, setGlitchLevel] = useState(0);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const onSnake = currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
      if (!onSnake) break;
    }
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
    setGlitchLevel(0);
    generateFood(INITIAL_SNAKE);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (gameOver || !isPlaying) return;

    const moveSnake = () => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead = {
          x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
          y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
        };

        if (prev.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          setIsPlaying(false);
          setGlitchLevel(10);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setGlitchLevel(prev => Math.min(prev + 1, 5));
          generateFood(newSnake);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, Math.max(50, 120 - Math.floor(score / 50) * 10));
    return () => clearInterval(interval);
  }, [direction, food, gameOver, isPlaying, generateFood, score]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dynamic Distorted Grid
    ctx.strokeStyle = '#00f2ff22';
    ctx.lineWidth = 1;
    const offset = Math.sin(Date.now() / 200) * glitchLevel;
    
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE + offset, 0);
      ctx.lineTo(i * CELL_SIZE - offset, canvas.height);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE - offset);
      ctx.lineTo(canvas.width, i * CELL_SIZE + offset);
      ctx.stroke();
    }

    // Draw Snake (Blocky/Glitchy)
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      ctx.fillStyle = isHead ? '#ff00ff' : '#00f2ff';
      
      const jitter = (Math.random() - 0.5) * glitchLevel;
      const x = segment.x * CELL_SIZE + 1 + jitter;
      const y = segment.y * CELL_SIZE + 1 + jitter;
      
      ctx.fillRect(x, y, CELL_SIZE - 2, CELL_SIZE - 2);
      
      if (isHead) {
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(x, y, CELL_SIZE - 2, CELL_SIZE - 2);
      }
    });

    // Draw Food (Pulsing Magenta)
    const foodPulse = Math.sin(Date.now() / 100) * 3;
    ctx.fillStyle = '#ff00ff';
    ctx.shadowColor = '#ff00ff';
    ctx.shadowBlur = 10 + foodPulse;
    ctx.fillRect(
      food.x * CELL_SIZE + 4 - foodPulse/2,
      food.y * CELL_SIZE + 4 - foodPulse/2,
      CELL_SIZE - 8 + foodPulse,
      CELL_SIZE - 8 + foodPulse
    );
    ctx.shadowBlur = 0;

  }, [snake, food, glitchLevel]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-black border-2 border-[#00f2ff] shadow-[0_0_20px_#00f2ff22] relative overflow-hidden">
      <div className="absolute inset-0 noise-bg opacity-10 pointer-events-none" />
      
      <div className="flex justify-between items-end font-mono">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#ff00ff] uppercase tracking-tighter flex items-center gap-1">
            <Terminal className="w-3 h-3" /> BUFFER_STATUS:
          </span>
          <span className="text-2xl font-bold text-[#00f2ff]">{score.toString().padStart(6, '0')}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-[#00f2ff] opacity-50">RECORD_MAX</span>
          <span className="text-xl text-[#ff00ff]">{highScore.toString().padStart(6, '0')}</span>
        </div>
      </div>

      <div className="relative border border-[#ff00ff33]">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="bg-black block"
        />

        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm z-20"
            >
              <h2 className="text-3xl font-mono font-black text-[#ff00ff] mb-8 glitch-text tracking-tighter uppercase italic">
                {gameOver ? 'SEGMENTATION_FAULT' : 'INITIALIZE_GRID'}
              </h2>
              <button
                onClick={resetGame}
                className="group flex flex-col items-center gap-2 text-[#00f2ff] hover:text-[#ff00ff] transition-colors"
              >
                <div className="p-4 border-2 border-current rounded-none hover:bg-current hover:text-black transition-all">
                  {gameOver ? <RotateCcw className="w-8 h-8" /> : <Zap className="w-8 h-8 fill-current" />}
                </div>
                <span className="text-xs font-mono uppercase tracking-[0.3em] font-bold">
                  {gameOver ? '[ REBOOT ]' : '[ EXECUTE ]'}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center text-[9px] font-mono text-[#00f2ff] opacity-40 uppercase tracking-widest">
        <div className="flex items-center gap-2">
           <Cpu className="w-3 h-3" /> CPU_FREQ: {isPlaying ? 'MAX' : 'IDLE'}
        </div>
        <span>CRC32: 0x8F2A1E</span>
      </div>
    </div>
  );
}
