import React, { useState } from 'react';

interface ExperiencePageProps {
  openContactWindow?: () => void;
}

const EXPERIENCES = [
  {
    id: 'cubiclogics',
    role: 'Software Developer Intern',
    company: 'Cubiclogics',
    type: 'On-Campus Internship',
    period: 'Mar 2025 – Aug 2025',
    year: '2025',
    stack: ['React','TypeScript','SPFx','SharePoint','Microsoft Fluent UI'],
    bullets: [
      'Developing SharePoint Framework (SPFx) solutions using React TypeScript for enterprise applications',
      'Building modern web parts and extensions for Microsoft SharePoint Online environments',
      'Implementing responsive UI components following Microsoft Fluent Design System principles',
    ],
    status: 'COMPLETED',
  },
  {
    id: 'oneshell',
    role: 'Enterprise App Developer',
    company: 'Oneshell',
    type: 'Off-Campus Internship',
    period: 'Jan 2025 – Feb 2025',
    year: '2025',
    stack: ['React','Java','Spring Boot','REST APIs','Agile'],
    bullets: [
      'Developed responsive front end components using React for enterprise web applications',
      'Supported backend development using Spring Boot for REST API creation and maintenance',
      'Collaborated with cross functional teams in an Agile environment to deliver production ready features',
    ],
    status: 'COMPLETED',
  },
];

