import React, { useState } from 'react';



interface LeadershipPageProps {
  openContactWindow?: () => void;
}


const ACHIEVEMENTS = [
  {
    id:'hackathon', tag:'HACKATHON', icon:'',
    title:'State-Level Winner',
    org:'Anveshana Hack for Hire',
    detail:'Led solution development, winning among 48 competing teams. Delivered a working product under tight deadline pressure.',
    size:'large',
  },
  {
    id:'webdesign', tag:'COMPETITION', icon:'',
    title:'Web Design Champion',
    org:'RRCE Web Designing Competition',
    detail:'Won the web design competition demonstrating front-end creativity and technical execution.',
    size:'small',
  },
  {
    id:'aiml', tag:'INNOVATION', icon:'',
    title:'AI/ML Pioneer',
    org:'Independent Research',
    detail:'Developed autonomous gaming AI using advanced RL algorithms. Created custom game environments for AI training.',
    size:'small',
  },
  {
    id:'enterprise', tag:'DEVELOPMENT', icon:'',
    title:'Enterprise Builder',
    org:'Production Systems',
    detail:'Designed and implemented collaborative development platforms and enterprise-grade applications with modern architectures.',
    size:'medium',
  },
  {
    id:'agile', tag:'COLLABORATION', icon:'',
    title:'Agile Collaborator',
    org:'Professional Environments',
    detail:'Agile team collaboration · Knowledge sharing through documentation · Peer collaboration in academic and professional settings.',
    size:'medium',
  },
];

