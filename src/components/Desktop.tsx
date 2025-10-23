'use client';

import { useState, useRef, useEffect } from 'react';
import Window from './Window';
import SystemMenu from './SystemMenu';

interface DesktopProps {
    onSwitchToTerminal: () => void;
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

export default function Desktop({ onSwitchToTerminal }: DesktopProps) {
    const [windows, setWindows] = useState<WindowData[]>([]);
    const [nextZIndex, setNextZIndex] = useState(1000);
    const [currentTime, setCurrentTime] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showSystemMenu, setShowSystemMenu] = useState(false);
    const [brightness, setBrightness] = useState(100);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; visible: boolean }>({ x: 0, y: 0, visible: false });
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [sortOrder, setSortOrder] = useState<'default' | 'a-z' | 'z-a'>('default');

    const handleIconClick = (appName: string) => {
        switch (appName) {
            case 'github':
                window.open('https://github.com/om-gaikwad1024', '_blank');
                break;
            case 'linkedin':
                window.open('https://linkedin.com/in/om-gaikwad1024', '_blank');
                break;
            case 'email':
                window.open('mailto:your.om.gaikwad1024@gmail.com');
                break;
            default:
                openWindow(appName);
        }
    };


    const [folders, setFolders] = useState<Array<{
        id: string;
        name: string;
        isEditing: boolean;
    }>>([]);

    const updateFolderName = (id: string, newName: string) => {
        setFolders(prev => prev.map(folder =>
            folder.id === id ? { ...folder, name: newName } : folder
        ));
    };

    const finishEditingFolder = (id: string) => {
        setFolders(prev => prev.map(folder =>
            folder.id === id ? { ...folder, isEditing: false } : folder
        ));
    };

    const handleCreateFolder = () => {
        const newFolder = {
            id: `folder-${Date.now()}`,
            name: '',
            isEditing: true
        };
        setFolders(prev => [...prev, newFolder]);
        setContextMenu({ x: 0, y: 0, visible: false });
    };

    const handleRefresh = () => {
        requestFullscreen();
        setContextMenu({ x: 0, y: 0, visible: false });
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
        }, 500);
    };


    const getSortedApps = () => {
        const allApps = [...filteredApps, ...folders.map(folder => ({
            name: folder.id,
            icon: '📁',
            title: folder.name,
            isFolder: true,
            folderId: folder.id
        }))];

        switch (sortOrder) {
            case 'a-z':
                return allApps.sort((a, b) => a.title.localeCompare(b.title));
            case 'z-a':
                return allApps.sort((a, b) => b.title.localeCompare(a.title));
            default:
                return allApps;
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const requestFullscreen = async () => {
        try {
            if (document.documentElement.requestFullscreen) {
                await document.documentElement.requestFullscreen();
            } else if ((document.documentElement as any).webkitRequestFullscreen) {
                await (document.documentElement as any).webkitRequestFullscreen();
            } else if ((document.documentElement as any).msRequestFullscreen) {
                await (document.documentElement as any).msRequestFullscreen();
            }
        } catch (err) {
            console.log('Fullscreen request failed:', err);
        }
    };

    useEffect(() => {
        
        requestFullscreen();
        
        let isRequestingFullscreen = false;

        const checkAndRequestFullscreen = async () => {
            if (!isRequestingFullscreen && !document.fullscreenElement) {
                isRequestingFullscreen = true;
                await requestFullscreen();
                setTimeout(() => {
                    isRequestingFullscreen = false;
                }, 1000);
            }
        };

        
        const handleClick = () => {
            checkAndRequestFullscreen();
        };

        
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                setTimeout(() => {
                    checkAndRequestFullscreen();
                }, 100);
            }
        };

        
        const handleFocus = () => {
            setTimeout(() => {
                checkAndRequestFullscreen();
            }, 100);
        };

        
        const handleMouseMove = () => {
            if (!document.fullscreenElement && !document.hidden) {
                checkAndRequestFullscreen();
            }
        };

        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', handleFocus);
        window.addEventListener('click', handleClick);
        window.addEventListener('mousemove', handleMouseMove);
        console.log('Fullscreen event listeners added.');
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('mousemove', handleMouseMove);

            if (document.exitFullscreen && document.fullscreenElement) {
                document.exitFullscreen().catch(err => console.log('Exit fullscreen failed:', err));
            }
        };
    }, []);

    interface AppItem {
        folderId: string;
        name: string;
        icon: string;
        title: string;
        isFolder?: boolean;
    }

    const taskbarApps: AppItem[] = [
        {
            name: 'about', icon: '🧑‍💼', title: 'About', isFolder: false,
            folderId: ''
        },
        {
            name: 'projects', icon: '🗂️', title: 'Projects', isFolder: false,
            folderId: ''
        },
        {
            name: 'skills', icon: '⚙️', title: 'Skills', isFolder: false,
            folderId: ''
        },
        {
            name: 'experience', icon: '📊', title: 'Experience', isFolder: false,
            folderId: ''
        },
        {
            name: 'contact', icon: '☎️', title: 'Contact', isFolder: false,
            folderId: ''
        },
        {
            name: 'education', icon: '🏫', title: 'Education', isFolder: false,
            folderId: ''
        },
        {
            name: 'leadership', icon: '👑', title: 'Leadership', isFolder: false,
            folderId: ''
        },
        {
            name: 'help', icon: '🆘', title: 'Help', isFolder: false,
            folderId: ''
        },
        {
            name: 'github', icon: '🐱', title: 'GitHub', isFolder: false,
            folderId: ''
        },
        {
            name: 'linkedin', icon: '💼', title: 'LinkedIn', isFolder: false,
            folderId: ''
        },
        {
            name: 'email', icon: '✉️', title: 'Mail', isFolder: false,
            folderId: ''
        },
    ];

    const taskbaricons: AppItem[] = [

        {
            name: 'about', icon: '🧑‍💼', title: 'About', isFolder: false,
            folderId: ''
        },


        {
            name: 'contact', icon: '☎️', title: 'Contact', isFolder: false,
            folderId: ''
        },



        {
            name: 'linkedin', icon: '💼', title: 'LinkedIn', isFolder: false,
            folderId: ''
        },
        {
            name: 'email', icon: '✉️', title: 'Mail', isFolder: false,
            folderId: ''
        },
    ];


    const filteredApps = taskbarApps.filter(app =>
        app.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            visible: true
        });
    };


    const openWindow = (type: string) => {
        // Check if window is already open
        const existingWindow = windows.find(w => w.component === type && !w.isMinimized);
        if (existingWindow) {
            bringToFront(existingWindow.id);
            return;
        }

        // Check if window is minimized
        const minimizedWindow = windows.find(w => w.component === type && w.isMinimized);
        if (minimizedWindow) {
            restoreWindow(minimizedWindow.id);
            return;
        }



        const newWindow: WindowData = {
            id: `${type}-${Date.now()}`,
            title: type.charAt(0).toUpperCase() + type.slice(1),
            component: type,
            isMinimized: false,
            isMaximized: false,
            position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
            size: { width: 800, height: 600 },
            zIndex: nextZIndex,
        };

        setWindows(prev => [...prev, newWindow]);
        setNextZIndex(prev => prev + 1);
    };

    const closeWindow = (id: string) => {
        setWindows(prev => prev.filter(w => w.id !== id));
    };

    const minimizeWindow = (id: string) => {
        setWindows(prev => prev.map(w =>
            w.id === id ? { ...w, isMinimized: true } : w
        ));
    };

    const maximizeWindow = (id: string) => {
        setWindows(prev => prev.map(w =>
            w.id === id ? {
                ...w,
                isMaximized: !w.isMaximized,
                position: w.isMaximized ? w.position : { x: 0, y: 0 },
                size: w.isMaximized ? w.size : { width: window.innerWidth, height: window.innerHeight - 50 }
            } : w
        ));
    };

    const bringToFront = (id: string) => {
        setWindows(prev => prev.map(w =>
            w.id === id ? { ...w, zIndex: nextZIndex } : w
        ));
        setNextZIndex(prev => prev + 1);
    };

    const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
        setWindows(prev => prev.map(w =>
            w.id === id ? { ...w, position } : w
        ));
    };

    const restoreWindow = (id: string) => {
        setWindows(prev => prev.map(w =>
            w.id === id ? { ...w, isMinimized: false } : w
        ));
        bringToFront(id);
    };

    const getMinimizedWindows = () => {
        return windows.filter(w => w.isMinimized);
    };

    const isAppMinimized = (appName: string) => {
        return windows.some(w => w.component === appName && w.isMinimized);
    };

    return (
        <div
            className="h-screen w-screen bg-gradient-to-br from-blue-900 to-purple-900 relative overflow-hidden"
            onContextMenu={handleContextMenu}
            onClick={(e) => {
                // Only close context menu if clicking empty space
                if (e.target === e.currentTarget) {
                    setContextMenu({ x: 0, y: 0, visible: false });
                }
            }}
            style={{
                backgroundImage: "url('/images/bg.jpg')",
                backgroundSize: 'cover',
            }}

        >
            {/* Desktop Background */}
            <div
                className={`absolute inset-0 bg-cover bg-center transition-all duration-500 z-0 ${isRefreshing ? 'opacity-0' : 'opacity-100'}`}

                onContextMenu={handleContextMenu}
            />

            {/* Brightness Overlay - Full screen blackout */}
            <div
                className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300 z-40"
                style={{ opacity: (100 - brightness) / 100 }}
            />

            {/* Context Menu */}

            {contextMenu.visible && (
                <>
                    <div
                        className="fixed inset-0 z-45"
                        onClick={() => setContextMenu({ x: 0, y: 0, visible: false })}
                    />
                    <div
                        className="absolute bg-gray-800 bg-opacity-95 backdrop-blur-lg rounded-lg border border-gray-600 shadow-2xl z-50 py-2 min-w-60"
                        style={{
                            left: Math.min(contextMenu.x, window.innerWidth - 200),
                            top: Math.min(contextMenu.y, window.innerHeight - 200),
                            padding: '0.5rem'
                        }}
                    >
                        <div className="px-4 py-2 text-gray-300 text-sm border-b border-gray-600 flex items-center space-x-3"
                            style={{ padding: '0.5rem' }}
                        >
                            <span>🔧</span>
                            <span>Sort by</span>
                        </div>
                        <button
                            onClick={() => {
                                setSortOrder('default');
                                setContextMenu({ x: 0, y: 0, visible: false });
                            }}
                            style={{ padding: '0.5rem' }}
                            className={`w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center justify-between ${sortOrder === 'default' ? 'bg-gray-700' : ''}`}
                        >
                            <span className="flex items-center space-x-3">
                                <span>📋</span>
                                <span>Default</span>
                            </span>
                            {sortOrder === 'default' && <span className="text-blue-400">✓</span>}
                        </button>
                        <button
                            onClick={() => {
                                setSortOrder('a-z');
                                setContextMenu({ x: 0, y: 0, visible: false });
                            }}
                            style={{ padding: '0.5rem' }}
                            className={`w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center justify-between ${sortOrder === 'a-z' ? 'bg-gray-700' : ''}`}
                        >
                            <span className="flex items-center space-x-3">
                                <span>🔤</span>
                                <span>A - Z</span>
                            </span>
                            {sortOrder === 'a-z' && <span className="text-blue-400">✓</span>}
                        </button>
                        <button
                            onClick={() => {
                                setSortOrder('z-a');
                                setContextMenu({ x: 0, y: 0, visible: false });
                            }}
                            style={{ padding: '0.5rem' }}
                            className={`w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center justify-between ${sortOrder === 'z-a' ? 'bg-gray-700' : ''}`}
                        >
                            <span className="flex items-center space-x-3">
                                <span>🔤</span>
                                <span>Z - A</span>
                            </span>
                            {sortOrder === 'z-a' && <span className="text-blue-400">✓</span>}
                        </button>
                        <div className="border-t border-gray-600 mt-2 pt-2"  >
                            <button
                                onClick={handleRefresh}
                                className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center space-x-3"
                                style={{ padding: '0.5rem' }}
                            >
                                <span>🔄</span>
                                <span>Refresh</span>
                            </button>
                            <button
                                onClick={() => {
                                    onSwitchToTerminal();
                                    setContextMenu({ x: 0, y: 0, visible: false });
                                }}
                                className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center space-x-3"
                                style={{ padding: '0.5rem' }}
                            >
                                <span>🖥️</span>
                                <span>Switch to Terminal</span>
                            </button>
                            <button
                                onClick={handleCreateFolder}
                                style={{ padding: '0.5rem' }}
                                className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center space-x-3"
                            >
                                <span>📁</span>
                                <span>New Folder</span>
                            </button>
                        </div>
                    </div>
                </>
            )}




            {/* Desktop Icons */}
            <div className="absolute top-20 left-8 right-8 z-30">
                <div className="grid grid-cols-8 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-x-8 gap-y-6 auto-rows-min">
                    {getSortedApps().map((item, index) => (

                        <div
                            key={item.name}
                            className="flex flex-col items-center cursor-pointer group"
                             onDoubleClick={() => item.isFolder ? openWindow('folder') : handleIconClick(item.name)}
                            style={{ userSelect: 'none' }}
                        >
                            <div className="w-20 h-20 bg-gray-300 bg-opacity-40 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-opacity-60 transition-all duration-200 group-hover:scale-105 border border-white border-opacity-30 shadow-lg">
                                {!item.isFolder ? (
                                    <>
                                        <img
                                            src={`/icons/${item.name}.png`}
                                            alt={item.title}
                                            className="w-12 h-12 object-contain"
                                            onError={(e) => {
                                                const target = e.currentTarget;
                                                const fallback = target.parentElement?.querySelector('.fallback-icon');
                                                if (fallback) {
                                                    target.style.display = 'none';
                                                    (fallback as HTMLElement).style.display = 'block';
                                                }
                                            }}
                                        />
                                        <span className="text-3xl fallback-icon" style={{ display: 'none' }}>
                                            {item.icon}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-3xl">{item.icon}</span>
                                )}
                            </div>
                            {item.isFolder && folders.find(f => f.id === item.folderId)?.isEditing ? (
                                <input
                                    type="text"
                                    value={item.title}
                                    onChange={(e) => updateFolderName(item.folderId, e.target.value)}
                                    onBlur={() => finishEditingFolder(item.folderId)}
                                    onKeyDown={(e) => e.key === 'Enter' && finishEditingFolder(item.folderId)}
                                    className="text-white text-sm mt-2 text-center px-2 py-1 rounded-md bg-black bg-opacity-50 border border-white border-opacity-30 max-w-20 outline-none"
                                    autoFocus
                                />
                            ) : (
                                <span className="text-white text-sm mt-2 text-center max-w-20 truncate drop-shadow-sm" style={{ paddingTop: '0.3rem' }}>
                                    {item.title}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Windows */}
            {windows.map(window => (
                !window.isMinimized && (
                    <Window
                        key={window.id}
                        id={window.id}
                        title={window.title}
                        component={window.component}
                        position={window.position}
                        size={window.size}
                        isMaximized={window.isMaximized}
                        zIndex={window.zIndex}
                        brightness={brightness}
                        onClose={closeWindow}
                        onMinimize={minimizeWindow}
                        onMaximize={maximizeWindow}
                        onBringToFront={bringToFront}
                        onUpdatePosition={updateWindowPosition}
                        openContactWindow={() => openWindow('contact')}
                    />
                )
            ))}

            {/* System Menu */}
            {showSystemMenu && (
                <SystemMenu
                    onClose={() => setShowSystemMenu(false)}
                    onSwitchToTerminal={onSwitchToTerminal}
                    onBrightnessChange={setBrightness}
                    brightness={brightness}
                />
            )}

            {/* Taskbar */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-800 bg-opacity-95 backdrop-blur-sm flex items-center justify-between px-4 border-t border-gray-600 z-30">
                {/* Search Bar */}
                <div className="flex items-center ">
                    <button
                        key={'projects'}
                        onClick={() => openWindow('projects')}
                        className={`flex flex-col items-center justify-center w-12 h-10 hover:bg-gray-700 rounded-lg transition-colors group relative ${isAppMinimized('projects') ? 'border-b-2 border-blue-400' : ''
                            }`}
                        title={'projects'}
                    >
                        <img
                            src={`/icons/projects.png`}
                            alt={'projects'}
                            className="w-7 h-7 object-contain"
                            onError={(e) => {
                                const target = e.currentTarget;
                                const fallback = target.parentElement?.querySelector('.fallback-icon');
                                if (fallback) {
                                    target.style.display = 'none';
                                    (fallback as HTMLElement).style.display = 'block';
                                }
                            }}
                        />
                    </button>
                    <div className=" left-1/4  p-2" >
                        <div className="flex items-center bg-white bg-opacity-40 backdrop-blur-lg rounded-full px-4 py-0.5 border border-black border-opacity-30 w-66">
                            {/* Search Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-600 mr-3 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-4.35-4.35M5 11a6 6 0 1112 0 6 6 0 01-12 0z"
                                />
                            </svg>

                            {/* Search Input */}
                            <input
                                type="text"
                                placeholder="Search applications..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent text-black placeholder-gray-600 outline-none w-full py-1 text-sm  "
                            />
                        </div>
                    </div>

                    {/* Start Button */}

                    {/* <button
                    onClick={onSwitchToTerminal}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                    <span className="text-white">🖥️</span>
                    <span className="text-white text-sm">Terminal</span>
                </button> */}

                    {/* App Icons */}
                    <div className="flex items-center space-x-2">
                        {taskbaricons.map(app => (
                            <button
                                key={app.name}
                                onClick={() => handleIconClick(app.name)}
                                className={`flex flex-col items-center justify-center w-12 h-10 hover:bg-gray-700 rounded-lg transition-colors group relative ${isAppMinimized(app.name) ? 'border-b-2 border-blue-400' : ''
                                    }`}
                                title={app.title}
                            >
                                <img
                                    src={`/icons/${app.name}.png`}
                                    alt={app.title}
                                    className="w-7 h-7 object-contain"
                                    onError={(e) => {
                                        const target = e.currentTarget;
                                        const fallback = target.parentElement?.querySelector('.fallback-icon');
                                        if (fallback) {
                                            target.style.display = 'none';
                                            (fallback as HTMLElement).style.display = 'block';
                                        }
                                    }}
                                />
                                <span className="text-3xl fallback-icon" style={{ display: 'none' }}>
                                    {app.icon}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
                {/* System Tray */}
                <div className="flex items-center space-x-1">
                    <span className="text-white text-sm">{currentTime}</span>
                    <button
                        onClick={() => setShowSystemMenu(!showSystemMenu)}
                        className="text-white hover:bg-gray-700 px-2 py-1 rounded transition-colors"
                    >
                        ⚙️
                    </button>

                </div>
            </div>
        </div>
    );
}