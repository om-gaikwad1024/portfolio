'use client';

import React, { useState, useEffect } from 'react';

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fragment+Mono:ital@0;1&family=Lexend:wght@200;300;400;500&display=swap');
  @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  .hp-f0 { animation: fadeUp 0.4s ease both; }
  .hp-f1 { animation: fadeUp 0.4s 0.07s ease both; }
  .hp-f2 { animation: fadeUp 0.4s 0.14s ease both; }
  .hp-f3 { animation: fadeUp 0.4s 0.21s ease both; }
  .hp-f4 { animation: fadeUp 0.4s 0.28s ease both; }
  .hp-f5 { animation: fadeUp 0.4s 0.35s ease both; }
`;

const BG_STYLE = {
  fontFamily: "'Lexend', sans-serif",
  backgroundImage:
    'linear-gradient(rgba(240,206,50,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(240,206,50,0.04) 1px,transparent 1px)',
  backgroundSize: '40px 40px',
};

const Label = ({ children }: { children: React.ReactNode }) => (
  <div
    className="text-[9px] tracking-[0.3em] uppercase text-[#f0ce32]/50 mb-3"
    style={{ fontFamily: "'Fragment Mono', monospace" }}
  >
    {children}
  </div>
);

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div
    className="text-[28px] md:text-[32px] leading-none tracking-[0.06em] text-[#f0ce32] mb-5"
    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
  >
    {children}
  </div>
);

interface AppCardProps {
  code: string;
  name: string;
  desc: string;
  accent?: boolean;
}

const AppCard = ({ code, name, desc, accent }: AppCardProps) => (
  <div
    className={`group border-[3px] p-5 flex flex-col gap-2 hover:bg-[#f0ce32] transition-colors duration-150 cursor-default ${
      accent ? 'border-[#f0ce32] bg-[#f0ce32]/5' : 'border-white/10 hover:border-[#f0ce32]'
    }`}
  >
    <div className="flex items-start justify-between gap-2">
      <div
        className={`text-[22px] tracking-[0.08em] group-hover:text-black transition-colors ${
          accent ? 'text-[#f0ce32]' : 'text-white'
        }`}
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        {name}
      </div>
      <div
        className={`text-[11px] tracking-[0.12em] px-2 py-0.5 border-[2px] mt-0.5 flex-shrink-0 group-hover:border-black group-hover:text-black transition-colors ${
          accent ? 'border-[#f0ce32] text-[#f0ce32]' : 'border-white/20 text-white/30'
        }`}
        style={{ fontFamily: "'Fragment Mono', monospace" }}
      >
        {code}
      </div>
    </div>
    <div
      className="text-[11px] text-white/45 group-hover:text-black/70 leading-[1.6] transition-colors"
      style={{ fontFamily: "'Fragment Mono', monospace" }}
    >
      {desc}
    </div>
  </div>
);

interface TipCardProps {
  label: string;
  value: string;
}

const TipCard = ({ label, value }: TipCardProps) => (
  <div className="border-[3px] border-white/10 p-5 flex flex-col gap-2 hover:border-[#f0ce32]/40 transition-colors">
    <div
      className="text-[10px] tracking-[0.2em] uppercase text-[#f0ce32]/60"
      style={{ fontFamily: "'Fragment Mono', monospace" }}
    >
      {label}
    </div>
    <div className="text-[13px] font-light text-white/65 leading-[1.7]">{value}</div>
  </div>
);

interface FeatureRowProps {
  index: string;
  title: string;
  detail: string;
}

const FeatureRow = ({ index, title, detail }: FeatureRowProps) => (
  <div className="group border-[3px] border-white/10 border-b-0 last:border-b-[3px] p-5 flex items-start gap-5 hover:bg-[#f0ce32] transition-colors duration-150 cursor-default">
    <div
      className="text-[28px] text-white/10 group-hover:text-black/20 transition-colors flex-shrink-0 w-8 text-right leading-none mt-0.5"
      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
    >
      {index}
    </div>
    <div className="flex-1 min-w-0">
      <div
        className="text-[18px] tracking-[0.06em] text-white group-hover:text-black transition-colors leading-none mb-1"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        {title}
      </div>
      <div
        className="text-[11px] text-white/40 group-hover:text-black/60 leading-[1.6] transition-colors"
        style={{ fontFamily: "'Fragment Mono', monospace" }}
      >
        {detail}
      </div>
    </div>
  </div>
);

export const HelpPage = () => {
  const [time, setTime] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const sections = [
    { id: 'apps', label: 'APPS' },
    { id: 'controls', label: 'CONTROLS' },
    { id: 'tips', label: 'TIPS' },
    { id: 'features', label: 'FEATURES' },
  ];

  const apps = [
    { code: 'AB', name: 'ABOUT', desc: 'background · passion · what drives me as a developer', accent: false },
    { code: 'PJ', name: 'PROJECTS', desc: 'web apps · innovative solutions · latest work', accent: false },
    { code: 'SK', name: 'SKILLS', desc: 'programming languages · frameworks · expertise', accent: false },
    { code: 'EX', name: 'EXPERIENCE', desc: 'professional roles · career impact · journey', accent: false },
    { code: 'CT', name: 'CONTACT', desc: 'opportunities · reach out · connect with me', accent: true },
    { code: 'ED', name: 'EDUCATION', desc: 'academic path · certifications · continuous learning', accent: false },
    { code: 'LD', name: 'LEADERSHIP', desc: 'hackathons · team projects · state-level wins', accent: false },
    { code: '2K', name: '2048', desc: 'tile puzzle game · join numbers · reach 2048', accent: false },
    { code: 'GM', name: 'GIT MERGE', desc: 'branch visualizer · commit graph · merge simulator', accent: false },
    { code: 'GL', name: 'GAME OF LIFE', desc: "conway's cellular automaton · click to draw", accent: false },
  ];

  const tips = [
    {
      label: 'DOUBLE CLICK',
      value: 'Double click any app icon to open it instantly without using the dock navigation.',
    },
    {
      label: 'TERMINAL MODE',
      value: 'Use the "Switch to Terminal" button to toggle between desktop and terminal modes.',
    },
    {
      label: 'CONTEXT MENU',
      value: 'Right click the desktop for sort options, refresh, and terminal access.',
    },
    {
      label: 'SYSTEM TRAY',
      value: 'Adjust volume and brightness via the system tray in the top-right corner.',
    },
  ];

  const features = [
    {
      index: '01',
      title: 'TERMINAL → DESKTOP TRANSITION',
      detail: 'seamless mode switching with preserved state and smooth animations',
    },
    {
      index: '02',
      title: 'FULLY FUNCTIONAL DESKTOP',
      detail: 'window management · drag and drop · system controls · taskbar',
    },
    {
      index: '03',
      title: 'MODERN DESIGN SYSTEM',
      detail: 'bebas neue · fragment mono · lexend · consistent yellow accent language',
    },
    {
      index: '04',
      title: 'RESPONSIVE LAYOUT',
      detail: 'optimised for desktop, tablet, and mobile viewports',
    },
    {
      index: '05',
      title: 'INTERACTIVE ELEMENTS',
      detail: 'hover states · transitions · micro interactions on every component',
    },
    {
      index: '06',
      title: 'ATTENTION TO DETAIL',
      detail: 'every border, shadow, and spacing choice is intentional',
    },
  ];

  return (
    <>
      <style>{FONTS}</style>
      <div
        className="min-h-screen flex flex-col bg-[#0a0a0a] text-white"
        style={BG_STYLE}
      >
        {/* TOPBAR */}
        <div className="flex items-stretch h-[52px] border-b-[3px] border-[#f0ce32]/30 flex-shrink-0 hp-f0">
          <div className="px-6 border-r-[3px] border-[#f0ce32]/30 flex items-center bg-[#f0ce32]">
            <span
              className="text-black text-xl tracking-[0.12em]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              FOLIO
            </span>
          </div>
          <div className="flex-1 flex items-center px-4 md:px-6">
            <span
              className="text-[11px] text-white/30 tracking-[0.08em]"
              style={{ fontFamily: "'Fragment Mono', monospace" }}
            >
              
            </span>
          </div>
          <div
            className="px-4 md:px-6 border-l-[3px] border-[#f0ce32]/30 flex items-center text-[20px] md:text-[22px] tracking-[0.1em] text-[#f0ce32]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {time}
          </div>
        </div>

        {/* HERO STRIP */}
        <div className="border-b-[3px] border-[#f0ce32]/30 flex items-stretch hp-f1">
          <div className="bg-[#f0ce32] px-8 md:px-12 py-8 flex flex-col justify-center border-r-[3px] border-[#f0ce32] w-[220px] md:w-[300px] flex-shrink-0">
            <div
              className="text-[9px] tracking-[0.3em] text-black/50 mb-2"
              style={{ fontFamily: "'Fragment Mono', monospace" }}
            >
              // sys.help
            </div>
            <div
              className="text-[52px] md:text-[64px] leading-[0.85] text-black"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              HELP<br />GUIDE
            </div>
          </div>
          <div className="flex-1 flex items-center px-8 md:px-12 py-6">
            <div>
              <div
                className="text-[9px] tracking-[0.25em] uppercase text-white/30 mb-2"
                style={{ fontFamily: "'Fragment Mono', monospace" }}
              >
                // desktop.mode
              </div>
              <p className="text-[14px] md:text-[15px] font-light text-white/60 leading-[1.8] max-w-[560px]">
                Navigate through an{' '}
                <strong className="font-medium text-white">interactive portfolio OS</strong>. Each
                section is a desktop application. Use the dock, double click icons, or explore
                the system tray for full control.
              </p>
            </div>
          </div>
          {/* Section nav */}
          <div className="border-l-[3px] border-[#f0ce32]/30 hidden md:flex flex-col">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() =>
                  document.getElementById(`hp-${s.id}`)?.scrollIntoView({ behavior: 'smooth' })
                }
                className={`flex-1 px-6 border-b border-[#f0ce32]/10 last:border-b-0 text-[13px] tracking-[0.15em] transition-all duration-150 hover:bg-[#f0ce32] hover:text-black ${
                  activeSection === s.id ? 'bg-[#f0ce32] text-black' : 'text-white/30'
                }`}
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 flex flex-col gap-0">

          {/* APPS SECTION */}
          <div id="hp-apps" className="border-b-[3px] border-[#f0ce32]/30 p-8 md:p-12 hp-f2">
            <Label>// portfolio.applications</Label>
            <SectionHeader>DESKTOP APPLICATIONS</SectionHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0">
              {apps.map((app, i) => (
                <div
                  key={app.code}
                  className={`border-r-[3px] border-b-[3px] border-white/10 ${
                    (i + 1) % 4 === 0 ? 'border-r-0' : ''
                  }`}
                >
                  <AppCard {...app} />
                </div>
              ))}
            </div>
          </div>

          {/* CONTROLS + TIPS */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b-[3px] border-[#f0ce32]/30 hp-f3">
            {/* Controls */}
            <div id="hp-controls" className="border-r-[3px] border-[#f0ce32]/30 p-8 md:p-12">
              <Label>// system.controls</Label>
              <SectionHeader>SYSTEM CONTROLS</SectionHeader>

              <div className="mb-6">
                <div
                  className="text-[13px] tracking-[0.12em] text-[#f0ce32] mb-3"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  SYSTEM TRAY
                </div>
                <div className="space-y-2">
                  {[
                    'Volume adjustment slider',
                    'Screen brightness control',
                    'Quick terminal access',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-[12px] text-white/50"
                      style={{ fontFamily: "'Fragment Mono', monospace" }}
                    >
                      <div className="w-[6px] h-[6px] bg-[#f0ce32] flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div
                  className="text-[13px] tracking-[0.12em] text-[#f0ce32] mb-3"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  CONTEXT MENUS
                </div>
                <div className="space-y-2">
                  {[
                    'Sort by: Default, A–Z, Z–A',
                    'Refresh desktop',
                    'Terminal access shortcut',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-[12px] text-white/50"
                      style={{ fontFamily: "'Fragment Mono', monospace" }}
                    >
                      <div className="w-[6px] h-[6px] bg-[#f0ce32] flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tips */}
            <div id="hp-tips" className="p-8 md:p-12">
              <Label>// navigation.tips</Label>
              <SectionHeader>QUICK TIPS</SectionHeader>
              <div className="grid grid-cols-1 gap-0">
                {tips.map((tip, i) => (
                  <TipCard key={i} {...tip} />
                ))}
              </div>
            </div>
          </div>

          {/* FEATURES */}
          <div id="hp-features" className="p-8 md:p-12 hp-f4">
            <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
              <div className="flex-shrink-0">
                <Label>// what.makes.this.special</Label>
                <SectionHeader>KEY FEATURES</SectionHeader>
                <p className="text-[13px] font-light text-white/45 leading-[1.8] max-w-[320px]">
                  This isn't just a portfolio, it's an{' '}
                  <strong className="font-medium text-white/70">interactive OS experience</strong>{' '}
                  showcasing both technical skills and creative vision.
                </p>
              </div>
              <div className="flex-1 min-w-0">
                {features.map((f) => (
                  <FeatureRow key={f.index} {...f} />
                ))}
              </div>
            </div>
          </div>

          {/* NOTES STRIP */}
          <div className="border-t-[3px] border-[#f0ce32]/30 grid grid-cols-1 md:grid-cols-3 hp-f5">
            {[
              {
                label: '// note.01',
                text: 'System tray UI includes live volume and brightness sliders with visual feedback.',
              },
              {
                label: '// note.02',
                text: 'Context menu allows returning to full screen mode via the desktop refresh option.',
              },
              {
                label: '// note.03',
                text: 'Desktop overview visually represents the full interactive environment in real time.',
              },
            ].map((note, i) => (
              <div
                key={i}
                className="p-6 md:p-8 border-r-[3px] border-[#f0ce32]/30 last:border-r-0"
              >
                <div
                  className="text-[9px] tracking-[0.25em] text-[#f0ce32]/40 mb-2"
                  style={{ fontFamily: "'Fragment Mono', monospace" }}
                >
                  {note.label}
                </div>
                <p className="text-[12px] font-light text-white/40 leading-[1.75]">{note.text}</p>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </>
  );
};

export default HelpPage;