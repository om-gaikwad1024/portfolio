'use client';

import { useState, useEffect } from 'react';
import Window from './Window';
import SystemMenu from './SystemMenu';

interface DesktopProps {
    onSwitchToTerminal: () => void;
    showTip: boolean;
    onCloseTip: () => void;
}

interface WindowData {
    id: string;
    title: string;
    component: string;
    isMinimized: boolean;
    isMaximized: boolean;
    position: { x: number; y: number };
    size: { width: number; height: number };
    zIndex: number;
}

const APPS = [
    { name: 'about', abbr: 'AB', title: 'About', accent: true },
    { name: 'projects', abbr: 'PJ', title: 'Projects', accent: false },
    { name: 'skills', abbr: 'SK', title: 'Skills', accent: false },
    { name: 'experience', abbr: 'EX', title: 'Experience', accent: false },
    { name: 'contact', abbr: 'CT', title: 'Contact', accent: true },
    { name: 'education', abbr: 'ED', title: 'Education', accent: false },
    { name: 'leadership', abbr: 'LD', title: 'Leadership', accent: false },
    { name: 'help', abbr: '?', title: 'Help', accent: false },
    { name: '2048', abbr: '2K', title: '2048', accent: true },
    { name: 'gitmerge', abbr: 'GM', title: 'Git Merge', accent: false },
    { name: 'gameoflife', abbr: 'GL', title: 'Life', accent: false },
];

const EXTERNAL = [
    { name: 'github', abbr: 'GH', title: 'GitHub', href: 'https://github.com/om-gaikwad1024' },
    { name: 'linkedin', abbr: 'LI', title: 'LinkedIn', href: 'https://linkedin.com/in/om-gaikwad1024' },
    { name: 'email', abbr: 'ML', title: 'Mail', href: 'mailto:om.gaikwad1024@gmail.com' },
];

const QUICK = ['about', 'projects', 'contact'];

const Y = '#f0ce32';
const BG = '#0a0a0a';
const CARD = '#111111';

