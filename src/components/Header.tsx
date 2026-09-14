import React from 'react';
import { useCafe } from '../context/CafeContext';
import { 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  FastForward, 
  RotateCcw, 
  Sparkles, 
  MapPin 
} from 'lucide-react';
import { formatTimeHM } from '../utils/pricing';

export const Header: React.FC = () => {
  const { 
    viewMode, 
    setViewMode, 
    simulatedTime, 
    advanceTimeMinutes, 
    resetToRealTime, 
    soundEnabled, 
    toggleSound,
    resetAllDemoData 
  } = useCafe();

  return (
    <header className="sticky top-0 z-40 bg-[#121c15]/95 backdrop-blur-md border-b-2 border-[#2d4233] shadow-md shadow-black/60">
      {/* Top Demo Simulation Bar with Game Boy LCD Green & Stone Styling */}
      <div className="bg-[#0b140d] border-b border-[#223326] px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Cafe Local Time & Battery Indicator */}
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#162419] border border-[#2d4233] text-[10px] font-pixel text-[#8bac0f]">
              <span className="h-2 w-2 rounded-full bg-[#8bac0f] animate-pulse"></span>
              JABALPUR TIME:
            </span>
            <span className="font-lcd text-lg tracking-widest text-[#9bbc0f] font-bold">
              {formatTimeHM(simulatedTime)}
            </span>
            <span className="text-[10px] text-[#8e9982] font-mono hidden sm:inline">
              ({simulatedTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })})
            </span>
          </div>

          {/* Time Simulation Quick Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="text-[10px] font-pixel text-[#8e9982] flex items-center gap-1 mr-1">
              <FastForward className="w-3 h-3 text-[#c78918]" />
              TIME WARP:
            </span>
            <button
              onClick={() => advanceTimeMinutes(15)}
              title="Fast forward 15 mins (test 15m grace period)"
              className="px-2 py-0.5 rounded bg-[#1a2b1e] hover:bg-[#8bac0f]/20 text-[#ded9cb] hover:text-[#9bbc0f] font-mono text-[11px] border border-[#374e3c] transition-all cursor-pointer"
            >
              +15m <span className="text-[9px] text-[#c78918] hidden md:inline">(Grace test)</span>
            </button>
            <button
              onClick={() => advanceTimeMinutes(30)}
              className="px-2 py-0.5 rounded bg-[#1a2b1e] hover:bg-[#8bac0f]/20 text-[#ded9cb] hover:text-[#9bbc0f] font-mono text-[11px] border border-[#374e3c] transition-all cursor-pointer"
            >
              +30m
            </button>
            <button
              onClick={() => advanceTimeMinutes(60)}
              title="Fast forward 1 hour (test minute-by-minute overage)"
              className="px-2 py-0.5 rounded bg-[#1a2b1e] hover:bg-[#8bac0f]/20 text-[#ded9cb] hover:text-[#9bbc0f] font-mono text-[11px] border border-[#374e3c] transition-all cursor-pointer"
            >
              +1h <span className="text-[9px] text-[#8bac0f] hidden md:inline">(&gt;1h billing)</span>
            </button>
            <button
              onClick={resetToRealTime}
              title="Sync with real system clock"
              className="px-2 py-0.5 rounded bg-[#142017] hover:bg-[#1f3023] text-[#a4a090] hover:text-white font-mono text-[11px] border border-[#2b3c2e] transition-all cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span className="hidden sm:inline">Live</span>
            </button>
            <button
              onClick={resetAllDemoData}
              title="Reset all tables and reservations"
              className="ml-2 px-2 py-0.5 rounded bg-[#2e1614] hover:bg-[#421f1c] text-[#d68b80] font-mono text-[10px] border border-[#522924] transition-all cursor-pointer"
            >
              Reset Data
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Local Jabalpur Identity */}
        <div className="flex items-center gap-3">
          {/* Game Boy Handheld Icon Motif */}
          <div className="w-10 h-10 rounded-lg bg-[#1a291d] border-2 border-[#8bac0f] shadow-gb-pixel flex flex-col items-center justify-center p-1 relative">
            <div className="w-6 h-4 bg-[#8bac0f] rounded-xs mb-1 flex items-center justify-center">
              <span className="text-[6px] font-pixel text-[#0f1c12] font-bold">DMG</span>
            </div>
            <div className="flex items-center gap-1.5 w-full justify-center">
              <div className="w-2 h-2 rounded-full bg-[#3e4a30]" />
              <div className="flex gap-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#a8432a]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#a8432a]" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-sm sm:text-base font-bold tracking-wider text-[#e8e5db]">
                DHURANDHAR
              </span>
              <span className="text-[10px] font-pixel px-1.5 py-0.5 rounded bg-[#8bac0f]/20 text-[#9bbc0f] border border-[#8bac0f]/40">
                GAME BOY CAFE
              </span>
            </div>
            <p className="text-[11px] text-[#9fa893] font-mono flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#8bac0f]" />
              Jabalpur • Bhedaghat Road, Narmada Valley
            </p>
          </div>
        </div>

        {/* View Switcher & Audio */}
        <div className="flex items-center gap-3">
          {/* Sound Mute Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle retro audio"
            className="p-2 rounded-lg bg-[#19271c] border border-[#2d4233] text-[#ded9cb] hover:text-[#9bbc0f] hover:border-[#8bac0f]/60 transition-all cursor-pointer"
            title={soundEnabled ? '8-bit Audio ON' : '8-bit Audio MUTED'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#8bac0f]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#636b5d]" />
            )}
          </button>

          {/* Persona Switcher Tabs */}
          <div className="flex items-center p-1 bg-[#0f1911] rounded-xl border border-[#2d4233]">
            <button
              onClick={() => setViewMode('customer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-pixel transition-all cursor-pointer ${
                viewMode === 'customer'
                  ? 'bg-[#8bac0f] text-[#0f1c12] font-bold shadow-gb-pixel'
                  : 'text-[#8e9982] hover:text-[#ded9cb] hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              CUSTOMER
            </button>
            <button
              onClick={() => setViewMode('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-pixel transition-all cursor-pointer ${
                viewMode === 'admin'
                  ? 'bg-[#ded9cb] text-[#0f1c12] font-bold shadow-gb-pixel'
                  : 'text-[#8e9982] hover:text-[#ded9cb] hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              MANAGER
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
