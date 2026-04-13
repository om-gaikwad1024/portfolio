'use client';

import React, { useState, useEffect } from 'react';

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fragment+Mono:ital@0;1&family=Lexend:wght@200;300;400;500&display=swap');
  @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes slideIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  .gm-fadein { animation: fadeUp 0.4s ease both; }
  .gm-pulse { animation: pulse 1.5s ease-in-out infinite; }
  .gm-slide { animation: slideIn 0.25s ease both; }
`;

const BG_STYLE: React.CSSProperties = {
  fontFamily: "'Lexend', sans-serif",
  backgroundImage:
    'linear-gradient(rgba(240,206,50,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(240,206,50,0.04) 1px,transparent 1px)',
  backgroundSize: '40px 40px',
};

interface GitMergeGameProps {
  isMobile?: boolean;
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
    explanation: 'Production API URL should be kept in main branch',
  },
  {
    id: 2,
    file: 'package.json',
    current: '"version": "1.2.0"',
    incoming: '"version": "1.1.5"',
    difficulty: 'easy',
    correctChoice: 'current',
    explanation: 'Always keep the higher version number',
  },
  {
    id: 3,
    file: 'Button.tsx',
    current: 'const handleClick = () => {\n  analytics.track("button_click");\n  onClick();\n}',
    incoming: 'const handleClick = () => {\n  onClick();\n}',
    difficulty: 'medium',
    correctChoice: 'current',
    explanation: 'Analytics tracking is important for user behavior insights',
  },
  {
    id: 4,
    file: 'database.ts',
    current: 'const pool = new Pool({\n  max: 20,\n  idleTimeoutMillis: 30000\n});',
    incoming: 'const pool = new Pool({\n  max: 10,\n  idleTimeoutMillis: 30000\n});',
    difficulty: 'medium',
    correctChoice: 'current',
    explanation: 'Higher connection pool supports better concurrent load',
  },
  {
    id: 5,
    file: 'auth.ts',
    current: 'if (!user.isVerified) {\n  throw new Error("Email not verified");\n}',
    incoming: 'if (!user) {\n  throw new Error("User not found");\n}',
    difficulty: 'hard',
    correctChoice: 'both',
    explanation: 'Both checks are necessary — user existence AND verification',
  },
  {
    id: 6,
    file: 'api.ts',
    current: 'headers: {\n  "Authorization": `Bearer ${token}`,\n  "Content-Type": "application/json"\n}',
    incoming: 'headers: {\n  "Authorization": `Bearer ${token}`,\n  "X-API-Key": process.env.API_KEY\n}',
    difficulty: 'hard',
    correctChoice: 'both',
    explanation: 'Both Content-Type and API-Key headers are needed',
  },
  {
    id: 7,
    file: 'logger.ts',
    current: 'console.log("Debug:", data);',
    incoming: 'logger.info({ component: "API", data });',
    difficulty: 'medium',
    correctChoice: 'incoming',
    explanation: 'Structured logging is better than console.log in production',
  },
  {
    id: 8,
    file: 'validation.ts',
    current: 'if (email.includes("@")) return true;',
    incoming: 'const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\nreturn emailRegex.test(email);',
    difficulty: 'easy',
    correctChoice: 'incoming',
    explanation: 'Proper email validation regex is more robust',
  },
  {
    id: 9,
    file: 'cache.ts',
    current: 'const TTL = 3600; // 1 hour',
    incoming: 'const TTL = 300; // 5 minutes',
    difficulty: 'medium',
    correctChoice: 'incoming',
    explanation: 'Shorter TTL ensures fresher data for users',
  },
  {
    id: 10,
    file: 'routes.ts',
    current: 'app.use(cors());',
    incoming: 'app.use(cors({\n  origin: process.env.ALLOWED_ORIGINS,\n  credentials: true\n}));',
    difficulty: 'hard',
    correctChoice: 'incoming',
    explanation: 'Restricted CORS is a security best practice',
  },
];

const DIFF_CONFIG = {
  easy:   { label: 'EASY',   pts: 10, color: 'border-[#34d399]/50 text-[#34d399]', bg: 'bg-[#34d399]/8'  },
  medium: { label: 'MEDIUM', pts: 20, color: 'border-[#f0ce32]/50 text-[#f0ce32]', bg: 'bg-[#f0ce32]/8'  },
  hard:   { label: 'HARD',   pts: 30, color: 'border-[#f87171]/50 text-[#f87171]', bg: 'bg-[#f87171]/8'  },
};

export const GitMergePage = ({ isMobile = false }: GitMergeGameProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [showResult, setShowResult] = useState<'correct' | 'wrong' | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [resolved, setResolved] = useState(0);
  const [streak, setStreak] = useState(0);
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    try {
      const s = localStorage.getItem('git-merge-highscore');
      if (s) setHighScore(parseInt(s));
    } catch {}
  }, []);

  const conflict = conflicts[currentIdx];

  const handleChoice = (choice: 'current' | 'incoming' | 'both') => {
    if (showResult) return;
    setSelectedChoice(choice);
    const correct = choice === conflict.correctChoice;

    if (correct) {
      const pts = DIFF_CONFIG[conflict.difficulty].pts + (streak >= 3 ? 10 : 0);
      setScore(prev => {
        const ns = prev + pts;
        if (ns > highScore) {
          setHighScore(ns);
          try { localStorage.setItem('git-merge-highscore', String(ns)); } catch {}
        }
        return ns;
      });
      setStreak(s => s + 1);
      setResolved(r => r + 1);
      setShowResult('correct');
    } else {
      setStreak(0);
      setShowResult('wrong');
      setLives(l => {
        if (l <= 1) { setGameOver(true); }
        return l - 1;
      });
    }
  };

  const nextConflict = () => {
    setShowResult(null);
    setSelectedChoice(null);
    if (currentIdx < conflicts.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setCurrentIdx(0);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setShowResult(null);
    setSelectedChoice(null);
    setResolved(0);
    setStreak(0);
  };

  const choiceClass = (key: 'current' | 'incoming' | 'both') => {
    const base = 'border-[3px] transition-all duration-150 cursor-pointer';
    if (!showResult) {
      const idle = {
        current:  'border-[#60a5fa]/25 hover:border-[#60a5fa]/60 hover:bg-[#60a5fa]/5',
        incoming: 'border-[#a78bfa]/25 hover:border-[#a78bfa]/60 hover:bg-[#a78bfa]/5',
        both:     'border-white/10 hover:border-[#f0ce32]/40 hover:bg-[#f0ce32]/5',
      };
      return `${base} ${idle[key]}`;
    }
    if (selectedChoice === key) {
      return `${base} ${showResult === 'correct'
        ? 'border-[#34d399] bg-[#34d399]/10'
        : 'border-[#f87171] bg-[#f87171]/10'}`;
    }
    if (key === conflict.correctChoice && showResult === 'wrong') {
      return `${base} border-[#34d399]/50 bg-[#34d399]/5`;
    }
    return `${base} border-white/8 opacity-40`;
  };

  return (
    <>
      <style>{FONTS}</style>
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white" style={BG_STYLE}>

        {/* TOPBAR */}
        <div className="flex items-stretch h-[52px] border-b-[3px] border-[#f0ce32]/30 flex-shrink-0 gm-fadein">
          <div className="px-6 border-r-[3px] border-[#f0ce32]/30 flex items-center bg-[#f0ce32]">
            <span className="text-black text-xl tracking-[0.12em]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>FOLIO</span>
          </div>
          <div className="flex-1 flex items-center px-4 md:px-6">
            <span className="text-[11px] text-white/30 tracking-[0.08em]" style={{ fontFamily: "'Fragment Mono',monospace" }}>
              // {resolved}/{conflicts.length} resolved
            </span>
          </div>
          <div className="border-l-[3px] border-[#f0ce32]/30 flex items-stretch">
            <div className="px-5 border-r-[3px] border-[#f0ce32]/30 flex items-center gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[8px] h-[8px] transition-all duration-300"
                  style={{ background: i < lives ? '#f0ce32' : 'rgba(255,255,255,0.12)' }}
                />
              ))}
            </div>
            <div className="px-4 flex items-center text-[20px] tracking-[0.1em] text-[#f0ce32]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{time}</div>
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0">

          {/* LEFT PANEL */}
          <div className="md:w-[220px] border-b-[3px] md:border-b-0 md:border-r-[3px] border-[#f0ce32]/30 flex flex-col flex-shrink-0">

            {/* Title */}
            <div className="bg-[#f0ce32] p-6 border-b-[3px] border-[#f0ce32] flex-shrink-0">
              <div className="text-[9px] tracking-[0.3em] text-black/50 mb-2" style={{ fontFamily: "'Fragment Mono',monospace" }}>// git.game</div>
              <div className="text-[44px] leading-[0.88] text-black" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>GIT<br />MERGE</div>
              <div className="text-[11px] tracking-[0.15em] text-black/55 mt-3" style={{ fontFamily: "'Fragment Mono',monospace" }}>
                Resolve conflicts<br />earn points
              </div>
            </div>

            {/* Score */}
            <div className="grid grid-cols-2 border-b-[3px] border-[#f0ce32]/30 flex-shrink-0">
              <div className="p-5 border-r-[3px] border-[#f0ce32]/30">
                <div className="text-[9px] tracking-[0.2em] text-white/30 mb-1" style={{ fontFamily: "'Fragment Mono',monospace" }}>SCORE</div>
                <div className="text-[28px] leading-none text-white" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{score}</div>
              </div>
              <div className="p-5">
                <div className="text-[9px] tracking-[0.2em] text-[#f0ce32]/50 mb-1" style={{ fontFamily: "'Fragment Mono',monospace" }}>BEST</div>
                <div className="text-[28px] leading-none text-[#f0ce32]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{highScore}</div>
              </div>
            </div>

            {/* Streak */}
            <div className="p-5 border-b-[3px] border-[#f0ce32]/30 flex-shrink-0 flex items-center justify-between">
              <div className="text-[9px] tracking-[0.2em] text-white/25" style={{ fontFamily: "'Fragment Mono',monospace" }}>STREAK</div>
              <div className="flex items-center gap-2">
                <div className="text-[22px] text-white/50" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{streak}</div>
                {streak >= 3 && <div className="w-[6px] h-[6px] bg-[#f0ce32] gm-pulse" />}
              </div>
            </div>

            {/* Points guide */}
            <div className="p-5 border-b-[3px] border-[#f0ce32]/30 flex flex-col gap-2">
              <div className="text-[9px] tracking-[0.2em] text-white/20 mb-1" style={{ fontFamily: "'Fragment Mono',monospace" }}>// points</div>
              {Object.entries(DIFF_CONFIG).map(([key, cfg]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className={`text-[9px] tracking-[0.12em] border px-2 py-0.5 ${cfg.color} ${cfg.bg}`} style={{ fontFamily: "'Fragment Mono',monospace" }}>{cfg.label}</div>
                  <div className="text-[12px] text-white/35" style={{ fontFamily: "'Fragment Mono',monospace" }}>+{cfg.pts} pts</div>
                </div>
              ))}
              <div className="flex items-center justify-between mt-1">
                <div className="text-[9px] tracking-[0.12em] text-[#f0ce32]/50 border border-[#f0ce32]/20 px-2 py-0.5" style={{ fontFamily: "'Fragment Mono',monospace" }}>3+ STREAK</div>
                <div className="text-[12px] text-white/35" style={{ fontFamily: "'Fragment Mono',monospace" }}>+10 bonus</div>
              </div>
            </div>

            {/* How to play */}
            <div className="p-5 flex-1">
              <div className="text-[9px] tracking-[0.2em] text-white/20 mb-3" style={{ fontFamily: "'Fragment Mono',monospace" }}>// how.to.play</div>
              <div className="flex flex-col gap-2">
                {[
                  'Review HEAD vs incoming code',
                  'Choose which version to keep',
                  'Or accept both changes',
                  '3 lives, make them count',
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2 text-[10px] text-white/30" style={{ fontFamily: "'Fragment Mono',monospace" }}>
                    <div className="w-[4px] h-[4px] bg-[#f0ce32]/30 flex-shrink-0 mt-[4px]" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN AREA */}
          <div className="flex-1 flex flex-col overflow-y-auto">

            {!gameOver ? (
              <>
                {/* File header */}
                <div className="border-b-[3px] border-[#f0ce32]/30 px-6 md:px-8 py-4 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="text-[9px] tracking-[0.25em] text-white/25" style={{ fontFamily: "'Fragment Mono',monospace" }}>// conflict.{currentIdx + 1}</div>
                    <div className="text-[13px] text-white/70" style={{ fontFamily: "'Fragment Mono',monospace" }}>{conflict.file}</div>
                  </div>
                  <div className={`text-[10px] tracking-[0.15em] border px-3 py-1 ${DIFF_CONFIG[conflict.difficulty].color} ${DIFF_CONFIG[conflict.difficulty].bg}`} style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
                    {DIFF_CONFIG[conflict.difficulty].label}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-[3px] bg-white/5 flex-shrink-0">
                  <div
                    className="h-full bg-[#f0ce32] transition-all duration-300"
                    style={{ width: `${((currentIdx) / conflicts.length) * 100}%` }}
                  />
                </div>

                {/* Conflict choices */}
                <div className="flex-1 p-6 md:p-8 flex flex-col gap-4">

                  {/* HEAD vs INCOMING */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* HEAD / Current */}
                    <div onClick={() => !showResult && handleChoice('current')} className={`p-5 ${choiceClass('current')}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-[6px] h-[6px] bg-[#60a5fa]" />
                          <div className="text-[10px] tracking-[0.2em] text-[#60a5fa]" style={{ fontFamily: "'Fragment Mono',monospace" }}>HEAD · CURRENT</div>
                        </div>
                        {selectedChoice === 'current' && showResult && (
                          <div className={`text-[11px] tracking-[0.1em] ${showResult === 'correct' ? 'text-[#34d399]' : 'text-[#f87171]'}`} style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
                            {showResult === 'correct' ? 'CORRECT' : 'WRONG'}
                          </div>
                        )}
                        {conflict.correctChoice === 'current' && showResult === 'wrong' && selectedChoice !== 'current' && (
                          <div className="text-[11px] tracking-[0.1em] text-[#34d399]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>CORRECT</div>
                        )}
                      </div>
                      <pre className="text-[11px] md:text-[12px] leading-[1.7] text-white/55 overflow-x-auto" style={{ fontFamily: "'Fragment Mono',monospace" }}>
                        {conflict.current}
                      </pre>
                    </div>

                    {/* INCOMING */}
                    <div onClick={() => !showResult && handleChoice('incoming')} className={`p-5 ${choiceClass('incoming')}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-[6px] h-[6px] bg-[#a78bfa]" />
                          <div className="text-[10px] tracking-[0.2em] text-[#a78bfa]" style={{ fontFamily: "'Fragment Mono',monospace" }}>INCOMING</div>
                        </div>
                        {selectedChoice === 'incoming' && showResult && (
                          <div className={`text-[11px] tracking-[0.1em] ${showResult === 'correct' ? 'text-[#34d399]' : 'text-[#f87171]'}`} style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
                            {showResult === 'correct' ? 'CORRECT' : 'WRONG'}
                          </div>
                        )}
                        {conflict.correctChoice === 'incoming' && showResult === 'wrong' && selectedChoice !== 'incoming' && (
                          <div className="text-[11px] tracking-[0.1em] text-[#34d399]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>CORRECT</div>
                        )}
                      </div>
                      <pre className="text-[11px] md:text-[12px] leading-[1.7] text-white/55 overflow-x-auto" style={{ fontFamily: "'Fragment Mono',monospace" }}>
                        {conflict.incoming}
                      </pre>
                    </div>
                  </div>

                  {/* ACCEPT BOTH */}
                  <div onClick={() => !showResult && handleChoice('both')} className={`p-4 ${choiceClass('both')}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-[5px] h-[5px] bg-[#60a5fa]" />
                          <div className="w-[5px] h-[5px] bg-[#a78bfa]" />
                        </div>
                        <div className="text-[10px] tracking-[0.2em] text-white/40" style={{ fontFamily: "'Fragment Mono',monospace" }}>ACCEPT BOTH CHANGES</div>
                      </div>
                      {selectedChoice === 'both' && showResult && (
                        <div className={`text-[11px] tracking-[0.1em] ${showResult === 'correct' ? 'text-[#34d399]' : 'text-[#f87171]'}`} style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
                          {showResult === 'correct' ? 'CORRECT' : 'WRONG'}
                        </div>
                      )}
                      {conflict.correctChoice === 'both' && showResult === 'wrong' && selectedChoice !== 'both' && (
                        <div className="text-[11px] tracking-[0.1em] text-[#34d399]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>CORRECT</div>
                      )}
                    </div>
                  </div>

                  {/* Result feedback */}
                  {showResult && (
                    <div className={`border-[3px] p-5 gm-slide ${showResult === 'correct' ? 'border-[#34d399]/40 bg-[#34d399]/5' : 'border-[#f87171]/40 bg-[#f87171]/5'}`}>
                      <div className="flex items-start gap-4">
                        <div>
                          <div className={`text-[18px] tracking-[0.08em] mb-2 ${showResult === 'correct' ? 'text-[#34d399]' : 'text-[#f87171]'}`} style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
                            {showResult === 'correct' ? 'CORRECT' : 'WRONG CALL'}
                          </div>
                          <p className="text-[12px] text-white/50 leading-[1.7] mb-3" style={{ fontFamily: "'Fragment Mono',monospace" }}>
                            {conflict.explanation}
                          </p>
                          {showResult === 'correct' && streak >= 3 && (
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-[6px] h-[6px] bg-[#f0ce32] gm-pulse" />
                              <span className="text-[10px] text-[#f0ce32]" style={{ fontFamily: "'Fragment Mono',monospace" }}>
                                {streak}x streak · +10 bonus pts
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={nextConflict}
                        className="w-full border-[3px] border-[#f0ce32]/50 text-[#f0ce32] hover:bg-[#f0ce32] hover:text-black py-3 text-[15px] tracking-[0.15em] transition-all duration-150"
                        style={{ fontFamily: "'Bebas Neue',sans-serif" }}
                      >
                        {currentIdx < conflicts.length - 1 ? 'NEXT CONFLICT →' : 'FINISH GAME'}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* GAME OVER */
              <div className="flex-1 flex flex-col">

                {/* Hero */}
                <div className={`p-8 md:p-12 border-b-[3px] border-[#f0ce32]/30 ${resolved === conflicts.length ? 'bg-[#f0ce32]' : 'bg-[#0a0a0a]'}`}>
                  <div className={`text-[9px] tracking-[0.3em] mb-3 ${resolved === conflicts.length ? 'text-black/50' : 'text-white/25'}`} style={{ fontFamily: "'Fragment Mono',monospace" }}>
                    {resolved === conflicts.length ? '// status.complete' : '// status.gameover'}
                  </div>
                  <div className={`text-[56px] md:text-[72px] leading-[0.88] mb-2 ${resolved === conflicts.length ? 'text-black' : 'text-white'}`} style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
                    {resolved === conflicts.length ? 'ALL MERGED' : 'GAME OVER'}
                  </div>
                  <div className={`text-[13px] ${resolved === conflicts.length ? 'text-black/55' : 'text-white/35'}`} style={{ fontFamily: "'Fragment Mono',monospace" }}>
                    {resolved} / {conflicts.length} conflicts resolved
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 border-b-[3px] border-[#f0ce32]/30">
                  <div className="p-6 md:p-8 border-r-[3px] border-[#f0ce32]/30">
                    <div className="text-[9px] tracking-[0.2em] text-white/25 mb-2" style={{ fontFamily: "'Fragment Mono',monospace" }}>FINAL SCORE</div>
                    <div className="text-[36px] md:text-[48px] leading-none text-[#f0ce32]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{score}</div>
                    {score > 0 && score === highScore && (
                      <div className="text-[9px] text-[#f0ce32]/60 mt-1" style={{ fontFamily: "'Fragment Mono',monospace" }}>new best</div>
                    )}
                  </div>
                  <div className="p-6 md:p-8 border-r-[3px] border-[#f0ce32]/30">
                    <div className="text-[9px] tracking-[0.2em] text-white/25 mb-2" style={{ fontFamily: "'Fragment Mono',monospace" }}>HIGH SCORE</div>
                    <div className="text-[36px] md:text-[48px] leading-none text-white/50" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{highScore}</div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="text-[9px] tracking-[0.2em] text-white/25 mb-2" style={{ fontFamily: "'Fragment Mono',monospace" }}>RESOLVED</div>
                    <div className="text-[36px] md:text-[48px] leading-none text-white/50" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{resolved}<span className="text-[20px] text-white/20">/{conflicts.length}</span></div>
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  <button
                    onClick={resetGame}
                    className="border-[3px] border-[#f0ce32] bg-[#f0ce32] text-black hover:bg-transparent hover:text-[#f0ce32] px-10 py-4 text-[20px] tracking-[0.15em] transition-all duration-150"
                    style={{ fontFamily: "'Bebas Neue',sans-serif" }}
                  >
                    PLAY AGAIN
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        
      </div>
    </>
  );
};

export default GitMergePage;