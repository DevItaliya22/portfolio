'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { triggerConfetti } from '@/components/ui/confetti-side-cannons';

const DINO_HIGH_SCORE_KEY = 'dino-game-high-score';

type GameState = 'title' | 'playing' | 'gameover';

interface Cactus {
  x: number;
  type: number;
}

export default function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const blinkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Game state refs (using refs to avoid stale closures in the game loop)
  const stateRef = useRef<GameState>('title');
  const spaceDownRef = useRef(false);
  const dinoYRef = useRef(0);
  const yVelRef = useRef(0);
  const cactiRef = useRef<Cactus[]>([]);
  const scoreRef = useRef(0);
  const highScoreRef = useRef(0);
  const showPressSpaceRef = useRef(true);
  const newSpacePressRef = useRef(true);

  // Images refs
  const dinoImgRef = useRef<HTMLImageElement | null>(null);
  const cactiImgRef = useRef<HTMLImageElement | null>(null);
  const pressSpaceImgRef = useRef<HTMLImageElement | null>(null);
  const digitsImgRef = useRef<HTMLImageElement | null>(null);

  // React state for UI display (high score initialized from localStorage in useEffect)
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('title');

  // Scale factor for rendering the 16x16 game on a visible canvas
  const SCALE = 20;
  const GAME_SIZE = 16;

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const updateFavicon = useCallback(() => {
    const gameCanvas = gameCanvasRef.current;
    if (!gameCanvas) return;
    const favicon = document.querySelector<HTMLLinkElement>(
      'link[rel="shortcut icon"]'
    );
    if (favicon) {
      favicon.setAttribute('href', gameCanvas.toDataURL());
    }
  }, []);

  // --- Title Screen ---
  const titleScreenRender = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, GAME_SIZE, GAME_SIZE);

    if (showPressSpaceRef.current && pressSpaceImgRef.current) {
      ctx.drawImage(pressSpaceImgRef.current, 0, 0);
    }
    if (dinoImgRef.current) {
      ctx.drawImage(dinoImgRef.current, 0, 12);
    }
  }, []);

  // --- Game ---
  const gameRender = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, GAME_SIZE, GAME_SIZE);

    // Draw cacti
    const cacti = cactiRef.current;
    for (let i = 0; i < cacti.length; i++) {
      let clipX: number;
      switch (cacti[i].type) {
        case 1:
          clipX = 0;
          break;
        case 2:
          clipX = 5;
          break;
        default:
          clipX = 0;
          break;
      }
      if (cactiImgRef.current) {
        ctx.drawImage(
          cactiImgRef.current,
          clipX,
          0,
          5,
          5,
          cacti[i].x,
          11,
          5,
          5
        );
      }
    }

    // Draw dino
    if (dinoImgRef.current) {
      ctx.drawImage(dinoImgRef.current, 0, 16 - (dinoYRef.current + 4));
    }

    // Draw score
    const scoreStr = scoreRef.current.toString();
    for (let i = 3; i >= 0; i--) {
      if (i > scoreStr.length - 1) {
        const digitSheetPos = 0;
        if (digitsImgRef.current) {
          ctx.drawImage(
            digitsImgRef.current,
            digitSheetPos,
            0,
            4,
            5,
            16 - (i + 1) * 4,
            0,
            4,
            5
          );
        }
      } else {
        const digit = parseInt(scoreStr[scoreStr.length - 1 - i]);
        const digitSheetPos = digit * 4;
        if (digitsImgRef.current) {
          ctx.drawImage(
            digitsImgRef.current,
            digitSheetPos,
            0,
            4,
            5,
            16 - (i + 1) * 4,
            0,
            4,
            5
          );
        }
      }
    }
  }, []);

  const gameUpdate = useCallback(() => {
    const cacti = cactiRef.current;

    // Create cacti
    if (cacti.length > 0) {
      if (cacti[cacti.length - 1].x < GAME_SIZE) {
        const distance = Math.floor(Math.random() * 32) + 64;
        const type = Math.floor(Math.random() * 2) + 1;
        cacti.push({ x: GAME_SIZE + distance, type });
      }
    } else {
      cacti.push({ x: GAME_SIZE, type: 0 });
    }

    // Update cacti
    for (let i = 0; i < cacti.length; i++) {
      if (cacti[i].x < 4 && dinoYRef.current < 3) {
        // Game over
        stateRef.current = 'gameover';
        setGameState('gameover');

        if (scoreRef.current > highScoreRef.current) {
          highScoreRef.current = scoreRef.current;
          setHighScore(scoreRef.current);
          try {
            localStorage.setItem(DINO_HIGH_SCORE_KEY, String(scoreRef.current));
          } catch {
            // ignore
          }
          triggerConfetti();
        }

        if (spaceDownRef.current) {
          newSpacePressRef.current = false;
        }
        return;
      } else {
        cacti[i].x--;
        if (cacti[i].x < -4) {
          cacti.splice(i, 1);
          i--;
        }
      }
    }

    // Update player
    dinoYRef.current += yVelRef.current;
    if (dinoYRef.current <= 0) {
      dinoYRef.current = 0;
      yVelRef.current = 0;
    }

    if (dinoYRef.current > 0) {
      yVelRef.current -= 0.05;
    } else {
      if (spaceDownRef.current) {
        yVelRef.current = 0.8;
      }
    }

    // Update score
    scoreRef.current++;
    setScore(scoreRef.current);
  }, []);

  const gameStart = useCallback(() => {
    yVelRef.current = 0.8;
    dinoYRef.current = 0;
    scoreRef.current = 0;
    setScore(0);
    cactiRef.current = [];
  }, []);

  // --- Main game loop tick ---
  const tick = useCallback(() => {
    const state = stateRef.current;

    if (state === 'title') {
      // Title screen update
      if (spaceDownRef.current) {
        // Quit title, start game
        if (blinkIntervalRef.current) {
          clearInterval(blinkIntervalRef.current);
          blinkIntervalRef.current = null;
        }
        stateRef.current = 'playing';
        setGameState('playing');
        gameStart();
      }
      titleScreenRender();
    } else if (state === 'playing') {
      gameUpdate();
      if (stateRef.current === 'playing') {
        gameRender();
      }
    } else if (state === 'gameover') {
      // Game over — wait for a new space press to restart
      if (spaceDownRef.current && newSpacePressRef.current) {
        stateRef.current = 'playing';
        setGameState('playing');
        gameStart();
      } else if (!spaceDownRef.current && !newSpacePressRef.current) {
        newSpacePressRef.current = true;
      }
      // Keep rendering the last frame (game over screen)
      gameRender();
    }

    updateFavicon();

    // Draw scaled version onto the visible canvas
    const displayCanvas = canvasRef.current;
    const gameCanvas = gameCanvasRef.current;
    if (displayCanvas && gameCanvas) {
      const displayCtx = displayCanvas.getContext('2d');
      if (displayCtx) {
        displayCtx.imageSmoothingEnabled = false;
        displayCtx.clearRect(0, 0, GAME_SIZE * SCALE, GAME_SIZE * SCALE);
        displayCtx.drawImage(
          gameCanvas,
          0,
          0,
          GAME_SIZE * SCALE,
          GAME_SIZE * SCALE
        );
      }
    }
  }, [titleScreenRender, gameUpdate, gameRender, gameStart, updateFavicon]);

  useEffect(() => {
    // Create the offscreen 16x16 game canvas
    const gameCanvas = document.createElement('canvas');
    gameCanvas.width = GAME_SIZE;
    gameCanvas.height = GAME_SIZE;
    gameCanvasRef.current = gameCanvas;
    ctxRef.current = gameCanvas.getContext('2d');

    // Set up the display canvas
    const displayCanvas = canvasRef.current;
    if (displayCanvas) {
      displayCanvas.width = GAME_SIZE * SCALE;
      displayCanvas.height = GAME_SIZE * SCALE;
    }

    // Load high score from localStorage
    try {
      const stored = localStorage.getItem(DINO_HIGH_SCORE_KEY);
      if (stored != null) {
        const n = parseInt(stored, 10);
        if (!Number.isNaN(n) && n >= 0) {
          highScoreRef.current = n;
          setHighScore(n);
        }
      }
    } catch {
      // ignore
    }

    // Load images then start the game loop
    const init = async () => {
      try {
        const [dino, cacti, pressSpace, digits] = await Promise.all([
          loadImage('/images/dino.png'),
          loadImage('/images/cacti.png'),
          loadImage('/images/press_space.png'),
          loadImage('/images/digits.png'),
        ]);

        dinoImgRef.current = dino;
        cactiImgRef.current = cacti;
        pressSpaceImgRef.current = pressSpace;
        digitsImgRef.current = digits;

        // Start title screen blink
        blinkIntervalRef.current = setInterval(() => {
          showPressSpaceRef.current = !showPressSpaceRef.current;
        }, 500);

        // Start game loop at 100ms intervals (matching original)
        intervalRef.current = setInterval(tick, 100);
      } catch (err) {
        console.error('Failed to load game images:', err);
      }
    };

    init();

    // Keyboard handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        spaceDownRef.current = true;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        spaceDownRef.current = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (blinkIntervalRef.current) clearInterval(blinkIntervalRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [tick]);

  // Touch / click handler for mobile support
  const handlePointerDown = () => {
    spaceDownRef.current = true;
  };
  const handlePointerUp = () => {
    spaceDownRef.current = false;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <div className="text-center space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">
          Dino Favicon Game
        </h2>
        <p className="text-sm text-muted-foreground">
          Press{' '}
          <kbd className="px-1.5 py-0.5 text-xs border rounded bg-muted font-mono">
            Space
          </kbd>{' '}
          to jump{' '}
          <span className="hidden sm:inline">
            &middot; or tap the canvas on mobile
          </span>
        </p>
      </div>

      <div
        className="relative border-2 border-border rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer select-none"
        style={{ width: GAME_SIZE * SCALE, height: GAME_SIZE * SCALE }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: GAME_SIZE * SCALE,
            height: GAME_SIZE * SCALE,
            imageRendering: 'pixelated',
          }}
        />

        {gameState === 'gameover' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
            <div className="text-center text-white drop-shadow-md">
              <p className="text-xs font-bold uppercase tracking-widest">
                Game Over
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-6 text-sm font-mono">
        <span>
          Score:{' '}
          <span className="font-bold tabular-nums">
            {String(score).padStart(4, '0')}
          </span>
        </span>
        <span className="text-muted-foreground">
          HI:{' '}
          <span className="font-bold tabular-nums">
            {String(highScore).padStart(4, '0')}
          </span>
        </span>
      </div>

      <p className="text-xs text-muted-foreground mt-1">
        ↑ Also check the browser tab favicon!
      </p>
    </div>
  );
}
