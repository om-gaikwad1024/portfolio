'use client';

import React, { useState, useEffect } from 'react';

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fragment+Mono:ital@0;1&family=Lexend:wght@200;300;400;500&display=swap');
  @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
  @keyframes blink { 0%,100%{opacity:1} 49%{opacity:1} 50%{opacity:0} 99%{opacity:0} }
  @keyframes glitch1 {
    0%,100%{clip-path:polygon(0 0,100% 0,100% 100%,0 100%);transform:translate(0)}
    20%{clip-path:polygon(0 20%,100% 20%,100% 30%,0 30%);transform:translate(-3px)}
    40%{clip-path:polygon(0 60%,100% 60%,100% 70%,0 70%);transform:translate(3px)}
    60%{clip-path:polygon(0 0,100% 0,100% 100%,0 100%);transform:translate(0)}
  }
  .fp-fadein { animation: fadeUp 0.5s ease both; }
  .fp-fadein-1 { animation: fadeUp 0.5s 0.1s ease both; }
  .fp-fadein-2 { animation: fadeUp 0.5s 0.2s ease both; }
  .fp-fadein-3 { animation: fadeUp 0.5s 0.3s ease both; }
  .fp-fadein-4 { animation: fadeUp 0.5s 0.4s ease both; }
  .fp-blink { animation: blink 1s step-end infinite; }
  .fp-scan::after {
    content:'';
    position:absolute;
    top:0;left:0;right:0;
    height:2px;
    background:linear-gradient(transparent, rgba(240,206,50,0.08), transparent);
    animation: scanline 4s linear infinite;
    pointer-events:none;
  }
