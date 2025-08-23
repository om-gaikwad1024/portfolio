'use client';

import { useState } from 'react';

interface SystemMenuProps {
    onClose: () => void;
    onSwitchToTerminal: () => void;
    onBrightnessChange: (brightness: number) => void;
    brightness: number;
}

export default function SystemMenu({ onClose, onSwitchToTerminal, onBrightnessChange, brightness  }: SystemMenuProps) {
    const [volume, setVolume] = useState(50);
    

    const handleTerminalSwitch = () => {
        onSwitchToTerminal();
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50"
                onClick={onClose}
            />


           {/* System Menu */}
<div className="absolute bottom-14 right-4 w-80 bg-gray-800 bg-opacity-95 backdrop-blur-lg rounded-lg border border-gray-600 shadow-2xl z-50 p-1.5">
                {/* Header */}
                <div className="p-4 border-b border-gray-600">
                    <h3 className="text-white font-semibold">System Controls</h3>
                </div>

                {/* Volume Control */}
                <div className="p-4 border-b border-gray-600">
                    <div className="flex items-center space-x-3 mb-2">
                        <span className="text-white text-sm">🔊</span>
                        <span className="text-white text-sm">Volume</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, #4b5563 ${volume}%, #4b5563 100%)`
                            }}
                        />
                        <span className="text-white text-sm w-8">{volume}</span>
                    </div>
                </div>

                {/* Brightness Control */}
                <div className="p-4 border-b border-gray-600">
                    <div className="flex items-center space-x-3 mb-2">
                        <span className="text-white text-sm">☀️</span>
                        <span className="text-white text-sm">Brightness</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={brightness}
                            onChange={(e) => onBrightnessChange(Number(e.target.value))}
                            className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <span className="text-white text-sm w-8">{brightness}</span>
                    </div>
                </div>

                <style jsx>{`
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #fbbf24;
    cursor: pointer;
  }
  .slider::-moz-range-thumb {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #fbbf24;
    cursor: pointer;
    border: none;
  }
`}</style>

                {/* Quick Actions */}
                <div className="p-4">
                    <button
                        onClick={handleTerminalSwitch}
                        className="w-full flex items-center space-x-3 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors justify-center"
                    >
                        <span>🖥️</span>
                        <span className="text-white">Switch to Terminal</span>
                    </button>
                </div>
            </div>
        </>
    );
}