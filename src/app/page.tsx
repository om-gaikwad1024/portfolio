'use client';

import { useState, useEffect, useRef } from 'react';
import SplineViewer from '../components/SplineViewer';
import Terminal from '../components/Terminal';
import Desktop from '../components/Desktop';

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDesktopMode, setIsDesktopMode] = useState(false);
  const terminalRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const executeCommand = (command: string) => {
    if (terminalRef.current) {
      terminalRef.current.executeCommand(command);
    }
  };

  const commands = ['help', 'about', 'projects', 'skills', 'experience', 'contact', 'education', 'leadership', 'clear'];

  if (isDesktopMode) {
    return <Desktop onSwitchToTerminal={() => setIsDesktopMode(false)} />;
  }

  return (
    <div className="app-container">
      {/* Header */}
      <div className="app-header">
        <div className="header-nav ">
          {commands.map(cmd => (
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
          <SplineViewer />
        </div>
        <div className="terminal-wrapper">
          <Terminal 
            ref={terminalRef} 
            onTypingChange={setIsTyping}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="app-footer">
        <span>user@portfolio:~$</span>
        <span>{isClient ? currentTime : '8/11/2025, 8:43:05'}</span>
      </div>
    </div>
  );
}