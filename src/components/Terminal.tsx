'use client';

import { useState, useRef, useEffect } from 'react';
import { portfolioContent } from '@/data/content';

type Page = 'home' | 'about' | 'projects' | 'skills' | 'contact';

export default function Terminal() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{command: string; output: string}>>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => `Available commands:
├── about     - View about section
├── projects  - View my projects  
├── skills    - View skills & technologies
├── contact   - View contact information
├── clear     - Clear terminal
├── back      - Return to main menu
└── help      - Show this help message`,
    
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
    
    clear: () => {
      setHistory([]);
      return '';
    },
    
    back: () => {
      setCurrentPage('home');
      return 'Returned to main menu. Type "help" to see available commands.';
    }
  };

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    if (commands[command as keyof typeof commands]) {
      const output = commands[command as keyof typeof commands]();
      if (output) {
        setHistory(prev => [...prev, { command: cmd, output }]);
      }
    } else if (command === '') {
      return;
    } else {
      setHistory(prev => [...prev, { 
        command: cmd, 
        output: `Command not found: ${cmd}. Type "help" for available commands.` 
      }]);
    }
    
    if (command !== 'clear') {
      setCommandHistory(prev => [...prev, cmd]);
    }
    setHistoryIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
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

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const getPageContent = () => {
    if (currentPage === 'home') {
      return (
        <div className="mb-4 text-green-400">
          <div className="mb-4">
            {portfolioContent.welcome}
          </div>
          <div className="text-yellow-400 mb-2">
            Type &quot;help&quot; to see available commands
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className="bg-black text-green-400 font-mono h-full p-6 overflow-hidden flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="text-yellow-400 mb-4 border-b border-gray-700 pb-2">
        <div className="flex items-center justify-between">
          <span>portfolio@terminal:~${currentPage}</span>
          <span className="text-xs">[Ctrl+C to exit]</span>
        </div>
      </div>

      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600"
      >
        {getPageContent()}
        
        {history.map((entry, index) => (
          <div key={index} className="mb-4">
            <div className="text-yellow-400">
              <span className="text-blue-400">user@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-purple-400">~</span>
              <span className="text-white">$ </span>
              {entry.command}
            </div>
            <div className="mt-1 whitespace-pre-wrap text-green-300">
              {entry.output}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex-shrink-0">
        <div className="flex items-center">
          <span className="text-blue-400">user@portfolio</span>
          <span className="text-white">:</span>
          <span className="text-purple-400">~</span>
          <span className="text-white">$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent text-green-400 outline-none flex-1 ml-1 caret-green-400"
            autoComplete="off"
            spellCheck="false"
          />
          <span className="animate-pulse text-green-400">|</span>
        </div>
      </form>
    </div>
  );
}