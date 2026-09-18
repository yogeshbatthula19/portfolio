import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
  const [maximized, setMaximized] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null); // null, 'flippy', 'tictactoe'
  const [minimized, setMinimized] = useState(false);
  const { pos, resetPos, dragHandlers } = useDraggable(maximized);

  const openArcade = () => {
    if (!minimized) setMaximized(false);
    setMinimized(false);
    setIsOpen(true);
  };

  const closeArcade = () => {
    setMinimized(false);
    setIsOpen(false);
    setSelectedGame(null);
    resetPos();
    trigger.current?.focus();
  };

  useEffect(() => {
    if (!isOpen || minimized) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeArcade();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, minimized]);

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

      {/* Clean Apple Modal Dialog Overlay & Draggable Window (rendered at document.body for true viewport centering) */}
      {isOpen && createPortal(
        <div
          className="arcade-modal-overlay"
          style={minimized?{display:'none'}:undefined}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeArcade();
            }
          }}
        >
          <div
            className={'arcade-window'+(maximized&&!minimized?' app-fullscreen':'')}
            style={maximized?undefined:{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Native macOS Header Bar with Traffic Lights & Apple Arcade Navigation */}
            <header className="arcade-header" {...dragHandlers}>
              <div className="arcade-traffic">
                <button
                  type="button"
                  className="red"
                  aria-label="Close Arcade"
                  title="Close (Esc)"
                  onClick={closeArcade}
                >
                  <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
                <button
                  type="button"
                  className="yellow"
                  aria-label="Minimize"
                  title="Minimize"
                  onClick={()=>{setMinimized(true);trigger.current?.focus();}}
                />
                <button
                  type="button"
                  className="green"
                  aria-label="Toggle maximize Games"
                  onClick={()=>{resetPos();setMaximized(v=>!v)}}
                  title="Zoom"
                />
              </div>

              <div className="arcade-nav-center">
                {selectedGame ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      type="button"
                      className="arcade-back-nav"
                      onClick={() => setSelectedGame(null)}
                    >
                      ‹ Arcade
                    </button>
                    <span className="arcade-header-game-title">
                      {selectedGame === 'flippy' ? 'Flippy Bird' : 'Tic Tac Toi'}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="arcade-brand">
                      <svg width="15" height="17" viewBox="0 0 170 170" fill="currentColor">
                        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.94-12.04-14.59-6.08-9.33-10.88-20.15-14.4-32.48-3.52-12.33-5.28-24.12-5.28-35.37 0-14.44 3.73-26.6 11.19-36.48 7.46-9.88 16.99-14.93 28.58-15.15 4.8 0 10.3 1.25 16.51 3.74 6.2 2.49 10.29 3.78 12.27 3.86 1.77 0 5.92-1.37 12.44-4.11 6.52-2.74 12.08-3.99 16.68-3.74 12.63.66 22.84 5.37 30.63 14.13-11.04 6.74-16.44 16.03-16.2 27.87.24 9.87 4.09 18.25 11.55 25.13 7.46 6.89 16.32 10.74 26.58 11.56-2.2 6.64-4.8 13.06-7.8 19.26zM119.22 33.64c0-7.3 2.66-14.18 7.99-20.64 5.33-6.46 11.89-10.8 19.68-13 1.09 8.24-.76 15.69-5.55 22.35-4.79 6.66-11.39 10.8-19.8 12.42-.65-.37-1.42-.7-2.32-1.13z"/>
                      </svg>
                      Arcade <span>ORIGINALS</span>
                    </div>

                    <div className="arcade-tabs">
                      {['Discover'].map((tab, idx) => (
                        <button
                          key={tab}
                          type="button"
                          className={`arcade-tab ${idx === 0 ? 'active' : ''}`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div style={{ width: 70, display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="arcade-close-btn"
                  aria-label="Close Arcade window"
                  title="Close (Esc)"
                  onClick={closeArcade}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </header>

            {/* Apple Arcade Body Content */}
            <div className="arcade-body">
              {selectedGame === null ? (
                <div className="arcade-discover-view">
                  {/* Spotlight Hero Banner */}
                  <div className="arcade-hero-spotlight">
                    <div>
                      <div className="arcade-hero-badge">Arcade Spotlight</div>
                      <h2 className="arcade-hero-title">Flippy Bird: Flight Edition</h2>
                      <p className="arcade-hero-desc">
                        Tap to flap and weave through dynamic obstacles in this addicting endless arcade flier.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="arcade-hero-btn"
                      onClick={() => setSelectedGame('flippy')}
                    >
                      Play Now
                    </button>
                  </div>

                  {/* 2 Games App Cards Shelf */}
                  <section className="arcade-shelf">
                    <div className="arcade-shelf-header">
                      <h3 className="arcade-shelf-title">Popular Arcade Games</h3>
                      <span className="arcade-shelf-count">2 Games Available</span>
                    </div>

                    <div className="arcade-games-grid">
                      {/* Flippy Bird */}
                      <div
                        className="arcade-game-card"
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedGame('flippy')}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setSelectedGame('flippy');
                          }
                        }}
                      >
                        <div className="arcade-app-icon arcade-icon-flippy">
                          🐥
                        </div>
                        <div className="arcade-card-details">
                          <h4 className="arcade-card-title">Flippy Bird</h4>
                          <p className="arcade-card-genre">Action · Endless Flier</p>
                          <div className="arcade-card-rating">
                            ★ 4.9 · 12K Ratings
                          </div>
                        </div>
                        <button
                          type="button"
                          className="arcade-play-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedGame('flippy');
                          }}
                        >
                          Play
                        </button>
                      </div>

                      {/* Tic Tac Toi */}
                      <div
                        className="arcade-game-card"
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedGame('tictactoe')}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setSelectedGame('tictactoe');
                          }
                        }}
                      >
                        <div className="arcade-app-icon arcade-icon-ttt">
                          ✕ ◯
                        </div>
                        <div className="arcade-card-details">
                          <h4 className="arcade-card-title">Tic Tac Toi</h4>
                          <p className="arcade-card-genre">Strategy · Board Game</p>
                          <div className="arcade-card-rating">
                            ★ 4.8 · 8.4K Ratings
                          </div>
                        </div>
                        <button
                          type="button"
                          className="arcade-play-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedGame('tictactoe');
                          }}
                        >
                          Play
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
              ) : selectedGame === 'flippy' ? (
                <div className="active-game-container">
                  <FlippyBird onBack={() => setSelectedGame(null)} />
                </div>
              ) : (
                <div className="active-game-container">
                  <TicTacToi onBack={() => setSelectedGame(null)} />
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
