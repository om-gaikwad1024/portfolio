'use client';

import { useState, useEffect } from 'react';

export const FolderPage = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {!isRevealed ? (
          <div className="text-center">
            <div className="text-6xl mb-6 animate-bounce">📁</div>
            <p className="text-xl text-slate-300">
              Loading folder contents{dots}
            </p>
          </div>
        ) : (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-8 animate-fade-in">
            {/* Easter Egg Header */}
            <div className="text-center mb-8">
              <div className="text-7xl mb-4 animate-wiggle">🎉</div>
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Easter Egg Unlocked!
              </h1>
              <p className="text-lg text-slate-400">You found a secret feature!</p>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-600 my-6"></div>

            {/* Main Content */}
            <div className="space-y-6">
              <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">🚧</span>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100 mb-2">
                      Feature Under Construction
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      You've discovered a placeholder! Full file system functionality would make this a complete operating system - 
                      and that's a bit beyond a portfolio scope. 😄
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">💼</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-blue-300 mb-3">
                      Want This Feature Built?
                    </h3>
                    <p className="text-slate-300 mb-4 leading-relaxed">
                      I could build a fully functional file system, drag-and-drop capabilities, file operations, 
                      and much more. If you're looking for someone who can turn ambitious ideas into reality...
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => window.open('mailto:om.gaikwad1024@gmail.com?subject=Let\'s Build Something Amazing!', '_blank')}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transform hover:scale-105 transition-all shadow-lg"
                      >
                        Let's Talk 💬
                      </button>
                      <button
                        onClick={() => window.open('https://linkedin.com/in/om-gaikwad1024', '_blank')}
                        className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-xl transform hover:scale-105 transition-all"
                      >
                        Connect on LinkedIn 🤝
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fun Facts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30">
                  <div className="text-2xl mb-2">🎨</div>
                  <p className="text-sm text-slate-300">
                    This portfolio mimics a desktop OS with window management, drag-and-drop, and system controls
                  </p>
                </div>
                <div className="bg-slate-700/20 rounded-lg p-4 border border-slate-600/30">
                  <div className="text-2xl mb-2">⚡</div>
                  <p className="text-sm text-slate-300">
                    Built with React, TypeScript, and Tailwind CSS for a smooth, responsive experience
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                💡 Pro tip: Try adjusting the brightness and volume controls in the system menu!
              </p>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-10deg); }
            75% { transform: rotate(10deg); }
          }
          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
          .animate-wiggle {
            animation: wiggle 1s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
};