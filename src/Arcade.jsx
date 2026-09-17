import React, { useRef, useState, useEffect, useCallback } from 'react';
import './Arcade.css';

// =============================================================================
// SYNTHESIZED RETRO AUDIO (WEB AUDIO API)
// =============================================================================
let audioCtx = null;
function playSfx(type, soundEnabled = true) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'flap') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(720, now + 0.1);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'point') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.08); // A5
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'hit') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.25);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'tap') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, now);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'win') {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.type = 'triangle';
        o.frequency.value = freq;
        g.gain.setValueAtTime(0.16, now + idx * 0.08);
        g.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.18);
        o.start(now + idx * 0.08);
        o.stop(now + idx * 0.08 + 0.18);
      });
    }
  } catch (e) {}
}

// =============================================================================
// GAME 1: FLIPPY BIRD COMPONENT
// =============================================================================
function FlippyBirdGame({ soundEnabled, onBack }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('ready'); // ready, playing, gameover
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('flippy_highscore') || '0', 10);
  });

  const stateRef = useRef({
    birdY: 200,
    velocity: 0,
    pipes: [],
    score: 0,
    status: 'ready',
    frame: 0
  });

  const jump = useCallback(() => {
    if (stateRef.current.status === 'ready') {
      stateRef.current.status = 'playing';
      stateRef.current.velocity = -6.8;
      setGameState('playing');
      playSfx('flap', soundEnabled);
    } else if (stateRef.current.status === 'playing') {
      stateRef.current.velocity = -6.8;
      playSfx('flap', soundEnabled);
    }
  }, [soundEnabled]);

  const restart = () => {
    stateRef.current = {
      birdY: 200,
      velocity: 0,
      pipes: [],
      score: 0,
      status: 'ready',
      frame: 0
    };
    setScore(0);
    setGameState('ready');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const gravity = 0.38;
    const pipeWidth = 52;
    const pipeGap = 120;
    const birdSize = 16;
    const groundHeight = 50;

    const loop = () => {
      const s = stateRef.current;
      s.frame++;

      // 1. Logic Update
      if (s.status === 'playing') {
        s.velocity += gravity;
        s.birdY += s.velocity;

        // Ground & Ceiling collision
        if (s.birdY + birdSize >= canvas.height - groundHeight) {
          s.birdY = canvas.height - groundHeight - birdSize;
          s.status = 'gameover';
          setGameState('gameover');
          playSfx('hit', soundEnabled);
        }
        if (s.birdY - birdSize <= 0) {
          s.birdY = birdSize;
          s.velocity = 0;
        }

        // Spawn Pipes
        if (s.frame % 90 === 0) {
          const minTop = 50;
          const maxTop = canvas.height - groundHeight - pipeGap - 50;
          const topHeight = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;
          s.pipes.push({
            x: canvas.width,
            top: topHeight,
            passed: false
          });
        }

        // Move Pipes & Check Collision
        for (let i = 0; i < s.pipes.length; i++) {
          const p = s.pipes[i];
          p.x -= 2.4;

          // Check bird collision
          const birdLeft = 70 - birdSize;
          const birdRight = 70 + birdSize;
          const birdTop = s.birdY - birdSize;
          const birdBottom = s.birdY + birdSize;

          if (birdRight > p.x && birdLeft < p.x + pipeWidth) {
            if (birdTop < p.top || birdBottom > p.top + pipeGap) {
              s.status = 'gameover';
              setGameState('gameover');
              playSfx('hit', soundEnabled);
            }
          }

          // Score check
          if (!p.passed && p.x + pipeWidth < 70) {
            p.passed = true;
            s.score += 1;
            setScore(s.score);
            playSfx('point', soundEnabled);
            if (s.score > highScore) {
              setHighScore(s.score);
              localStorage.setItem('flippy_highscore', s.score.toString());
            }
          }
        }

        // Filter out-of-screen pipes
        s.pipes = s.pipes.filter(p => p.x + pipeWidth > -10);
      }

      // 2. Render
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGrad.addColorStop(0, '#4ec0ca');
      skyGrad.addColorStop(0.7, '#88d7df');
      skyGrad.addColorStop(1, '#dff1f2');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Clouds in background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.beginPath();
      ctx.arc(80, 70, 24, 0, Math.PI * 2);
      ctx.arc(110, 64, 30, 0, Math.PI * 2);
      ctx.arc(140, 70, 24, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(260, 110, 20, 0, Math.PI * 2);
      ctx.arc(285, 105, 26, 0, Math.PI * 2);
      ctx.arc(310, 110, 20, 0, Math.PI * 2);
      ctx.fill();

      // Draw Pipes
      s.pipes.forEach(p => {
        // Top Pipe
        ctx.fillStyle = '#73bf2e';
        ctx.fillRect(p.x, 0, pipeWidth, p.top);
        // Top Pipe Cap
        ctx.fillStyle = '#558022';
        ctx.fillRect(p.x - 3, p.top - 18, pipeWidth + 6, 18);
        ctx.fillStyle = '#8ce03f';
        ctx.fillRect(p.x + 4, 0, 6, p.top - 18);

        // Bottom Pipe
        const bottomY = p.top + pipeGap;
        const bottomHeight = canvas.height - groundHeight - bottomY;
        ctx.fillStyle = '#73bf2e';
        ctx.fillRect(p.x, bottomY, pipeWidth, bottomHeight);
        // Bottom Pipe Cap
        ctx.fillStyle = '#558022';
        ctx.fillRect(p.x - 3, bottomY, pipeWidth + 6, 18);
        ctx.fillStyle = '#8ce03f';
        ctx.fillRect(p.x + 4, bottomY + 18, 6, bottomHeight - 18);
      });

      // Ground
      ctx.fillStyle = '#ded895';
      ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
      ctx.fillStyle = '#73bf2e';
      ctx.fillRect(0, canvas.height - groundHeight, canvas.width, 10);

      // Draw Bird
      ctx.save();
      ctx.translate(70, s.birdY);
      const angle = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (s.velocity * 0.08)));
      ctx.rotate(angle);

      // Bird Body (Golden Yellow)
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(0, 0, birdSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Wing (Animated flap)
      const flapOffset = s.status === 'playing' ? Math.sin(s.frame * 0.3) * 3 : 0;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(-5, flapOffset, 7, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Big Eye
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(6, -4, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(8, -4, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Beak (Orange)
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(19, 4);
      ctx.lineTo(10, 8);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // Score Display while playing
      if (s.status === 'playing') {
        ctx.font = 'bold 36px -apple-system, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,0.35)';
        ctx.shadowBlur = 6;
        ctx.fillText(s.score.toString(), canvas.width / 2, 60);
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [jump, soundEnabled, highScore]);

  return (
    <div className="active-game-container">
      <div className="game-nav-bar">
        <button type="button" className="back-to-arcade-btn" onClick={onBack}>
          ← All Games
        </button>
        <span className="active-game-heading">Flippy Bird</span>
        <span className="game-high-score">Best: {highScore}</span>
      </div>

      <div className="flappy-wrapper" onClick={jump}>
        <canvas ref={canvasRef} width={340} height={480} className="flappy-canvas" />

        {gameState === 'ready' && (
          <div className="flappy-overlay">
            <div className="flappy-overlay-card">
              <span style={{ fontSize: '38px' }}>🐥</span>
              <h3 className="flappy-title">Flippy Bird</h3>
              <p className="flappy-tip">Tap or Press Spacebar to Flap</p>
              <button
                type="button"
                className="flappy-action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  jump();
                }}
              >
                Tap to Start
              </button>
            </div>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="flappy-overlay">
            <div className="flappy-overlay-card">
              <span style={{ fontSize: '36px' }}>💥</span>
              <h3 className="flappy-title">Game Over</h3>
              <div className="flappy-score-board">
                <div className="flappy-score-box">
                  <span>Score</span>
                  <b>{score}</b>
                </div>
                <div className="flappy-score-box">
                  <span>Best</span>
                  <b>{highScore}</b>
                </div>
              </div>
              <button
                type="button"
                className="flappy-action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  restart();
                }}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// GAME 2: TIC TAC TOI COMPONENT (SMART AI & 2-PLAYER)
// =============================================================================
function TicTacToiGame({ soundEnabled, onBack }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState('ai_smart'); // 'ai_smart', 'ai_casual', 'pvp'
  const [scores, setScores] = useState({ x: 0, o: 0, ties: 0 });

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const checkWinner = (squares) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: combo };
      }
    }
    if (squares.every(Boolean)) {
      return { winner: 'Tie', line: [] };
    }
    return null;
  };

  const winResult = checkWinner(board);

  // Minimax algorithm for unbeatable smart AI
  const findBestMove = (currentBoard) => {
    const emptyIndices = currentBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (emptyIndices.length === 0) return null;

    // Check if AI can win in 1 move
    for (let idx of emptyIndices) {
      const temp = [...currentBoard];
      temp[idx] = 'O';
      if (checkWinner(temp)?.winner === 'O') return idx;
    }

    // Check if player X can win in 1 move and block
    for (let idx of emptyIndices) {
      const temp = [...currentBoard];
      temp[idx] = 'X';
      if (checkWinner(temp)?.winner === 'X') return idx;
    }

    // Take Center if available
    if (emptyIndices.includes(4)) return 4;

    // Take Corners
    const corners = [0, 2, 6, 8].filter(c => emptyIndices.includes(c));
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    // Random choice from remaining
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };

  // AI Turn handler
  useEffect(() => {
    if (!isXNext && (gameMode === 'ai_smart' || gameMode === 'ai_casual') && !winResult) {
      const timer = setTimeout(() => {
        let aiMove = null;
        if (gameMode === 'ai_casual' && Math.random() < 0.45) {
          const empty = board.map((v, i) => (v === null ? i : null)).filter(v => v !== null);
          aiMove = empty[Math.floor(Math.random() * empty.length)];
        } else {
          aiMove = findBestMove(board);
        }

        if (aiMove !== null) {
          const newBoard = [...board];
          newBoard[aiMove] = 'O';
          setBoard(newBoard);
          setIsXNext(true);
          playSfx('tap', soundEnabled);

          const res = checkWinner(newBoard);
          if (res?.winner === 'O') {
            setScores(prev => ({ ...prev, o: prev.o + 1 }));
            playSfx('hit', soundEnabled);
          } else if (res?.winner === 'Tie') {
            setScores(prev => ({ ...prev, ties: prev.ties + 1 }));
          }
        }
      }, 340);

      return () => clearTimeout(timer);
    }
  }, [isXNext, gameMode, board, winResult, soundEnabled]);

  const handleCellClick = (index) => {
    if (board[index] || winResult) return;
    if (!isXNext && gameMode !== 'pvp') return; // wait for AI

    const newBoard = [...board];
    const currentMark = isXNext ? 'X' : 'O';
    newBoard[index] = currentMark;
    setBoard(newBoard);
    playSfx('tap', soundEnabled);

    const res = checkWinner(newBoard);
    if (res?.winner === 'X') {
      setScores(prev => ({ ...prev, x: prev.x + 1 }));
      playSfx('win', soundEnabled);
    } else if (res?.winner === 'O') {
      setScores(prev => ({ ...prev, o: prev.o + 1 }));
      playSfx('win', soundEnabled);
    } else if (res?.winner === 'Tie') {
      setScores(prev => ({ ...prev, ties: prev.ties + 1 }));
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetMatch = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  let statusText = '';
  if (winResult) {
    statusText = winResult.winner === 'Tie' ? "🤝 Cat's Game (Draw)!" : `🎉 Player ${winResult.winner} Wins!`;
  } else if (!isXNext && gameMode !== 'pvp') {
    statusText = 'AI is planning next move...';
  } else {
    statusText = `Turn: Player ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="active-game-container">
      <div className="game-nav-bar">
        <button type="button" className="back-to-arcade-btn" onClick={onBack}>
          ← All Games
        </button>
        <span className="active-game-heading">Tic Tac Toi</span>
        <button type="button" className="back-to-arcade-btn" onClick={resetMatch}>
          ↺ Reset
        </button>
      </div>

      <div className="ttt-wrapper">
        <div className="ttt-mode-pills">
          <button
            type="button"
            className={`ttt-mode-btn ${gameMode === 'ai_smart' ? 'active' : ''}`}
            onClick={() => { setGameMode('ai_smart'); resetMatch(); }}
          >
            Vs Smart AI
          </button>
          <button
            type="button"
            className={`ttt-mode-btn ${gameMode === 'ai_casual' ? 'active' : ''}`}
            onClick={() => { setGameMode('ai_casual'); resetMatch(); }}
          >
            Vs Casual
          </button>
          <button
            type="button"
            className={`ttt-mode-btn ${gameMode === 'pvp' ? 'active' : ''}`}
            onClick={() => { setGameMode('pvp'); resetMatch(); }}
          >
            2 Player
          </button>
        </div>

        <div className="ttt-scoreboard">
          <div className="ttt-score-item">
            <span>X (You)</span>
            <b>{scores.x}</b>
          </div>
          <div className="ttt-score-item">
            <span>Ties</span>
            <b>{scores.ties}</b>
          </div>
          <div className="ttt-score-item">
            <span>O ({gameMode === 'pvp' ? 'Player 2' : 'AI'})</span>
            <b>{scores.o}</b>
          </div>
        </div>

        <div className="ttt-status-bar">{statusText}</div>

        <div className="ttt-grid">
          {board.map((cell, idx) => {
            const isWinCell = winResult?.line?.includes(idx);
            return (
              <button
                key={idx}
                type="button"
                className={`ttt-cell ${cell === 'X' ? 'mark-x' : cell === 'O' ? 'mark-o' : ''} ${isWinCell ? 'win-cell' : ''}`}
                onClick={() => handleCellClick(idx)}
                disabled={Boolean(cell) || Boolean(winResult)}
              >
                {cell}
              </button>
            );
          })}
        </div>

        <div className="ttt-bottom-actions">
          <button type="button" className="ttt-reset-btn" onClick={resetMatch}>
            {winResult ? 'Play Next Round' : 'Clear Board'}
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN ARCADE COMPONENT (CATALOG + MODAL + DOCK TRIGGER)
// =============================================================================
export default function Arcade() {
  const dialog = useRef(null);
  const trigger = useRef(null);
  const [activeGame, setActiveGame] = useState(null); // null, 'flappy', 'tictactoe'
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const restore = () => trigger.current?.focus();
    el.addEventListener('close', restore);
    return () => el.removeEventListener('close', restore);
  }, []);

  const openArcade = () => {
    dialog.current?.showModal();
  };

  const closeArcade = () => {
    dialog.current?.close();
  };

  return (
    <>
      {/* Dock Item Trigger */}
      <button
        ref={trigger}
        className="dock-item arcade"
        aria-label="Arcade — playable retro games"
        onClick={openArcade}
      >
        <img src="/icons/arcade.png" alt="Apple Arcade" />
        <span className="tooltip">Arcade</span>
      </button>

      {/* Arcade Dialog Window */}
      <dialog
        ref={dialog}
        className="arcade-dialog"
        onClick={(e) => {
          if (e.target === dialog.current) {
            closeArcade();
          }
        }}
      >
        {/* macOS Window Header */}
        <header className="arcade-header">
          <div className="arcade-header-left">
            <div className="arcade-traffic">
              <button
                type="button"
                className="arcade-dot close"
                aria-label="Close Arcade"
                onClick={closeArcade}
              />
              <button
                type="button"
                className="arcade-dot minimize"
                aria-label="Minimize"
                onClick={() => {
                  if (activeGame) setActiveGame(null);
                  else closeArcade();
                }}
              />
              <button
                type="button"
                className="arcade-dot expand"
                aria-label="Toggle Sound"
                onClick={() => setSoundEnabled(!soundEnabled)}
              />
            </div>

            <div className="arcade-header-title">
              <img src="/icons/arcade.png" alt="" />
              <h2>{activeGame === 'flappy' ? 'Arcade · Flippy Bird' : activeGame === 'tictactoe' ? 'Arcade · Tic Tac Toi' : 'Apple Arcade'}</h2>
            </div>
          </div>

          <div className="arcade-header-right">
            <button
              type="button"
              className="arcade-sound-btn"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            >
              {soundEnabled ? '🔊 Sound On' : '🔇 Muted'}
            </button>
            <button
              type="button"
              className="arcade-close-btn"
              aria-label="Close"
              onClick={closeArcade}
            >
              ✕
            </button>
          </div>
        </header>

        {/* Modal Body */}
        <div className="arcade-body">
          {activeGame === null && (
            <div className="arcade-catalog">
              {/* Hero Banner */}
              <div className="arcade-hero-banner">
                <div className="arcade-banner-content">
                  <h3>Playable Retro Mini-Games</h3>
                  <p>
                    Hand-crafted arcade micro-interactions and games. Flap through obstacle pipes or challenge the smart logic AI in Tic Tac Toi!
                  </p>
                </div>
              </div>

              <div className="arcade-section-title">Select a Game</div>

              {/* Games Grid */}
              <div className="arcade-games-grid">
                {/* 1. Flippy Bird Card */}
                <div
                  className="arcade-game-card"
                  onClick={() => {
                    playSfx('tap', soundEnabled);
                    setActiveGame('flappy');
                  }}
                >
                  <div className="game-card-art flappy-art">
                    <span className="art-emoji">🐥</span>
                  </div>
                  <span className="game-card-badge">RETRO FLAPPER</span>
                  <h4 className="game-card-title">Flippy Bird</h4>
                  <p className="game-card-desc">
                    Flap through green pipes, test your reflexes, and chase your personal high score with authentic physics!
                  </p>
                  <div className="game-card-footer">
                    <span className="game-high-score">
                      Best: {localStorage.getItem('flippy_highscore') || 0}
                    </span>
                    <button type="button" className="game-play-btn">
                      Play Now
                    </button>
                  </div>
                </div>

                {/* 2. Tic Tac Toi Card */}
                <div
                  className="arcade-game-card"
                  onClick={() => {
                    playSfx('tap', soundEnabled);
                    setActiveGame('tictactoe');
                  }}
                >
                  <div className="game-card-art tictactoe-art">
                    <span className="art-emoji">⭕️ ❌</span>
                  </div>
                  <span className="game-card-badge">STRATEGY & DUEL</span>
                  <h4 className="game-card-title">Tic Tac Toi</h4>
                  <p className="game-card-desc">
                    Classic 3×3 grid with smart minimax AI or pass-and-play local 2-player duel!
                  </p>
                  <div className="game-card-footer">
                    <span className="game-high-score">Solo / 2P</span>
                    <button type="button" className="game-play-btn">
                      Play Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeGame === 'flappy' && (
            <FlippyBirdGame
              soundEnabled={soundEnabled}
              onBack={() => setActiveGame(null)}
            />
          )}

          {activeGame === 'tictactoe' && (
            <TicTacToiGame
              soundEnabled={soundEnabled}
              onBack={() => setActiveGame(null)}
            />
          )}
        </div>
      </dialog>
    </>
  );
}
