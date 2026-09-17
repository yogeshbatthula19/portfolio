import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useDraggable } from './useDraggable.js';
import './Arcade.css';

// =============================================================================
// GAME 1: FLIPPY BIRD (APPLE MINIMALIST)
// =============================================================================
function FlippyBird({ onBack }) {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState('ready'); // ready, playing, gameover
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('flippy_best') || '0', 10);
  });

  const engineRef = useRef({
    birdY: 180,
    velocity: 0,
    pipes: [],
    score: 0,
    status: 'ready',
    frame: 0,
  });

  const jump = useCallback(() => {
    const e = engineRef.current;
    if (e.status === 'ready') {
      e.status = 'playing';
      e.velocity = -6.5;
      setStatus('playing');
    } else if (e.status === 'playing') {
      e.velocity = -6.5;
    }
  }, []);

  const restart = () => {
    engineRef.current = {
      birdY: 180,
      velocity: 0,
      pipes: [],
      score: 0,
      status: 'ready',
      frame: 0,
    };
    setScore(0);
    setStatus('ready');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const gravity = 0.36;
    const pipeWidth = 48;
    const pipeGap = 125;
    const birdSize = 14;
    const groundH = 36;

    const loop = () => {
      const e = engineRef.current;
      e.frame++;

      if (e.status === 'playing') {
        e.velocity += gravity;
        e.birdY += e.velocity;

        // Ground collision
        if (e.birdY + birdSize >= canvas.height - groundH) {
          e.birdY = canvas.height - groundH - birdSize;
          e.status = 'gameover';
          setStatus('gameover');
        }
        if (e.birdY - birdSize <= 0) {
          e.birdY = birdSize;
          e.velocity = 0;
        }

        // Spawn pipes
        if (e.frame % 95 === 0) {
          const minH = 40;
          const maxH = canvas.height - groundH - pipeGap - 40;
          const topH = Math.floor(Math.random() * (maxH - minH + 1)) + minH;
          e.pipes.push({ x: canvas.width, top: topH, passed: false });
        }

        // Move pipes & collision
        for (let i = 0; i < e.pipes.length; i++) {
          const p = e.pipes[i];
          p.x -= 2.2;

          const birdX = 65;
          if (birdX + birdSize > p.x && birdX - birdSize < p.x + pipeWidth) {
            if (e.birdY - birdSize < p.top || e.birdY + birdSize > p.top + pipeGap) {
              e.status = 'gameover';
              setStatus('gameover');
            }
          }

          if (!p.passed && p.x + pipeWidth < birdX) {
            p.passed = true;
            e.score += 1;
            setScore(e.score);
            if (e.score > bestScore) {
              setBestScore(e.score);
              localStorage.setItem('flippy_best', e.score.toString());
            }
          }
        }

        e.pipes = e.pipes.filter((p) => p.x + pipeWidth > -10);
      }

      // Render
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Soft neutral Apple background
      ctx.fillStyle = '#f5f5f7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle clouds
      ctx.fillStyle = '#e5e5ea';
      ctx.beginPath();
      ctx.arc(60, 60, 20, 0, Math.PI * 2);
      ctx.arc(85, 54, 25, 0, Math.PI * 2);
      ctx.arc(110, 60, 20, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(220, 90, 18, 0, Math.PI * 2);
      ctx.arc(242, 86, 22, 0, Math.PI * 2);
      ctx.arc(264, 90, 18, 0, Math.PI * 2);
      ctx.fill();

      // Pipes (clean monochrome graphite)
      e.pipes.forEach((p) => {
        ctx.fillStyle = '#d2d2d7';
        ctx.fillRect(p.x, 0, pipeWidth, p.top);
        ctx.fillStyle = '#1d1d1f';
        ctx.fillRect(p.x - 2, p.top - 14, pipeWidth + 4, 14);

        const bottomY = p.top + pipeGap;
        const bottomH = canvas.height - groundH - bottomY;
        ctx.fillStyle = '#d2d2d7';
        ctx.fillRect(p.x, bottomY, pipeWidth, bottomH);
        ctx.fillStyle = '#1d1d1f';
        ctx.fillRect(p.x - 2, bottomY, pipeWidth + 4, 14);
      });

      // Ground
      ctx.fillStyle = '#e5e5ea';
      ctx.fillRect(0, canvas.height - groundH, canvas.width, groundH);
      ctx.fillStyle = '#1d1d1f';
      ctx.fillRect(0, canvas.height - groundH, canvas.width, 2);

      // Bird
      ctx.save();
      ctx.translate(65, e.birdY);
      const angle = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, e.velocity * 0.08));
      ctx.rotate(angle);

      // Bird Body (Graphite)
      ctx.fillStyle = '#1d1d1f';
      ctx.beginPath();
      ctx.arc(0, 0, birdSize, 0, Math.PI * 2);
      ctx.fill();

      // Eye
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(5, -3, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1d1d1f';
      ctx.beginPath();
      ctx.arc(6.5, -3, 2, 0, Math.PI * 2);
      ctx.fill();

      // Beak
      ctx.fillStyle = '#f56565';
      ctx.beginPath();
      ctx.moveTo(9, 0);
      ctx.lineTo(16, 3);
      ctx.lineTo(9, 6);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // In-game score
      if (e.status === 'playing') {
        ctx.font = '600 32px -apple-system, sans-serif';
        ctx.fillStyle = '#1d1d1f';
        ctx.textAlign = 'center';
        ctx.fillText(e.score.toString(), canvas.width / 2, 54);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    const onKey = (ev) => {
      if (ev.code === 'Space' || ev.code === 'ArrowUp') {
        ev.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', onKey);
    };
  }, [jump, bestScore]);

  return (
    <div>
      <div className="active-game-header-bar">
        <button type="button" className="nav-back-link" onClick={onBack}>
          ‹ Games
        </button>
        <h3 className="active-game-title">Flippy Bird</h3>
        <span style={{ fontSize: '12px', color: '#86868b' }}>Best: {bestScore}</span>
      </div>

      <div className="flappy-game-box" onClick={jump}>
        <canvas ref={canvasRef} width={320} height={440} />

        {status === 'ready' && (
          <div className="flappy-overlay-simple">
            <h4>Flippy Bird</h4>
            <p>Tap or press Spacebar to jump</p>
            <button
              type="button"
              className="apple-pill-btn"
              onClick={(e) => {
                e.stopPropagation();
                jump();
              }}
            >
              Start
            </button>
          </div>
        )}

        {status === 'gameover' && (
          <div className="flappy-overlay-simple">
            <h4>Game Over</h4>
            <div className="flappy-score-row">
              <div className="flappy-score-unit">
                <span>Score</span>
                <b>{score}</b>
              </div>
              <div className="flappy-score-unit">
                <span>Best</span>
                <b>{bestScore}</b>
              </div>
            </div>
            <button
              type="button"
              className="apple-pill-btn"
              onClick={(e) => {
                e.stopPropagation();
                restart();
              }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// GAME 2: TIC TAC TOI (APPLE MINIMALIST)
// =============================================================================
function TicTacToi({ onBack }) {
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const getWinner = (cells) => {
    for (const [a, b, c] of lines) {
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return { winner: cells[a], combo: [a, b, c] };
      }
    }
    if (cells.every(Boolean)) return { winner: 'Tie', combo: [] };
    return null;
  };

  const result = getWinner(grid);

  // Computer AI move (O)
  useEffect(() => {
    if (!isXTurn && !result) {
      const timer = setTimeout(() => {
        const empties = grid.map((v, i) => (v === null ? i : null)).filter((v) => v !== null);
        if (empties.length === 0) return;

        // Try to win or block
        let move = null;
        for (const idx of empties) {
          const test = [...grid];
          test[idx] = 'O';
          if (getWinner(test)?.winner === 'O') {
            move = idx;
            break;
          }
        }
        if (move === null) {
          for (const idx of empties) {
            const test = [...grid];
            test[idx] = 'X';
            if (getWinner(test)?.winner === 'X') {
              move = idx;
              break;
            }
          }
        }
        if (move === null) {
          move = empties.includes(4) ? 4 : empties[Math.floor(Math.random() * empties.length)];
        }

        const next = [...grid];
        next[move] = 'O';
        setGrid(next);
        setIsXTurn(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isXTurn, grid, result]);

  const handlePress = (i) => {
    if (grid[i] || result || !isXTurn) return;
    const next = [...grid];
    next[i] = 'X';
    setGrid(next);
    setIsXTurn(false);
  };

  const reset = () => {
    setGrid(Array(9).fill(null));
    setIsXTurn(true);
  };

  let message = 'Your Turn (X)';
  if (result) {
    message = result.winner === 'Tie' ? 'Draw Game' : result.winner === 'X' ? 'You Won!' : 'Computer Won';
  } else if (!isXTurn) {
    message = 'Computer is thinking...';
  }

  return (
    <div>
      <div className="active-game-header-bar">
        <button type="button" className="nav-back-link" onClick={onBack}>
          ‹ Games
        </button>
        <h3 className="active-game-title">Tic Tac Toi</h3>
        <button type="button" className="nav-back-link" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="ttt-simple-container">
        <div className="ttt-status-msg">{message}</div>

        <div className="ttt-board-apple">
          {grid.map((cell, i) => {
            const isWinning = result?.combo?.includes(i);
            return (
              <button
                key={i}
                type="button"
                className={`ttt-tile ${cell === 'X' ? 'x' : cell === 'O' ? 'o' : ''} ${isWinning ? 'win' : ''}`}
                onClick={() => handlePress(i)}
                disabled={Boolean(cell) || Boolean(result)}
              >
                {cell}
              </button>
            );
          })}
        </div>

        {result && (
          <div className="ttt-actions-row">
            <button type="button" className="ttt-restart-pill" onClick={reset}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// MAIN ARCADE COMPONENT (JUST 2 GAMES, CLEAN APPLE INTERFACE)
// =============================================================================
export default function Arcade() {
  const trigger = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null); // null, 'flippy', 'tictactoe'
  const { pos, resetPos, dragHandlers } = useDraggable();

  const openArcade = () => {
    setIsOpen(true);
  };

  const closeArcade = () => {
    setIsOpen(false);
    setSelectedGame(null);
    resetPos();
    trigger.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeArcade();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Dock Item Trigger */}
      <button
        ref={trigger}
        className="dock-item arcade"
        aria-label="Games"
        onClick={openArcade}
      >
        <img src="/icons/arcade.png" alt="Arcade" />
        <span className="tooltip">Games</span>
      </button>

      {/* Clean Apple Modal Dialog Overlay & Draggable Window */}
      {isOpen && (
        <div
          className="arcade-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeArcade();
            }
          }}
        >
          <div
            className="arcade-window"
            style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Native macOS Header Bar - Draggable */}
            <header className="arcade-header" {...dragHandlers}>
              <div className="arcade-header-left">
                <img src="/icons/arcade.png" alt="" />
                <h2 className="arcade-header-title">
                  {selectedGame === 'flippy'
                    ? 'Flippy Bird'
                    : selectedGame === 'tictactoe'
                    ? 'Tic Tac Toi'
                    : 'Games'}
                </h2>
              </div>

              <button
                type="button"
                className="arcade-close-cross"
                aria-label="Close games panel"
                title="Close"
                onClick={closeArcade}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ pointerEvents: 'none' }}
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>

            {/* Clean Apple Body Content */}
            <div className="arcade-body">
              {selectedGame === null ? (
                <div>
                  <h2 className="games-list-title">Games</h2>
                  <p className="games-list-sub">Select a game to play.</p>

                  <div className="games-list-stack">
                    {/* 1. Flippy Bird Row */}
                    <div
                      className="game-apple-row"
                      onClick={() => setSelectedGame('flippy')}
                    >
                      <div className="game-icon-box">🐥</div>
                      <div className="game-info-col">
                        <h3>Flippy Bird</h3>
                        <p>Tap to flap and fly through obstacles.</p>
                      </div>
                      <button type="button" className="game-play-pill">
                        Play
                      </button>
                    </div>

                    {/* 2. Tic Tac Toi Row */}
                    <div
                      className="game-apple-row"
                      onClick={() => setSelectedGame('tictactoe')}
                    >
                      <div className="game-icon-box">✕ ◯</div>
                      <div className="game-info-col">
                        <h3>Tic Tac Toi</h3>
                        <p>Classic 3×3 game against the computer.</p>
                      </div>
                      <button type="button" className="game-play-pill">
                        Play
                      </button>
                    </div>
                  </div>
                </div>
              ) : selectedGame === 'flippy' ? (
                <FlippyBird onBack={() => setSelectedGame(null)} />
              ) : (
                <TicTacToi onBack={() => setSelectedGame(null)} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