export default function Desktop({ onSwitchToTerminal, showTip, onCloseTip }: DesktopProps) {
    const [windows, setWindows] = useState<WindowData[]>([]);
    const [nextZIndex, setNextZIndex] = useState(1000);
    const [time, setTime] = useState('');
    const [dateInfo, setDateInfo] = useState({ day: '', date: '', month: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [showSystemMenu, setShowSystemMenu] = useState(false);
    const [brightness, setBrightness] = useState(100);
    const [isMobile, setIsMobile] = useState(false);
    const [windowHistory, setWindowHistory] = useState<string[]>([]);
    const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
    const [isCharging, setIsCharging] = useState(false);
    const [folders, setFolders] = useState<Array<{ id: string; name: string; isEditing: boolean }>>([]);
    const [sortOrder, setSortOrder] = useState<'default' | 'a-z' | 'z-a'>('default');
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; visible: boolean }>({ x: 0, y: 0, visible: false });
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const tick = () => {
            const now = new Date();
            const h = String(now.getHours()).padStart(2, '0');
            const m = String(now.getMinutes()).padStart(2, '0');
            setTime(`${h}:${m}`);
            setDateInfo({
                day: now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase(),
                date: String(now.getDate()),
                month: now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase(),
            });
        };
        tick();
        const timer = setInterval(tick, 1000);

        if ('getBattery' in navigator) {
            (navigator as any).getBattery().then((b: any) => {
                setBatteryLevel(Math.round(b.level * 100));
                setIsCharging(b.charging);
                b.addEventListener('levelchange', () => setBatteryLevel(Math.round(b.level * 100)));
                b.addEventListener('chargingchange', () => setIsCharging(b.charging));
            });
        }

        return () => { clearInterval(timer); window.removeEventListener('resize', checkMobile); };
    }, []);

    const openWindow = (type: string) => {
        const existing = windows.find(w => w.component === type && !w.isMinimized);
        if (existing) { bringToFront(existing.id); return; }

        const minimized = windows.find(w => w.component === type && w.isMinimized);
        if (minimized) { restoreWindow(minimized.id); return; }

        const sizeMap: Record<string, { w: number; h: number }> = {
            gameoflife: { w: 700, h: 650 },
            '2048': { w: 600, h: 750 },
            gitmerge: { w: 900, h: 700 },
        };
        const def = sizeMap[type] ?? { w: 800, h: 600 };
        const width = isMobile ? window.innerWidth : def.w;
        const height = isMobile ? window.innerHeight - 56 : def.h;
        const x = isMobile ? 0 : 80 + windows.length * 28;
        const y = isMobile ? 0 : 60 + windows.length * 28;

        const nw: WindowData = {
            id: `${type}-${Date.now()}`,
            title: type.charAt(0).toUpperCase() + type.slice(1),
            component: type,
            isMinimized: false,
            isMaximized: isMobile,
            position: { x, y },
            size: { width, height },
            zIndex: nextZIndex,
        };
        setWindows(p => [...p, nw]);
        setWindowHistory(p => [...p, nw.id]);
        setNextZIndex(p => p + 1);
    };

    const closeWindow = (id: string) => {
        setWindows(p => p.filter(w => w.id !== id));
        setWindowHistory(p => p.filter(wid => wid !== id));
    };

    const minimizeWindow = (id: string) =>
        setWindows(p => p.map(w => w.id === id ? { ...w, isMinimized: true } : w));

    const maximizeWindow = (id: string) => {
        if (isMobile) return;
        setWindows(p => p.map(w => {
            if (w.id !== id) return w;
            if (w.isMaximized) {
                const sm = { about: { w: 800, h: 600 }, gameoflife: { w: 700, h: 650 }, '2048': { w: 600, h: 750 }, gitmerge: { w: 900, h: 700 } } as any;
                const s = sm[w.component] ?? { w: 800, h: 600 };
                return { ...w, isMaximized: false, position: { x: (window.innerWidth - s.w) / 2, y: (window.innerHeight - 56 - s.h) / 2 }, size: { width: s.w, height: s.h } };
            }
            return { ...w, isMaximized: true, position: { x: 0, y: 0 }, size: { width: window.innerWidth, height: window.innerHeight - 56 } };
        }));
    };

    const bringToFront = (id: string) => {
        setWindows(p => p.map(w => w.id === id ? { ...w, zIndex: nextZIndex } : w));
        setWindowHistory(p => [...p.filter(wid => wid !== id), id]);
        setNextZIndex(p => p + 1);
    };

    const restoreWindow = (id: string) => {
        setWindows(p => p.map(w => w.id === id ? { ...w, isMinimized: false } : w));
        bringToFront(id);
    };

    const updateWindowPosition = (id: string, position: { x: number; y: number }) =>
        setWindows(p => p.map(w => w.id === id ? { ...w, position } : w));

    const handleExternal = (name: string) => {
        const ext = EXTERNAL.find(e => e.name === name);
        if (!ext) return;
        if (ext.href.startsWith('mailto:')) window.open(ext.href);
        else window.open(ext.href, '_blank');
    };

    const handleCreateFolder = () => {
        setFolders(prev => [...prev, { id: `folder-${Date.now()}`, name: '', isEditing: true }]);
        setContextMenu({ x: 0, y: 0, visible: false });
    };

    const updateFolderName = (id: string, name: string) =>
        setFolders(prev => prev.map(f => f.id === id ? { ...f, name } : f));

    const finishEditingFolder = (id: string) =>
        setFolders(prev => prev.map(f => f.id === id ? { ...f, isEditing: false } : f));

    const handleRefresh = () => {
        setIsRefreshing(true);
        setContextMenu({ x: 0, y: 0, visible: false });
        setTimeout(() => setIsRefreshing(false), 400);
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!isMobile) setContextMenu({ x: e.clientX, y: e.clientY, visible: true });
    };

    const getSortedApps = () => {
        const base = APPS.filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()));
        const folderItems = folders.map(f => ({ name: f.id, abbr: 'FD', title: f.name || 'New Folder', accent: false, isFolder: true, folderId: f.id }));
        const all = [...base.map(a => ({ ...a, isFolder: false, folderId: '' })), ...folderItems];
        if (sortOrder === 'a-z') return all.sort((a, b) => a.title.localeCompare(b.title));
        if (sortOrder === 'z-a') return all.sort((a, b) => b.title.localeCompare(a.title));
        return all;
    };

    const mono: React.CSSProperties = { fontFamily: "'Fragment Mono', monospace" };
    const bebas: React.CSSProperties = { fontFamily: "'Bebas Neue', sans-serif" };
    const border3 = `3px solid ${Y}`;
    const border3w = '3px solid #fff';
    const border3dim = '3px solid rgba(255,255,255,0.12)';

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fragment+Mono:ital@0;1&family=Lexend:wght@200;300;400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: ${Y}; }
        .app-btn:hover { background: ${Y} !important; }
        .app-btn:hover .app-abbr { color: #000 !important; }
        .app-btn:hover .app-lbl  { color: #000 !important; }
        .ext-btn:hover { background: ${Y} !important; color: #000 !important; border-color: ${Y} !important; }
        .quick-btn:hover { background: ${Y} !important; color: #000 !important; }
        .tb-win:hover { background: ${Y} !important; color: #000 !important; border-color: ${Y} !important; }
        .tb-min:hover { border-color: rgba(240,206,50,0.5) !important; color: rgba(240,206,50,0.7) !important; }
        .sys-btn:hover { border-color: ${Y} !important; color: ${Y} !important; }
      `}</style>

            <div onContextMenu={handleContextMenu}
                onClick={(e) => {
                    if (e.target === e.currentTarget) setContextMenu({ x: 0, y: 0, visible: false });
                }} style={{
                    height: '100vh', width: '100vw', background: BG, position: 'relative', overflow: 'hidden',
                    backgroundImage: `linear-gradient(rgba(240,206,50,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(240,206,50,0.035) 1px,transparent 1px)`,
                    backgroundSize: '40px 40px', userSelect: 'none'
                }}>

                {/* ── WELCOME TIP ── */}
                {showTip && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                        <div style={{ background: CARD, border: border3, padding: 32, maxWidth: 420, width: '100%' }}>
                            <div style={{ ...bebas, fontSize: 28, color: Y, letterSpacing: '0.1em', marginBottom: 8 }}>// DESKTOP MODE</div>
                            <div style={{ ...mono, fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 20 }}>
                                {isMobile ? 'Tap' : 'Double-click'} any app block to launch it. Use the taskbar to manage open windows.
                            </div>
                            <div style={{ background: '#0a0a0a', border: '2px solid rgba(240,206,50,0.3)', padding: 16, marginBottom: 20 }}>
                                <div style={{ ...mono, fontSize: 10, color: Y, letterSpacing: '0.2em', marginBottom: 8 }}>// PRO TIP</div>
                                <div style={{ ...mono, fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                                    Click SYS ⚙ in the taskbar to switch to terminal mode.{!isMobile && ' Watch out for the Easter egg. 🥚'}
                                </div>
                            </div>
                            <button onClick={onCloseTip} style={{ ...bebas, width: '100%', background: Y, color: '#000', border: 'none', padding: '12px 0', fontSize: 18, letterSpacing: '0.15em', cursor: 'pointer' }}>
                                ACKNOWLEDGED →
                            </button>
                        </div>
                    </div>
                )}

                {/* ── DESKTOP WIDGETS (not mobile) ── */}
                {!isMobile && (
                    <div style={{
                        position: 'absolute', inset: 0, bottom: 56, padding: 20, display: 'grid', gap: 12,
                        gridTemplateColumns: '260px 1fr 220px', gridTemplateRows: '180px 1fr'
                    }}>

                        {/* ── PROFILE WIDGET (tall left) ── */}
                        <div style={{ gridRow: '1 / 3', background: CARD, border: border3, padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ ...mono, fontSize: 9, letterSpacing: '0.3em', color: 'rgba(240,206,50,0.5)', textTransform: 'uppercase', marginBottom: 20 }}>// sys.identity</div>
                            <div style={{ ...bebas, fontSize: 52, lineHeight: 0.85, color: Y, letterSpacing: '0.02em' }}>OM<br />GAIKWAD</div>
                            <div style={{ ...mono, fontSize: 9, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginTop: 14, lineHeight: 2 }}>
                                FULL STACK ENG.<br />ENTERPRISE SYS.<br />AI/ML INTEGRATION
                            </div>

                            <div style={{ flex: 1 }} />

                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16, marginBottom: 12 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: Y, animation: 'pulse 2s infinite' }} />
                                    <span style={{ ...mono, fontSize: 9, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>OPEN TO WORK</span>
                                </div>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    {EXTERNAL.map(ext => (
                                        <button key={ext.name} className="ext-btn" onClick={() => handleExternal(ext.name)}
                                            style={{ flex: 1, border: '2px solid rgba(240,206,50,0.25)', background: 'transparent', padding: '8px 4px', cursor: 'pointer', transition: 'all 0.15s', ...bebas, fontSize: 14, letterSpacing: '0.08em', color: Y }}>
                                            {ext.abbr}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── CLOCK WIDGET (center top) ── */}
                        <div style={{ background: CARD, border: border3w, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 24, overflow: 'hidden', position: 'relative' }}>
                            <div>
                                <div style={{ ...mono, fontSize: 9, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 6 }}>{dateInfo.day}</div>
                                <div style={{ ...bebas, fontSize: 88, lineHeight: 0.85, color: '#fff', letterSpacing: '0.03em' }}>{time}</div>
                                <div style={{ ...mono, fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginTop: 10 }}>{dateInfo.month}</div>
                            </div>
                            <div style={{ marginLeft: 'auto', borderLeft: '3px solid rgba(255,255,255,0.06)', paddingLeft: 24, lineHeight: 0.8 }}>
                                <div style={{ ...bebas, fontSize: 120, color: 'rgba(255,255,255,0.04)', lineHeight: 0.8 }}>{dateInfo.date}</div>
                            </div>
                            <div style={{ position: 'absolute', bottom: 12, right: 16, ...mono, fontSize: 9, letterSpacing: '0.2em', color: 'rgba(240,206,50,0.3)' }}>LOCAL TIME</div>
                        </div>

                        {/* ── STATUS WIDGET (right top) ── */}
                        <div style={{ background: CARD, border: border3w, padding: '20px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div style={{ ...mono, fontSize: 9, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>// sys.status</div>
                            <div>
                                {batteryLevel !== null ? (
                                    <>
                                        <div style={{ ...bebas, fontSize: 52, color: Y, lineHeight: 1, letterSpacing: '0.02em' }}>{batteryLevel}%</div>
                                        <div style={{ ...mono, fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{isCharging ? '⚡ CHARGING' : 'BATTERY'}</div>
                                    </>
                                ) : (
                                    <div style={{ ...bebas, fontSize: 36, color: 'rgba(255,255,255,0.1)', letterSpacing: '0.05em' }}>--:--</div>
                                )}
                            </div>
                            <button className="sys-btn" onClick={onSwitchToTerminal}
                                style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.15)', padding: '8px 12px', cursor: 'pointer', transition: 'all 0.15s', ...mono, fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', textAlign: 'center' }}>
                                → TERMINAL
                            </button>
                        </div>

                        {/* ── APP GRID WIDGET (center bottom) ── */}
                        <div style={{ background: CARD, border: border3w, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            {/* search bar */}
                            <div style={{ borderBottom: border3dim, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                                <span style={{ ...mono, fontSize: 14, color: 'rgba(255,255,255,0.2)' }}>⌕</span>
                                <input type="text" placeholder="SEARCH APPS..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                                    style={{ background: 'transparent', border: 'none', outline: 'none', flex: 1, ...mono, fontSize: 11, letterSpacing: '0.2em', color: '#fff', caretColor: Y }}
                                />
                                {searchTerm && (
                                    <button onClick={() => setSearchTerm('')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', ...mono, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>✕</button>
                                )}
                            </div>
                            {/* apps */}
                            <div style={{
                                flex: 1, overflowY: 'auto', padding: 12,
                                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(82px, 1fr))', gap: 8, alignContent: 'start'
                            }}>
                                {getSortedApps().map(app => (
                                    <button key={app.name} className="app-btn"
                                        onDoubleClick={() => app.isFolder ? openWindow('folder') : openWindow(app.name)}
                                        onClick={() => isMobile && (app.isFolder ? openWindow('folder') : openWindow(app.name))}
                                        style={{ background: 'transparent', border: `2px solid rgba(255,255,255,0.1)`, padding: '14px 8px', cursor: 'pointer', transition: 'all 0.12s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                        {app.isFolder && (folders.find(f => f.id === app.name)?.isEditing) ? (
                                            <input
                                                autoFocus
                                                type="text"
                                                value={app.title === 'New Folder' ? '' : app.title}
                                                onChange={e => updateFolderName(app.name, e.target.value)}
                                                onBlur={() => finishEditingFolder(app.name)}
                                                onKeyDown={e => e.key === 'Enter' && finishEditingFolder(app.name)}
                                                onClick={e => e.stopPropagation()}
                                                style={{ background: '#000', border: `1px solid ${Y}`, color: '#fff', outline: 'none', width: '90%', textAlign: 'center', fontFamily: 'Fragment Mono, monospace', fontSize: 9, padding: '2px 4px', letterSpacing: '0.1em' }}
                                            />
                                        ) : (
                                            <>
                                                <span className="app-abbr" style={{ ...bebas, fontSize: 24, color: app.accent ? Y : app.isFolder ? Y : '#fff', letterSpacing: '0.04em', lineHeight: 1, transition: 'color 0.12s' }}>
                                                    {app.abbr}
                                                </span>
                                                <span className="app-lbl" style={{ ...mono, fontSize: 8, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', transition: 'color 0.12s', maxWidth: 76, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {app.title}
                                                </span>
                                            </>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ── QUICK ACCESS WIDGET (right bottom) ── */}
                        <div style={{ background: Y, border: `3px solid ${Y}`, padding: '20px 18px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ ...mono, fontSize: 9, letterSpacing: '0.3em', color: 'rgba(0,0,0,0.45)', textTransform: 'uppercase', marginBottom: 16 }}>// Double.Click</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                                {QUICK.map(name => {
                                    const app = APPS.find(a => a.name === name);
                                    return (
                                        <button key={name} className="quick-btn"
                                            onDoubleClick={() => openWindow(name)}
                                            onClick={() => isMobile && openWindow(name)}
                                            style={{ background: '#000', border: '3px solid #000', padding: '10px 14px', cursor: 'pointer', transition: 'all 0.12s', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...bebas, fontSize: 16, letterSpacing: '0.1em', color: Y }}>
                                            <span>{app?.title?.toUpperCase()}</span>
                                            <span style={{ fontSize: 14 }}>→</span>
                                        </button>
                                    );
                                })}
                            </div>
                            <div style={{ ...bebas, fontSize: 100, lineHeight: 0.8, color: 'rgba(0,0,0,0.08)', position: 'absolute', bottom: -10, right: -4, pointerEvents: 'none' }}>↗</div>
                        </div>
                    </div>
                )}

                {/* ── MOBILE LAYOUT ── */}
                {isMobile && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 56, overflowY: 'auto', padding: 12 }}>
                        {/* mobile clock bar */}
                        <div style={{ background: CARD, border: border3, padding: '12px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ ...bebas, fontSize: 32, color: Y, letterSpacing: '0.05em' }}>{time}</div>
                            <div style={{ ...mono, fontSize: 9, color: 'rgba(255,255,255,0.3)', textAlign: 'right', textTransform: 'uppercase' }}>
                                {dateInfo.day}<br />{dateInfo.month}
                            </div>
                        </div>
                        {/* mobile search */}
                        <div style={{ background: CARD, border: border3w, padding: '10px 14px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ ...mono, fontSize: 13, color: 'rgba(255,255,255,0.2)' }}>⌕</span>
                            <input type="text" placeholder="SEARCH..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                                style={{ background: 'transparent', border: 'none', outline: 'none', flex: 1, ...mono, fontSize: 11, letterSpacing: '0.15em', color: '#fff', caretColor: Y }} />
                        </div>
                        {/* mobile app grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                            {getSortedApps().map(app => (
                                <button key={app.name} className="app-btn"
                                    onDoubleClick={() => app.isFolder ? openWindow('folder') : openWindow(app.name)}
                                    onClick={() => isMobile && (app.isFolder ? openWindow('folder') : openWindow(app.name))}
                                    style={{ background: 'transparent', border: `2px solid rgba(255,255,255,0.1)`, padding: '14px 8px', cursor: 'pointer', transition: 'all 0.12s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                    {app.isFolder && (folders.find(f => f.id === app.name)?.isEditing) ? (
                                        <input
                                            autoFocus
                                            type="text"
                                            value={app.title === 'New Folder' ? '' : app.title}
                                            onChange={e => updateFolderName(app.name, e.target.value)}
                                            onBlur={() => finishEditingFolder(app.name)}
                                            onKeyDown={e => e.key === 'Enter' && finishEditingFolder(app.name)}
                                            onClick={e => e.stopPropagation()}
                                            style={{ background: '#000', border: `1px solid ${Y}`, color: '#fff', outline: 'none', width: '90%', textAlign: 'center', fontFamily: 'Fragment Mono, monospace', fontSize: 9, padding: '2px 4px', letterSpacing: '0.1em' }}
                                        />
                                    ) : (
                                        <>
                                            <span className="app-abbr" style={{ ...bebas, fontSize: 24, color: app.accent ? Y : app.isFolder ? Y : '#fff', letterSpacing: '0.04em', lineHeight: 1, transition: 'color 0.12s' }}>
                                                {app.abbr}
                                            </span>
                                            <span className="app-lbl" style={{ ...mono, fontSize: 8, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', transition: 'color 0.12s', maxWidth: 76, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {app.title}
                                            </span>
                                        </>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── CONTEXT MENU ── */}
                {!isMobile && contextMenu.visible && (
                    <>
                        <div style={{ position: 'fixed', inset: 0, zIndex: 998 }} onClick={() => setContextMenu({ x: 0, y: 0, visible: false })} />
                        <div style={{
                            position: 'absolute', zIndex: 999,
                            left: Math.min(contextMenu.x, window.innerWidth - 220),
                            top: Math.min(contextMenu.y, window.innerHeight - 280),
                            width: 220, background: '#0a0a0a', border: `3px solid ${Y}`,
                            boxShadow: `4px 4px 0 ${Y}`,
                        }}>
                            {/* Header */}
                            <div style={{ background: '#000', borderBottom: `2px solid rgba(240,206,50,0.3)`, padding: '8px 14px', ...mono, fontSize: 9, color: 'rgba(240,206,50,0.5)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
        // desktop.ctx
                            </div>

                            {/* Sort section */}
                            <div style={{ borderBottom: '2px solid rgba(255,255,255,0.07)', padding: '6px 0' }}>
                                <div style={{ padding: '6px 14px', ...mono, fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>SORT BY</div>
                                {(['default', 'a-z', 'z-a'] as const).map(s => (
                                    <button key={s} onClick={() => { setSortOrder(s); setContextMenu({ x: 0, y: 0, visible: false }); }}
                                        style={{ width: '100%', background: sortOrder === s ? 'rgba(240,206,50,0.1)' : 'transparent', border: 'none', padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'background 0.12s' }}
                                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(240,206,50,0.08)')}
                                        onMouseLeave={e => (e.currentTarget.style.background = sortOrder === s ? 'rgba(240,206,50,0.1)' : 'transparent')}>
                                        <span style={{ ...mono, fontSize: 10, color: sortOrder === s ? Y : 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                                            {s === 'default' ? 'DEFAULT' : s.toUpperCase()}
                                        </span>
                                        {sortOrder === s && <span style={{ ...mono, fontSize: 10, color: Y }}>✓</span>}
                                    </button>
                                ))}
                            </div>

                            {/* Actions */}
                            <div style={{ padding: '6px 0' }}>
                                {[
                                    { label: 'REFRESH', icon: '↺', fn: handleRefresh },
                                    { label: 'NEW FOLDER', icon: '▣', fn: handleCreateFolder },
                                    { label: 'TERMINAL MODE', icon: '→', fn: () => { onSwitchToTerminal(); setContextMenu({ x: 0, y: 0, visible: false }); } },
                                ].map(({ label, icon, fn }) => (
                                    <button key={label} onClick={fn}
                                        style={{ width: '100%', background: 'transparent', border: 'none', padding: '9px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, transition: 'background 0.12s' }}
                                        onMouseEnter={e => { e.currentTarget.style.background = Y; (e.currentTarget.querySelector('.ctx-lbl') as HTMLElement).style.color = '#000'; (e.currentTarget.querySelector('.ctx-ico') as HTMLElement).style.color = '#000'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; (e.currentTarget.querySelector('.ctx-lbl') as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; (e.currentTarget.querySelector('.ctx-ico') as HTMLElement).style.color = Y; }}>
                                        <span className="ctx-ico" style={{ ...bebas, fontSize: 16, color: Y, transition: 'color 0.12s', width: 16, textAlign: 'center' }}>{icon}</span>
                                        <span className="ctx-lbl" style={{ ...mono, fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'color 0.12s' }}>{label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* ── WINDOWS ── */}
                {windows.map(win => !win.isMinimized && (
                    <Window key={win.id} id={win.id} title={win.title} component={win.component}
                        position={win.position} size={win.size} isMaximized={win.isMaximized}
                        zIndex={win.zIndex} brightness={brightness} isMobile={isMobile}
                        onClose={closeWindow} onMinimize={minimizeWindow} onMaximize={maximizeWindow}
                        onBringToFront={bringToFront} onUpdatePosition={updateWindowPosition}
                        openContactWindow={() => openWindow('contact')} />
                ))}

                {/* ── SYSTEM MENU ── */}
                {showSystemMenu && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 10000 }}>
                        <SystemMenu onClose={() => setShowSystemMenu(false)} onSwitchToTerminal={onSwitchToTerminal}
                            onBrightnessChange={setBrightness} brightness={brightness} />
                    </div>
                )}

                {/* ── BRIGHTNESS OVERLAY ── */}
                <div style={{
                    position: 'absolute', inset: 0, background: '#000', pointerEvents: 'none', zIndex: 40,
                    opacity: (100 - brightness) / 100, transition: 'opacity 0.3s'
                }} />

                {/* ── TASKBAR ── */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: 56, borderTop: border3,
                    background: '#0a0a0a', display: 'flex', alignItems: 'stretch', zIndex: 30
                }}>

                    {isMobile ? (
                        <>
                            <button onClick={() => setShowSystemMenu(!showSystemMenu)}
                                style={{ flex: 1, background: 'transparent', border: 'none', borderRight: `2px solid rgba(240,206,50,0.15)`, cursor: 'pointer', ...bebas, fontSize: 20, color: Y }}>⚙</button>
                            <button onClick={() => { const cur = windows.filter(w => !w.isMinimized).at(-1); if (cur) minimizeWindow(cur.id); }}
                                style={{ flex: 1, background: 'transparent', border: 'none', borderRight: `2px solid rgba(240,206,50,0.15)`, cursor: 'pointer', ...bebas, fontSize: 22, color: 'rgba(255,255,255,0.5)' }}>⌂</button>
                            <button onClick={() => { const cur = windows.filter(w => !w.isMinimized).at(-1); if (cur) closeWindow(cur.id); }}
                                style={{ flex: 1, background: 'transparent', border: 'none', cursor: 'pointer', ...bebas, fontSize: 22, color: 'rgba(255,255,255,0.3)' }}>◁</button>
                        </>
                    ) : (
                        <>
                            {/* Logo */}
                            <div style={{ padding: '0 20px', borderRight: `3px solid rgba(240,206,50,0.2)`, display: 'flex', alignItems: 'center' }}>
                                <span style={{ ...bebas, fontSize: 22, color: Y, letterSpacing: '0.12em' }}>OMM</span>
                            </div>

                            {/* Open windows */}
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px', overflowX: 'auto' }}>
                                {windows.filter(w => !w.isMinimized).map(w => (
                                    <button key={w.id} className="tb-win" onClick={() => bringToFront(w.id)}
                                        style={{ background: 'transparent', border: `2px solid ${Y}`, padding: '4px 14px', cursor: 'pointer', transition: 'all 0.12s', flexShrink: 0, ...bebas, fontSize: 13, letterSpacing: '0.1em', color: Y }}>
                                        {w.title.toUpperCase()}
                                    </button>
                                ))}
                                {windows.filter(w => w.isMinimized).map(w => (
                                    <button key={w.id} className="tb-min" onClick={() => restoreWindow(w.id)}
                                        style={{ background: 'transparent', border: '2px solid rgba(240,206,50,0.2)', padding: '4px 14px', cursor: 'pointer', transition: 'all 0.12s', flexShrink: 0, ...bebas, fontSize: 13, letterSpacing: '0.1em', color: 'rgba(240,206,50,0.35)' }}>
                                        {w.title.toUpperCase()} _
                                    </button>
                                ))}
                            </div>

                            {/* Clock + Sys */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '0 16px', borderLeft: '3px solid rgba(240,206,50,0.2)' }}>
                                <span style={{ ...mono, fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>{time}</span>
                                <button className="sys-btn" onClick={() => setShowSystemMenu(!showSystemMenu)}
                                    style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.15)', padding: '5px 12px', cursor: 'pointer', transition: 'all 0.15s', ...mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)' }}>
                                    SYS ⚙
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}