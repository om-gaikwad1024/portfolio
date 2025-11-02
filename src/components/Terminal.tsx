'use client';

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { portfolioContent } from '@/data/content';

type Page = 'home' | 'about' | 'projects' | 'skills' | 'contact';

interface HistoryEntry {
  command: string;
  output: string;
  isTyping?: boolean;
}

interface TerminalProps {
  onTypingChange?: (typing: boolean) => void;
}

interface TerminalRef {
  executeCommand: (cmd: string) => void;
}

const Terminal = forwardRef<TerminalRef, TerminalProps>(({ onTypingChange }, ref) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const commands = {
    help: () => `Available commands:
about       - Learn about me
projects    - View my projects
skills      - See my technical skills
experience  - My work experience
contact     - How to reach me
education   - My educational background
leadership  - Leadership and community involvement
sudo        - Execute with superuser powers (use with caution!)
clear       - Clear the terminal

Type any command to continue...`,

    about: () => {
      setCurrentPage('about');
      return portfolioContent.about;
    },

    projects: () => {
      setCurrentPage('projects');
      return portfolioContent.projects;
    },

    skills: () => {
      setCurrentPage('skills');
      return portfolioContent.skills;
    },

    contact: () => {
      setCurrentPage('contact');
      return portfolioContent.contact;
    },

    experience: () => {
      setCurrentPage('about');
      return (portfolioContent as any).experience || portfolioContent.about;
    },

    education: () => {
      setCurrentPage('about');
      return (portfolioContent as any).education || portfolioContent.about;
    },

    leadership: () => {
      setCurrentPage('about');
      return (portfolioContent as any).leadership || portfolioContent.about;
    },

    sudo: () => {
      return "Nice try! But you dont have sudo privileges here ;)";
    },

    clear: () => {
      setHistory([]);
      setShowWelcome(false);
      setTimeout(() => setShowWelcome(true), 100);
      return '';
    }
  };

  // Faster typewriter effect (5ms instead of 20ms)
  const typeWriter = (text: string, callback?: () => void) => {
    setIsTyping(true);
    if (onTypingChange) onTypingChange(true);
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
        if (onTypingChange) onTypingChange(false);
        if (callback) callback();
      }
    }, 5); // Increased speed from 20ms to 5ms
  };

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    if (commands[command as keyof typeof commands]) {
      const output = commands[command as keyof typeof commands]();
      if (output && command !== 'clear') {
        const newEntry: HistoryEntry = { command: cmd, output, isTyping: true };
        setHistory(prev => [...prev, newEntry]);

        typeWriter(output, () => {
          setHistory(prev =>
            prev.map(entry =>
              entry === newEntry ? { ...entry, isTyping: false } : entry
            )
          );
        });
      }
    } else if (command === '') {
      return;
    } else {
      const errorMsg = ` Command not found: ${cmd}. Type help for available commands.`;
      const newEntry: HistoryEntry = { command: cmd, output: errorMsg, isTyping: true };
      setHistory(prev => [...prev, newEntry]);

      typeWriter(errorMsg, () => {
        setHistory(prev =>
          prev.map(entry =>
            entry === newEntry ? { ...entry, isTyping: false } : entry
          )
        );
      });
    }

    if (command !== 'clear') {
      setCommandHistory(prev => [...prev, cmd]);
    }
    setHistoryIndex(-1);
  };

  useImperativeHandle(ref, () => ({
    executeCommand
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      executeCommand(input);
      setInput('');
    }
    // Keep focus on input after submission
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 10);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isTyping) return;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  // Keep terminal focused
  useEffect(() => {
  if (isMobile) return; // Don't auto-focus on mobile
  
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  document.addEventListener('click', focusInput);
  window.addEventListener('focus', focusInput);

  return () => {
    document.removeEventListener('click', focusInput);
    window.removeEventListener('focus', focusInput);
  };
}, [isMobile]);

  useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };
  
  checkMobile();
  window.addEventListener('resize', checkMobile);
  
  return () => window.removeEventListener('resize', checkMobile);
}, []);


  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, displayedText]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setShowWelcome(true);
  }, []);

  const getWelcomeContent = () => {
    if (!showWelcome) return null;

    return (
      <div className="mb-6 terminal-mono mr-2">
        <div className="text-white text-xl font-bold">
          Om R Gaikwad
        </div>
        <div className="text-gray-400 mb-4">
          Software Engineer
        </div>
        <div className="border-t border-green-500/30 mb-4"></div>
        <div className="text-green-400 mb-2">
        Hi, I&apos;m Om.
        </div>
        <div className="text-gray-300 mb-4 leading-relaxed">
          A Software Engineer with expertise in full-stack development, and AI integration.
        </div>
        <div className="text-green-400">
          Welcome to my interactive portfolio terminal!
        </div>
        <div>
          Type &quot;help&quot; for available commands.
        </div>
      </div>
    );
  };

 return (
  <div
    className="bg-black text-green-400 h-full flex flex-col terminal-mono"
    onClick={() => !isMobile && inputRef.current?.focus()}
  >
    {/* Terminal Content */}
    <div
      ref={terminalRef}
      className="flex-1 overflow-y-auto px-6 py-4 space-y-4 pb-20 terminal-scroll"
    >
      {getWelcomeContent()}

      {history.map((entry, index) => (
        <div key={index}>
          <div className="flex items-center terminal-prompt">
            <span className="text-blue-400">user@portfolio</span>
            <span className="text-white">:</span>
            <span className="text-yellow-400">~</span>
            <span className="text-green-400">$ </span>
            <span className="text-white">{entry.command}</span>
          </div>
          <div className="mt-2 text-gray-300 whitespace-pre-wrap terminal-mono">
            {entry.isTyping ? displayedText : entry.output}
            {entry.isTyping && <span className="animate-pulse">|</span>}
          </div>
        </div>
      ))}

      {/* Current Input Display - Only show on desktop */}
      {!isMobile && (
        <div className="flex items-center terminal-prompt">
          <span className="text-blue-400">user@portfolio</span>
          <span className="text-white">:</span>
          <span className="text-yellow-400">~</span>
          <span className="text-green-400">$</span>
          <span className="text-green-400 ml-2">{input}</span>
          <span className="animate-pulse text-green-400">|</span>
        </div>
      )}
    </div>

    {/* Hidden Input for capturing keystrokes - Disabled on mobile */}
    {!isMobile && (
      <form onSubmit={handleSubmit} className="absolute -left-96">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="opacity-0"
          autoComplete="off"
          spellCheck="false"
          disabled={isTyping}
        />
      </form>
    )}
  </div>
);});

Terminal.displayName = 'Terminal';

export default Terminal;