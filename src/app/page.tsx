'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Terminal from '../components/Terminal';
import Desktop from '../components/Desktop';

// Lazy load Spline components
const SplineViewer = dynamic(() => import('../components/SplineViewer'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-green-400">Loading 3D Scene...</div>
});

const SplineViewerMobile = dynamic(() => import('../components/SplineViewerMobile'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-green-400">Loading 3D Scene...</div>
});

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDesktopMode, setIsDesktopMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const terminalRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Check if mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && !localStorage.getItem('mobileWarningShown')) {
        setShowMobileWarning(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const executeCommand = (command: string) => {
    if (terminalRef.current) {
      terminalRef.current.executeCommand(command);
    }
  };

  const handleCloseMobileWarning = () => {
    setShowMobileWarning(false);
    localStorage.setItem('mobileWarningShown', 'true');
  };

  const commands = ['help', 'about', 'projects', 'skills', 'experience', 'contact', 'education', 'leadership', 'clear'];

  if (isDesktopMode) {
    return <Desktop onSwitchToTerminal={() => setIsDesktopMode(false)} />;
  }

  return (
    <div className="app-container">
      {/* Mobile Warning Popup */}
      {showMobileWarning && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-green-500 rounded-lg p-6 max-w-md w-full">
            <div className="text-green-400 text-xl font-bold mb-4 terminal-mono">
              📱 Mobile View Detected
            </div>
            <div className="text-gray-300 terminal-mono mb-6 leading-relaxed">
              This portfolio is best viewed on a laptop or desktop for the full experience. 
              However, you can still explore it on mobile!
            </div>
            <button
              onClick={handleCloseMobileWarning}
              className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded terminal-mono transition-colors"
            >
              Continue on Mobile
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="app-header">
        <div className="header-nav">
          {!isMobile && commands.map(cmd => (
            <button
              key={cmd}
              onClick={() => !isTyping && executeCommand(cmd)}
              className="nav-button"
              disabled={isTyping}
            >
              {cmd}
            </button>
          ))}
        </div>
        <div className="header-info">
          <button
            onClick={() => setIsDesktopMode(true)}
            className="px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-lg transition-colors"
            style={{padding: '0.4rem'}}
          >
            Desktop Mode
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="spline-container">
          {isMobile ? <SplineViewerMobile /> : <SplineViewer />}
        </div>
        <div className="terminal-wrapper">
          <Terminal 
            ref={terminalRef} 
            onTypingChange={setIsTyping}
          />
        </div>
      </div>

      {/* Mobile Command Bar (Above Footer) */}
      {isMobile && (
        <div className="mobile-command-bar">
          <div className="mobile-command-scroll">
            {commands.map(cmd => (
              <button
                key={cmd}
                onClick={() => !isTyping && executeCommand(cmd)}
                className="mobile-command-btn"
                disabled={isTyping}
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="app-footer">
        <span>user@portfolio:~$</span>
        <span>{isClient ? currentTime : '8/11/2025, 8:43:05'}</span>
      </div>
    </div>
  );
}