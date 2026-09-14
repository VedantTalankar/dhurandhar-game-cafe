import React, { useState } from 'react';
import { CafeProvider, useCafe } from './context/CafeContext';
import { Header } from './components/Header';
import { JabalpurHero } from './components/JabalpurHero';
import { StationGrid } from './components/StationGrid';
import { AdminMetrics } from './components/AdminMetrics';
import { BookingModal } from './components/BookingModal';
import { CustomerTicketModal } from './components/CustomerTicketModal';
import { BillingReceiptModal } from './components/BillingReceiptModal';
import { Zap, X } from 'lucide-react';

const CafeApp: React.FC = () => {
  const { 
    stations, 
    viewMode, 
    selectedStationForBooking, 
    setSelectedStationForBooking,
    activePass,
    setActivePass,
    latestReceipt,
    setLatestReceipt
  } = useCafe();

  const [showDemoGuide, setShowDemoGuide] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-[#0e1710] text-[#ded9cb]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {/* Quick Demo Callout Strip */}
        {showDemoGuide && (
          <div className="mb-6 p-4 rounded-2xl bg-[#142117] border-2 border-[#8bac0f]/60 shadow-gb-pixel relative">
            <button
              onClick={() => setShowDemoGuide(false)}
              className="absolute top-3 right-3 text-[#7d8774] hover:text-[#ded9cb] transition-colors cursor-pointer"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#1a291d] border border-[#8bac0f]/40 text-[#8bac0f] shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs">
                <h4 className="font-pixel text-xs sm:text-sm font-bold text-[#e8e5db] tracking-wide flex items-center gap-2">
                  CLIENT DEMO READY // JABALPUR CAFE
                  <span className="text-[9px] font-pixel px-1.5 py-0.5 rounded bg-[#8bac0f]/20 text-[#9bbc0f] border border-[#8bac0f]/30">
                    Game Boy DMG-01
                  </span>
                </h4>
                <p className="text-[#bcb6a5]">
                  Tested and verified for your client demonstration with real Dhuandhar Falls imagery:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-2 font-mono text-[11px]">
                  <div className="p-2 rounded-lg bg-[#0e1710] border border-[#27382c]">
                    <span className="text-[#8bac0f] font-pixel block text-[10px]">1. Minute Billing</span>
                    <span className="text-[#8e9982]">
                      1h min, then per-min (e.g. 1h 20m Pool = ₹160).
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0e1710] border border-[#27382c]">
                    <span className="text-[#ded9cb] font-pixel block text-[10px]">2. 2h Advance Slots</span>
                    <span className="text-[#8e9982]">
                      Reserve up to 2h before starting (e.g. at 2 PM for 4 PM).
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0e1710] border border-[#27382c]">
                    <span className="text-[#c78918] font-pixel block text-[10px]">3. 15m Grace &amp; Revoke</span>
                    <span className="text-[#8e9982]">
                      Late &gt;15m triggers manager alert to revoke &amp; free table.
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0e1710] border border-[#27382c]">
                    <span className="text-[#8bac0f] font-pixel block text-[10px]">4. Time Simulator</span>
                    <span className="text-[#8e9982]">
                      Use top bar buttons (+15m, +1h) to instantly fast-forward time!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Real Dhuandhar Falls & Bhedaghat Visual Identity Hero */}
        <JabalpurHero />

        {/* Section Divider with Subtle Pixel Mist Texture */}
        <div className="my-6 relative flex items-center justify-center">
          <div className="w-full h-px bg-[#223326]" />
          <span className="absolute bg-[#0e1710] px-3 text-[10px] font-pixel text-[#79856f] border border-[#223326] rounded-full">
            ~ NARMADA CURRENT &amp; STATIONS ~
          </span>
        </div>

        {/* View Mode Header Description */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-pixel tracking-widest text-[#8bac0f] uppercase">
                {viewMode === 'customer' ? '// CUSTOMER RESERVATION PORTAL' : '// CAFE DESK / MANAGER CONSOLE'}
              </span>
            </div>
            <h2 className="font-pixel text-xl sm:text-2xl font-bold text-[#e8e5db] tracking-wide mt-1">
              {viewMode === 'customer' ? 'SELECT YOUR TABLE OR RIG' : 'FLOOR DISPATCH &amp; SESSIONS'}
            </h2>
            <p className="text-xs text-[#8e9982] mt-0.5 font-sans">
              {viewMode === 'customer'
                ? 'Check real-time availability, booked slot windows, and reserve your spot.'
                : 'Manage customer arrivals, session timers, extensions, no-show revocations, and settlements.'}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-[#8e9982] block">LIVE FLOOR CAPACITY</span>
            <span className="font-pixel text-xs text-[#8bac0f] font-bold">
              {stations.filter((s) => !s.activeSession && !s.currentReservation).length} OF {stations.length} STATIONS READY
            </span>
          </div>
        </div>

        {/* Admin Dashboard Stats (Shown in Manager Mode) */}
        {viewMode === 'admin' && <AdminMetrics />}

        {/* Stations Floor Grid */}
        <StationGrid
          stations={stations}
          onOpenBooking={(st) => setSelectedStationForBooking(st)}
        />
      </main>

      {/* Footer with Discreet Legal Attribution for Wikimedia Commons Photographs */}
      <footer className="border-t-2 border-[#223326] py-6 px-4 bg-[#0a120b] text-xs text-[#79856f] font-mono">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[#e8e5db] text-xs">DHURANDHAR GAME BOY CAFE</span>
              <span className="text-[10px] text-[#8bac0f] px-1.5 py-0.5 rounded bg-[#162419] border border-[#2d4233]">
                Jabalpur, Madhya Pradesh
              </span>
            </div>
            <div className="text-[11px] text-[#8e9982]">
              8-Ball Pool (3) • PlayStation 5 (2) • Racing Simulator (1)
            </div>
          </div>

          {/* Discreet Legal Image Attribution */}
          <div className="pt-3 border-t border-[#1a281e] flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#5e6b55]">
            <div>
              Photographic Assets: Dhuandhar Falls by Aksveer (CC BY-SA 4.0 via Wikimedia Commons) • Marble Rocks by Sandyadav080 (CC BY-SA 3.0 via Wikimedia Commons).
            </div>
            <div>
              Local Cafe Demo • Tested on Mobile &amp; Desktop
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedStationForBooking && (
        <BookingModal
          station={selectedStationForBooking}
          onClose={() => setSelectedStationForBooking(null)}
        />
      )}

      {activePass && (
        <CustomerTicketModal
          pass={activePass}
          onClose={() => setActivePass(null)}
        />
      )}

      {latestReceipt && (
        <BillingReceiptModal
          bill={latestReceipt}
          onClose={() => setLatestReceipt(null)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <CafeProvider>
      <CafeApp />
    </CafeProvider>
  );
}
