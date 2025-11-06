// filename: components/pages/GameOfLifePage.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface GameOfLifePageProps {
  isMobile?: boolean;
}

export function GameOfLifePage({ isMobile = false }: GameOfLifePageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [cellSize, setCellSize] = useState(isMobile ? 8 : 10);
  const [grid, setGrid] = useState<boolean[][]>([]);
  const [generation, setGeneration] = useState(0);
  const [population, setPopulation] = useState(0);

  const getGridDimensions = useCallback((size: number) => {
    const rows = Math.floor((isMobile ? 400 : 500) / size);
    const cols = Math.floor((isMobile ? 300 : 600) / size);
    return { rows, cols };
  }, [isMobile]);

  const { rows, cols } = getGridDimensions(cellSize);

  const createEmptyGrid = useCallback(() => {
    const { rows, cols } = getGridDimensions(cellSize);
    return Array(rows).fill(null).map(() => Array(cols).fill(false));
  }, [cellSize, getGridDimensions]);

  useEffect(() => {
    const newGrid = createEmptyGrid();
    setGrid(newGrid);
    setGeneration(0);
    setPopulation(0);
  }, [cellSize, createEmptyGrid]);

  const countNeighbors = useCallback((grid: boolean[][], x: number, y: number) => {
    let count = 0;
    const gridRows = grid.length;
    const gridCols = grid[0]?.length || 0;
    
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newX = x + i;
        const newY = y + j;
        if (newX >= 0 && newX < gridRows && newY >= 0 && newY < gridCols) {
          if (grid[newX][newY]) count++;
        }
      }
    }
    return count;
  }, []);

  const runSimulation = useCallback(() => {
    setGrid((currentGrid) => {
      if (!currentGrid || currentGrid.length === 0) return currentGrid;
      
      const newGrid = currentGrid.map((row, i) =>
        row.map((cell, j) => {
          const neighbors = countNeighbors(currentGrid, i, j);
          if (cell) {
            return neighbors === 2 || neighbors === 3;
          } else {
            return neighbors === 3;
          }
        })
      );
      
      const pop = newGrid.reduce((sum, row) => 
        sum + row.filter(cell => cell).length, 0
      );
      setPopulation(pop);
      
      return newGrid;
    });
    setGeneration((g) => g + 1);
  }, [countNeighbors]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(runSimulation, speed);
    return () => clearInterval(interval);
  }, [isRunning, speed, runSimulation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !grid || grid.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#10b981');
    gradient.addColorStop(1, '#3b82f6');

    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell) {
          ctx.fillStyle = gradient;
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = 8;
          ctx.fillRect(j * cellSize + 1, i * cellSize + 1, cellSize - 2, cellSize - 2);
          ctx.shadowBlur = 0;
        }
      });
    });

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= rows; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(cols * cellSize, i * cellSize);
      ctx.stroke();
    }
    for (let j = 0; j <= cols; j++) {
      ctx.beginPath();
      ctx.moveTo(j * cellSize, 0);
      ctx.lineTo(j * cellSize, rows * cellSize);
      ctx.stroke();
    }
  }, [grid, cellSize, rows, cols]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !grid || grid.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientY - rect.top) / cellSize);
    const y = Math.floor((e.clientX - rect.left) / cellSize);

    if (x >= 0 && x < rows && y >= 0 && y < cols) {
      const newGrid = grid.map((row, i) =>
        row.map((cell, j) => (i === x && j === y ? !cell : cell))
      );
      setGrid(newGrid);
      
      const pop = newGrid.reduce((sum, row) => 
        sum + row.filter(cell => cell).length, 0
      );
      setPopulation(pop);
    }
  };

  const randomize = () => {
    const newGrid = createEmptyGrid().map((row) =>
      row.map(() => Math.random() > 0.7)
    );
    setGrid(newGrid);
    setGeneration(0);
    
    const pop = newGrid.reduce((sum, row) => 
      sum + row.filter(cell => cell).length, 0
    );
    setPopulation(pop);
  };

  const clear = () => {
    setGrid(createEmptyGrid());
    setGeneration(0);
    setPopulation(0);
    setIsRunning(false);
  };

  const addGlider = () => {
    if (!grid || grid.length === 0) return;
    const newGrid = grid.map(row => [...row]);
    const startRow = Math.floor(rows / 2);
    const startCol = Math.floor(cols / 2);
    
    [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]].forEach(([i, j]) => {
      if (startRow + i < rows && startCol + j < cols) {
        newGrid[startRow + i][startCol + j] = true;
      }
    });
    setGrid(newGrid);
    
    const pop = newGrid.reduce((sum, row) => 
      sum + row.filter(cell => cell).length, 0
    );
    setPopulation(pop);
  };

  const addPulsar = () => {
    if (!grid || grid.length === 0) return;
    const newGrid = grid.map(row => [...row]);
    const startRow = Math.floor(rows / 2) - 6;
    const startCol = Math.floor(cols / 2) - 6;
    
    const pattern = [
      [2,0],[2,1],[2,2],[2,6],[2,7],[2,8],
      [0,2],[0,7],[1,2],[1,7],[3,2],[3,7],[4,2],[4,7],[5,2],[5,7],
      [7,2],[7,7],[8,2],[8,7],[9,2],[9,7],[10,2],[10,7],[11,2],[11,7],
      [10,0],[10,1],[10,2],[10,6],[10,7],[10,8]
    ];
    
    pattern.forEach(([i, j]) => {
      if (startRow + i < rows && startCol + j < cols && startRow + i >= 0 && startCol + j >= 0) {
        newGrid[startRow + i][startCol + j] = true;
      }
    });
    setGrid(newGrid);
    
    const pop = newGrid.reduce((sum, row) => 
      sum + row.filter(cell => cell).length, 0
    );
    setPopulation(pop);
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
              
              Conway's Game of Life
            </h2>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="text-slate-400">Gen:</span>
              <span className="ml-2 text-emerald-400 font-mono font-bold">{generation}</span>
            </div>
            <div className="bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="text-slate-400">Pop:</span>
              <span className="ml-2 text-blue-400 font-mono font-bold">{population}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center p-4 bg-slate-950/50">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={cols * cellSize}
            height={rows * cellSize}
            onClick={handleCanvasClick}
            className="border-2 border-slate-700 cursor-crosshair rounded-lg shadow-2xl shadow-emerald-500/10"
            style={{ imageRendering: 'pixelated' }}
          />
          {!isRunning && population === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-slate-900/90 backdrop-blur-sm px-6 py-3 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-sm">Click cells to draw or use patterns below</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-900/50 backdrop-blur-xl border-t border-slate-800 p-4 space-y-4">
        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap justify-center">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg ${
              isRunning
                ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-red-500/30'
                : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-emerald-500/30'
            }`}
          >
            {isRunning ? '⏸ Pause' : '▶ Start'}
          </button>
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-700 disabled:to-slate-800 text-white rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-500/30 disabled:shadow-none"
          >
            ⏭ Step
          </button>
          <button
            onClick={randomize}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg shadow-purple-500/30"
          >
            🎲 Random
          </button>
          <button
            onClick={clear}
            className="px-5 py-2.5 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg"
          >
            🗑️ Clear
          </button>
        </div>

        {/* Patterns */}
        <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
          <div className="text-xs text-slate-400 mb-2 font-semibold uppercase tracking-wide">Patterns</div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={addGlider}
              className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded-lg text-sm transition-all duration-200 border border-slate-600/50"
            >
              🚀 Glider
            </button>
            <button
              onClick={addPulsar}
              className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded-lg text-sm transition-all duration-200 border border-slate-600/50"
            >
              ⭕ Pulsar
            </button>
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
            <div className="flex justify-between items-center mb-2">
              <label className="text-slate-300 text-sm font-semibold">Speed</label>
              <span className="text-emerald-400 text-xs font-mono bg-slate-900/50 px-2 py-1 rounded">{speed}ms</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>
          <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
            <div className="flex justify-between items-center mb-2">
              <label className="text-slate-300 text-sm font-semibold">Cell Size</label>
              <span className="text-blue-400 text-xs font-mono bg-slate-900/50 px-2 py-1 rounded">{cellSize}px</span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              value={cellSize}
              onChange={(e) => setCellSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>
        </div>

        {/* Info */}
        <div className="text-center text-slate-500 text-xs pt-2 border-t border-slate-800">
          <p>Click cells to toggle • Birth: 3 neighbors • Survive: 2-3 neighbors</p>
        </div>
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #3b82f6);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
        .slider-thumb::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #3b82f6);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </div>
  );
}