`;

const BG_STYLE: React.CSSProperties = {
  fontFamily: "'Lexend', sans-serif",
  backgroundImage:
    'linear-gradient(rgba(240,206,50,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(240,206,50,0.04) 1px,transparent 1px)',
  backgroundSize: '40px 40px',
};

const TERMINAL_LINES = [
  '> scanning directory contents...',
  '> access: RESTRICTED',
  '> authentication: bypassed',
  '> loading hidden files...',
  '> WARNING: easter egg detected',
  '> status: 403 FORBIDDEN · but you\'re already in',
];

export const FolderPage = () => {
  const [phase, setPhase] = useState<'loading' | 'revealed'>('loading');
  const [visibleLines, setVisibleLines] = useState(0);
  const [time, setTime] = useState('');
  const [typed, setTyped] = useState('');
  const fullText = 'NO FILESYSTEM HERE. JUST VIBES.';

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Animate terminal lines
  useEffect(() => {
    if (phase !== 'loading') return;
    if (visibleLines < TERMINAL_LINES.length) {
      const t = setTimeout(() => setVisibleLines(v => v + 1), 300);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase('revealed'), 400);
      return () => clearTimeout(t);
    }
  }, [phase, visibleLines]);

  // Typewriter
  useEffect(() => {
    if (phase !== 'revealed') return;
    if (typed.length < fullText.length) {
      const t = setTimeout(() => setTyped(fullText.slice(0, typed.length + 1)), 45);
      return () => clearTimeout(t);
    }
  }, [phase, typed, fullText]);

  const features = [
    { code: '01', title: 'FILE SYSTEM', detail: 'full drag-and-drop file operations · folders · rename · delete' },
    { code: '02', title: 'PREVIEW PANE', detail: 'image thumbnails · text preview · code syntax highlighting' },
    { code: '03', title: 'SEARCH', detail: 'fuzzy file search · filter by type · sort by date or name' },
    { code: '04', title: 'CONTEXT MENUS', detail: 'right-click operations · copy · move · share' },
  ];

  return (
    <>
      <style>{FONTS}</style>
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white relative overflow-hidden fp-scan" style={BG_STYLE}>

        {/* TOPBAR */}
        <div className="flex items-stretch h-[52px] border-b-[3px] border-[#f0ce32]/30 flex-shrink-0 fp-fadein relative z-10">
          <div className="px-6 border-r-[3px] border-[#f0ce32]/30 flex items-center bg-[#f0ce32]">
            <span className="text-black text-xl tracking-[0.12em]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>FOLIO</span>
          </div>
          <div className="flex-1 flex items-center px-4 md:px-6">
            <span className="text-[11px] text-[#f0ce32]/60 tracking-[0.08em]" style={{ fontFamily: "'Fragment Mono',monospace" }}>
              // folder.sys — ACCESS GRANTED
            </span>
          </div>
          <div className="px-4 md:px-6 border-l-[3px] border-[#f0ce32]/30 flex items-center text-[20px] md:text-[22px] tracking-[0.1em] text-[#f0ce32]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{time}</div>
        </div>

        {phase === 'loading' ? (
          /* LOADING PHASE */
          <div className="flex-1 flex flex-col p-8 md:p-16 relative z-10">
            <div className="text-[9px] tracking-[0.3em] text-[#f0ce32]/40 mb-6" style={{ fontFamily: "'Fragment Mono',monospace" }}>
              // sys.boot · directory.scan
            </div>
            <div className="flex flex-col gap-3 max-w-[600px]">
              {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  className="text-[12px] md:text-[13px] leading-[1.6]"
                  style={{
                    fontFamily: "'Fragment Mono',monospace",
                    color: i === visibleLines - 1 ? 'rgba(240,206,50,0.9)' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {line}
                  {i === visibleLines - 1 && <span className="fp-blink ml-0.5">_</span>}
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <div className="border-t-[3px] border-[#f0ce32]/20 pt-4 flex items-center gap-4">
                <div className="text-[9px] tracking-[0.2em] text-white/20" style={{ fontFamily: "'Fragment Mono',monospace" }}>LOADING</div>
                <div className="flex gap-1">
                  {Array(20).fill(null).map((_, i) => (
                    <div
                      key={i}
                      className="w-[12px] h-[4px]"
                      style={{ background: i < Math.floor((visibleLines / TERMINAL_LINES.length) * 20) ? '#f0ce32' : 'rgba(255,255,255,0.08)' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* REVEALED PHASE */
          <div className="flex-1 flex flex-col md:grid md:grid-cols-[1fr_380px] relative z-10">

            {/* LEFT */}
            <div className="border-b-[3px] md:border-b-0 md:border-r-[3px] border-[#f0ce32]/30 flex flex-col">

              {/* Hero */}
              <div className="bg-[#f0ce32] p-8 md:p-12 border-b-[3px] border-[#f0ce32] relative overflow-hidden fp-fadein">
                <div className="relative z-10">
                  <div className="text-[9px] tracking-[0.3em] text-black/50 mb-3" style={{ fontFamily: "'Fragment Mono',monospace" }}>
                    // easter.egg.unlocked · /sys/hidden
                  </div>
                  <div className="text-[52px] md:text-[72px] leading-[0.88] text-black mb-4" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
                    YOU<br />FOUND<br />IT
                  </div>
                  <div className="min-h-[28px]">
                    <span className="text-[14px] md:text-[15px] text-black/65" style={{ fontFamily: "'Fragment Mono',monospace" }}>
                      {typed}
                      {typed.length < fullText.length && <span className="fp-blink">_</span>}
                    </span>
                  </div>
                </div>
                <div
                  className="absolute bottom-[-20px] right-[-16px] text-[180px] md:text-[220px] leading-[0.8] text-black/[0.07] pointer-events-none select-none"
                  style={{ fontFamily: "'Bebas Neue',sans-serif" }}
                >?</div>
              </div>

              {/* What you found */}
              <div className="p-8 md:p-10 border-b-[3px] border-[#f0ce32]/30 fp-fadein-1">
                <div className="text-[9px] tracking-[0.3em] text-white/25 mb-3" style={{ fontFamily: "'Fragment Mono',monospace" }}>// what.is.this</div>
                <p className="text-[14px] font-light text-white/55 leading-[1.85] max-w-[480px]">
                  You've stumbled into a <strong className="font-medium text-white">placeholder</strong> disguised as a folder.
                  A full file system would make this portfolio a complete OS — and that's a bit beyond
                  portfolio scope. <strong className="font-medium text-white/70">For now.</strong>
                </p>
              </div>

              {/* Feature list */}
              <div className="p-8 md:p-10 fp-fadein-2">
                <div className="text-[9px] tracking-[0.3em] text-white/25 mb-4" style={{ fontFamily: "'Fragment Mono',monospace" }}>// could.be.built</div>
                {features.map(f => (
                  <div
                    key={f.code}
                    className="group border-[3px] border-white/8 border-b-0 last:border-b-[3px] p-4 flex items-start gap-4 hover:bg-[#f0ce32] transition-colors duration-150 cursor-default"
                  >
                    <div className="text-[22px] text-white/10 group-hover:text-black/20 transition-colors flex-shrink-0 w-6" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{f.code}</div>
                    <div>
                      <div className="text-[16px] tracking-[0.08em] text-white group-hover:text-black transition-colors leading-none mb-1" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{f.title}</div>
                      <div className="text-[10px] text-white/35 group-hover:text-black/55 leading-[1.6] transition-colors" style={{ fontFamily: "'Fragment Mono',monospace" }}>{f.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col">

              {/* CTA block */}
              <div className="p-8 md:p-10 border-b-[3px] border-[#f0ce32]/30 fp-fadein-3">
                <div className="text-[9px] tracking-[0.3em] text-[#f0ce32]/40 mb-3" style={{ fontFamily: "'Fragment Mono',monospace" }}>// hire.me</div>
                <div className="text-[38px] md:text-[44px] leading-[0.9] text-white mb-4" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
                  WANT<br />THIS<br />BUILT?
                </div>
                <p className="text-[13px] font-light text-white/45 leading-[1.8] mb-6">
                  I can build a fully functional file system, drag-and-drop, file operations,
                  and much more. If you're looking for someone who turns ambitious ideas into reality
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => window.open("mailto:om.gaikwad1024@gmail.com?subject=Let's Build Something Amazing!", '_blank')}
                    className="border-[3px] border-[#f0ce32] bg-[#f0ce32] text-black hover:bg-transparent hover:text-[#f0ce32] py-3.5 text-[18px] tracking-[0.12em] transition-all duration-150 text-left px-5"
                    style={{ fontFamily: "'Bebas Neue',sans-serif" }}
                  >
                    SEND A MESSAGE ↗
                  </button>
                  <button
                    onClick={() => window.open('https://linkedin.com/in/om-gaikwad1024', '_blank')}
                    className="border-[3px] border-white/15 text-white/40 hover:border-white/40 hover:text-white/70 py-3 text-[16px] tracking-[0.12em] transition-all duration-150 text-left px-5"
                    style={{ fontFamily: "'Bebas Neue',sans-serif" }}
                  >
                    CONNECT ON LINKEDIN
                  </button>
                </div>
              </div>

              {/* Fun facts */}
              <div className="p-8 md:p-10 border-b-[3px] border-[#f0ce32]/30 fp-fadein-4">
                <div className="text-[9px] tracking-[0.3em] text-white/25 mb-4" style={{ fontFamily: "'Fragment Mono',monospace" }}>// portfolio.facts</div>
                <div className="space-y-4">
                  {[
                    { label: 'BUILT WITH', val: 'React · TypeScript · Tailwind CSS' },
                    { label: 'CONCEPT', val: 'Desktop OS portfolio with window management' },
                    { label: 'DESIGN', val: 'Brutalist · High contrast · Bebas Neue' },
                    { label: 'PRO TIP', val: 'Try the volume & brightness in system tray' },
                  ].map(f => (
                    <div key={f.label} className="flex items-start gap-3">
                      <div className="w-[6px] h-[6px] bg-[#f0ce32] flex-shrink-0 mt-[5px]" />
                      <div>
                        <div className="text-[9px] tracking-[0.2em] text-[#f0ce32]/50 mb-0.5" style={{ fontFamily: "'Fragment Mono',monospace" }}>{f.label}</div>
                        <div className="text-[12px] text-white/40" style={{ fontFamily: "'Fragment Mono',monospace" }}>{f.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secret badge */}
              <div className="flex-1 p-8 md:p-10 flex items-end">
                <div className="w-full border-[3px] border-[#f0ce32]/15 p-4 flex items-center justify-between">
                  <div className="text-[9px] tracking-[0.2em] text-white/20" style={{ fontFamily: "'Fragment Mono',monospace" }}>// secret.discovered</div>
                  <div className="text-[18px] text-[#f0ce32]/40" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
                    +1 EASTER EGG
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        
      </div>
    </>
  );
};

export default FolderPage;