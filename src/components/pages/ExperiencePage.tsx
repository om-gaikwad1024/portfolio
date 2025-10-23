import React, { useState } from 'react';
interface ExpPageProps {
  openContactWindow?: () => void;
}
export const ExperiencePage = ({ openContactWindow }: ExpPageProps) => {
  const [hoveredExperience, setHoveredExperience] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const experiences = {
    cubiclogics: {
      company: 'Cubiclogics',
      role: 'React TypeScript Developer',
      type: 'On-Campus Internship',
      duration: 'March 2025 – Aug 2025',
      status: 'completed',
      icon: '🏢',
      color: 'blue',
      technologies: ['React', 'TypeScript', 'SPFx', 'SharePoint'],
      achievements: [
        {
          title: 'SharePoint Framework Solutions',
          description: 'Developing SPFx solutions using React TypeScript for enterprise applications',
          impact: 'Enterprise-grade solutions',
          level: 95
        },
        {
          title: 'Modern Web Components',
          description: 'Building modern web parts and extensions for Microsoft SharePoint Online',
          impact: 'Enhanced user experience',
          level: 90
        },
        {
          title: 'Fluent Design Implementation',
          description: 'Implementing responsive UI components following Microsoft Fluent Design System',
          impact: 'Consistent design standards',
          level: 88
        }
      ]
    },
    oneshell: {
      company: 'Oneshell',
      role: 'Full Stack Developer',
      type: 'Off-Campus Internship',
      duration: 'Jan 2025 – Feb 2025',
      status: 'completed',
      icon: '🚀',
      color: 'purple',
      technologies: ['React', 'Java', 'Spring Boot', 'REST API'],
      achievements: [
        {
          title: 'Responsive Frontend Development',
          description: 'Developed responsive front-end components using React for enterprise web applications',
          impact: 'Improved user engagement',
          level: 92
        },
        {
          title: 'Backend API Development',
          description: 'Supported back-end development using Spring Boot for REST API creation and maintenance',
          impact: 'Robust server architecture',
          level: 85
        },
        {
          title: 'Agile Collaboration',
          description: 'Collaborated with cross-functional teams in an Agile environment',
          impact: 'Production-ready features',
          level: 88
        }
      ]
    }
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
      }
    };
    return colorMap[color];
  };

  const filteredExperiences = activeFilter === 'all' 
    ? Object.entries(experiences)
    : Object.entries(experiences).filter(([_, exp]) => exp.status === activeFilter);

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 mb-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              💼 Professional Experience
            </h1>
            <p className="text-lg text-slate-400">My journey through internships and professional development</p>
          </div>
        </div>

        {/* Availability Banner */}
        <div className="relative bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-500/30 p-6 mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),rgba(255,255,255,0))]"></div>
          <div className="relative flex items-center justify-center space-x-4">
            <div className="bg-emerald-500/20 border border-emerald-500/40 p-3 rounded-full animate-pulse">
              <span className="text-2xl">✨</span>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-emerald-400 mb-1">Available for New Opportunities</h3>
              <p className="text-slate-300 text-sm">Open to full-time positions and exciting projects</p>
            </div>
            <div className="bg-emerald-500/20 border border-emerald-500/40 px-4 py-2 rounded-full">
              <span className="text-emerald-300 font-semibold text-sm">🟢 Open to Work</span>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-4 text-center">Filter by Status</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeFilter === 'all' 
                  ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-slate-100 shadow-lg border border-slate-600' 
                  : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
              }`}
            >
              🌟 All Experience
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeFilter === 'completed' 
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 text-slate-100 shadow-lg' 
                  : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
              }`}
            >
              ✅ Completed
            </button>
          </div>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {filteredExperiences.map(([key, experience], index) => {
            const colors = getColorClasses(experience.color);
            return (
              <div 
                key={key} 
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 animate-fadeIn"
                style={{
                  
                  animation: activeFilter !== 'all' ? 'fadeInUp 0.6s ease-out forwards ${index * 200}ms' : 'none'
                }}
              >
                {/* Company Header */}
                <div className="flex items-center mb-6">
                  <div className={`bg-gradient-to-br ${colors.gradient} border ${colors.border} p-3 rounded-xl mr-4`}>
                    <span className="text-2xl">{experience.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-100">{experience.company}</h2>
                        <p className="text-lg font-semibold text-slate-300">{experience.role}</p>
                        <p className="text-slate-400">{experience.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          ✅ Completed
                        </div>
                        <p className="text-sm font-semibold text-slate-400">{experience.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-100 mb-3">Technologies & Tools</h3>
                  <div className="flex flex-wrap gap-3">
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={tech}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 bg-gradient-to-br ${colors.gradient} ${colors.text} border ${colors.border} hover:shadow-md`}
                        style={{
                          
                          animation: 'fadeIn 0.5s ease-out forwards ${techIndex * 100}ms'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-100">Key Achievements</h3>
                    <p className="text-slate-400 text-sm">Hover over achievements to see progress</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <div
                        key={achievement.title}
                        className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                          hoveredExperience === `${key}-${achievement.title}`
                            ? `${colors.border} bg-gradient-to-br ${colors.gradient} shadow-lg shadow-${experience.color}-500/10 scale-105`
                            : 'border-slate-700/50 bg-slate-700/30 hover:border-slate-600/50'
                        }`}
                        onMouseEnter={() => setHoveredExperience(`${key}-${achievement.title}`)}
                        onMouseLeave={() => setHoveredExperience(null)}
                        style={{
                          
                          animation: activeFilter !== 'all' ? 'fadeInUp 0.5s ease-out forwards ${achievementIndex * 150}ms' : 'none'
                        }}
                      >
                        {/* Achievement Header */}
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-slate-100 text-base">{achievement.title}</h4>
                          <span className={`text-sm font-semibold px-2 py-1 rounded-full border ${
                            hoveredExperience === `${key}-${achievement.title}`
                              ? 'bg-slate-700/50 text-slate-200 border-slate-600/50'
                              : `${colors.bg} ${colors.text} ${colors.border}`
                          }`}>
                            {achievement.level}%
                          </span>
                        </div>

                        {/* Description */}
                        <p className={`text-sm mb-4 transition-colors ${
                          hoveredExperience === `${key}-${achievement.title}`
                            ? 'text-slate-300'
                            : 'text-slate-400'
                        }`}>
                          {achievement.description}
                        </p>

                        {/* Impact Badge */}
                        <div className={`text-xs font-medium px-3 py-1 rounded-full inline-block mb-4 border ${
                          hoveredExperience === `${key}-${achievement.title}`
                            ? 'bg-slate-700/50 text-slate-200 border-slate-600/50'
                            : `${colors.bg} ${colors.text} ${colors.border}`
                        }`}>
                          {achievement.impact}
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${colors.gradient.replace('/20', '')}`}
                            style={{ 
                              width: hoveredExperience === `${key}-${achievement.title}` ? `${achievement.level}%` : '0%',
                              transition: 'width 1s ease-out'
                            }}
                          />
                        </div>

                        {/* Floating Badge */}
                        {hoveredExperience === `${key}-${achievement.title}` && (
                          <div className="absolute -top-2 -right-2 bg-amber-500 text-amber-900 text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                            ✨
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        

        {/* Call to Action */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 mt-6 text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Ready to Collaborate?</h2>
          <p className="text-slate-400 mb-6">
            My internship experiences have equipped me with practical skills in modern web development and enterprise solutions. Let's discuss how I can contribute to your next project!
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-blue-500/20 transition-all border border-blue-400/30"
          onClick={openContactWindow}>
            Let's Connect! 🤝
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};