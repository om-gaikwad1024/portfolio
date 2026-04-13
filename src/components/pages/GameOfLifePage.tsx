'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fragment+Mono:ital@0;1&family=Lexend:wght@200;300;400;500&display=swap');
  @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  .gol-fadein { animation: fadeUp 0.4s ease both; }
  input[type=range].gol-slider { -webkit-appearance: none; appearance: none; height: 3px; background: rgba(240,206,50,0.2); outline: none; }
  input[type=range].gol-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; background: #f0ce32; cursor: pointer; }
  input[type=range].gol-slider::-moz-range-thumb { width: 14px; height: 14px; background: #f0ce32; cursor: pointer; border: none; }
`;

const BG_STYLE: React.CSSProperties = {
  fontFamily: "'Lexend', sans-serif",
  backgroundImage:
    'linear-gradient(rgba(240,206,50,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(240,206,50,0.04) 1px,transparent 1px)',
  backgroundSize: '40px 40px',
};

interface GameOfLifePageProps {
  isMobile?: boolean;
}

export function GameOfLifePage({ isMobile = false }: GameOfLifePageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(120);
  const [cellSize, setCellSize] = useState(isMobile ? 8 : 11);
  const [grid, setGrid] = useState<boolean[][]>([]);
  const [generation, setGeneration] = useState(0);
  const [population, setPopulation] = useState(0);
  const [time, setTime] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const getDims = useCallback((size: number) => {
    const canvasW = isMobile ? 320 : 580;
    const canvasH = isMobile ? 320 : 460;
    return {
      rows: Math.floor(canvasH / size),
      cols: Math.floor(canvasW / size),
      canvasW,
      canvasH,
    };
  }, [isMobile]);

  const { rows, cols, canvasW, canvasH } = getDims(cellSize);

  const makeEmpty = useCallback(() =>
    Array(rows).fill(null).map(() => Array(cols).fill(false)),
  [rows, cols]);

  useEffect(() => {
    setGrid(makeEmpty());
    setGeneration(0);
    setPopulation(0);
  }, [cellSize, makeEmpty]);

  const countNeighbors = useCallback((g: boolean[][], x: number, y: number) => {
    let n = 0;
    for (let di = -1; di <= 1; di++)
      for (let dj = -1; dj <= 1; dj++) {
        if (di === 0 && dj === 0) continue;
        const ni = x + di, nj = y + dj;
        if (ni >= 0 && ni < g.length && nj >= 0 && nj < (g[0]?.length ?? 0) && g[ni][nj]) n++;
      }
    return n;
  }, []);

  const step = useCallback(() => {
    setGrid(curr => {
      if (!curr || curr.length === 0) return curr;
      const next = curr.map((row, i) =>
        row.map((cell, j) => {
          const n = countNeighbors(curr, i, j);
          return cell ? n === 2 || n === 3 : n === 3;
        })
      );
      setPopulation(next.reduce((s, r) => s + r.filter(Boolean).length, 0));
      return next;
    });
    setGeneration(g => g + 1);
  }, [countNeighbors]);

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(step, speed);
    return () => clearInterval(id);
  }, [isRunning, speed, step]);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !grid || grid.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Grid lines
    ctx.strokeStyle = 'rgba(240,206,50,0.05)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= rows; i++) {
      ctx.beginPath(); ctx.moveTo(0, i * cellSize); ctx.lineTo(canvasW, i * cellSize); ctx.stroke();
    }
    for (let j = 0; j <= cols; j++) {
      ctx.beginPath(); ctx.moveTo(j * cellSize, 0); ctx.lineTo(j * cellSize, canvasH); ctx.stroke();
    }

    // Cells
    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell) {
          ctx.fillStyle = '#f0ce32';
          ctx.shadowColor = '#f0ce32';
          ctx.shadowBlur = 6;
          ctx.fillRect(j * cellSize + 1, i * cellSize + 1, cellSize - 2, cellSize - 2);
          ctx.shadowBlur = 0;
        }
      });
    });
  }, [grid, cellSize, rows, cols, canvasW, canvasH]);

  const cellFromEvent = (canvas: HTMLCanvasElement, clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvasW / rect.width;
    const scaleY = canvasH / rect.height;
    const x = Math.floor(((clientY - rect.top) * scaleY) / cellSize);
    const y = Math.floor(((clientX - rect.left) * scaleX) / cellSize);
    return { x, y };
  };

  const toggleCell = (clientX: number, clientY: number, forceOn?: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas || !grid || grid.length === 0) return;
    const { x, y } = cellFromEvent(canvas, clientX, clientY);
    if (x >= 0 && x < rows && y >= 0 && y < cols) {
      setGrid(curr => {
        const next = curr.map((row, i) =>
          row.map((cell, j) => (i === x && j === y ? (forceOn !== undefined ? forceOn : !cell) : cell))
        );
        setPopulation(next.reduce((s, r) => s + r.filter(Boolean).length, 0));
        return next;
      });
    }
  };

  const randomize = () => {
    const g = makeEmpty().map(r => r.map(() => Math.random() > 0.72));
    setGrid(g);
    setGeneration(0);
    setPopulation(g.reduce((s, r) => s + r.filter(Boolean).length, 0));
  };

  const clear = () => {
    setGrid(makeEmpty());
    setGeneration(0);
    setPopulation(0);
    setIsRunning(false);
  };

  const addPattern = (pattern: [number, number][]) => {
    if (!grid || grid.length === 0) return;
    const next = grid.map(r => [...r]);
    const sr = Math.floor(rows / 2) - 4;
    const sc = Math.floor(cols / 2) - 4;
    pattern.forEach(([di, dj]) => {
      const r = sr + di, c = sc + dj;
      if (r >= 0 && r < rows && c >= 0 && c < cols) next[r][c] = true;
    });
    setGrid(next);
    setPopulation(next.reduce((s, r) => s + r.filter(Boolean).length, 0));
  };

  const glider: [number, number][] = [[0,1],[1,2],[2,0],[2,1],[2,2]];
  const pulsar: [number, number][] = [
    [0,2],[0,3],[0,4],[0,8],[0,9],[0,10],
    [2,0],[2,5],[2,7],[2,12],
    [3,0],[3,5],[3,7],[3,12],
    [4,0],[4,5],[4,7],[4,12],
    [5,2],[5,3],[5,4],[5,8],[5,9],[5,10],
    [7,2],[7,3],[7,4],[7,8],[7,9],[7,10],
    [8,0],[8,5],[8,7],[8,12],
    [9,0],[9,5],[9,7],[9,12],
    [10,0],[10,5],[10,7],[10,12],
    [12,2],[12,3],[12,4],[12,8],[12,9],[12,10],
  ];

  return (
    <>
      <style>{FONTS}</style>
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white" style={BG_STYLE}>

        {/* TOPBAR */}
        <div className="flex items-stretch h-[52px] border-b-[3px] border-[#f0ce32]/30 flex-shrink-0 gol-fadein">
          <div className="px-6 border-r-[3px] border-[#f0ce32]/30 flex items-center bg-[#f0ce32]">
            <span className="text-black text-xl tracking-[0.12em]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>FOLIO</span>
          </div>
          <div className="flex-1 flex items-center px-4 md:px-6">
            <span className="text-[11px] text-white/30 tracking-[0.08em]" style={{ fontFamily: "'Fragment Mono',monospace" }}>
              //  {isRunning ? 'RUNNING' : 'PAUSED'}
            </span>
          </div>
          <div className="border-l-[3px] border-[#f0ce32]/30 flex items-stretch">
            <div className="px-5 border-r-[3px] border-[#f0ce32]/30 flex items-center gap-3">
              <div className="text-[9px] text-white/30 tracking-[0.2em]" style={{ fontFamily: "'Fragment Mono',monospace" }}>GEN</div>
              <div className="text-[18px] text-[#f0ce32]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{generation}</div>
            </div>
            <div className="px-5 border-r-[3px] border-[#f0ce32]/30 flex items-center gap-3">
              <div className="text-[9px] text-white/30 tracking-[0.2em]" style={{ fontFamily: "'Fragment Mono',monospace" }}>POP</div>
              <div className="text-[18px] text-white/70" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{population}</div>
            </div>
            <div className="px-4 flex items-center text-[20px] md:text-[22px] tracking-[0.1em] text-[#f0ce32]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{time}</div>
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 flex flex-col md:flex-row">

          {/* LEFT PANEL */}
          <div className="md:w-[220px] border-b-[3px] md:border-b-0 md:border-r-[3px] border-[#f0ce32]/30 flex flex-col flex-shrink-0">

            {/* Title */}
            <div className="bg-[#f0ce32] p-6 border-b-[3px] border-[#f0ce32]">
              <div className="text-[9px] tracking-[0.3em] text-black/50 mb-2" style={{ fontFamily: "'Fragment Mono',monospace" }}>// game.of.life</div>
              <div className="text-[44px] leading-[0.88] text-black" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>CONWAY<br/>LIFE</div>
            </div>

            {/* Main controls */}
            <div className="p-5 border-b-[3px] border-[#f0ce32]/30 flex flex-col gap-2">
              <button
                onClick={() => setIsRunning(r => !r)}
                className={`border-[3px] py-2.5 text-[16px] tracking-[0.12em] transition-all duration-150 ${
                  isRunning
                    ? 'border-[#f0ce32] bg-[#f0ce32] text-black'
                    : 'border-[#f0ce32]/50 text-[#f0ce32] hover:bg-[#f0ce32] hover:text-black'
                }`}
                style={{ fontFamily: "'Bebas Neue',sans-serif" }}
              >
                {isRunning ? 'PAUSE' : 'START'}
              </button>
              <button
                onClick={step}
                disabled={isRunning}
                className="border-[3px] border-white/15 text-white/40 py-2.5 text-[16px] tracking-[0.12em] hover:border-white/40 hover:text-white/70 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Bebas Neue',sans-serif" }}
              >
                STEP
              </button>
            </div>

            {/* Patterns */}
            <div className="p-5 border-b-[3px] border-[#f0ce32]/30 flex flex-col gap-2">
              <div className="text-[9px] tracking-[0.25em] uppercase text-white/25 mb-1" style={{ fontFamily: "'Fragment Mono',monospace" }}>// patterns</div>
              <button onClick={() => addPattern(glider)} className="border-[3px] border-white/10 text-white/40 py-2 text-[14px] tracking-[0.1em] hover:border-[#f0ce32]/50 hover:text-[#f0ce32] transition-all duration-150" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>GLIDER</button>
              <button onClick={() => addPattern(pulsar)} className="border-[3px] border-white/10 text-white/40 py-2 text-[14px] tracking-[0.1em] hover:border-[#f0ce32]/50 hover:text-[#f0ce32] transition-all duration-150" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>PULSAR</button>
              <button onClick={randomize} className="border-[3px] border-white/10 text-white/40 py-2 text-[14px] tracking-[0.1em] hover:border-[#f0ce32]/50 hover:text-[#f0ce32] transition-all duration-150" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>RANDOM</button>
              <button onClick={clear} className="border-[3px] border-white/10 text-white/40 py-2 text-[14px] tracking-[0.1em] hover:border-white/30 hover:text-white/60 transition-all duration-150" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>CLEAR</button>
            </div>

            {/* Sliders */}
            <div className="p-5 flex flex-col gap-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-[9px] tracking-[0.2em] uppercase text-white/30" style={{ fontFamily: "'Fragment Mono',monospace" }}>SPEED</div>
                  <div className="text-[12px] text-[#f0ce32]" style={{ fontFamily: "'Fragment Mono',monospace" }}>{speed}ms</div>
                </div>
                <input
                  type="range" min="20" max="500" value={speed}
                  onChange={e => setSpeed(Number(e.target.value))}
                  className="gol-slider w-full"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-[9px] tracking-[0.2em] uppercase text-white/30" style={{ fontFamily: "'Fragment Mono',monospace" }}>CELL SIZE</div>
                  <div className="text-[12px] text-[#f0ce32]" style={{ fontFamily: "'Fragment Mono',monospace" }}>{cellSize}px</div>
                </div>
                <input
                  type="range" min="4" max="18" value={cellSize}
                  onChange={e => setCellSize(Number(e.target.value))}
                  className="gol-slider w-full"
                />
              </div>
            </div>
          </div>

          {/* CANVAS AREA */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">

            <div
              className="text-[9px] tracking-[0.25em] uppercase text-white/20 mb-4 self-start"
              style={{ fontFamily: "'Fragment Mono',monospace" }}
            >
              // click · drag to draw cells
            </div>

            <div className="relative border-[3px] border-[#f0ce32]/30" style={{ lineHeight: 0 }}>
              <canvas
                ref={canvasRef}
                width={canvasW}
                height={canvasH}
                className="cursor-crosshair block"
                style={{ maxWidth: '100%', imageRendering: 'pixelated' }}
                onMouseDown={e => {
                  setIsDragging(true);
                  toggleCell(e.clientX, e.clientY);
                }}
                onMouseMove={e => {
                  if (!isDragging) return;
                  toggleCell(e.clientX, e.clientY, true);
                }}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
              />
              {!isRunning && population === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="border-[3px] border-[#f0ce32]/30 bg-black/80 px-6 py-3">
                    <p className="text-[11px] text-white/40" style={{ fontFamily: "'Fragment Mono',monospace" }}>
                      click cells to draw · use patterns · press start
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Rule reminder */}
            <div className="mt-4 flex gap-6 self-start">
              {[
                { label: 'BIRTH', val: '3 neighbors' },
                { label: 'SURVIVE', val: '2–3 neighbors' },
                { label: 'DEATH', val: 'otherwise' },
              ].map(r => (
                <div key={r.label}>
                  <div className="text-[8px] tracking-[0.2em] text-[#f0ce32]/40" style={{ fontFamily: "'Fragment Mono',monospace" }}>{r.label}</div>
                  <div className="text-[11px] text-white/35 mt-0.5" style={{ fontFamily: "'Fragment Mono',monospace" }}>{r.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

       
      </div>
    </>
  );
}

export default GameOfLifePage;