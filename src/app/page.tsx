// filename: app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Terminal from '../components/Terminal';
import Desktop from '../components/Desktop';

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
  const [showTerminalTip, setShowTerminalTip] = useState(false);
  const [hasSeenWarning, setHasSeenWarning] = useState(false);
  const terminalRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Check if user has already seen the warning in this session
    const warningShown = sessionStorage.getItem('terminal-warning-shown');
    
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Only show warning if mobile, not in desktop mode, and haven't seen it yet
      if (mobile && !isDesktopMode && !warningShown && !hasSeenWarning) {
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
  }, [isDesktopMode, hasSeenWarning]);

  const executeCommand = (command: string) => {
    if (terminalRef.current) {
      terminalRef.current.executeCommand(command);
    }
  };

  const handleCloseMobileWarning = () => {
    setShowMobileWarning(false);
    setHasSeenWarning(true);
    sessionStorage.setItem('terminal-warning-shown', 'true');
  };

  const handleSwitchToDesktop = () => {
    setIsDesktopMode(true);
    setShowTerminalTip(true);
    setShowMobileWarning(false);
    setHasSeenWarning(true);
    sessionStorage.setItem('terminal-warning-shown', 'true');
  };

  const handleSwitchToTerminal = () => {
    setIsDesktopMode(false);
    // Don't show warning again when switching back from desktop mode
    setHasSeenWarning(true);
  };

  const commands = ['help', 'about', 'projects', 'skills', 'experience', 'contact', 'education', 'leadership', 'clear'];

  if (isDesktopMode) {
    return (
      <>
        <Desktop 
          onSwitchToTerminal={handleSwitchToTerminal}
          showTip={showTerminalTip}
          onCloseTip={() => setShowTerminalTip(false)}
        />
      </>
    );
  }

  return (
    <div className="app-container">
      {showMobileWarning && !hasSeenWarning && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-green-500 rounded-lg p-6 max-w-md w-full">
            <div className="text-green-400 text-xl font-bold mb-4 terminal-mono">
              {isMobile ? '📱 Terminal Mode' : '🖥️ Welcome Back to Terminal'}
            </div>
            <div className="text-gray-300 terminal-mono mb-4 leading-relaxed">
              {isMobile 
                ? 'New to terminal? Try Desktop Mode for a familiar interface!' 
                : 'Welcome back to Terminal Mode! Type "help" to see available commands.'}
            </div>
            <div className="bg-slate-800 border border-slate-600 rounded p-3 mb-4">
              <div className="text-blue-400 text-sm font-semibold mb-2">💡 Pro Tip:</div>
              <div className="text-gray-300 text-sm">
                Switch to Desktop Mode using the button in the top-right corner for a GUI experience.
                {!isMobile && ' There might be an Easter egg waiting for you... 👀'}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleSwitchToDesktop}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded terminal-mono transition-colors"
              >
                Try Desktop Mode
              </button>
              <button
                onClick={handleCloseMobileWarning}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded terminal-mono transition-colors"
              >
                Continue in Terminal
              </button>
            </div>
          </div>
        </div>
      )}

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
            onClick={handleSwitchToDesktop}
            className="px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-lg transition-colors"
            style={{padding: '0.4rem'}}
          >
            Desktop Mode
          </button>
        </div>
      </div>

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

      <div className="app-footer">
        <span>user@portfolio:~$</span>
        <span>{isClient ? currentTime : '8/11/2025, 8:43:05'}</span>
      </div>
    </div>
  );
}