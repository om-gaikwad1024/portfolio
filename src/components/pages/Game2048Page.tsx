'use client';

import React, { useState, useEffect, useCallback } from 'react';

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fragment+Mono:ital@0;1&family=Lexend:wght@200;300;400;500&display=swap');
  @keyframes tileIn { from { opacity:0; transform:scale(0.5); } to { opacity:1; transform:scale(1); } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  .tile-new { animation: tileIn 0.12s ease both; }
  .g2k-fadein { animation: fadeUp 0.4s ease both; }
`;

const BG_STYLE: React.CSSProperties = {
  fontFamily: "'Lexend', sans-serif",
  backgroundImage:
    'linear-gradient(rgba(240,206,50,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(240,206,50,0.04) 1px,transparent 1px)',
  backgroundSize: '40px 40px',
};

interface Game2048Props {
  isMobile?: boolean;
}

type Board = number[][];

const TILE_STYLES: Record<number, { bg: string; text: string; border: string }> = {
  0:    { bg: 'bg-transparent',        text: 'text-transparent',  border: 'border-white/8' },
  2:    { bg: 'bg-transparent',        text: 'text-white/70',      border: 'border-white/20' },
  4:    { bg: 'bg-[#f0ce32]/10',       text: 'text-[#f0ce32]',    border: 'border-[#f0ce32]/40' },
  8:    { bg: 'bg-[#f0ce32]/20',       text: 'text-[#f0ce32]',    border: 'border-[#f0ce32]/60' },
  16:   { bg: 'bg-[#f0ce32]/35',       text: 'text-black',        border: 'border-[#f0ce32]' },
  32:   { bg: 'bg-[#f0ce32]/55',       text: 'text-black',        border: 'border-[#f0ce32]' },
  64:   { bg: 'bg-[#f0ce32]/75',       text: 'text-black',        border: 'border-[#f0ce32]' },
  128:  { bg: 'bg-[#f0ce32]',          text: 'text-black',        border: 'border-[#f0ce32]' },
  256:  { bg: 'bg-[#f0ce32]',          text: 'text-black',        border: 'border-[#f0ce32]' },
  512:  { bg: 'bg-[#f0ce32]',          text: 'text-black',        border: 'border-[#f0ce32]' },
  1024: { bg: 'bg-white',              text: 'text-black',        border: 'border-white' },
  2048: { bg: 'bg-white',              text: 'text-black',        border: 'border-white' },
};

function getTileStyle(value: number) {
  return TILE_STYLES[value] ?? { bg: 'bg-white', text: 'text-black', border: 'border-white' };
}

export const Game2048Page = ({ isMobile = false }: Game2048Props) => {
  const [board, setBoard] = useState<Board>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [time, setTime] = useState('');
  const [tileKeys, setTileKeys] = useState<number[][]>(Array(4).fill(null).map(() => Array(4).fill(0)));
  const [keyCounter, setKeyCounter] = useState(0);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const addRandomTile = useCallback((b: Board, keys: number[][], counter: { val: number }) => {
    const empty: [number, number][] = [];
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++)
        if (b[i][j] === 0) empty.push([i, j]);
    if (empty.length > 0) {
      const [r, c] = empty[Math.floor(Math.random() * empty.length)];
      b[r][c] = Math.random() < 0.9 ? 2 : 4;
      counter.val++;
      keys[r][c] = counter.val;
    }
  }, []);

  const initBoard = useCallback(() => {
    const b: Board = Array(4).fill(null).map(() => Array(4).fill(0));
    const keys = Array(4).fill(null).map(() => Array(4).fill(0));
    let counter = { val: keyCounter };
    addRandomTile(b, keys, counter);
    addRandomTile(b, keys, counter);
    setKeyCounter(counter.val);
    return { b, keys };
  }, [addRandomTile, keyCounter]);

  useEffect(() => {
    try { const s = localStorage.getItem('2048-best'); if (s) setBestScore(parseInt(s)); } catch {}
    const { b, keys } = initBoard();
    setBoard(b);
    setTileKeys(keys);
  }, []);

  const checkGameOver = (b: Board) => {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        if (b[i][j] === 0) return false;
        if (j < 3 && b[i][j] === b[i][j + 1]) return false;
        if (i < 3 && b[i][j] === b[i + 1][j]) return false;
      }
    return true;
  };

  const move = useCallback((dir: 'up' | 'down' | 'left' | 'right') => {
    if (gameOver) return;

    let nb = board.map(r => [...r]);
    let nk = tileKeys.map(r => [...r]);
    let moved = false;
    let points = 0;
    let counter = { val: keyCounter };

    const slideRow = (row: number[], rowKeys: number[]): [number[], number[], number] => {
      const vals = row.filter(x => x !== 0);
      const keys = rowKeys.filter((_, i) => row[i] !== 0);
      const merged: number[] = [];
      const mkeys: number[] = [];
      let pts = 0;
      let i = 0;
      while (i < vals.length) {
        if (i + 1 < vals.length && vals[i] === vals[i + 1]) {
          const v = vals[i] * 2;
          merged.push(v);
          counter.val++;
          mkeys.push(counter.val);
          pts += v;
          i += 2;
        } else {
          merged.push(vals[i]);
          mkeys.push(keys[i]);
          i++;
        }
      }
      while (merged.length < 4) { merged.push(0); mkeys.push(0); }
      return [merged, mkeys, pts];
    };

    if (dir === 'left') {
      for (let i = 0; i < 4; i++) {
        const [nr, nrk, p] = slideRow(nb[i], nk[i]);
        if (JSON.stringify(nr) !== JSON.stringify(nb[i])) moved = true;
        nb[i] = nr; nk[i] = nrk; points += p;
      }
    } else if (dir === 'right') {
      for (let i = 0; i < 4; i++) {
        const [nr, nrk, p] = slideRow([...nb[i]].reverse(), [...nk[i]].reverse());
        const rnr = [...nr].reverse();
        const rnrk = [...nrk].reverse();
        if (JSON.stringify(rnr) !== JSON.stringify(nb[i])) moved = true;
        nb[i] = rnr; nk[i] = rnrk; points += p;
      }
    } else if (dir === 'up') {
      for (let j = 0; j < 4; j++) {
        const col = [nb[0][j], nb[1][j], nb[2][j], nb[3][j]];
        const ck  = [nk[0][j], nk[1][j], nk[2][j], nk[3][j]];
        const [nc, nck, p] = slideRow(col, ck);
        if (JSON.stringify(nc) !== JSON.stringify(col)) moved = true;
        for (let i = 0; i < 4; i++) { nb[i][j] = nc[i]; nk[i][j] = nck[i]; }
        points += p;
      }
    } else {
      for (let j = 0; j < 4; j++) {
        const col = [nb[3][j], nb[2][j], nb[1][j], nb[0][j]];
        const ck  = [nk[3][j], nk[2][j], nk[1][j], nk[0][j]];
        const [nc, nck, p] = slideRow(col, ck);
        if (JSON.stringify(nc) !== JSON.stringify([...col].reverse())) moved = true;
        for (let i = 0; i < 4; i++) { nb[i][j] = nc[3 - i]; nk[i][j] = nck[3 - i]; }
        points += p;
      }
    }

    if (moved) {
      addRandomTile(nb, nk, counter);
      setBoard(nb);
      setTileKeys(nk);
      setKeyCounter(counter.val);
      setScore(prev => {
        const ns = prev + points;
        if (ns > bestScore) { setBestScore(ns); try { localStorage.setItem('2048-best', String(ns)); } catch {} }
        return ns;
      });
      setMoveCount(m => m + 1);
      if (nb.some(r => r.some(c => c === 2048)) && !won) setWon(true);
      if (checkGameOver(nb)) setGameOver(true);
    }
  }, [board, tileKeys, gameOver, won, bestScore, keyCounter, addRandomTile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, 'up'|'down'|'left'|'right'> = {
        ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right'
      };
      if (map[e.key]) { e.preventDefault(); move(map[e.key]); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [move]);

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const resetGame = () => {
    const { b, keys } = initBoard();
    setBoard(b);
    setTileKeys(keys);
    setScore(0);
    setGameOver(false);
    setWon(false);
    setMoveCount(0);
  };

  const getTileSize = (value: number) => {
    if (value >= 1024) return 'text-[18px] md:text-[22px]';
    if (value >= 128)  return 'text-[22px] md:text-[28px]';
    return 'text-[26px] md:text-[34px]';
  };

  return (
    <>
      <style>{FONTS}</style>
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white" style={BG_STYLE}>

        {/* TOPBAR */}
        <div className="flex items-stretch h-[52px] border-b-[3px] border-[#f0ce32]/30 flex-shrink-0 g2k-fadein">
          <div className="px-6 border-r-[3px] border-[#f0ce32]/30 flex items-center bg-[#f0ce32]">
            <span className="text-black text-xl tracking-[0.12em]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>FOLIO</span>
          </div>
          <div className="flex-1 flex items-center px-4 md:px-6">
            <span className="text-[11px] text-white/30 tracking-[0.08em]" style={{ fontFamily: "'Fragment Mono',monospace" }}>
              
            </span>
          </div>
          <div className="px-4 md:px-6 border-l-[3px] border-[#f0ce32]/30 flex items-center text-[20px] md:text-[22px] tracking-[0.1em] text-[#f0ce32]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{time}</div>
        </div>

        {/* BODY */}
        <div className="flex-1 flex flex-col md:flex-row">

          {/* SIDE PANEL */}
          <div className="md:w-[260px] border-b-[3px] md:border-b-0 md:border-r-[3px] border-[#f0ce32]/30 flex flex-col">

            {/* Title block */}
            <div className="bg-[#f0ce32] p-8 border-b-[3px] border-[#f0ce32] flex-shrink-0">
              <div className="text-[9px] tracking-[0.3em] text-black/50 mb-2" style={{ fontFamily: "'Fragment Mono',monospace" }}>// game.2048</div>
              <div className="text-[72px] leading-[0.85] text-black" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>2048</div>
              <div className="text-[11px] tracking-[0.15em] uppercase text-black/60 mt-3" style={{ fontFamily: "'Fragment Mono',monospace" }}>Join tiles<br />Reach 2048</div>
            </div>

            {/* Score blocks */}
            <div className="grid grid-cols-2 border-b-[3px] border-[#f0ce32]/30 flex-shrink-0">
              <div className="p-5 border-r-[3px] border-[#f0ce32]/30">
                <div className="text-[9px] tracking-[0.25em] uppercase text-white/30 mb-1" style={{ fontFamily: "'Fragment Mono',monospace" }}>Score</div>
                <div className="text-[32px] leading-none text-white" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{score}</div>
              </div>
              <div className="p-5">
                <div className="text-[9px] tracking-[0.25em] uppercase text-[#f0ce32]/50 mb-1" style={{ fontFamily: "'Fragment Mono',monospace" }}>Best</div>
                <div className="text-[32px] leading-none text-[#f0ce32]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{bestScore}</div>
              </div>
            </div>

            {/* Moves */}
            <div className="p-5 border-b-[3px] border-[#f0ce32]/30 flex-shrink-0 flex items-center justify-between">
              <div className="text-[9px] tracking-[0.2em] uppercase text-white/30" style={{ fontFamily: "'Fragment Mono',monospace" }}>Moves</div>
              <div className="text-[24px] text-white/60" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{moveCount}</div>
            </div>

            {/* New game button */}
            <div className="p-5 border-b-[3px] border-[#f0ce32]/30 flex-shrink-0">
              <button
                onClick={resetGame}
                className="w-full bg-transparent border-[3px] border-[#f0ce32] text-[#f0ce32] hover:bg-[#f0ce32] hover:text-black transition-all duration-150 py-3 text-[18px] tracking-[0.12em]"
                style={{ fontFamily: "'Bebas Neue',sans-serif" }}
              >
                NEW GAME
              </button>
            </div>

            {/* Instructions */}
            <div className="p-5 flex-1">
              <div className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-3" style={{ fontFamily: "'Fragment Mono',monospace" }}>// how.to.play</div>
              <div className="space-y-2">
                {[
                  'Use arrow keys to move tiles',
                  'Same tiles merge on contact',
                  'Reach 2048 to win',
                  isMobile ? 'Swipe to move on mobile' : 'Touch controls below board',
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-white/35" style={{ fontFamily: "'Fragment Mono',monospace" }}>
                    <div className="w-[4px] h-[4px] bg-[#f0ce32]/40 flex-shrink-0 mt-[5px]" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GAME AREA */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 relative">

            {/* Board */}
            <div
              className="relative w-full max-w-[420px]"
              onTouchStart={e => setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })}
              onTouchEnd={e => {
                if (!touchStart) return;
                const dx = e.changedTouches[0].clientX - touchStart.x;
                const dy = e.changedTouches[0].clientY - touchStart.y;
                if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
                  Math.abs(dx) > Math.abs(dy) ? move(dx > 0 ? 'right' : 'left') : move(dy > 0 ? 'down' : 'up');
                }
                setTouchStart(null);
              }}
            >
              {/* Grid */}
              <div className="border-[3px] border-[#f0ce32]/30 p-3 bg-[#0d0d0d]">
                <div className="grid grid-cols-4 gap-2">
                  {board.map((row, i) =>
                    row.map((cell, j) => {
                      const ts = getTileStyle(cell);
                      return (
                        <div
                          key={`${i}-${j}-${tileKeys[i]?.[j] ?? 0}`}
                          className={`aspect-square border-[2px] flex items-center justify-center font-bold transition-colors duration-100 ${ts.bg} ${ts.text} ${ts.border} ${cell !== 0 ? 'tile-new' : ''}`}
                          style={{ fontFamily: "'Bebas Neue',sans-serif" }}
                        >
                          <span className={cell !== 0 ? getTileSize(cell) : ''}>{cell !== 0 ? cell : ''}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Game Over Overlay */}
              {(gameOver || won) && (
                <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center border-[3px] border-[#f0ce32]/30">
                  <div className="text-[9px] tracking-[0.3em] text-[#f0ce32]/60 mb-3" style={{ fontFamily: "'Fragment Mono',monospace" }}>
                    {won ? '// status.win' : '// status.gameover'}
                  </div>
                  <div className="text-[56px] md:text-[72px] leading-none text-[#f0ce32] mb-2" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
                    {won ? 'YOU WIN' : 'GAME OVER'}
                  </div>
                  <div className="text-[12px] text-white/40 mb-6" style={{ fontFamily: "'Fragment Mono',monospace" }}>
                    {score} pts · {moveCount} moves
                  </div>
                  <button
                    onClick={resetGame}
                    className="border-[3px] border-[#f0ce32] text-[#f0ce32] hover:bg-[#f0ce32] hover:text-black px-8 py-3 text-[18px] tracking-[0.12em] transition-all duration-150"
                    style={{ fontFamily: "'Bebas Neue',sans-serif" }}
                  >
                    PLAY AGAIN
                  </button>
                </div>
              )}
            </div>

            {/* Touch Controls */}
            <div className="mt-6 w-full max-w-[420px]">
              <div className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-3 text-center" style={{ fontFamily: "'Fragment Mono',monospace" }}>// controls</div>
              <div className="grid grid-cols-3 gap-2 w-[132px] mx-auto">
                <div />
                <button onClick={() => move('up')} className="border-[2px] border-white/15 hover:border-[#f0ce32] hover:text-[#f0ce32] text-white/40 h-10 flex items-center justify-center text-[18px] transition-all duration-150 font-bold">↑</button>
                <div />
                <button onClick={() => move('left')} className="border-[2px] border-white/15 hover:border-[#f0ce32] hover:text-[#f0ce32] text-white/40 h-10 flex items-center justify-center text-[18px] transition-all duration-150 font-bold">←</button>
                <button onClick={() => move('down')} className="border-[2px] border-white/15 hover:border-[#f0ce32] hover:text-[#f0ce32] text-white/40 h-10 flex items-center justify-center text-[18px] transition-all duration-150 font-bold">↓</button>
                <button onClick={() => move('right')} className="border-[2px] border-white/15 hover:border-[#f0ce32] hover:text-[#f0ce32] text-white/40 h-10 flex items-center justify-center text-[18px] transition-all duration-150 font-bold">→</button>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </>
  );
};

export default Game2048Page;