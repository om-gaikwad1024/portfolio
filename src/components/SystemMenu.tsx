'use client';

import { useState, useEffect, useRef } from 'react';

interface SystemMenuProps {
  onClose: () => void;
  onSwitchToTerminal: () => void;
  onBrightnessChange: (b: number) => void;
  brightness: number;
}

const Y = '#f0ce32';
const bebas: React.CSSProperties = { fontFamily: "'Bebas Neue', sans-serif" };
const mono: React.CSSProperties  = { fontFamily: "'Fragment Mono', monospace" };

export default function SystemMenu({ onClose, onSwitchToTerminal, onBrightnessChange, brightness }: SystemMenuProps) {
  const [volume, setVolume] = useState(50);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => { audioRef.current?.close(); };
  }, []);

  const playBeep = (vol: number) => {
    if (!audioRef.current) return;
    const osc = audioRef.current.createOscillator();
    const gain = audioRef.current.createGain();
    osc.connect(gain);
    gain.connect(audioRef.current.destination);
    osc.frequency.value = 700;
    gain.gain.value = vol / 100;
    osc.start(audioRef.current.currentTime);
    osc.stop(audioRef.current.currentTime + 0.08);
  };

  const sliderTrack = (val: number, color = Y) =>
    `linear-gradient(to right, ${color} 0%, ${color} ${val}%, rgba(255,255,255,0.08) ${val}%, rgba(255,255,255,0.08) 100%)`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fragment+Mono:ital@0;1&display=swap');
        .sm-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 3px; border: none; outline: none; cursor: pointer; }
        .sm-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; background: ${Y}; border: 2px solid #000; cursor: pointer; }
        .sm-slider::-moz-range-thumb { width: 14px; height: 14px; background: ${Y}; border: 2px solid #000; cursor: pointer; border-radius: 0; }
        .sm-row:hover { background: rgba(240,206,50,0.06) !important; }
        .sm-terminal:hover { background: ${Y} !important; color: #000 !important; }
        .sm-close:hover { background: rgba(240,206,50,0.1) !important; color: ${Y} !important; border-color: ${Y} !important; }
      `}</style>

      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)', zIndex: 49 }} />

      {/* Panel */}
      <div style={{ position: 'absolute', bottom: 68, right: 16, width: 300, background: '#0a0a0a', border: `3px solid ${Y}`, boxShadow: `6px 6px 0 ${Y}`, zIndex: 50 }}>

        {/* Header */}
        <div style={{ background: '#000', borderBottom: `3px solid ${Y}`, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, background: Y }} />
            <span style={{ ...bebas, fontSize: 18, color: Y, letterSpacing: '0.12em' }}>SYSTEM CTRL</span>
          </div>
          <button className="sm-close" onClick={onClose}
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', width: 26, height: 22, cursor: 'pointer', ...mono, fontSize: 12, color: 'rgba(255,255,255,0.4)', transition: 'all 0.12s' }}>
            ✕
          </button>
        </div>

        {/* Volume */}
        <div className="sm-row" style={{ padding: '16px 16px 14px', borderBottom: '2px solid rgba(255,255,255,0.07)', transition: 'background 0.12s' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13 }}>🔊</span>
              <span style={{ ...mono, fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>VOLUME</span>
            </div>
            <span style={{ ...bebas, fontSize: 20, color: Y, letterSpacing: '0.05em' }}>{volume}</span>
          </div>
          <input type="range" min="0" max="100" value={volume} className="sm-slider"
            style={{ background: sliderTrack(volume) }}
            onChange={e => { const v = Number(e.target.value); setVolume(v); playBeep(v); }} />
        </div>

        {/* Brightness */}
        <div className="sm-row" style={{ padding: '16px 16px 14px', borderBottom: '2px solid rgba(255,255,255,0.07)', transition: 'background 0.12s' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13 }}>☀️</span>
              <span style={{ ...mono, fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>BRIGHTNESS</span>
            </div>
            <span style={{ ...bebas, fontSize: 20, color: Y, letterSpacing: '0.05em' }}>{brightness}</span>
          </div>
          <input type="range" min="0" max="100" value={brightness} className="sm-slider"
            style={{ background: sliderTrack(brightness, '#fff') }}
            onChange={e => onBrightnessChange(Number(e.target.value))} />
        </div>

        {/* Actions */}
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button className="sm-terminal" onClick={() => { onSwitchToTerminal(); onClose(); }}
            style={{ background: '#000', border: `2px solid ${Y}`, padding: '10px 0', cursor: 'pointer', transition: 'all 0.12s', ...bebas, fontSize: 16, color: Y, letterSpacing: '0.15em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <span>→</span> SWITCH TO TERMINAL
          </button>
        </div>

        {/* Footer tag */}
        <div style={{ borderTop: '2px solid rgba(255,255,255,0.06)', padding: '8px 16px', textAlign: 'right' }}>
          <span style={{ ...mono, fontSize: 8, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em' }}>// portfolio.sys v2.0</span>
        </div>
      </div>
    </>
  );
}