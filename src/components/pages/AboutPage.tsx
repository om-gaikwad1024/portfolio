import React, { useState, useEffect } from 'react';

interface AboutPageProps {
  openContactWindow?: () => void;
}

export const AboutPage = ({ openContactWindow }: AboutPageProps) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fragment+Mono:ital@0;1&family=Lexend:wght@200;300;400;500&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .ab-fadein { animation: fadeUp 0.5s ease both; }
        .ab-fadein-1 { animation: fadeUp 0.5s 0.1s ease both; }
        .ab-fadein-2 { animation: fadeUp 0.5s 0.2s ease both; }
        .ab-fadein-3 { animation: fadeUp 0.5s 0.3s ease both; }
      `}</style>
      <div
        className="min-h-screen flex flex-col bg-[#f0ece4]"
        style={{
          fontFamily: "'Lexend', sans-serif",
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        {/* TOPBAR */}
        <div className="flex items-stretch h-[52px] border-b-[3px] border-black bg-[#f0ece4] flex-shrink-0">
          <div className="px-6 border-r-[3px] border-black flex items-center bg-black">
            <span className="text-[#f0ce32] text-xl tracking-[0.12em]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>OMM</span>
          </div>
          <div className="flex-1 flex items-center px-4 md:px-6">

          </div>
          <div className="px-4 md:px-6 border-l-[3px] border-black flex items-center text-[20px] md:text-[22px] tracking-[0.1em]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{time}</div>
        </div>

        {/* BODY */}
        <div className="flex-1 flex flex-col md:grid md:grid-cols-[340px_1fr]">

          {/* HERO LEFT */}
          <div className="relative border-b-[3px] md:border-b-0 md:border-r-[3px] border-black bg-[#f0ce32] p-8 md:p-12 flex flex-col justify-between overflow-hidden min-h-[280px] ab-fadein">
            <div className="relative z-10">
              <div className="text-[10px] tracking-[0.2em] uppercase text-black/55 mb-4" style={{ fontFamily: "'Fragment Mono',monospace" }}>// portfolio.v2 · about</div>
              <div className="text-[68px] md:text-[80px] leading-[0.88] text-black tracking-[0.02em]" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>OM<br />GAIKWAD</div>
              <div className="text-[11px] tracking-[0.15em] uppercase text-black/65 mt-4 leading-[1.7]" style={{ fontFamily: "'Fragment Mono',monospace" }}>
                Full Stack Engineer<br />Enterprise Systems<br />AI/ML Integration
              </div>
              <button
                onClick={openContactWindow}
                className="inline-block mt-7 bg-black text-[#f0ce32] text-[15px] tracking-[0.18em] px-6 py-3 border-[3px] border-black hover:bg-[#f0ce32] hover:text-black transition-all duration-150 cursor-pointer"
                style={{ fontFamily: "'Bebas Neue',sans-serif" }}
              >
                LET'S TALK ↗
              </button>
            </div>
            <div
              className="absolute bottom-[-16px] right-[-12px] text-[160px] md:text-[200px] leading-[0.8] text-black/[0.06] pointer-events-none select-none"
              style={{ fontFamily: "'Bebas Neue',sans-serif" }}
            >01</div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col">
            <div className="flex-1 border-b-[3px] border-black p-8 md:p-12 flex flex-col gap-8 ab-fadein-1">
              <div>
                <div className="text-[9px] tracking-[0.3em] uppercase text-black/35 mb-3" style={{ fontFamily: "'Fragment Mono',monospace" }}>// who i am</div>
                <p className="text-[14px] md:text-[15px] font-light text-black/75 leading-[1.85] max-w-[560px]">
                  I build <strong className="font-medium text-black">scalable, user focused applications</strong> that solve real world problems. My journey started with curiosity and evolved through hackathons and collaborative projects, winning a{' '}
                  <strong className="font-medium text-black">state level hackathon</strong> proved I can turn ideas into impactful solutions under pressure. Today I specialize in{' '}
                  <strong className="font-medium text-black">enterprise grade applications</strong> and intelligent system integration, with a relentless focus on performance and experience.
                </p>
              </div>

              <div className="ab-fadein-2">
                <div className="text-[9px] tracking-[0.3em] uppercase text-black/35 mb-3" style={{ fontFamily: "'Fragment Mono',monospace" }}>// experience</div>
                <div>
                  {[
                    {
                      role: 'Full Stack & AI/ML Developer',
                      company: 'Freelance',
                      detail: 'Next.js 14 · Go · React Native · Claude API · MCP Server · PostgreSQL',
                      year: '2026',
                    },
                    {
                      role: 'React TypeScript & SPFx Developer',
                      company: 'Cubiclogics',
                      detail: 'React · TypeScript · SharePoint Framework · Azure OpenAI · Microsoft 365',
                      year: '2025',
                    },
                    {
                      role: 'Enterprise App Developer',
                      company: 'Oneshell',
                      detail: 'React · Spring Boot · Full Stack · CRM · Agile',
                      year: '2025',
                    },
                  ].map((exp, i) => (
                    <div key={i} className="group border-[3px] border-black border-b-0 last:border-b-[3px] p-5 md:p-6 flex items-start justify-between gap-4 hover:bg-black transition-colors duration-150 cursor-default">
                      <div>
                        <div className="text-[20px] md:text-[22px] tracking-[0.06em] text-black group-hover:text-[#f0ce32] transition-colors" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{exp.role}</div>
                        <div className="text-[10px] tracking-[0.12em] uppercase text-black/50 group-hover:text-[#f0ce32]/60 mt-1 transition-colors" style={{ fontFamily: "'Fragment Mono',monospace" }}>{exp.company}</div>
                        <div className="text-[12px] font-light text-black/55 group-hover:text-[#f0ce32]/50 mt-1.5 leading-[1.5] transition-colors">{exp.detail}</div>
                      </div>
                      <div className="text-[24px] md:text-[26px] text-black/15 group-hover:text-[#f0ce32] tracking-[0.05em] flex-shrink-0 transition-colors" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{exp.year}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SKILL TAGS STRIP */}
            <div className="grid grid-cols-2 md:grid-cols-4 ab-fadein-3">
              {[
                { cat: 'FRONTEND', items: 'Next.js · React Native · Three.js' },
                { cat: 'BACKEND', items: 'Go · Flask · Spring Boot · REST' },
                { cat: 'AI / ML', items: 'Claude API · MCP · XGBoost · PPO' },
                { cat: 'ENTERPRISE', items: 'SharePoint · Azure OpenAI · SPFx' },
              ].map(({ cat, items }, i) => (
                <div
                  key={cat}
                  className={`group p-4 md:p-5 flex flex-col gap-1.5 cursor-default hover:bg-black transition-colors duration-150 border-r-[3px] border-black last:border-r-0 ${i < 2 ? 'border-b-[3px] md:border-b-0' : ''}`}
                >
                  <div className="text-[15px] md:text-[16px] tracking-[0.1em] text-black group-hover:text-[#f0ce32] transition-colors" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>{cat}</div>
                  <div className="text-[9px] tracking-[0.1em] text-black/40 group-hover:text-[#f0ce32]/55 leading-[1.6] transition-colors" style={{ fontFamily: "'Fragment Mono',monospace" }}>{items}</div>
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>
    </>
  );
};

export default AboutPage;