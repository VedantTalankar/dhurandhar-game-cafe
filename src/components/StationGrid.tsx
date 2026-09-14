import React, { useState } from 'react';
import type { Station, StationType } from '../types';
import { StationCard } from './StationCard';
import { CircleDot, Gamepad2, Compass, Layers } from 'lucide-react';

interface StationGridProps {
  stations: Station[];
  onOpenBooking: (station: Station) => void;
}

export const StationGrid: React.FC<StationGridProps> = ({ stations, onOpenBooking }) => {
  const [filter, setFilter] = useState<'all' | StationType>('all');

  const filteredStations = filter === 'all' 
    ? stations 
    : stations.filter((s) => s.type === filter);

  const poolCount = stations.filter((s) => s.type === 'pool').length;
  const psCount = stations.filter((s) => s.type === 'playstation').length;
  const simCount = stations.filter((s) => s.type === 'simulator').length;

  return (
    <section className="space-y-6">
      {/* Category Filter Buttons in Game Boy / Stone Palette */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#223326] pb-4">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <button
            onClick={() => setFilter('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-pixel transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-[#ded9cb] text-[#0f1c12] font-bold shadow-gb-pixel'
                : 'bg-[#152218] text-[#8e9982] hover:text-[#ded9cb] border border-[#27382c]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            ALL STATIONS ({stations.length})
          </button>

          <button
            onClick={() => setFilter('pool')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-pixel transition-all cursor-pointer ${
              filter === 'pool'
                ? 'bg-[#8bac0f] text-[#0f1c12] font-bold shadow-gb-pixel'
                : 'bg-[#152218] text-[#8e9982] hover:text-[#9bbc0f] border border-[#27382c]'
            }`}
          >
            <CircleDot className="w-3.5 h-3.5 text-[#8bac0f]" />
            8-BALL POOL ({poolCount})
          </button>

          <button
            onClick={() => setFilter('playstation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-pixel transition-all cursor-pointer ${
              filter === 'playstation'
                ? 'bg-[#8bac0f] text-[#0f1c12] font-bold shadow-gb-pixel'
                : 'bg-[#152218] text-[#8e9982] hover:text-[#ded9cb] border border-[#27382c]'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5 text-[#ded9cb]" />
            PLAYSTATION 5 ({psCount})
          </button>

          <button
            onClick={() => setFilter('simulator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-pixel transition-all cursor-pointer ${
              filter === 'simulator'
                ? 'bg-[#c78918] text-[#0f1c12] font-bold shadow-gb-pixel'
                : 'bg-[#152218] text-[#8e9982] hover:text-[#c78918] border border-[#27382c]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#c78918]" />
            RACING SIMULATOR ({simCount})
          </button>
        </div>

        {/* Legend in Game Boy & Stone Theme */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-[#8e9982]">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-xs bg-[#8bac0f]"></span>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-xs bg-[#ded9cb]"></span>
            <span>Reserved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-xs bg-[#9bbc0f] animate-ping"></span>
            <span>In Session</span>
          </div>
        </div>
      </div>

      {/* Grid of Station Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStations.map((station) => (
          <StationCard
            key={station.id}
            station={station}
            onOpenBooking={onOpenBooking}
          />
        ))}
      </div>
    </section>
  );
};
