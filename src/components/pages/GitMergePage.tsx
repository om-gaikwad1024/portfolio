// filename: components/pages/GitMergePage.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface GitMergeGameProps {
  isMobile: boolean;
}

interface Conflict {
  id: number;
  file: string;
  current: string;
  incoming: string;
  difficulty: 'easy' | 'medium' | 'hard';
  correctChoice: 'current' | 'incoming' | 'both';
  explanation: string;
}

const conflicts: Conflict[] = [
  {
    id: 1,
    file: 'config.json',
    current: '{\n  "apiUrl": "https://api.prod.com",\n  "timeout": 5000\n}',
    incoming: '{\n  "apiUrl": "https://api.dev.com",\n  "timeout": 3000\n}',
    difficulty: 'easy',
    correctChoice: 'current',
    explanation: 'Production API URL should be kept in main branch'
  },
  {
    id: 2,
    file: 'package.json',
    current: '"version": "1.2.0"',
    incoming: '"version": "1.1.5"',
    difficulty: 'easy',
    correctChoice: 'current',
    explanation: 'Always keep the higher version number'
  },
  {
    id: 3,
    file: 'Button.tsx',
    current: 'const handleClick = () => {\n  analytics.track("button_click");\n  onClick();\n}',
    incoming: 'const handleClick = () => {\n  onClick();\n}',
    difficulty: 'medium',
    correctChoice: 'current',
    explanation: 'Analytics tracking is important for user behavior insights'
  },
  {
    id: 4,
    file: 'database.ts',
    current: 'const pool = new Pool({\n  max: 20,\n  idleTimeoutMillis: 30000\n});',
    incoming: 'const pool = new Pool({\n  max: 10,\n  idleTimeoutMillis: 30000\n});',
    difficulty: 'medium',
    correctChoice: 'current',
    explanation: 'Higher connection pool supports better concurrent load'
  },
  {
    id: 5,
    file: 'auth.ts',
    current: 'if (!user.isVerified) {\n  throw new Error("Email not verified");\n}',
    incoming: 'if (!user) {\n  throw new Error("User not found");\n}',
    difficulty: 'hard',
    correctChoice: 'both',
    explanation: 'Both checks are necessary - user existence AND verification'
  },
  {
    id: 6,
    file: 'api.ts',
    current: 'headers: {\n  "Authorization": `Bearer ${token}`,\n  "Content-Type": "application/json"\n}',
    incoming: 'headers: {\n  "Authorization": `Bearer ${token}`,\n  "X-API-Key": process.env.API_KEY\n}',
    difficulty: 'hard',
    correctChoice: 'both',
    explanation: 'Both Content-Type and API-Key headers are needed'
  },
  {
    id: 7,
    file: 'logger.ts',
    current: 'console.log("Debug:", data);',
    incoming: 'logger.info({ component: "API", data });',
    difficulty: 'medium',
    correctChoice: 'incoming',
    explanation: 'Structured logging is better than console.log in production'
  },
  {
    id: 8,
    file: 'validation.ts',
    current: 'if (email.includes("@")) return true;',
    incoming: 'const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\nreturn emailRegex.test(email);',
    difficulty: 'easy',
    correctChoice: 'incoming',
    explanation: 'Proper email validation regex is more robust'
  },
  {
    id: 9,
    file: 'cache.ts',
    current: 'const TTL = 3600; // 1 hour',
    incoming: 'const TTL = 300; // 5 minutes',
    difficulty: 'medium',
    correctChoice: 'incoming',
    explanation: 'Shorter TTL ensures fresher data for users'
  },
  {
    id: 10,
    file: 'routes.ts',
    current: 'app.use(cors());',
    incoming: 'app.use(cors({\n  origin: process.env.ALLOWED_ORIGINS,\n  credentials: true\n}));',
    difficulty: 'hard',
    correctChoice: 'incoming',
    explanation: 'Restricted CORS is a security best practice'
  }
];

