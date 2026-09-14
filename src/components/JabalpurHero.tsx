import React from 'react';
import { MapPin } from 'lucide-react';

export const JabalpurHero: React.FC = () => {
  return (
    <div className="mb-8 space-y-4">
      {/* Hero Container with Game Boy Bezel & Real Dhuandhar Falls Photography */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-[#2d4233] bg-[#142117] shadow-gb-pixel">
        {/* Subtle Marble Rock Top Trim */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#8bac0f] via-[#ded9cb] to-[#4a6b63]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Column: Game Boy Styled Hero Intro */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between z-10 bg-gradient-to-b from-[#142117]/95 via-[#142117]/90 to-[#101912] lg:bg-none">
            <div className="space-y-3">
              {/* Badge: Local Location */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#1c2d20] border border-[#374e3c] text-xs font-pixel text-[#8bac0f]">
                <span className="w-2 h-2 rounded-xs bg-[#8bac0f]" />
                <span>BHEDAGHAT ROAD • JABALPUR, MP</span>
              </div>

              {/* Title combining Gaming Cafe & Local Dhuandhar Spirit */}
              <h1 className="font-pixel text-xl sm:text-2xl md:text-3xl font-bold text-[#e8e5db] leading-relaxed tracking-wide">
                WHERE NARMADA MIST MEETS RETRO GAMING.
              </h1>

              {/* Restrained Local Identity Narrative */}
              <p className="text-xs sm:text-sm text-[#bcb6a5] font-sans leading-relaxed max-w-xl">
                Jabalpur’s local gaming lounge pairing 90s handheld nostalgia with tournament-grade 
                8-ball pool, PlayStation 5 arenas, and racing motion cockpits. 
                Reserve by the hour, pay by the minute.
              </p>

              {/* Quick Spec Highlights */}
              <div className="grid grid-cols-3 gap-2 pt-2 font-mono text-[11px]">
                <div className="p-2 rounded bg-[#1b2b1e] border border-[#2d4233]">
                  <span className="text-[#8bac0f] font-pixel block text-[10px]">8-BALL POOL</span>
                  <span className="text-[#e8e5db] font-bold">₹120/hr</span>
                  <span className="text-[9px] text-[#8e9982] block">₹2.0/min</span>
                </div>
                <div className="p-2 rounded bg-[#1b2b1e] border border-[#2d4233]">
                  <span className="text-[#8bac0f] font-pixel block text-[10px]">PLAYSTATION 5</span>
                  <span className="text-[#e8e5db] font-bold">₹80–150/hr</span>
                  <span className="text-[9px] text-[#8e9982] block">1, 2, 4 Players</span>
                </div>
                <div className="p-2 rounded bg-[#1b2b1e] border border-[#2d4233]">
                  <span className="text-[#8bac0f] font-pixel block text-[10px]">RACING SIM</span>
                  <span className="text-[#e8e5db] font-bold">₹150/hr</span>
                  <span className="text-[9px] text-[#8e9982] block">Direct Drive</span>
                </div>
              </div>
            </div>

            {/* Subtle Local Geo Stamp */}
            <div className="mt-4 pt-3 border-t border-[#25372a] flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[#79856f]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#8bac0f]" />
                Coordinates: 23.1259° N, 79.8094° E
              </span>
              <span>15-min arrival grace window applies to all reservations</span>
            </div>
          </div>

          {/* Right Column: Real Dhuandhar Falls Photograph with Responsive Framing */}
          <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[260px] lg:min-h-full overflow-hidden border-t-2 lg:border-t-0 lg:border-l-2 border-[#2d4233] bg-[#0c160e]">
            {/* Real Photograph with Responsive Picture tag */}
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet="/images/dhuandhar/dhuandhar_hero_mobile.jpg"
              />
              <img
                src="/images/dhuandhar/dhuandhar_hero.jpg"
                alt="Real photograph of Dhuandhar Falls on the river Narmada near Jabalpur with mist and white water"
                className="w-full h-full object-cover object-center transform scale-100 filter contrast-105"
                loading="eager"
              />
            </picture>

            {/* Subtle Game Boy LCD Dot Matrix & Mist Overlay (Lightweight CSS) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1710] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(139,172,15,0.06)_1px,transparent_1px)] bg-[size:8px_8px]" />

            {/* Real Photographic Caption & Legal Attribution */}
            <div className="absolute bottom-2 left-2 right-2 p-2 rounded bg-[#0c160e]/85 backdrop-blur-xs border border-[#2d4233] text-[10px] font-mono flex items-center justify-between gap-2">
              <div className="truncate">
                <span className="text-[#ded9cb] font-semibold block truncate">
                  Dhuandhar Falls, Bhedaghat (Jabalpur)
                </span>
                <span className="text-[#7d8774] text-[9px] block">
                  Narmada River gorge &amp; smoky mist
                </span>
              </div>
              <a
                href="https://commons.wikimedia.org/wiki/File:Dhuandhar_Waterfalls.jpg"
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-[9px] text-[#8bac0f] hover:underline bg-[#162419] px-1.5 py-0.5 rounded border border-[#2d4233]"
                title="View original photograph on Wikimedia Commons"
              >
                Photo: Aksveer (CC BY-SA 4.0)
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Small Secondary Photographic Strip: Bhedaghat Marble Rocks Accent */}
      <div className="rounded-xl border border-[#2d4233] bg-[#121e15] p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Real Thumbnail of Marble Rocks */}
          <div className="w-14 h-11 rounded-lg overflow-hidden border border-[#3e4a30] shrink-0">
            <img
              src="/images/dhuandhar/bhedaghat_marble_rocks.jpg"
              alt="Bhedaghat Marble Rocks canyon cliffs, Jabalpur"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <span className="text-[#e8e5db] font-bold block text-xs">
              Bhedaghat White Marble Rocks
            </span>
            <span className="text-[10px] text-[#8e9982] block">
              Natural stone textures inspiring our lounge aesthetic
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[10px] text-[#79856f] w-full sm:w-auto justify-between sm:justify-end">
          <span className="hidden md:inline text-[#8bac0f]">
            ★ 3 Pool Tables • 2 PS5 Arenas • 1 Pro Sim
          </span>
          <a
            href="https://commons.wikimedia.org/wiki/File:Bhedaghat_Marble_Rocks.jpg"
            target="_blank"
            rel="noreferrer"
            className="text-[9px] text-[#8bac0f] hover:underline"
          >
            Photo: Sandyadav080 (CC BY-SA 3.0)
          </a>
        </div>
      </div>
    </div>
  );
};
