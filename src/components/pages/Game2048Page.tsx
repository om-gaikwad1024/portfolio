// filename: components/pages/Game2048Page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Game2048Props {
  isMobile: boolean;
}

type Board = number[][];

export const Game2048Page = ({ isMobile }: Game2048Props) => {
  const [board, setBoard] = useState<Board>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  const initializeBoard = useCallback(() => {
    const newBoard: Board = Array(4).fill(null).map(() => Array(4).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    return newBoard;
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('2048-best');
    if (saved) setBestScore(parseInt(saved));
    setBoard(initializeBoard());
  }, [initializeBoard]);

  const addRandomTile = (currentBoard: Board) => {
    const empty: Array<[number, number]> = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (currentBoard[i][j] === 0) empty.push([i, j]);
      }
    }
    if (empty.length > 0) {
      const [row, col] = empty[Math.floor(Math.random() * empty.length)];
      currentBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const checkGameOver = (currentBoard: Board): boolean => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (currentBoard[i][j] === 0) return false;
        if (j < 3 && currentBoard[i][j] === currentBoard[i][j + 1]) return false;
        if (i < 3 && currentBoard[i][j] === currentBoard[i + 1][j]) return false;
      }
    }
    return true;
  };

  const move = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameOver) return;

    let newBoard = board.map(row => [...row]);
    let moved = false;
    let points = 0;

    const moveRow = (row: number[]): [number[], number] => {
      const filtered = row.filter(x => x !== 0);
      const merged: number[] = [];
      let rowPoints = 0;
      let i = 0;

      while (i < filtered.length) {
        if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
          const val = filtered[i] * 2;
          merged.push(val);
          rowPoints += val;
          i += 2;
        } else {
          merged.push(filtered[i]);
          i++;
        }
      }

      while (merged.length < 4) merged.push(0);
      return [merged, rowPoints];
    };

    if (direction === 'left') {
      for (let i = 0; i < 4; i++) {
        const [newRow, rowPoints] = moveRow(newBoard[i]);
        if (JSON.stringify(newRow) !== JSON.stringify(newBoard[i])) moved = true;
        newBoard[i] = newRow;
        points += rowPoints;
      }
    } else if (direction === 'right') {
      for (let i = 0; i < 4; i++) {
        const [newRow, rowPoints] = moveRow(newBoard[i].reverse());
        if (JSON.stringify(newRow) !== JSON.stringify(newBoard[i].reverse())) moved = true;
        newBoard[i] = newRow.reverse();
        points += rowPoints;
      }
    } else if (direction === 'up') {
      for (let j = 0; j < 4; j++) {
        const col = [newBoard[0][j], newBoard[1][j], newBoard[2][j], newBoard[3][j]];
        const [newCol, colPoints] = moveRow(col);
        if (JSON.stringify(newCol) !== JSON.stringify(col)) moved = true;
        for (let i = 0; i < 4; i++) newBoard[i][j] = newCol[i];
        points += colPoints;
      }
    } else if (direction === 'down') {
      for (let j = 0; j < 4; j++) {
        const col = [newBoard[3][j], newBoard[2][j], newBoard[1][j], newBoard[0][j]];
        const [newCol, colPoints] = moveRow(col);
        if (JSON.stringify(newCol) !== JSON.stringify(col.reverse())) moved = true;
        for (let i = 0; i < 4; i++) newBoard[i][j] = newCol[3 - i];
        points += colPoints;
      }
    }

    if (moved) {
      addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(prev => {
        const newScore = prev + points;
        if (newScore > bestScore) {
          setBestScore(newScore);
          localStorage.setItem('2048-best', newScore.toString());
        }
        return newScore;
      });
      setMoveCount(prev => prev + 1);

      const has2048 = newBoard.some(row => row.some(cell => cell === 2048));
      if (has2048 && !won) setWon(true);

      if (checkGameOver(newBoard)) setGameOver(true);
    }
  }, [board, gameOver, won, bestScore]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const directionMap: Record<string, 'up' | 'down' | 'left' | 'right'> = {
          ArrowUp: 'up',
          ArrowDown: 'down',
          ArrowLeft: 'left',
          ArrowRight: 'right'
        };
        move(directionMap[e.key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const deltaX = e.changedTouches[0].clientX - touchStart.x;
    const deltaY = e.changedTouches[0].clientY - touchStart.y;
    const threshold = 30;

    if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        move(deltaX > 0 ? 'right' : 'left');
      } else {
        move(deltaY > 0 ? 'down' : 'up');
      }
    }
    setTouchStart(null);
  };

  const resetGame = () => {
    setBoard(initializeBoard());
    setScore(0);
    setGameOver(false);
    setWon(false);
    setMoveCount(0);
  };

  const getTileColor = (value: number): string => {
    const colors: Record<number, string> = {
      0: 'bg-slate-700/30',
      2: 'bg-amber-100 text-slate-800',
      4: 'bg-amber-200 text-slate-800',
      8: 'bg-orange-400 text-white',
      16: 'bg-orange-500 text-white',
      32: 'bg-orange-600 text-white',
      64: 'bg-red-500 text-white',
      128: 'bg-yellow-400 text-white',
      256: 'bg-yellow-500 text-white',
      512: 'bg-yellow-600 text-white',
      1024: 'bg-purple-500 text-white',
      2048: 'bg-purple-600 text-white',
    };
    return colors[value] || 'bg-pink-600 text-white';
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex items-center justify-center">
      <div className="max-w-lg w-full">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-100 mb-1">2048</h1>
              <p className="text-slate-400 text-sm">Join tiles to reach 2048!</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-slate-700/50 px-4 py-2 rounded-lg border border-slate-600/50">
                <div className="text-slate-400 text-xs uppercase">Score</div>
                <div className="text-slate-100 text-xl font-bold">{score}</div>
              </div>
              <div className="bg-amber-500/20 px-4 py-2 rounded-lg border border-amber-500/30">
                <div className="text-amber-400 text-xs uppercase">Best</div>
                <div className="text-amber-300 text-xl font-bold">{bestScore}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="text-slate-400 text-sm">Moves: {moveCount}</div>
            <button
              onClick={resetGame}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              New Game
            </button>
          </div>
        </div>

        <div 
          className="bg-slate-700/50 p-4 rounded-2xl border border-slate-600/50 relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {(gameOver || won) && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl z-10 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-6xl mb-4">{won ? '🎉' : '😢'}</div>
                <h2 className="text-3xl font-bold text-slate-100 mb-2">
                  {won ? 'You Win!' : 'Game Over'}
                </h2>
                <p className="text-slate-300 mb-2">
                  {score} points scored in {moveCount} moves.
                </p>
                {!won && <p className="text-slate-400 text-sm mb-4">No powerups used!</p>}
                <button
                  onClick={resetGame}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-4 gap-3">
            {board.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`aspect-square rounded-lg flex items-center justify-center font-bold text-2xl transition-all duration-150 ${getTileColor(cell)} ${
                    cell !== 0 ? 'shadow-lg' : ''
                  }`}
                >
                  {cell !== 0 && cell}
                </div>
              ))
            )}
          </div>
        </div>

        {isMobile && (
          <div className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4">
            <div className="text-slate-300 text-sm text-center mb-3">Touch Controls</div>
            <div className="grid grid-cols-3 gap-2">
              <div></div>
              <button
                onClick={() => move('up')}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 p-4 rounded-lg font-bold transition-colors"
              >
                ↑
              </button>
              <div></div>
              <button
                onClick={() => move('left')}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 p-4 rounded-lg font-bold transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => move('down')}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 p-4 rounded-lg font-bold transition-colors"
              >
                ↓
              </button>
              <button
                onClick={() => move('right')}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 p-4 rounded-lg font-bold transition-colors"
              >
                →
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4">
          <div className="text-slate-300 text-sm">
            <div className="font-semibold mb-2">How to Play:</div>
            <ul className="space-y-1 text-slate-400">
              <li>• Use arrow keys {isMobile && 'or swipe'} to move tiles</li>
              <li>• Tiles with same numbers merge when they touch</li>
              <li>• Reach 2048 to win!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};  