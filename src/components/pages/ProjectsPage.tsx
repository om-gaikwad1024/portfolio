import React, { useState } from 'react';

interface ProjectPageProps {
  openContactWindow?: () => void;
}

export const ProjectsPage = ({ openContactWindow }: ProjectPageProps) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const projects = {
    intelhub: {
      id: 'intelhub',
      title: 'IntelHub',
      subtitle: 'Collaborative Project Management',
      category: 'fullstack',
      icon: '🚀',
      color: 'blue',
      tagline: 'Git-like version control meets real-time collaboration',
      technologies: ['React', 'Flask', 'MongoDB', 'JWT', 'WebSocket'],
      description: 'A comprehensive collaborative development platform combining version control with real-time IDE capabilities.',
      features: [
        {
          title: 'Version Control System',
          description: 'Developed Git-like version control system with branch/merge functionality',
          icon: '🔀',
          impact: 'Seamless collaboration'
        },
        {
          title: 'Real-time Collaborative IDE',
          description: 'Implemented real-time collaborative IDE with code sharing and live editing using WebSocket communication',
          icon: '💻',
          impact: 'Live code sharing'
        },
        {
          title: 'JWT Authentication',
          description: 'Designed role-based access control system with JWT authentication',
          icon: '🔐',
          impact: 'Secure access control'
        },
        {
          title: 'Project Snapshots',
          description: 'Created project snapshot system enabling rollback to any previous version within 2-click workflow',
          icon: '📸',
          impact: 'Easy version recovery'
        }
      ],
      // stats: { commits: '500+', users: '50+', uptime: '99.9%' }
    },
    arla: {
      id: 'arla',
      title: 'ARLA',
      subtitle: 'Autonomous RL Agent for FPS Games',
      category: 'ai',
      icon: '🎮',
      color: 'purple',
      tagline: 'AI that learns to play DOOM through reinforcement learning',
      technologies: ['Python', 'Reinforcement Learning', 'ViZDoom', 'PPO'],
      description: 'An autonomous agent using advanced RL algorithms to master FPS gameplay in custom environments.',
      features: [
        {
          title: 'PPO Algorithm Implementation',
          description: 'Developed autonomous RL agent using PPO algorithm to play DOOM, training on custom environment',
          icon: '🤖',
          impact: 'Smart AI gameplay'
        },
        {
          title: 'Custom Game Environment',
          description: 'Engineered custom game environment using Doom Builder with multiplayer support for 8 players, integrating real-time AI decision-making',
          icon: '🎯',
          impact: 'Multiplayer AI support'
        },
        {
          title: 'Web Monitoring Interface',
          description: 'Implemented web interface for game configuration and real-time performance monitoring of AI agent',
          icon: '📊',
          impact: 'Live performance tracking'
        },
        {
          title: 'Dynamic Reward System',
          description: 'Designed dynamic reward system for agent training based on combat outcomes, health management, etc',
          icon: '⚡',
          impact: 'Adaptive learning'
        }
      ],
      // stats: { accuracy: '87%', games: '10K+', training: '200hrs' }
    },
    accompay: {
      id: 'accompay',
      title: 'Accompay AI',
      subtitle: 'AI Therapy & Mood Prediction',
      category: 'ai',
      icon: '💚',
      color: 'green',
      tagline: 'Personalized AI therapy through character personas',
      technologies: ['React', 'Flask', 'Gemini API', 'Random Forest', 'Python'],
      description: 'An AI-powered therapy platform providing personalized support through multiple character personas.',
      features: [
        {
          title: 'Multi-Persona AI Therapy',
          description: 'Developed AI-powered therapy platform utilizing Gemini API with predefined AI character personas (Batman, Elsa, Sibling)',
          icon: '🎭',
          impact: 'Personalized support'
        },
        {
          title: 'Interactive Chat Interface',
          description: 'Implemented chat interface allowing users to select from distinct AI avatars for personalized therapeutic conversations',
          icon: '💬',
          impact: 'Engaging interaction'
        },
        {
          title: 'Mindmetrics Feature',
          description: 'Integrated emotion prediction based on brainwave data analysis using random forest model',
          icon: '🧠',
          impact: 'Accurate mood detection'
        },
        {
          title: 'Dynamic Task Suggestions',
          description: 'Designed system to dynamically suggest personalized, mood-enhancing tasks based on predicted emotional state',
          icon: '✨',
          impact: 'Adaptive recommendations'
        }
      ],
      // stats: { personas: '5+', accuracy: '82%', users: '200+' }
    },
    erp: {
      id: 'erp',
      title: 'College ERP',
      subtitle: 'Management System',
      category: 'fullstack',
      icon: '🏫',
      color: 'orange',
      tagline: 'Complete academic management solution',
      technologies: ['Django', 'SQLite', 'HTML/CSS', 'JavaScript'],
      description: 'A comprehensive academic management system built with Django MVT architecture.',
      features: [
        {
          title: 'MVT Architecture',
          description: 'Developed Academic management system using Django\'s MVT architecture with SQLite database',
          icon: '🏗️',
          impact: 'Scalable design'
        },
        {
          title: 'Server-side Rendering',
          description: 'Implemented server-side rendering for attendance tracking, grade management, and timetable scheduling',
          icon: '📅',
          impact: 'Fast performance'
        },
        {
          title: 'Access Control',
          description: 'Deployed role-based access control using Django\'s built-in authentication system',
          icon: '🔑',
          impact: 'Secure access'
        },
        {
          title: 'Dynamic UI',
          description: 'Extended functionality with custom Django templates and vanilla JavaScript for dynamic UI elements',
          icon: '🎨',
          impact: 'Interactive interface'
        }
      ],
      // stats: { students: '1K+', modules: '15+', uptime: '99%' }
    },
    cyberguard: {
      id: 'cyberguard',
      title: 'CyberGuard UAV Shield',
      subtitle: 'Drone Security Platform',
      category: 'security',
      icon: '🛡️',
      color: 'red',
      tagline: 'Military-grade security for UAV operations',
      technologies: ['Go', 'Python', 'Cybersecurity', 'AES-256', 'TLS 1.3'],
      description: 'Advanced cybersecurity platform for UAV systems with NATO-grade encryption standards.',
      features: [
        {
          title: 'Zero-Trust Authentication',
          description: 'Implemented zero-trust authentication with PKI and HSM key management',
          icon: '🔒',
          impact: 'Maximum security'
        },
        {
          title: 'Multi-Tenant Cloud',
          description: 'Deployed multi-tenant secure cloud layer enabling safe data sharing across defense, aviation, and infra sectors',
          icon: '☁️',
          impact: 'Secure sharing'
        },
        {
          title: 'Real-time Threat Dashboard',
          description: 'Developed real-time threat dashboard for FlytX cockpit displays with pilot alerts',
          icon: '⚠️',
          impact: 'Instant alerts'
        },
        {
          title: 'NATO-Grade Encryption',
          description: 'Implemented secure RESTful microservices with AES-256 + TLS 1.3 encryption, ensuring NATO-grade communication standards',
          icon: '🔐',
          impact: 'Military-grade security'
        }
      ],
      // stats: { encryption: 'AES-256', threats: '1M+', uptime: '99.99%' }
    }
  };

  const categories = {
    all: { name: 'All Projects', icon: '🌟', color: 'slate' },
    fullstack: { name: 'Full Stack', icon: '💻', color: 'blue' },
    ai: { name: 'AI/ML', icon: '🤖', color: 'purple' },
    security: { name: 'Security', icon: '🛡️', color: 'red' }
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { gradient: string; text: string; bg: string; border: string; shadow: string }> = {
      blue: { 
        gradient: 'from-blue-500/20 to-cyan-500/20',
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        shadow: 'shadow-blue-500/10'
      },
      purple: { 
        gradient: 'from-purple-500/20 to-pink-500/20',
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30',
        shadow: 'shadow-purple-500/10'
      },
      green: { 
        gradient: 'from-emerald-500/20 to-teal-500/20',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        shadow: 'shadow-emerald-500/10'
      },
      orange: { 
        gradient: 'from-orange-500/20 to-amber-500/20',
        text: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/30',
        shadow: 'shadow-orange-500/10'
      },
      red: { 
        gradient: 'from-red-500/20 to-pink-500/20',
        text: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        shadow: 'shadow-red-500/10'
      },
      slate: {
        gradient: 'from-slate-600/20 to-slate-700/20',
        text: 'text-slate-400',
        bg: 'bg-slate-500/10',
        border: 'border-slate-600/30',
        shadow: 'shadow-slate-500/10'
      }
    };
    return colorMap[color];
  };

  const filteredProjects = activeFilter === 'all' 
    ? Object.values(projects)
    : Object.values(projects).filter(project => project.category === activeFilter);

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Header */}
        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-12 mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"></div>
          
          <div className="relative z-10 text-center">
            <div className="flex justify-center space-x-3 mb-4">
              <span className="text-5xl animate-bounce">🚀</span>
              <span className="text-5xl animate-bounce" style={{ animationDelay: '0.1s' }}>💻</span>
              <span className="text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h1>
            <p className="text-xl text-slate-300 mb-6">Building innovative solutions that solve real-world problems</p>
            <div className="flex justify-center gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <span className="font-semibold">{Object.keys(projects).length} Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <span className="font-semibold">Production Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌟</span>
                <span className="font-semibold">Open Source</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-100 mb-4 text-center">Filter by Category</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(categories).map(([key, category]) => {
              const colors = getColorClasses(category.color);
              return (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === key 
                      ? `bg-gradient-to-r ${colors.gradient} border ${colors.border} text-slate-100 shadow-lg ${colors.shadow}` 
                      : 'bg-slate-700/30 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {filteredProjects.map((project, index) => {
            const colors = getColorClasses(project.color);
            const isExpanded = expandedProject === project.id;
            const isHovered = hoveredProject === project.id;
            
            return (
              <div
                key={project.id}
                className={`relative bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border transition-all duration-500 cursor-pointer ${
                  isHovered
                    ? `${colors.border} ${colors.shadow} scale-102`
                    : 'border-slate-700/50 hover:border-slate-600/50'
                }`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                style={{
                 
                  animation: 'fadeInUp 0.6s ease-out forwards ${index * 150}ms'
                }}
              >
                {/* Project Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`bg-gradient-to-br ${colors.gradient} border ${colors.border} p-4 rounded-xl text-4xl transform transition-transform ${
                        isHovered ? 'scale-110 rotate-6' : ''
                      }`}>
                        {project.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-100">{project.title}</h3>
                        <p className={`text-sm font-medium ${colors.text}`}>{project.subtitle}</p>
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-300 text-slate-400 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <p className="text-slate-300 italic mb-4">{project.tagline}</p>
                  <p className="text-slate-400 text-sm mb-4">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          isHovered
                            ? `${colors.bg} ${colors.text} ${colors.border}`
                            : 'bg-slate-700/30 text-slate-300 border-slate-600/30'
                        } transition-colors`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  {/* <div className="flex justify-around py-4 border-y border-slate-700/50">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className={`text-lg font-bold ${colors.text}`}>{value}</div>
                        <div className="text-xs text-slate-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div> */}
                </div>

                {/* Expanded Features */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6 space-y-4">
                    <h4 className="text-lg font-bold text-slate-100 mb-4">✨ Key Features</h4>
                    {project.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          isHovered
                            ? `bg-gradient-to-br ${colors.gradient} ${colors.border}`
                            : 'bg-slate-700/30 border-slate-600/30'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`text-2xl ${colors.bg} ${colors.border} border p-2 rounded-lg`}>
                            {feature.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-bold text-slate-100">{feature.title}</h5>
                              <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                                {feature.impact}
                              </span>
                            </div>
                            <p className="text-sm text-slate-400">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
x
                {/* Hover Badge */}
                {isHovered && !isExpanded && (
                  <div className="absolute -top-3 -right-3 bg-amber-500 text-amber-900 text-xs font-bold px-3 py-2 rounded-full animate-bounce shadow-lg">
                    Click to expand! ✨
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Project Stats Summary */}
        {/* <div className="relative rounded-2xl p-8 mb-8 overflow-hidden backdrop-blur-sm border border-slate-700/50">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold mb-6 text-slate-100">🎯 Project Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl hover:scale-105 transition-all">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-2xl font-bold text-blue-400">5</div>
                <div className="text-sm text-slate-400">Major Projects</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl hover:scale-105 transition-all">
                <div className="text-3xl mb-2">💻</div>
                <div className="text-2xl font-bold text-purple-400">15+</div>
                <div className="text-sm text-slate-400">Technologies</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl hover:scale-105 transition-all">
                <div className="text-3xl mb-2">👥</div>
                <div className="text-2xl font-bold text-emerald-400">1K+</div>
                <div className="text-sm text-slate-400">Users Impacted</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-xl hover:scale-105 transition-all">
                <div className="text-3xl mb-2">🚀</div>
                <div className="text-2xl font-bold text-orange-400">100%</div>
                <div className="text-sm text-slate-400">Production Ready</div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Call to Action */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Want to Collaborate on the Next Big Thing? 🚀</h2>
          <p className="text-slate-400 mb-6">
            These projects showcase my passion for building innovative solutions. Let's create something amazing together!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-blue-500/20 transition-all border border-blue-400/30 transform hover:scale-105">
              View on GitHub 💻
            </button>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-emerald-500/20 transition-all border border-emerald-400/30 transform hover:scale-105"
            onClick={openContactWindow}>
              Let's Connect! 🤝
            </button>
          </div>
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
      `}</style>
    </div>
  );
};