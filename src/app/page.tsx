'use client';

import { useState, useEffect, useRef } from 'react';
import SplineViewer from '../components/SplineViewer';
import Terminal from '../components/Terminal';

type Page = 'home' | 'about' | 'projects' | 'skills' | 'contact';

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
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

  const commands = ['help', 'about', 'projects', 'skills', 'experience', 'contact', 'education', 'leadership', 'sudo', 'clear'];

  return (
    <div className="app-container">
      {/* Header */}
      <div className="app-header">
        <div className="header-nav">
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
        <div className="header-info">[Ctrl+C to exit]</div>
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