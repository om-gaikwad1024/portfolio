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

interface WindowProps {
  id: string;
  title: string;
  component: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
  zIndex: number;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onBringToFront: (id: string) => void;
  onUpdatePosition: (id: string, position: { x: number; y: number }) => void;
}

export default function Window({
  id,
  title,
  component,
  position,
  size,
  isMaximized,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onBringToFront,
  onUpdatePosition,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;

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
    setIsAnimating(true);
    setTimeout(() => {
      onMaximize(id);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        const newPosition = {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        };

        // Constrain to screen bounds
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
  }, [isDragging, dragOffset, isMaximized, size, id, onUpdatePosition]);

  const renderContent = () => {
    switch (component) {
      case 'about':
        return <AboutPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'skills':
        return <SkillsPage />;
      case 'experience':
        return <ExperiencePage />;
      case 'contact':
        return <ContactPage />;
      case 'education':
        return <EducationPage />;
      case 'leadership':
        return <LeadershipPage />;
      case 'help':
        return <HelpPage />;
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

  return (
    <div
      ref={windowRef}
      className={`absolute bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden transition-all duration-300 ease-in-out ${isAnimating ? 'animate-pulse' : ''
        } ${isMaximized ? 'transition-all duration-300 ease-out' : 'transition-all duration-200 ease-out'}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: zIndex,
        transform: isAnimating ? 'scale(0.98)' : 'scale(1)',
      }}
      onClick={() => onBringToFront(id)}
    >
      {/* Window Header */}
      <div
        className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-between px-4 cursor-move border-b border-gray-300"
        onMouseDown={handleMouseDown}
        style={{ userSelect: 'none' }}
      >
        {/* Window Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onClose(id)}
            className="w-3 h-3 bg-red-500 hover:bg-red-600 rounded-full transition-all duration-150 hover:scale-110 shadow-sm"
          />
          <button
            onClick={handleMinimize}
            className="w-3 h-3 bg-yellow-500 hover:bg-yellow-600 rounded-full transition-all duration-150 hover:scale-110 shadow-sm"
          />
          <button
            onClick={handleMaximize}
            className="w-3 h-3 bg-green-500 hover:bg-green-600 rounded-full transition-all duration-150 hover:scale-110 shadow-sm"
          />
        </div>

        {/* Window Title */}
        <div className="flex-1 text-center">
          <span className="text-sm font-medium text-gray-700">{title} - Browser</span>
        </div>

        {/* Browser-like elements */}
        <div className="flex items-center space-x-2">
          <div className="text-xs text-gray-500">🔒</div>
        </div>
      </div>

      {/* Browser Address Bar */}
      <div className="h-10 bg-gradient-to-r from-gray-50 to-gray-100 flex items-center px-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 flex-1">
          <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-200 transition-all duration-150">←</button>
          <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-200 transition-all duration-150">→</button>
          <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-200 transition-all duration-150">↻</button>
          <div className="flex-1 bg-white border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-700 shadow-sm">
            https://portfolio.local/{component}
          </div>
          <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-200 transition-all duration-150">⋮</button>
        </div>
      </div>

      {/* Window Content */}
      <div
        className="flex-1 overflow-auto bg-white transition-all duration-200"
        style={{ height: size.height - 72 }}
      >
        {renderContent()}
      </div>
    </div>
  );
}