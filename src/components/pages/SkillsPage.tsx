import React, { useState } from 'react';

interface SkillsPageProps {
  openContactWindow?: () => void;
}

const SKILL_GROUPS = [
  {
    id: 'frontend', label: 'FRONTEND', index: '01',
    skills: ['React','TypeScript','JavaScript','HTML/CSS','Bootstrap','Tailwind','SharePoint SPFx','Microsoft Fluent UI'],
    desc: 'Building pixel perfect, performant interfaces',
  },
  {
    id: 'backend', label: 'BACKEND', index: '02',
    skills: ['Flask','Django','Spring Boot','REST APIs','JWT Auth','WebSocket','Node.js'],
    desc: 'Architecting robust, scalable server side systems',
  },
  {
    id: 'aiml', label: 'AI / ML', index: '03',
    skills: ['Reinforcement Learning','PPO Algorithm','ViZDoom','Pandas','NumPy','Matplotlib','Jupyter','Random Forest','Gemini API'],
    desc: 'Training agents, building intelligent systems',
  },
  {
    id: 'tools', label: 'TOOLS & DB', index: '04',
    skills: ['MongoDB','SQLite','Firebase','Supabase','Git/GitHub','VS Code','IntelliJ','Figma','Unix Shell','Python','SQL'],
    desc: 'Full spectrum of dev tools and data systems',
  },
];

const LANGS = ['JavaScript / TypeScript','Python','SQL','HTML / CSS','C++'];

export const SkillsPage = ({ openContactWindow }: SkillsPageProps) => {
  const [hovered, setHovered] = useState<string|null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fragment+Mono:ital@0;1&family=Lexend:wght@200;300;400;500&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
        @keyframes tagPop { from{opacity:0;transform:scale(0.85);}to{opacity:1;transform:scale(1);} }
        .sk-block { animation: fadeUp 0.5s ease both; }
        .sk-block:nth-child(1){animation-delay:0.05s}
        .sk-block:nth-child(2){animation-delay:0.12s}
        .sk-block:nth-child(3){animation-delay:0.19s}
        .sk-block:nth-child(4){animation-delay:0.26s}
        .sk-tag { animation: tagPop 0.3s ease both; }
        .sk-tag:nth-child(1){animation-delay:0.05s}
        .sk-tag:nth-child(2){animation-delay:0.1s}
        .sk-tag:nth-child(3){animation-delay:0.15s}
        .sk-tag:nth-child(4){animation-delay:0.2s}
        .sk-tag:nth-child(5){animation-delay:0.25s}
        .sk-tag:nth-child(6){animation-delay:0.3s}
        .sk-tag:nth-child(7){animation-delay:0.35s}
        .sk-tag:nth-child(8){animation-delay:0.4s}
        .sk-tag:nth-child(9){animation-delay:0.45s}
      `}</style>

      <div
        className="min-h-screen bg-[#f0ece4] flex flex-col"
        style={{
          fontFamily: "'Lexend',sans-serif",
          backgroundImage:'linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)',
          backgroundSize:'40px 40px',
        }}
      >
        {/* TOPBAR */}
        <div className="flex items-stretch h-[52px] border-b-[3px] border-black bg-[#f0ece4] flex-shrink-0">
          <div className="px-6 border-r-[3px] border-black flex items-center bg-black">
            <span className="text-[#f0ce32] text-xl tracking-[0.12em]" style={{fontFamily:"'Bebas Neue',sans-serif"}}>OMM</span>
          </div>
          <div className="flex-1 flex items-center px-4 md:px-6">
            
          </div>
        </div>

        {/* HEADER STRIP */}
        <div className="border-b-[3px] border-black flex items-stretch">
          <div className="bg-[#f0ce32] border-r-[3px] border-black px-6 md:px-12 py-6 flex items-center">
            <div className="text-[48px] md:text-[72px] leading-none text-black tracking-[0.02em]" style={{fontFamily:"'Bebas Neue',sans-serif"}}>SKILLS<br/><span className="text-[#0d0d0d]/20">& STACK</span></div>
          </div>
          <div className="flex-1 flex flex-col justify-end p-6 md:p-8">
            <div className="text-[9px] tracking-[0.25em] text-black/35 mb-3" style={{fontFamily:"'Fragment Mono',monospace"}}>// CORE LANGUAGES</div>
            <div className="flex flex-wrap gap-2">
              {LANGS.map(lang => (
                <span key={lang} className="text-[12px] md:text-[13px] px-3 py-1 border-[3px] border-black text-black tracking-[0.08em] hover:bg-black hover:text-[#f0ce32] transition-all duration-150 cursor-default" style={{fontFamily:"'Fragment Mono',monospace"}}>{lang}</span>
              ))}
            </div>
          </div>
        </div>

        {/* SKILLS GRID */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
          {SKILL_GROUPS.map((group, i) => (
            <div
              key={group.id}
              className={`sk-block border-b-[3px] border-black p-7 md:p-10 cursor-default transition-colors duration-200 ${[0,2].includes(i)?'md:border-r-[3px]':''} ${hovered===group.id?'bg-black':'hover:bg-black/[0.02]'}`}
              onMouseEnter={() => setHovered(group.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-baseline gap-4 mb-1">
                <span className={`text-[60px] md:text-[80px] leading-none tracking-[0.04em] transition-colors ${hovered===group.id?'text-[#f0ce32]':'text-black'}`} style={{fontFamily:"'Bebas Neue',sans-serif"}}>{group.label}</span>
                <span className={`text-[20px] md:text-[28px] transition-colors ${hovered===group.id?'text-[#f0ce32]/30':'text-black/15'}`} style={{fontFamily:"'Bebas Neue',sans-serif"}}>{group.index}</span>
              </div>
              <p className={`text-[11px] mb-6 font-light transition-colors ${hovered===group.id?'text-white/40':'text-black/40'}`}>{group.desc}</p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill,j) => (
                  <span
                    key={skill}
                    className={`sk-tag text-[11px] px-3 py-1.5 border-[2px] tracking-[0.06em] transition-all duration-150 cursor-default ${hovered===group.id?'border-[#f0ce32]/40 text-[#f0ce32]/80 hover:bg-[#f0ce32] hover:text-black hover:border-[#f0ce32]':'border-black/20 text-black/60 hover:bg-black hover:text-[#f0ce32] hover:border-black'}`}
                    style={{fontFamily:"'Fragment Mono',monospace", animationDelay:`${j*0.04}s`}}
                  >{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </>
  );
};

export default SkillsPage;