export const ExperiencePage = ({ openContactWindow }: ExperiencePageProps) => {
  const [expanded, setExpanded] = useState<string|null>('cubiclogics');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fragment+Mono:ital@0;1&family=Lexend:wght@200;300;400;500&display=swap');
        @keyframes fadeLeft { from{opacity:0;transform:translateX(-24px);}to{opacity:1;transform:translateX(0);} }
        @keyframes expandDown { from{opacity:0;max-height:0;} to{opacity:1;max-height:500px;} }
        .ex-card { animation: fadeLeft 0.45s ease both; }
        .ex-card:nth-child(1){animation-delay:0.1s}
        .ex-card:nth-child(2){animation-delay:0.2s}
        .ex-expand { animation: expandDown 0.3s ease both; overflow:hidden; }
        .timeline-line { background: linear-gradient(to bottom, #f0ce32, #f0ce32 60%, transparent); }
      `}</style>

      <div className="min-h-screen bg-[#0d0d0d] flex flex-col" style={{fontFamily:"'Lexend',sans-serif"}}>

        {/* TOPBAR */}
        <div className="flex items-stretch h-[52px] border-b-[3px] border-[#f0ce32]/20 flex-shrink-0">
          <div className="px-6 border-r-[3px] border-[#f0ce32]/20 flex items-center bg-[#f0ce32]">
            <span className="text-black text-xl tracking-[0.12em]" style={{fontFamily:"'Bebas Neue',sans-serif"}}>OMM</span>
          </div>
          <div className="flex-1 flex items-center px-4 md:px-6">
            
          </div>
        </div>

        {/* HERO STRIP */}
        <div className="border-b-[3px] border-[#f0ce32]/20 flex items-center px-6 md:px-16 py-8 md:py-12 gap-6 md:gap-12">
          <div className="text-[64px] md:text-[100px] leading-none text-[#f0ce32] tracking-[0.02em]" style={{fontFamily:"'Bebas Neue',sans-serif"}}>WORK<br/><span className="text-white/10">HISTORY</span></div>
          <div className="hidden md:block w-px h-16 bg-[#f0ce32]/20" />
          <div className="hidden md:flex flex-col gap-1">
            <div className="text-[9px] tracking-[0.25em] text-[#f0ce32]/40" style={{fontFamily:"'Fragment Mono',monospace"}}>// TOTAL EXPERIENCE</div>
            <div className="text-[28px] text-white tracking-[0.04em]" style={{fontFamily:"'Bebas Neue',sans-serif"}}>2 POSITIONS</div>
            <div className="text-[11px] text-white/30 font-light">Enterprise · Full stack · React · Java</div>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="flex-1 flex">

          {/* SPINE */}
          <div className="hidden md:flex w-20 flex-col items-center pt-10 border-r-[3px] border-[#f0ce32]/15 flex-shrink-0">
            <div className="w-px flex-1 timeline-line" />
          </div>

          {/* CARDS */}
          <div className="flex-1 py-6 md:py-10 px-4 md:px-12 flex flex-col gap-0">
            {EXPERIENCES.map((exp, i) => (
              <div key={exp.id} className="relative">
                {/* DOT */}
                <div className="hidden md:block absolute -left-[52px] top-8 w-4 h-4 border-[3px] border-[#f0ce32] bg-[#0d0d0d] z-10" />

                <div
                  className={`ex-card border-[3px] border-[#f0ce32]/25 mb-0 border-b-0 last:border-b-[3px] transition-all duration-200 ${expanded===exp.id?'border-[#f0ce32]/60':''}`}
                >
                  {/* CARD HEADER */}
                  <div
                    className="flex items-start justify-between gap-4 p-6 md:p-8 cursor-pointer hover:bg-[#f0ce32]/3 transition-colors"
                    onClick={() => setExpanded(expanded===exp.id ? null : exp.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className={`text-[9px] tracking-[0.15em] px-2 py-0.5 border ${exp.status==='ACTIVE'?'border-[#f0ce32]/50 text-[#f0ce32]/80 bg-[#f0ce32]/5':'border-white/15 text-white/30'}`} style={{fontFamily:"'Fragment Mono',monospace"}}>{exp.status}</span>
                        <span className="text-[9px] text-[#f0ce32]/40 tracking-[0.1em]" style={{fontFamily:"'Fragment Mono',monospace"}}>{exp.type}</span>
                      </div>
                      <div className="text-[28px] md:text-[38px] leading-none text-white tracking-[0.03em] mb-1" style={{fontFamily:"'Bebas Neue',sans-serif"}}>{exp.role}</div>
                      <div className="text-[14px] md:text-[16px] text-[#f0ce32] tracking-[0.06em]" style={{fontFamily:"'Bebas Neue',sans-serif"}}>{exp.company}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-[28px] md:text-[36px] leading-none text-white/10 tracking-[0.04em]" style={{fontFamily:"'Bebas Neue',sans-serif"}}>{exp.year}</div>
                      <div className="text-[10px] text-white/30 tracking-[0.08em] mt-1" style={{fontFamily:"'Fragment Mono',monospace"}}>{exp.period}</div>
                      <div className={`text-[11px] mt-2 tracking-[0.08em] transition-colors ${expanded===exp.id?'text-[#f0ce32]':'text-white/20'}`} style={{fontFamily:"'Fragment Mono',monospace"}}>{expanded===exp.id?'▲ LESS':'▼ MORE'}</div>
                    </div>
                  </div>

                  {/* STACK TAGS */}
                  <div className="px-6 md:px-8 pb-4 flex flex-wrap gap-2 border-t border-[#f0ce32]/10">
                    {exp.stack.map(t => (
                      <span key={t} className="text-[9px] px-2 py-1 border border-[#f0ce32]/20 text-[#f0ce32]/50 tracking-[0.1em] mt-3" style={{fontFamily:"'Fragment Mono',monospace"}}>{t}</span>
                    ))}
                  </div>

                  {/* EXPANDABLE BULLETS */}
                  {expanded === exp.id && (
                    <div className="ex-expand border-t-[3px] border-[#f0ce32]/25 px-6 md:px-8 py-6">
                      <div className="text-[9px] tracking-[0.25em] text-[#f0ce32]/40 mb-4" style={{fontFamily:"'Fragment Mono',monospace"}}>// RESPONSIBILITIES</div>
                      <div className="flex flex-col gap-3">
                        {exp.bullets.map((b, j) => (
                          <div key={j} className="flex items-start gap-4">
                            <span className="text-[#f0ce32] flex-shrink-0 mt-0.5" style={{fontFamily:"'Fragment Mono',monospace"}}>→</span>
                            <span className="text-[13px] font-light text-white/55 leading-[1.7]">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </>
  );
};

export default ExperiencePage;