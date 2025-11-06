import React, { useState } from 'react';
interface LeadershipPageProps {
  openContactWindow?: () => void;
}

export const LeadershipPage = ({ openContactWindow }: LeadershipPageProps) => {
  const [activeSection, setActiveSection] = useState('all');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedPhilosophy, setExpandedPhilosophy] = useState(false);

  const leadershipData = {
    technical: {
      title: 'Technical Leadership',
      icon: '👥',
      color: 'blue',
      items: [
        {
          type: 'Hackathon Leadership',
          achievements: [
            {
              title: 'State-level Winner',
              event: 'Anveshana Hack for Hire 2024',
              description: 'Led solution development for my team, which won among 48 competing teams',
              impact: 'Team Victory',
              level: 95
            },
            {
              title: 'Design Champion',
              event: 'RRCE Web Designing Competition',
              description: 'Demonstrated ability to deliver under tight deadlines',
              impact: 'Competition Winner',
              level: 90
            }
          ]
        },
        {
          type: 'Independent Project Development',
          achievements: [
            {
              title: 'AI/ML Solutions',
              event: 'Complex Development Leadership',
              description: 'Led development of complex AI/ML solutions independently',
              impact: 'Innovation Driver',
              level: 92
            },
            {
              title: 'Collaborative Platforms',
              event: 'Development Architecture',
              description: 'Designed and implemented collaborative development platforms',
              impact: 'Platform Creator',
              level: 88
            },
            {
              title: 'Enterprise Applications',
              event: 'Modern Architecture',
              description: 'Created enterprise-grade applications with modern architectures',
              impact: 'Enterprise Solutions',
              level: 85
            }
          ]
        },
        {
          type: 'Innovation in AI/ML',
          achievements: [
            {
              title: 'Autonomous Gaming AI',
              event: 'Advanced RL Algorithms',
              description: 'Developed autonomous gaming AI using advanced RL algorithms',
              impact: 'AI Innovation',
              level: 88
            },
            {
              title: 'Custom Game Environments',
              event: 'AI Training Systems',
              description: 'Created custom game environments for AI training',
              impact: 'Environment Design',
              level: 82
            },
            {
              title: 'Real-time AI Systems',
              event: 'Decision Making',
              description: 'Implemented real-time AI decision-making systems',
              impact: 'System Architecture',
              level: 86
            }
          ]
        }
      ]
    },
    impact: {
      title: 'Technical Impact',
      icon: '🌟',
      color: 'green',
      highlights: [
        {
          title: 'Production-Ready Tools',
          description: 'Developed production-ready collaborative development tools',
          metric: '100%',
          category: 'Development'
        },
        {
          title: 'Innovative AI Solutions',
          description: 'Created innovative AI solutions for gaming environments',
          metric: '95%',
          category: 'Innovation'
        },
        {
          title: 'Enterprise Applications',
          description: 'Built enterprise applications used in real-world scenarios',
          metric: '90%',
          category: 'Impact'
        },
        {
          title: 'Best Practices',
          description: 'Contributed to modern web development best practices',
          metric: '92%',
          category: 'Standards'
        }
      ]
    },
    collaboration: {
      title: 'Collaboration & Mentorship',
      icon: '🤝',
      color: 'purple',
      areas: [
        {
          skill: 'Agile Team Collaboration',
          context: 'Professional environments',
          strength: 90
        },
        {
          skill: 'Knowledge Sharing',
          context: 'Project documentation',
          strength: 85
        },
        {
          skill: 'Peer Collaboration',
          context: 'Academic and professional settings',
          strength: 88
        }
      ]
    }
  };

  const philosophy = {
    quote: "Great leaders don't create followers, they create more leaders. I believe in empowering others through knowledge sharing and collaborative problem solving.",
    keywords: ['leaders', 'empowering', 'knowledge sharing', 'collaborative', 'problem solving']
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { gradient: string; text: string; bg: string; border: string }> = {
      blue: { 
        gradient: 'from-blue-500/20 to-cyan-500/20',
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30'
      },
      purple: { 
        gradient: 'from-purple-500/20 to-pink-500/20',
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30'
      },
      green: { 
        gradient: 'from-emerald-500/20 to-teal-500/20',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30'
      },
      orange: { 
        gradient: 'from-orange-500/20 to-red-500/20',
        text: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/30'
      }
    };
    return colorMap[color];
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Header */}
        <div className="relative rounded-2xl shadow-2xl p-12 mb-8 overflow-hidden backdrop-blur-sm border border-slate-700/50">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-indigo-600/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Leadership & Innovation
            </h1>
            <p className="text-sm mb-6 text-slate-300">Driving change through technical excellence and collaborative leadership</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 px-4 py-2 rounded-full">
                <span className="font-semibold text-slate-200">🏆 State Winner</span>
              </div>
              <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 px-4 py-2 rounded-full">
                <span className="font-semibold text-slate-200">🚀 Innovation Leader</span>
              </div>
              <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 px-4 py-2 rounded-full">
                <span className="font-semibold text-slate-200">🤝 Team Builder</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50 p-6 mb-8">
        <h2 className="text-xl font-semibold text-slate-100 mb-4 text-center">Filter by Category</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveSection('all')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeSection === 'all' 
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/50 text-slate-100 shadow-lg' 
                  : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
              }`}
            >
              🌟 All Leadership
            </button>
            <button
              onClick={() => setActiveSection('technical')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeSection === 'technical' 
                  ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/50 text-slate-100 shadow-lg' 
                  : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
              }`}
            >
              👥 Technical Leadership
            </button>
            <button
              onClick={() => setActiveSection('impact')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeSection === 'impact' 
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/50 text-slate-100 shadow-lg' 
                  : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
              }`}
            >
              🌟 Technical Impact
            </button>
            <button
              onClick={() => setActiveSection('collaboration')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeSection === 'collaboration' 
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 text-slate-100 shadow-lg' 
                  : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
              }`}
            >
              🤝 Collaboration
            </button>
          </div>
        </div>

        {/* Technical Leadership Section */}
        {(activeSection === 'all' || activeSection === 'technical') && (
          <div className="mb-8 animate-fadeIn">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50 p-8">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 p-4 rounded-2xl mr-6">
                  <span className="text-3xl">👥</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-100">Technical Leadership</h2>
                  <p className="text-slate-400">Leading teams and projects to victory</p>
                </div>
              </div>

              {/* Timeline Layout */}
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400/50 to-blue-600/50 rounded-full"></div>
                
                {leadershipData.technical.items.map((item, itemIndex) => (
                  <div key={item.type} className="relative mb-12">
                    <div className="absolute left-6 w-5 h-5 bg-blue-500 rounded-full border-4 border-slate-800 shadow-lg"></div>
                    
                    <div className="ml-20">
                      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 mb-4">
                        <h3 className="text-xl font-bold text-blue-400 mb-4">{item.type}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {item.achievements.map((achievement, index) => (
                            <div
                              key={achievement.title}
                              className={`relative p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                                hoveredItem === `tech-${itemIndex}-${index}`
                                  ? 'border-blue-500/50 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 shadow-lg shadow-blue-500/10'
                                  : 'border-slate-600/50 bg-slate-700/30 hover:border-slate-500/50'
                              }`}
                              onMouseEnter={() => setHoveredItem(`tech-${itemIndex}-${index}`)}
                              onMouseLeave={() => setHoveredItem(null)}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-slate-100 text-sm">{achievement.title}</h4>
                                
                              </div>
                              <p className="text-xs text-blue-400 font-semibold mb-2">{achievement.event}</p>
                              <p className="text-xs text-slate-400 mb-3">{achievement.description}</p>
                              <div className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-1 rounded-full inline-block mb-2">
                                {achievement.impact}
                              </div>
                              
                              {/* Progress Bar */}
                              <div className="w-full bg-slate-700/50 rounded-full h-1.5 mt-2">
                                <div 
                                  className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000"
                                  style={{ 
                                    width: hoveredItem === `tech-${itemIndex}-${index}` ? `${achievement.level}%` : '0%'
                                  }}
                                />
                              </div>
                              
                              {hoveredItem === `tech-${itemIndex}-${index}` && (
                                <div className="absolute -top-2 -right-2 bg-amber-500 text-amber-900 text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                                  🏆
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Technical Impact Section */}
{(activeSection === 'all' || activeSection === 'impact') && (
  <div className="mb-8 animate-fadeIn">
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50 p-8">
      <div className="flex items-center mb-8">
        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 p-4 rounded-2xl mr-6">
          <span className="text-3xl">🌟</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Technical Impact</h2>
          <p className="text-slate-400">Measurable outcomes and achievements</p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {leadershipData.impact.highlights.map((highlight, index) => (
          <div
            key={highlight.title}
            className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
              hoveredItem === `impact-${index}`
                ? 'border-emerald-500/50 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 shadow-2xl scale-105'
                : 'border-slate-700/50 bg-slate-700/30 hover:border-slate-600/50'
            } ${index % 2 === 0 ? 'md:mt-0' : 'md:mt-8'}`}
            onMouseEnter={() => setHoveredItem(`impact-${index}`)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                hoveredItem === `impact-${index}`
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-slate-700/50 text-slate-300 border-slate-600/50'
              }`}>
                {highlight.category}
              </div>
              <div className={`text-2xl font-bold ${
                hoveredItem === `impact-${index}` ? 'text-emerald-400' : 'text-emerald-500'
              }`}>
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-3">{highlight.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{highlight.description}</p>
            
            {hoveredItem === `impact-${index}` && (
              <div className="absolute -top-3 -right-3 bg-amber-500 text-amber-900 text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center animate-spin-slow">
                ⭐
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
)}

{/* Collaboration Section */}
{(activeSection === 'all' || activeSection === 'collaboration') && (
  <div className="mb-8 animate-fadeIn">
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50 p-8">
      <div className="flex items-center mb-8">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 p-4 rounded-2xl mr-6">
          <span className="text-3xl">🤝</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Collaboration & Mentorship</h2>
          <p className="text-slate-400">Building stronger teams and communities</p>
        </div>
      </div>

      {/* Circular Skill Layout */}
      <div className="relative flex justify-center items-center min-h-96">
        <div className="absolute w-64 h-64 border-4 border-purple-500/30 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🤝</div>
            <div className="font-bold text-purple-400">Collaboration</div>
            <div className="text-sm text-purple-500">Core</div>
          </div>
        </div>

        {leadershipData.collaboration.areas.map((area, index) => {
          const angle = (index * 120) - 90;
          const radius = 180;
          const x = Math.cos(angle * Math.PI / 180) * radius;
          const y = Math.sin(angle * Math.PI / 180) * radius;

          return (
            <div
              key={area.skill}
              className={`absolute w-40 p-4 rounded-xl border transition-all duration-300 cursor-pointer transform hover:scale-110 ${
                hoveredItem === `collab-${index}`
                  ? 'border-purple-500/50 bg-gradient-to-br from-purple-500/20 to-pink-500/20 shadow-2xl scale-110 z-10'
                  : 'border-slate-700/50 bg-slate-800/50 hover:border-slate-600/50'
              }`}
              style={{
                transform: `translate(${x}px, ${y}px) ${hoveredItem === `collab-${index}` ? 'scale(1.1)' : 'scale(1)'}`,
                zIndex: hoveredItem === `collab-${index}` ? 10 : 1
              }}
              onMouseEnter={() => setHoveredItem(`collab-${index}`)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <h4 className="font-bold text-sm text-slate-100 mb-2">{area.skill}</h4>
              <p className="text-xs text-slate-400 mb-2">{area.context}</p>
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-1000"
                  style={{ 
                    width: hoveredItem === `collab-${index}` ? `${area.strength}%` : '0%'
                  }}
                />
              </div>
              <div className="text-center mt-2">
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
)}

        {/* Philosophy Section */}
        <div className="relative rounded-2xl p-8 mb-8 overflow-hidden backdrop-blur-sm border border-slate-700/50">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full -translate-y-48 translate-x-48"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-4 text-slate-100">💡 Leadership Philosophy</h2>
              <button
                onClick={() => setExpandedPhilosophy(!expandedPhilosophy)}
                className="bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/50 text-slate-200 px-6 py-3 rounded-full transition-all"
              >
                {expandedPhilosophy ? '📖 Collapse Quote' : '✨ Reveal Philosophy'}
              </button>
            </div>

            {expandedPhilosophy && (
              <div className="max-w-4xl mx-auto text-center">
                <div className="text-6xl mb-4">💭</div>
                <blockquote className="text-xl leading-relaxed italic mb-6 text-slate-300">
                  "{philosophy.quote}"
                </blockquote>
                {/* <div className="flex flex-wrap justify-center gap-3">
                  {philosophy.keywords.map((keyword, index) => (
                    <span
                      key={keyword}
                      className="bg-slate-700/50 border border-slate-600/50 px-4 py-2 rounded-full font-semibold text-slate-300 hover:bg-slate-700/70 transition-all cursor-default"
                      style={{
                       
                        animation: 'fadeIn 0.5s ease-out forwards ${index * 200}ms'
                      }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div> */}
              </div>
            )}
          </div>
        </div>

        

        {/* Call to Action */}
        <div className="relative rounded-xl p-8 overflow-hidden backdrop-blur-sm border border-slate-700/50 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-slate-100">Ready to Lead Together? 🚀</h2>
            <p className="text-lg mb-6 text-slate-300">
              Let's combine our leadership strengths to create something extraordinary and impactful!
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-orange-600 hover:to-red-700 shadow-lg hover:shadow-orange-500/20 transition-all border border-orange-400/30"
            onClick={openContactWindow}>
              Start Our Journey! 🌟
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};