export const GitMergePage = ({ isMobile }: GitMergeGameProps) => {
  const [currentConflictIndex, setCurrentConflictIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [showResult, setShowResult] = useState<'correct' | 'wrong' | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [conflictsResolved, setConflictsResolved] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('git-merge-highscore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const currentConflict = conflicts[currentConflictIndex];

  const handleChoice = (choice: 'current' | 'incoming' | 'both') => {
    if (showResult) return;

    setSelectedChoice(choice);
    const isCorrect = choice === currentConflict.correctChoice;

    if (isCorrect) {
      const points = currentConflict.difficulty === 'easy' ? 10 : 
                     currentConflict.difficulty === 'medium' ? 20 : 30;
      const bonusPoints = streak >= 3 ? 10 : 0;
      const totalPoints = points + bonusPoints;
      
      setScore(prev => {
        const newScore = prev + totalPoints;
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem('git-merge-highscore', newScore.toString());
        }
        return newScore;
      });
      setStreak(prev => prev + 1);
      setShowResult('correct');
      setConflictsResolved(prev => prev + 1);
    } else {
      setLives(prev => prev - 1);
      setStreak(0);
      setShowResult('wrong');
      if (lives <= 1) {
        setGameOver(true);
      }
    }
  };

  const nextConflict = () => {
    setShowResult(null);
    setSelectedChoice(null);
    if (currentConflictIndex < conflicts.length - 1) {
      setCurrentConflictIndex(prev => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setCurrentConflictIndex(0);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setShowResult(null);
    setSelectedChoice(null);
    setConflictsResolved(0);
    setStreak(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'hard': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-1 flex items-center gap-2">
                <span>🔀</span> Git Merge Conflict Resolver
              </h1>
              <p className="text-slate-400 text-sm">Choose the right code to merge!</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-slate-700/50 px-4 py-2 rounded-lg border border-slate-600/50">
                <div className="text-slate-400 text-xs uppercase">Score</div>
                <div className="text-slate-100 text-xl font-bold">{score}</div>
              </div>
              <div className="bg-purple-500/20 px-4 py-2 rounded-lg border border-purple-500/30">
                <div className="text-purple-400 text-xs uppercase">Best</div>
                <div className="text-purple-300 text-xl font-bold">{highScore}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">Lives:</span>
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={i} className="text-xl">
                    {i < lives ? '❤️' : '🖤'}
                  </span>
                ))}
              </div>
              {streak >= 3 && (
                <div className="bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30">
                  <span className="text-orange-400 text-sm font-semibold">🔥 {streak} Streak!</span>
                </div>
              )}
            </div>
            <div className="text-slate-400 text-sm">
              Resolved: {conflictsResolved}/{conflicts.length}
            </div>
          </div>
        </div>

        {!gameOver ? (
          <>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4 md:p-6 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <span className="text-slate-200 font-mono font-semibold">{currentConflict.file}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(currentConflict.difficulty)}`}>
                  {currentConflict.difficulty.toUpperCase()}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div
                  onClick={() => !showResult && handleChoice('current')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedChoice === 'current'
                      ? showResult === 'correct'
                        ? 'border-green-500 bg-green-500/20'
                        : 'border-red-500 bg-red-500/20'
                      : 'border-blue-500/30 bg-blue-500/10 hover:border-blue-500/50 hover:bg-blue-500/20'
                  } ${showResult ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-blue-400 font-semibold">HEAD (Current)</span>
                    {selectedChoice === 'current' && showResult === 'correct' && <span>✅</span>}
                    {selectedChoice === 'current' && showResult === 'wrong' && <span>❌</span>}
                  </div>
                  <pre className="bg-slate-900/50 p-3 rounded-lg overflow-x-auto text-xs md:text-sm">
                    <code className="text-slate-300 font-mono">{currentConflict.current}</code>
                  </pre>
                </div>

                <div
                  onClick={() => !showResult && handleChoice('incoming')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedChoice === 'incoming'
                      ? showResult === 'correct'
                        ? 'border-green-500 bg-green-500/20'
                        : 'border-red-500 bg-red-500/20'
                      : 'border-purple-500/30 bg-purple-500/10 hover:border-purple-500/50 hover:bg-purple-500/20'
                  } ${showResult ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-purple-400 font-semibold">Incoming</span>
                    {selectedChoice === 'incoming' && showResult === 'correct' && <span>✅</span>}
                    {selectedChoice === 'incoming' && showResult === 'wrong' && <span>❌</span>}
                  </div>
                  <pre className="bg-slate-900/50 p-3 rounded-lg overflow-x-auto text-xs md:text-sm">
                    <code className="text-slate-300 font-mono">{currentConflict.incoming}</code>
                  </pre>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => !showResult && handleChoice('both')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    selectedChoice === 'both'
                      ? showResult === 'correct'
                        ? 'border-green-500 bg-green-500/20'
                        : 'border-red-500 bg-red-500/20'
                      : 'border-amber-500/30 bg-amber-500/10 hover:border-amber-500/50 hover:bg-amber-500/20'
                  } ${showResult ? 'pointer-events-none' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-amber-400 font-semibold">Accept Both Changes</span>
                    {selectedChoice === 'both' && showResult === 'correct' && <span>✅</span>}
                    {selectedChoice === 'both' && showResult === 'wrong' && <span>❌</span>}
                  </div>
                </button>
              </div>
            </div>

            {showResult && (
              <div className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl border p-4 md:p-6 mb-6 ${
                showResult === 'correct' 
                  ? 'border-green-500/50 bg-green-500/10' 
                  : 'border-red-500/50 bg-red-500/10'
              }`}>
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{showResult === 'correct' ? '🎉' : '❌'}</span>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 ${
                      showResult === 'correct' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {showResult === 'correct' ? 'Correct!' : 'Wrong Choice'}
                    </h3>
                    <p className="text-slate-300 mb-3">{currentConflict.explanation}</p>
                    <div className="bg-slate-900/50 p-3 rounded-lg mb-3">
                      <span className="text-slate-400 text-sm">Correct answer: </span>
                      <span className="text-slate-200 font-semibold">
                        {currentConflict.correctChoice === 'current' ? 'HEAD (Current)' : 
                         currentConflict.correctChoice === 'incoming' ? 'Incoming' : 
                         'Accept Both Changes'}
                      </span>
                    </div>
                    {showResult === 'correct' && streak >= 3 && (
                      <div className="text-orange-400 text-sm font-semibold">
                        🔥 Bonus +10 points for {streak} streak!
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={nextConflict}
                  className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  {currentConflictIndex < conflicts.length - 1 ? 'Next Conflict →' : 'Finish Game'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 md:p-8 text-center">
            <div className="text-6xl mb-4">
              {conflictsResolved === conflicts.length ? '🏆' : '💀'}
            </div>
            <h2 className="text-3xl font-bold text-slate-100 mb-2">
              {conflictsResolved === conflicts.length ? 'All Conflicts Resolved!' : 'Game Over'}
            </h2>
            <p className="text-slate-300 mb-4">
              You resolved {conflictsResolved}/{conflicts.length} conflicts
            </p>
            <div className="bg-slate-700/50 p-4 rounded-xl mb-6 inline-block">
              <div className="text-slate-400 text-sm mb-1">Final Score</div>
              <div className="text-4xl font-bold text-purple-400">{score}</div>
              {score === highScore && score > 0 && (
                <div className="text-yellow-400 text-sm mt-2">🎉 New High Score!</div>
              )}
            </div>
            <button
              onClick={resetGame}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              Play Again
            </button>
          </div>
        )}

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4 md:p-6">
          <div className="text-slate-300 text-sm">
            <div className="font-semibold mb-3 text-slate-100">How to Play:</div>
            <ul className="space-y-2 text-slate-400">
              <li>• Review the merge conflict between HEAD and incoming branch</li>
              <li>• Choose which version to keep or accept both</li>
              <li>• Easy conflicts = 10 pts, Medium = 20 pts, Hard = 30 pts</li>
              <li>• Build a 3+ streak for +10 bonus points!</li>
              <li>• You have 3 lives - make them count!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};