'use client';

import { useState, useRef, useEffect } from 'react';
import { AboutPage }      from './pages/AboutPage';
import { ProjectsPage }   from './pages/ProjectsPage';
import { SkillsPage }     from './pages/SkillsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ContactPage }    from './pages/ContactPage';
import { EducationPage }  from './pages/EducationPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { HelpPage }       from './pages/HelpPage';
import { FolderPage }     from './pages/FolderPage';
import { Game2048Page }   from './pages/Game2048Page';
import { GitMergePage }   from './pages/GitMergePage';
import { GameOfLifePage } from './pages/GameOfLifePage';

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

const Y = '#f0ce32';
const bebas: React.CSSProperties = { fontFamily: "'Bebas Neue', sans-serif" };
const mono: React.CSSProperties  = { fontFamily: "'Fragment Mono', monospace" };

export default function Window({
  id, title, component, position, size, isMaximized,
  zIndex, brightness, isMobile,
  onClose, onMinimize, onMaximize, onBringToFront, onUpdatePosition, openContactWindow,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || isMobile) return;
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsDragging(true);
      onBringToFront(id);
    }
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      if (!isMaximized && !isMobile) {
        onUpdatePosition(id, {
          x: Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth  - size.width)),
          y: Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - size.height - 56)),
        });
      }
    };
    const onUp = () => setIsDragging(false);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
  }, [isDragging, dragOffset, isMaximized, isMobile, size, id, onUpdatePosition]);

  const renderContent = () => {
    switch (component) {
      case 'about':       return <AboutPage openContactWindow={openContactWindow} />;
      case 'projects':    return <ProjectsPage openContactWindow={openContactWindow} />;
      case 'skills':      return <SkillsPage openContactWindow={openContactWindow} />;
      case 'experience':  return <ExperiencePage openContactWindow={openContactWindow} />;
      case 'contact':     return <ContactPage />;
      case 'education':   return <EducationPage openContactWindow={openContactWindow} />;
      case 'leadership':  return <LeadershipPage openContactWindow={openContactWindow} />;
      case 'help':        return <HelpPage />;
      case 'folder':      return <FolderPage />;
      case '2048':        return <Game2048Page isMobile={isMobile} />;
      case 'gitmerge':    return <GitMergePage />;
      case 'gameoflife':  return <GameOfLifePage isMobile={isMobile} />;
      default:
        return (
          <div style={{ padding: 32, fontFamily: 'Fragment Mono, monospace', color: '#fff' }}>
            <div style={{ ...bebas, fontSize: 32, color: Y, marginBottom: 12 }}>{title.toUpperCase()}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>Component not found: {component}</div>
          </div>
        );
    }
  };

  const titleH  = 36;
  const urlBarH = 38;
  const headerH = titleH + urlBarH;
  const winH = isMobile ? window.innerHeight - 56 : size.height;
  const contentH = winH - headerH;

  return (
    <div
      ref={windowRef}
      onClick={() => onBringToFront(id)}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: winH,
        zIndex,
        display: 'flex',
        flexDirection: 'column',
        border: `3px solid ${Y}`,
        // boxShadow: `6px 6px 0px ${Y}`,
        background: '#0a0a0a',
        overflow: 'hidden',
      }}
    >
      {/* ── TITLE BAR ── */}
      <div
        onMouseDown={handleTitleMouseDown}
        style={{ height: titleH, background: '#000', borderBottom: `3px solid ${Y}`, display: 'flex', alignItems: 'stretch', cursor: isMaximized ? 'default' : 'move', userSelect: 'none', flexShrink: 0 }}>
        {/* Title */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10 }}>
          <div style={{ width: 8, height: 8, background: Y, flexShrink: 0 }} />
          <span style={{ ...bebas, fontSize: 16, color: Y, letterSpacing: '0.12em' }}>{title.toUpperCase()}</span>
          
        </div>
        {/* Window controls */}
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <button onClick={e => { e.stopPropagation(); onMinimize(id); }}
            style={{ width: 44, background: 'transparent', border: 'none', borderLeft: '2px solid rgba(240,206,50,0.2)', cursor: 'pointer', ...mono, fontSize: 14, color: 'rgba(255,255,255,0.4)', transition: 'all 0.12s' }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = 'rgba(240,206,50,0.15)'; (e.target as HTMLButtonElement).style.color = Y; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = 'transparent'; (e.target as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)'; }}>
            ―
          </button>
          {!isMobile && (
            <button onClick={e => { e.stopPropagation(); onMaximize(id); }}
              style={{ width: 44, background: 'transparent', border: 'none', borderLeft: '2px solid rgba(240,206,50,0.2)', cursor: 'pointer', ...mono, fontSize: 14, color: 'rgba(255,255,255,0.4)', transition: 'all 0.12s' }}
              onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = 'rgba(240,206,50,0.15)'; (e.target as HTMLButtonElement).style.color = Y; }}
              onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = 'transparent'; (e.target as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)'; }}>
              ☐
            </button>
          )}
          <button onClick={e => { e.stopPropagation(); onClose(id); }}
            style={{ width: 44, background: 'transparent', border: 'none', borderLeft: `2px solid rgba(240,206,50,0.2)`, cursor: 'pointer', ...mono, fontSize: 16, color: 'rgba(255,255,255,0.4)', transition: 'all 0.12s' }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = '#f0ce32'; (e.target as HTMLButtonElement).style.color = '#000'; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = 'transparent'; (e.target as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)'; }}>
            ✕
          </button>
        </div>
      </div>

      {/* ── URL BAR ── */}
      <div style={{ height: urlBarH, background: '#111', borderBottom: '2px solid rgba(240,206,50,0.15)', display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', flexShrink: 0 }}>
        {['←','→','↻'].map(btn => (
          <button key={btn}
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', width: 26, height: 22, cursor: 'pointer', ...mono, fontSize: 12, color: 'rgba(255,255,255,0.3)', transition: 'all 0.12s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.borderColor = Y; (e.target as HTMLButtonElement).style.color = Y; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.target as HTMLButtonElement).style.color = 'rgba(255,255,255,0.3)'; }}>
            {btn}
          </button>
        ))}
        <div style={{ flex: 1, background: '#0a0a0a', border: '1px solid rgba(240,206,50,0.2)', padding: '3px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, background: Y, flexShrink: 0 }} />
          <span style={{ ...mono, fontSize: 11, color: 'rgba(240,206,50,0.5)', letterSpacing: '0.08em' }}>
            portfolio/{component}
          </span>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ height: contentH, overflowY: 'auto', overflowX: 'hidden', flex: 1 }}>
        {renderContent()}
      </div>

      {/* Brightness overlay */}
      <div style={{ position: 'absolute', inset: 0, background: '#000', pointerEvents: 'none', opacity: (100 - brightness) / 100, transition: 'opacity 0.3s' }} />
    </div>
  );
}