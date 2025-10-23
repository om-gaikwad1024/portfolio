import React, { useState } from 'react';

export const HelpPage = () => {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const [hoveredTip, setHoveredTip] = useState<string | null>(null);

  const apps = [
    {
      id: 'about',
      title: 'About',
      icon: '👨‍💻',
      color: 'emerald',
      description: 'Learn about my background, passion, and what drives me as a developer.'
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: '🚀',
      color: 'purple',
      description: 'Explore my latest work, from web applications to innovative solutions.'
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: '⚡',
      color: 'amber',
      description: 'Discover my technical expertise across programming languages and frameworks.'
    },
    {
      id: 'experience',
      title: 'Experience',
      icon: '💼',
      color: 'blue',
      description: 'Journey through my professional experience and career impact.'
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: '📧',
      color: 'red',
      description: 'Ready to connect? Find all the ways to reach out for opportunities.'
    },
    {
      id: 'education',
      title: 'Education',
      icon: '🎓',
      color: 'indigo',
      description: 'My educational journey, certifications, and continuous learning path.'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { gradient: string; text: string; bg: string; border: string }> = {
      emerald: {
        gradient: 'from-emerald-500/20 to-teal-500/20',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30'
      },
      purple: {
        gradient: 'from-purple-500/20 to-pink-500/20',
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30'
      },
      amber: {
        gradient: 'from-amber-500/20 to-orange-500/20',
        text: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30'
      },
      blue: {
        gradient: 'from-blue-500/20 to-cyan-500/20',
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30'
      },
      red: {
        gradient: 'from-red-500/20 to-pink-500/20',
        text: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30'
      },
      indigo: {
        gradient: 'from-indigo-500/20 to-blue-500/20',
        text: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
        border: 'border-indigo-500/30'
      }
    };
    return colorMap[color];
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
          <div className="relative text-center">
            <div className="text-5xl mb-4 animate-bounce">💡</div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Desktop Mode Guide
            </h1>
            <p className="text-lg text-slate-400">Navigate through my interactive portfolio</p>
          </div>
        </div>

        {/* Portfolio Applications Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 mb-6">
          <h2 className="text-2xl font-semibold text-slate-100 mb-4 flex items-center">
            <span className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 p-3 rounded-xl mr-3 text-2xl">📱</span>
            Portfolio Applications
          </h2>
          <p className="text-slate-400 mb-6">
            Your terminal commands are now desktop applications. Click any app icon in the dock to explore different sections.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {apps.map((app, index) => {
              const colors = getColorClasses(app.color);
              return (
                <div
                  key={app.id}
                  className={`border rounded-xl p-5 transition-all duration-300 cursor-pointer transform hover:scale-105 ${hoveredApp === app.id
                      ? `${colors.border} bg-gradient-to-br ${colors.gradient} shadow-lg`
                      : 'border-slate-700/50 bg-slate-700/30 hover:border-slate-600/50'
                    }`}
                  onMouseEnter={() => setHoveredApp(app.id)}
                  onMouseLeave={() => setHoveredApp(null)}
                  style={{

                    animation: 'fadeInUp 0.5s ease-out forwards ${index * 100}ms'
                  }}
                >
                  <h3 className="font-semibold text-slate-100 mb-2 flex items-center">
                    <span className={`${colors.bg} border ${colors.border} p-2 rounded-lg mr-2 text-xl`}>{app.icon}</span>
                    {app.title}
                  </h3>
                  <p className="text-sm text-slate-400">{app.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Controls Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 mb-6">
          <h2 className="text-2xl font-semibold text-slate-100 mb-4 flex items-center">
            <span className="bg-gradient-to-br from-slate-500/20 to-slate-600/20 border border-slate-500/30 p-3 rounded-xl mr-3 text-2xl">⚙️</span>
            System Controls & Features
          </h2>
          <p className="text-slate-400 mb-6">
            Access powerful system controls through the system tray and right-click menus.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`border rounded-xl p-6 transition-all duration-300 transform hover:scale-105 ${hoveredTip === 'systray'
                  ? 'border-orange-500/50 bg-gradient-to-br from-orange-500/10 to-amber-500/10 shadow-lg'
                  : 'border-slate-700/50 bg-slate-700/30 hover:border-slate-600/50'
                }`}
              onMouseEnter={() => setHoveredTip('systray')}
              onMouseLeave={() => setHoveredTip(null)}
            >
              <h3 className="font-semibold text-slate-100 mb-3 flex items-center">
                <span className="bg-orange-500/20 border border-orange-500/30 p-2 rounded-lg mr-3 text-xl">🌓</span>
                System Tray
              </h3>
              <p className="text-slate-400 mb-4">
                Access volume controls, brightness settings, and quick system toggles.
              </p>
              <ul className="space-y-2">
                <li className="text-sm text-slate-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                  Volume adjustment slider
                </li>
                <li className="text-sm text-slate-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                  Screen brightness control
                </li>
                <li className="text-sm text-slate-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                  Quick terminal access
                </li>
              </ul>
            </div>

            <div
              className={`border rounded-xl p-6 transition-all duration-300 transform hover:scale-105 ${hoveredTip === 'context'
                  ? 'border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 shadow-lg'
                  : 'border-slate-700/50 bg-slate-700/30 hover:border-slate-600/50'
                }`}
              onMouseEnter={() => setHoveredTip('context')}
              onMouseLeave={() => setHoveredTip(null)}
            >
              <h3 className="font-semibold text-slate-100 mb-3 flex items-center">
                <span className="bg-emerald-500/20 border border-emerald-500/30 p-2 rounded-lg mr-3 text-xl">📂</span>
                Context Menus
              </h3>
              <p className="text-slate-400 mb-4">
                Right-click anywhere on desktop for sorting options and quick actions.
              </p>
              <ul className="space-y-2">
                <li className="text-sm text-slate-300 flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></span>
                  Sort by: Default, A-Z, Z-A
                </li>
                <li className="text-sm text-slate-300 flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                  Refresh desktop
                </li>
                <li className="text-sm text-slate-300 flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                  Terminal access
                </li>
              </ul>
            </div>
          </div>

          {/* Screenshot Placeholders */}
          <div className="mt-6 space-y-4">
            {/* System Tray Screenshot */}
            <div className="border-2 border-dashed border-slate-600/50 rounded-xl p-12 text-center bg-slate-700/20 hover:border-slate-500/50 transition-all">
              {/* Image goes here */}
              <img
                src="/images/system.png"
                alt="System Tray Screenshot"
                className="mx-auto mb-3 w-60 h-60 object-contain opacity-80"
              />
              <p className="text-sm text-slate-400 font-semibold">System Tray Screenshot</p>
              <p className="text-xs text-slate-500 mt-2">
                Volume/brightness controls interface will appear here
              </p>
            </div>

            {/* Context Menu Screenshot */}
            <div className="border-2 border-dashed border-slate-600/50 rounded-xl p-12 text-center bg-slate-700/20 hover:border-slate-500/50 transition-all">
              {/* Image goes here */}
              <img
                src="/images/context.png"
                alt="Context Menu Screenshot"
                className="mx-auto mb-3 w-60 h-60 object-contain opacity-80"
              />
              <p className="text-sm text-slate-400 font-semibold">Context Menu Screenshot</p>
              <p className="text-xs text-slate-500 mt-2">
                Right-click menu with sorting options will appear here  <br />
                (Use Refresh to go back to full screen mode)
              </p>
            </div>
          </div>

        </div>

        {/* Navigation Tips Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 mb-6">
          <h2 className="text-2xl font-semibold text-slate-100 mb-4 flex items-center">
            <span className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30 p-3 rounded-xl mr-3 text-2xl">💡</span>
            Navigation Tips
          </h2>

          <div className="space-y-4">
            <div
              className={`rounded-xl border-l-4 p-5 transition-all duration-300 transform hover:scale-102 ${hoveredTip === 'tip1'
                  ? 'border-blue-500 bg-gradient-to-r from-blue-500/10 to-transparent shadow-lg'
                  : 'border-blue-500/30 bg-blue-500/5'
                }`}
              onMouseEnter={() => setHoveredTip('tip1')}
              onMouseLeave={() => setHoveredTip(null)}
            >
              <h3 className="text-sm font-semibold text-blue-400 mb-2">Pro Tip</h3>
              <p className="text-sm text-slate-300">
                Double-click app icons to open them instantly, or use the dock for single-click access.
              </p>
            </div>

            <div
              className={`rounded-xl border-l-4 p-5 transition-all duration-300 transform hover:scale-102 ${hoveredTip === 'tip2'
                  ? 'border-emerald-500 bg-gradient-to-r from-emerald-500/10 to-transparent shadow-lg'
                  : 'border-emerald-500/30 bg-emerald-500/5'
                }`}
              onMouseEnter={() => setHoveredTip('tip2')}
              onMouseLeave={() => setHoveredTip(null)}
            >
              <h3 className="text-sm font-semibold text-emerald-400 mb-2">Keyboard Shortcut</h3>
              <p className="text-sm text-slate-300">
                Use "Switch to Terminal" button to toggle between desktop and terminal modes.
              </p>
            </div>

            <div
              className={`rounded-xl border-l-4 p-5 transition-all duration-300 transform hover:scale-102 ${hoveredTip === 'tip3'
                  ? 'border-purple-500 bg-gradient-to-r from-purple-500/10 to-transparent shadow-lg'
                  : 'border-purple-500/30 bg-purple-500/5'
                }`}
              onMouseEnter={() => setHoveredTip('tip3')}
              onMouseLeave={() => setHoveredTip(null)}
            >
              <h3 className="text-sm font-semibold text-purple-400 mb-2">Visual Experience</h3>
              <p className="text-sm text-slate-300">
                Enjoy smooth animations and responsive design throughout the portfolio.
              </p>
            </div>
          </div>
        </div>

        {/* What Makes This Special Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 mb-6">
          <h2 className="text-2xl font-semibold text-slate-100 mb-4 flex items-center">
            <span className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 p-3 rounded-xl mr-3 text-2xl">⭐</span>
            What Makes This Special
          </h2>
          <p className="text-slate-400 mb-6">
            This isn't just a portfolio - it's an interactive experience showcasing technical skills and creative vision.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Seamless terminal to desktop mode transition',
              'Fully functional desktop environment',
              'Modern design with smooth animations',
              'Responsive layout for all devices',
              'Interactive elements that engage users',
              'Attention to detail in every interaction'
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-purple-500/10 transition-all duration-300"
                style={{

                  animation: 'fadeIn 0.5s ease-out forwards ${index * 100}ms'
                }}
              >
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></span>
                <span className="text-sm text-slate-300">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-2 border-dashed border-slate-600/50 rounded-xl p-8 text-center bg-slate-700/20 hover:border-slate-500/50 transition-all">
            {/* <div className="text-8xl mb-4 opacity-30">📸</div> */}
            <img
              src="/images/Full.png"
              alt="System Tray Screenshot"
              className="mx-auto mb-1 w-140 h-140 object-contain opacity-80"
            />
            <p className="text-sm text-slate-400 font-semibold">Desktop Overview Screenshot</p>
            <p className="text-xs text-slate-500 mt-2">Use Refresh from the Context menu to go back to full screen </p>
          </div>
        </div>

        {/* Ready to Explore Section */}
        {/* <div className="relative rounded-2xl p-8 text-center overflow-hidden backdrop-blur-sm border border-slate-700/50">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">Ready to Explore? 🚀</h2>
            <p className="text-slate-300 mb-6">
              Now that you know your way around, dive into each section and discover what makes me
              the right fit for your next project.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/20 border border-blue-400/30">
              Start Exploring
            </button>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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
          }
        }
      `}</style>
    </div>
  );
};