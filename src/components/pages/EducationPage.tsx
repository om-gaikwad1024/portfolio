import React, { useState } from 'react';
interface EducationPageProps {
  openContactWindow?: () => void;
}
const DEGREES = [
  {
    abbr:'MCA', full:'Master of Computer Applications',
    institution:'PES University', period:'2023 – 2025',
    spec:'Data Analytics', focus:'Full Stack Development · Data Science · AI/ML',
    index:'01', active: true,
  },
  {
    abbr:'BCA', full:'Bachelor of Computer Applications',
    institution:'NRI Institute', period:'2020 – 2023',
    spec:'Computer Science', focus:'Foundation · Programming · Algorithms',
    index:'02', active: false,
  },
];

const SPECIALIZATIONS = [
  'Advanced Reinforcement Learning & AI',
  'Enterprise Application Development',
  'Modern Web Development Frameworks',
  'Data Analytics and Visualization',
  'SharePoint Framework (SPFx)',
  'Cloud & Microservices Architecture',
];

export const EducationPage = ( { openContactWindow }: EducationPageProps) => {
  const [hovered, setHovered] = useState<string|null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fragment+Mono:ital@0;1&family=Lexend:wght@200;300;400;500&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
        @keyframes fadeRight{from{opacity:0;transform:translateX(-20px);}to{opacity:1;transform:translateX(0);}}
        .ed-card{animation:fadeUp 0.5s ease both;}
        .ed-card:nth-child(1){animation-delay:0.1s}
        .ed-card:nth-child(2){animation-delay:0.22s}
        .ed-spec{animation:fadeRight 0.4s ease both;}
        .ed-spec:nth-child(1){animation-delay:0.3s}
        .ed-spec:nth-child(2){animation-delay:0.35s}
        .ed-spec:nth-child(3){animation-delay:0.4s}
        .ed-spec:nth-child(4){animation-delay:0.45s}
        .ed-spec:nth-child(5){animation-delay:0.5s}
        .ed-spec:nth-child(6){animation-delay:0.55s}
      `}</style>

      <div
        className="min-h-screen bg-[#f0ece4] flex flex-col"
        style={{
          fontFamily:"'Lexend',sans-serif",
          backgroundImage:'linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)',
          backgroundSize:'40px 40px',
        }}
      >
        {/* TOPBAR */}
        <div className="flex items-stretch h-[52px] border-b-[3px] border-black flex-shrink-0">
          <div className="px-6 border-r-[3px] border-black flex items-center bg-black">
            <span className="text-[#f0ce32] text-xl tracking-[0.12em]" style={{fontFamily:"'Bebas Neue',sans-serif"}}>OMM</span>
          </div>
          <div className="flex-1 flex items-center px-4 md:px-6">
            
          </div>
        </div>


        {/* HEADER */}
        <div className="border-b-[3px] border-black flex items-stretch flex-shrink-0">
          <div className="flex-1 flex items-end px-6 md:px-14 py-6 md:py-10 gap-4 md:gap-8">
            <div className="text-[56px] md:text-[88px] leading-none text-black tracking-[0.02em]" style={{fontFamily:"'Bebas Neue',sans-serif"}}>EDU<span className="text-black/15">CATION</span></div>
          </div>
          <div className="border-l-[3px] border-black bg-[#f0ce32] px-6 md:px-10 flex flex-col justify-center">
            <div className="text-[9px] tracking-[0.2em] text-black/50 mb-1" style={{fontFamily:"'Fragment Mono',monospace"}}>// YEARS STUDIED</div>
            <div className="text-[40px] md:text-[52px] leading-none text-black" style={{fontFamily:"'Bebas Neue',sans-serif"}}>5+</div>
          </div>
        </div>

        {/* DEGREE CARDS */}
        <div className="border-b-[3px] border-black grid grid-cols-1 md:grid-cols-2">
          {DEGREES.map(deg => (
            <div
              key={deg.abbr}
              className={`ed-card border-b-[3px] md:border-b-0 md:border-r-[3px] last:border-r-0 border-black p-7 md:p-10 cursor-default relative overflow-hidden transition-colors duration-200 group ${hovered===deg.abbr?'bg-black':''}`}
              onMouseEnter={() => setHovered(deg.abbr)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={`absolute top-4 right-5 text-[80px] md:text-[120px] leading-none pointer-events-none select-none transition-colors ${hovered===deg.abbr?'text-[#f0ce32]/10':'text-black/[0.05]'}`} style={{fontFamily:"'Bebas Neue',sans-serif"}}>{deg.index}</div>
              <div className={`text-[9px] tracking-[0.2em] mb-3 transition-colors ${hovered===deg.abbr?'text-[#f0ce32]/50':'text-black/40'}`} style={{fontFamily:"'Fragment Mono',monospace"}}>🎓 {deg.period}</div>
              <div className={`text-[56px] md:text-[72px] leading-none tracking-[0.02em] mb-2 transition-colors ${hovered===deg.abbr?'text-[#f0ce32]':'text-black'}`} style={{fontFamily:"'Bebas Neue',sans-serif"}}>{deg.abbr}</div>
              <div className={`text-[13px] md:text-[15px] font-light mb-1 transition-colors ${hovered===deg.abbr?'text-white/80':'text-black/80'}`}>{deg.full}</div>
              <div className={`text-[11px] tracking-[0.06em] mb-4 transition-colors ${hovered===deg.abbr?'text-[#f0ce32]/70':'text-black/50'}`} style={{fontFamily:"'Fragment Mono',monospace"}}>{deg.institution}</div>
              <div className="flex flex-col gap-1.5">
                <div className={`text-[9px] tracking-[0.15em] transition-colors ${hovered===deg.abbr?'text-[#f0ce32]/40':'text-black/30'}`} style={{fontFamily:"'Fragment Mono',monospace"}}>└── SPECIALIZATION: {deg.spec}</div>
                <div className={`text-[9px] tracking-[0.15em] transition-colors ${hovered===deg.abbr?'text-[#f0ce32]/40':'text-black/30'}`} style={{fontFamily:"'Fragment Mono',monospace"}}>└── FOCUS: {deg.focus}</div>
              </div>
              {deg.active && (
                <div className={`mt-5 inline-flex items-center gap-2 text-[9px] tracking-[0.15em] px-3 py-1 border transition-colors ${hovered===deg.abbr?'border-[#f0ce32]/40 text-[#f0ce32]/70':'border-black/20 text-black/40'}`} style={{fontFamily:"'Fragment Mono',monospace"}}>
                  <span className={`w-1.5 h-1.5 rounded-full ${hovered===deg.abbr?'bg-[#f0ce32]':'bg-black/40'} animate-pulse`} />
                  CURRENT
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SPECIALIZATIONS */}
        <div className="p-6 md:p-12">
          <div className="text-[9px] tracking-[0.25em] text-black/35 mb-5" style={{fontFamily:"'Fragment Mono',monospace"}}>// SPECIALIZED LEARNING · 📚</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {SPECIALIZATIONS.map((spec, i) => (
              <div
                key={spec}
                className="ed-spec group flex items-center gap-4 border-[3px] border-b-0 last:border-b-[3px] border-r-0 md:border-r-[3px] border-black p-4 md:p-5 hover:bg-black transition-colors cursor-default"
              >
                <span className="text-[#f0ce32] group-hover:text-[#f0ce32] text-[10px]" style={{fontFamily:"'Fragment Mono',monospace"}}>▸</span>
                <span className="text-[12px] md:text-[13px] font-light text-black/70 group-hover:text-white/70 transition-colors">{spec}</span>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </>
  );
};

export default EducationPage;