export const LeadershipPage = ({ openContactWindow }: LeadershipPageProps) => {
  const [hovered, setHovered] = useState<string|null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fragment+Mono:ital@0;1&family=Lexend:wght@200;300;400;500&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 0 0 rgba(240,206,50,0);}50%{box-shadow:0 0 20px 4px rgba(240,206,50,0.12);}}
        .ld-card{animation:fadeUp 0.5s ease both;}
        .ld-card:nth-child(1){animation-delay:0.05s}
        .ld-card:nth-child(2){animation-delay:0.12s}
        .ld-card:nth-child(3){animation-delay:0.19s}
        .ld-card:nth-child(4){animation-delay:0.26s}
        .ld-card:nth-child(5){animation-delay:0.33s}
        .ld-glow{animation:glowPulse 2.5s ease-in-out infinite;}
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

        {/* HERO */}
        <div className="border-b-[3px] border-[#f0ce32]/20 flex flex-col md:flex-row items-stretch">
          <div className="flex-1 px-6 md:px-14 py-8 md:py-12">
            <div className="text-[9px] tracking-[0.25em] text-[#f0ce32]/40 mb-3" style={{fontFamily:"'Fragment Mono',monospace"}}>// LEADERSHIP & INNOVATION</div>
            <div className="text-[60px] md:text-[96px] leading-[0.88] text-white tracking-[0.02em]" style={{fontFamily:"'Bebas Neue',sans-serif"}}>IMPACT<br/><span className="text-[#f0ce32]">&</span><br/>LEAD</div>
          </div>
          <div className="border-t-[3px] md:border-t-0 md:border-l-[3px] border-[#f0ce32]/20 flex flex-col justify-between p-6 md:p-10 md:w-56">
            {[
              {num:'48', label:'TEAMS COMPETED'},
              {num:'5+', label:'PROJECTS BUILT'},
              {num:'2', label:'INTERNSHIPS'},
            ].map(stat => (
              <div key={stat.label} className="py-3 border-b border-[#f0ce32]/10 last:border-b-0">
                <div className="text-[32px] md:text-[40px] leading-none text-[#f0ce32]" style={{fontFamily:"'Bebas Neue',sans-serif"}}>{stat.num}</div>
                <div className="text-[9px] tracking-[0.15em] text-white/30 mt-1" style={{fontFamily:"'Fragment Mono',monospace"}}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ACHIEVEMENT CARDS — BENTO GRID */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 border-b-[3px] border-[#f0ce32]/20">

          {/* LARGE CARD — SPANS 2 COLS */}
          <div
            className={`ld-card ld-glow md:col-span-2 border-b-[3px] md:border-b-0 md:border-r-[3px] border-[#f0ce32]/20 p-7 md:p-10 flex flex-col justify-between transition-colors duration-200 ${hovered==='hackathon'?'bg-[#f0ce32]/5':''}`}
            onMouseEnter={() => setHovered('hackathon')}
            onMouseLeave={() => setHovered(null)}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[9px] tracking-[0.2em] text-[#f0ce32]/50 border border-[#f0ce32]/30 px-2 py-1" style={{fontFamily:"'Fragment Mono',monospace"}}>🏆 HACKATHON</span>
                <span className="text-[9px] tracking-[0.12em] text-white/20" style={{fontFamily:"'Fragment Mono',monospace"}}>01</span>
              </div>
              <div className="text-[44px] md:text-[64px] leading-none text-white tracking-[0.02em] mb-3" style={{fontFamily:"'Bebas Neue',sans-serif"}}>STATE-LEVEL<br/><span className="text-[#f0ce32]">WINNER</span></div>
              <div className="text-[11px] tracking-[0.08em] text-[#f0ce32]/60 mb-4" style={{fontFamily:"'Fragment Mono',monospace"}}>Anveshana Hack for Hire</div>
              <p className="text-[13px] font-light text-white/45 leading-[1.8] max-w-md">Led solution development for my team, winning among 48 competing teams. Delivered a working product under tight deadline pressure.</p>
            </div>
            <div className="text-[9px] tracking-[0.15em] text-[#f0ce32]/40 mt-8" style={{fontFamily:"'Fragment Mono',monospace"}}>↗ TEAM LEADERSHIP · RAPID DELIVERY · PROBLEM SOLVING</div>
          </div>

          {/* RIGHT COLUMN — 2 SMALL CARDS */}
          <div className="flex flex-col">
            {[ACHIEVEMENTS[1], ACHIEVEMENTS[2]].map((ach, i) => (
              <div
                key={ach.id}
                className={`ld-card border-b-[3px] last:border-b-0 border-[#f0ce32]/20 p-6 md:p-7 flex flex-col justify-between transition-colors duration-200 ${hovered===ach.id?'bg-[#f0ce32]/5':''}`}
                style={{flex:1, animationDelay: `${0.12 + i*0.07}s`}}
                onMouseEnter={() => setHovered(ach.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div>
                  <div className="text-[9px] tracking-[0.15em] text-[#f0ce32]/40 border border-[#f0ce32]/25 px-2 py-1 inline-block mb-4" style={{fontFamily:"'Fragment Mono',monospace"}}>{ach.icon} {ach.tag}</div>
                  <div className="text-[24px] md:text-[28px] leading-none text-white mb-2" style={{fontFamily:"'Bebas Neue',sans-serif"}}>{ach.title}</div>
                  <div className="text-[10px] text-[#f0ce32]/50 mb-3" style={{fontFamily:"'Fragment Mono',monospace"}}>{ach.org}</div>
                  <p className="text-[11px] font-light text-white/35 leading-[1.7]">{ach.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM ROW — 2 MEDIUM CARDS */}
          {[ACHIEVEMENTS[3], ACHIEVEMENTS[4]].map((ach, i) => (
            <div
              key={ach.id}
              className={`ld-card border-t-[3px] md:border-r-[3px] last:border-r-0 border-[#f0ce32]/20 p-6 md:p-8 transition-colors duration-200 ${hovered===ach.id?'bg-[#f0ce32]/5':''}`}
              style={{animationDelay: `${0.26 + i*0.07}s`}}
              onMouseEnter={() => setHovered(ach.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="text-[9px] tracking-[0.15em] text-[#f0ce32]/40 border border-[#f0ce32]/25 px-2 py-1 inline-block mb-4" style={{fontFamily:"'Fragment Mono',monospace"}}>{ach.icon} {ach.tag}</div>
              <div className="text-[24px] md:text-[32px] leading-none text-white mb-2" style={{fontFamily:"'Bebas Neue',sans-serif"}}>{ach.title}</div>
              <div className="text-[10px] text-[#f0ce32]/50 mb-3" style={{fontFamily:"'Fragment Mono',monospace"}}>{ach.org}</div>
              <p className="text-[12px] font-light text-white/35 leading-[1.7]">{ach.detail}</p>
            </div>
          ))}
        </div>

        {/* PHILOSOPHY QUOTE */}
        <div className="bg-[#f0ce32] border-b-[3px] border-black px-6 md:px-14 py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
          <div className="text-[40px] md:text-[52px] leading-none text-black/20" style={{fontFamily:"'Bebas Neue',sans-serif"}}>"</div>
          <div>
            <p className="text-[16px] md:text-[20px] text-black font-light leading-[1.6] max-w-2xl italic">
              Great leaders don't create followers, they create more leaders. I believe in empowering others through knowledge sharing and collaborative problem solving.
            </p>
            <div className="text-[10px] tracking-[0.2em] text-black/50 mt-3" style={{fontFamily:"'Fragment Mono',monospace"}}>—  PHILOSOPHY</div>
          </div>
        </div>

       
      </div>
    </>
  );
};

export default LeadershipPage;