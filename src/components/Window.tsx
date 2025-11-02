// filename: components/Window.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SkillsPage } from './pages/SkillsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ContactPage } from './pages/ContactPage';
import { EducationPage } from './pages/EducationPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { HelpPage } from './pages/HelpPage';
import { FolderPage } from './pages/FolderPage';

interface WindowProps {
  id: string;
  title: string;
  component: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
  zIndex: number;
  brightness: number;
  isMobile: boolean;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onBringToFront: (id: string) => void;
  onUpdatePosition: (id: string, position: { x: number; y: number }) => void;
  openContactWindow?: () => void;
}

export default function Window({
  id,
  title,
  component,
  position,
  size,
  isMaximized,
  zIndex,
  brightness,
  isMobile,
  onClose,
  onMinimize,
  onMaximize,
  onBringToFront,
  onUpdatePosition,
  openContactWindow,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || isMobile) return;

    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
      onBringToFront(id);
    }
  };

  const handleMinimize = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onMinimize(id);
      setIsAnimating(false);
    }, 300);
  };

  const handleMaximize = () => {
    if (isMobile) return;
    setIsAnimating(true);
    setTimeout(() => {
      onMaximize(id);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized && !isMobile) {
        const newPosition = {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        };

        newPosition.x = Math.max(0, Math.min(newPosition.x, window.innerWidth - size.width));
        newPosition.y = Math.max(0, Math.min(newPosition.y, window.innerHeight - size.height - 50));

        onUpdatePosition(id, newPosition);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isMaximized, isMobile, size, id, onUpdatePosition]);

  const renderContent = () => {
    switch (component) {
      case 'about':
        return <AboutPage openContactWindow={openContactWindow} />;
      case 'projects':
        return <ProjectsPage openContactWindow={openContactWindow} />;
      case 'skills':
        return <SkillsPage openContactWindow={openContactWindow} />;
      case 'experience':
        return <ExperiencePage openContactWindow={openContactWindow} />;
      case 'contact':
        return <ContactPage />;
      case 'education':
        return <EducationPage openContactWindow={openContactWindow} />;
      case 'leadership':
        return <LeadershipPage openContactWindow={openContactWindow} />;
      case 'help':
        return <HelpPage />;
      case 'folder': 
        return <FolderPage />;
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-gray-600">
              This is the {title} page loaded in browser mode.
            </p>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-500">
                Content for {component} will be loaded here.
              </p>
            </div>
          </div>
        );
    }
  };

  const windowHeight = isMobile ? (window.innerHeight - 112) : size.height;

  return (
    <div
      ref={windowRef}
      className={`absolute bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${
        isAnimating ? 'animate-pulse' : ''
      } ${isMaximized ? 'transition-all duration-300 ease-out' : 'transition-all duration-200 ease-out'}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: isMobile ? windowHeight : 'auto',
        zIndex: zIndex,
        transform: isAnimating ? 'scale(0.98)' : 'scale(1)',
        boxShadow: `0 0 0 1px rgba(209, 213, 219, ${brightness / 100})`,
      }}
      onClick={() => onBringToFront(id)}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-lg z-50"
        style={{ opacity: (100 - brightness) / 100 }}
      >
        <div className="absolute inset-0 bg-black rounded-lg" />
        <div className="absolute inset-0 border border-gray-300 rounded-lg" style={{ opacity: 0 }} />
      </div>

      <div
        className="h-8 bg-slate-800 flex items-center justify-between px-4 cursor-move border-b border-slate-700"
        onMouseDown={handleMouseDown}
        style={{ userSelect: 'none' }}
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-slate-200">{title}</span>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={handleMinimize}
            className="w-10 h-7 bg-transparent hover:bg-slate-700 text-slate-300 hover:text-white transition-all duration-150 flex items-center justify-center text-sm"
          >
            ―
          </button>
          {!isMobile && (
            <button
              onClick={handleMaximize}
              className="w-10 h-7 bg-transparent hover:bg-slate-700 text-slate-300 hover:text-white transition-all duration-150 flex items-center justify-center text-sm"
            >
              ☐
            </button>
          )}
          <button
            onClick={() => onClose(id)}
            className="w-10 h-7 bg-transparent hover:bg-red-600 text-slate-300 hover:text-white transition-all duration-150 flex items-center justify-center text-lg"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="h-10 bg-slate-800 flex items-center px-4 border-b border-slate-700">
        <div className="flex items-center space-x-2 flex-1">
          <button className="text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-700 transition-all duration-150">←</button>
          <button className="text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-700 transition-all duration-150">→</button>
          <button className="text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-700 transition-all duration-150">↻</button>
          <div className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm text-slate-200">
            https://portfolio.local/{component}
          </div>
          <button className="text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-700 transition-all duration-150">⋮</button>
        </div>
      </div>

      <div
        className="flex-1 overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-all duration-200 scrollbar-hide"
        style={{ height: windowHeight - 72 }}
      >
        {renderContent()}
      </div>
    </div>
  );
}