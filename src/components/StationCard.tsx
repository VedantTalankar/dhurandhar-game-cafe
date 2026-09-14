import React, { useState, useEffect } from 'react';
import type { Station } from '../types';
import { useCafe } from '../context/CafeContext';
import { 
  CircleDot, 
  Gamepad2, 
  Compass, 
  Clock, 
  User, 
  AlertTriangle, 
  Play, 
  Ban, 
  PlusCircle, 
  ReceiptText, 
  Sparkles,
  Users
} from 'lucide-react';
import { 
  formatCurrency, 
  formatDuration, 
  formatTimeHM, 
  calculateSessionCost, 
  isOverdueForRevocation,
  getMinutesPastReservation
} from '../utils/pricing';

interface StationCardProps {
  station: Station;
  onOpenBooking: (station: Station) => void;
}

export const StationCard: React.FC<StationCardProps> = ({ 
  station, 
  onOpenBooking,
}) => {
  const { 
    viewMode, 
    simulatedTime, 
    startSession, 
    revokeReservation, 
    extendSession, 
    endSession 
  } = useCafe();

  const [showExtendMenu, setShowExtendMenu] = useState(false);

  // Determine current status
  const isActive = !!station.activeSession;
  const isReserved = !isActive && !!station.currentReservation;
  const isAvailable = !isActive && !isReserved;

  // Compute live elapsed time if active session
  const [elapsedMinutes, setElapsedMinutes] = useState<number>(0);
  const [liveCost, setLiveCost] = useState<number>(0);

  useEffect(() => {
    if (!station.activeSession) return;

    const startMs = new Date(station.activeSession.startedAt).getTime();
    const currMs = simulatedTime.getTime();
    const mins = Math.max(0, Math.floor((currMs - startMs) / (1000 * 60)));
    setElapsedMinutes(mins);

    const costObj = calculateSessionCost(mins || 1, station.activeSession.hourlyRate);
    setLiveCost(costObj.totalCost);
  }, [station.activeSession, simulatedTime]);

  // Check overdue condition for reservation (15 mins past start)
  const isOverdue = isReserved && isOverdueForRevocation(station.currentReservation!.startTime, simulatedTime);
  const minutesPast = isReserved ? getMinutesPastReservation(station.currentReservation!.startTime, simulatedTime) : 0;

  // Station type badge colors & icon
  const getTypeBadge = () => {
    switch (station.type) {
      case 'pool':
        return {
          icon: <CircleDot className="w-3.5 h-3.5 text-[#8bac0f]" />,
          label: '8-BALL POOL',
          color: 'text-[#8bac0f] border-[#3e4a30] bg-[#1a2711]',
        };
      case 'playstation':
        return {
          icon: <Gamepad2 className="w-3.5 h-3.5 text-[#ded9cb]" />,
          label: 'PLAYSTATION 5',
          color: 'text-[#ded9cb] border-[#383e35] bg-[#1c241e]',
        };
      case 'simulator':
        return {
          icon: <Compass className="w-3.5 h-3.5 text-[#c78918]" />,
          label: 'RACING SIM',
          color: 'text-[#c78918] border-[#524436] bg-[#211d17]',
        };
    }
  };

  const badgeInfo = getTypeBadge();

  return (
    <div
      className={`relative rounded-2xl bg-[#142117] border-2 transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-gb-pixel ${
        isActive
          ? 'border-[#8bac0f] bg-[#17261a]'
          : isReserved
          ? isOverdue
            ? 'border-[#a8432a] bg-[#211715]'
            : 'border-[#ded9cb]/60 bg-[#16241b]'
          : 'border-[#2d4233] hover:border-[#3e5643]'
      }`}
    >
      {/* Top Marble & Stone Accent Stripe */}
      <div
        className={`h-1.5 w-full ${
          isActive
            ? 'bg-[#8bac0f]'
            : isReserved
            ? isOverdue
              ? 'bg-[#a8432a] animate-pulse'
              : 'bg-[#ded9cb]'
            : 'bg-[#223326]'
        }`}
      />

      <div className="p-5 flex-1 flex flex-col">
        {/* Header: Type Tag & Status Pills */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-pixel border ${badgeInfo.color}`}>
            {badgeInfo.icon}
            <span>{badgeInfo.label}</span>
          </div>

          {/* Status Indicators */}
          {isAvailable && (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-pixel text-[#8bac0f] bg-[#1a2711] border border-[#3e4a30]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8bac0f]"></span>
              OPEN / FREE
            </span>
          )}

          {isReserved && (
            <span
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-pixel border ${
                isOverdue
                  ? 'text-[#f5a191] bg-[#421b16] border-[#a8432a] animate-pulse'
                  : 'text-[#ded9cb] bg-[#1c2920] border-[#ded9cb]/40'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${isOverdue ? 'bg-[#a8432a]' : 'bg-[#ded9cb]'}`}></span>
              {isOverdue ? 'NO-SHOW (15m+ LATE)' : 'RESERVED'}
            </span>
          )}

          {isActive && (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-pixel text-[#8bac0f] bg-[#1a2711] border border-[#8bac0f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8bac0f] animate-ping"></span>
              PLAYING NOW
            </span>
          )}
        </div>

        {/* Station Name */}
        <h3 className="font-pixel text-base font-bold text-[#e8e5db] tracking-wide">
          {station.name}
        </h3>

        {/* Pricing Specs in Marble/Stone Frame */}
        <div className="mt-2.5 py-2 px-3 rounded-lg bg-[#0e1710] border border-[#27382c] text-xs flex flex-wrap items-center justify-between gap-2">
          {station.type === 'playstation' ? (
            <div className="w-full flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#8e9982]">1/2/4 PLAYERS:</span>
              <span className="text-[#ded9cb] font-semibold">
                ₹80 / ₹100 / ₹150 <span className="text-[#7d8774] font-normal">/hr</span>
              </span>
            </div>
          ) : (
            <div className="w-full flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#8e9982]">RATE:</span>
              <span className="text-[#8bac0f] font-bold">
                {formatCurrency(station.baseHourlyRate)} <span className="text-[#7d8774] font-normal">/hr</span>
                <span className="text-[10px] text-[#bcb6a5] ml-1 font-normal">
                  (₹{(station.baseHourlyRate / 60).toFixed(1)}/min after 1h)
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Dynamic Card Body based on Status */}
        <div className="mt-4 flex-1">
          {/* 1. AVAILABLE STATE */}
          {isAvailable && (
            <div className="h-full flex flex-col justify-center py-3 text-center">
              <p className="text-xs text-[#bcb6a5] mb-2 font-sans">
                Station is open. Walk in or book a slot up to 2 hours in advance.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {station.features.slice(0, 2).map((feat, idx) => (
                  <span key={idx} className="text-[10px] text-[#7d8774] font-mono bg-[#0c160e] px-2 py-0.5 rounded border border-[#223326]">
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 2. RESERVED STATE - SHOWING FOR HOW MUCH TIME THE TABLE IS BOOKED */}
          {isReserved && station.currentReservation && (
            <div className="space-y-3 rounded-xl bg-[#0f1a12] p-3.5 border border-[#2d4233]">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-[#ded9cb] font-medium">
                  <User className="w-3.5 h-3.5 text-[#8bac0f]" />
                  <span>{station.currentReservation.customerName}</span>
                </div>
                {station.currentReservation.playersCount && (
                  <span className="text-[10px] font-pixel text-[#ded9cb] flex items-center gap-1 bg-[#1a2711] px-1.5 py-0.5 rounded border border-[#3e4a30]">
                    <Users className="w-3 h-3" /> {station.currentReservation.playersCount}P
                  </span>
                )}
              </div>

              {/* Requirement: Shows for how much time the table is booked */}
              <div className="p-2.5 rounded-lg bg-[#142217] border border-[#8bac0f]/40">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#8e9982] font-mono text-[11px] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#8bac0f]" />
                    BOOKED DURATION:
                  </span>
                  <span className="font-pixel font-bold text-[#9bbc0f] text-xs sm:text-sm">
                    {formatDuration(station.currentReservation.durationMinutes)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#bcb6a5]">
                  <span>Reserved Slot:</span>
                  <span className="text-[#e8e5db] font-semibold">
                    {formatTimeHM(station.currentReservation.startTime)} – {formatTimeHM(station.currentReservation.expectedEndTime)}
                  </span>
                </div>
              </div>

              {/* Overdue alert banner if customer has not arrived within 15 minutes */}
              {isOverdue && (
                <div className="p-2.5 rounded-lg bg-[#3a1612] border border-[#a8432a] text-[#f5a191] text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#f5a191] animate-bounce" />
                  <div>
                    <p className="font-bold font-pixel tracking-wide text-[11px]">
                      GRACE EXPIRED ({minutesPast}m LATE)
                    </p>
                    <p className="text-[10px] text-[#ded9cb]/80 mt-0.5">
                      Customer did not arrive within 15 minutes. Admin may revoke this table to make it free.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. ACTIVE SESSION STATE (LIVE GAME BOY LCD TIMER & MINUTE-BY-MINUTE BILL) */}
          {isActive && station.activeSession && (
            <div className="space-y-3 rounded-xl bg-[#121f14] p-3.5 border-2 border-[#8bac0f]/50">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-[#ded9cb] font-medium">
                  <User className="w-3.5 h-3.5 text-[#8bac0f]" />
                  <span>{station.activeSession.customerName}</span>
                </div>
                <span className="text-[10px] text-[#8e9982]">
                  Started: {formatTimeHM(station.activeSession.startedAt)}
                </span>
              </div>

              {/* Game Boy LCD Screen Box */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-[#1a2711] border border-[#3e4a30] text-center">
                  <span className="text-[9px] text-[#8bac0f] font-pixel block mb-0.5">
                    TIME PLAYED
                  </span>
                  <span className="font-lcd text-2xl font-bold text-[#9bbc0f] block leading-none">
                    {formatDuration(elapsedMinutes)}
                  </span>
                  <span className="text-[9px] text-[#6c8052] font-mono block mt-1">
                    Booked: {formatDuration(station.activeSession.plannedDurationMinutes)}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#1a2711] border border-[#3e4a30] text-center">
                  <span className="text-[9px] text-[#8bac0f] font-pixel block mb-0.5">
                    LIVE RUNNING BILL
                  </span>
                  <span className="font-lcd text-2xl font-bold text-[#ded9cb] block leading-none">
                    {formatCurrency(liveCost)}
                  </span>
                  <span className="text-[9px] text-[#6c8052] font-mono block mt-1">
                    {elapsedMinutes <= 60
                      ? 'Base 1h rate'
                      : `+${elapsedMinutes - 60}m @ ₹${station.activeSession.minuteRate.toFixed(1)}/m`}
                  </span>
                </div>
              </div>

              {station.activeSession.extendedMinutes > 0 && (
                <div className="text-[10px] font-mono text-[#8bac0f] flex items-center gap-1 bg-[#1a2711] px-2 py-1 rounded border border-[#3e4a30]">
                  <Sparkles className="w-3 h-3" /> Extended by +{station.activeSession.extendedMinutes} mins
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Controls Footer */}
        <div className="mt-5 pt-3 border-t border-[#25372a]">
          {viewMode === 'customer' ? (
            /* CUSTOMER ACTIONS */
            <div>
              {isAvailable ? (
                <button
                  onClick={() => onOpenBooking(station)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#8bac0f] hover:bg-[#9bbc0f] text-[#0f1c12] font-pixel font-bold text-xs tracking-wider shadow-gb-pixel transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 border border-[#9bbc0f]"
                >
                  <Sparkles className="w-4 h-4" />
                  RESERVE THIS TABLE
                </button>
              ) : isReserved ? (
                <div className="w-full py-2 px-3 rounded-xl bg-[#101912] border border-[#27382c] text-center">
                  <span className="text-[11px] font-mono text-[#bcb6a5] block">
                    Booked until {formatTimeHM(station.currentReservation!.expectedEndTime)}
                  </span>
                  <span className="text-[10px] text-[#8bac0f] font-mono">
                    (Next reservation slot opens after session)
                  </span>
                </div>
              ) : (
                <div className="w-full py-2 px-3 rounded-xl bg-[#101912] border border-[#27382c] text-center">
                  <span className="text-[11px] font-mono text-[#bcb6a5] block">
                    Currently In Play
                  </span>
                  <span className="text-[10px] text-[#8bac0f] font-mono">
                    Check back shortly
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* MANAGER / ADMIN ACTIONS */
            <div className="space-y-2">
              {isAvailable && (
                <button
                  onClick={() => onOpenBooking(station)}
                  className="w-full py-2 px-3 rounded-xl bg-[#192b1e] hover:bg-[#243a2b] text-[#ded9cb] border border-[#3e5643] font-pixel text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 text-[#8bac0f]" />
                  MANUAL / WALK-IN BOOK
                </button>
              )}

              {isReserved && (
                <div className="grid grid-cols-2 gap-2">
                  {/* Start Session Button */}
                  <button
                    onClick={() => startSession(station.id)}
                    className="py-2 px-2 rounded-xl bg-[#8bac0f] hover:bg-[#9bbc0f] text-[#0f1c12] font-pixel font-bold text-[11px] shadow-gb-pixel transition-all cursor-pointer flex items-center justify-center gap-1 border border-[#9bbc0f]"
                    title="Customer arrived - start active session and timer"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#0f1c12]" />
                    START SESSION
                  </button>

                  {/* Revoke Table Button */}
                  <button
                    onClick={() => revokeReservation(station.id)}
                    className={`py-2 px-2 rounded-xl font-pixel text-[11px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      isOverdue
                        ? 'bg-[#a8432a] text-white hover:bg-[#c24f33] shadow-gb-pixel animate-pulse font-bold border border-[#f5a191]'
                        : 'bg-[#291715] text-[#d68b80] hover:bg-[#3d201c] border border-[#522924]'
                    }`}
                    title={
                      isOverdue
                        ? 'Revoke table: Customer did not arrive within 15 minutes'
                        : 'Revoke table (frees immediately)'
                    }
                  >
                    <Ban className="w-3.5 h-3.5" />
                    REVOKE TABLE
                  </button>
                </div>
              )}

              {isActive && (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Extend Menu Button */}
                    <div className="relative">
                      <button
                        onClick={() => setShowExtendMenu(!showExtendMenu)}
                        className="w-full py-2 px-2 rounded-xl bg-[#1b2b1e] hover:bg-[#263c2b] text-[#ded9cb] hover:text-[#9bbc0f] border border-[#3e5643] font-pixel text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        EXTEND
                      </button>

                      {showExtendMenu && (
                        <div className="absolute bottom-full left-0 mb-2 w-36 bg-[#162419] border-2 border-[#2d4233] rounded-xl shadow-2xl p-1.5 z-20 space-y-1">
                          <span className="text-[10px] text-[#8e9982] font-pixel px-2 py-0.5 block">
                            EXTEND TIME:
                          </span>
                          <button
                            onClick={() => {
                              extendSession(station.id, 15);
                              setShowExtendMenu(false);
                            }}
                            className="w-full text-left px-2 py-1 text-xs font-mono text-[#ded9cb] hover:bg-[#8bac0f]/20 hover:text-[#9bbc0f] rounded transition-colors cursor-pointer"
                          >
                            +15 Minutes
                          </button>
                          <button
                            onClick={() => {
                              extendSession(station.id, 30);
                              setShowExtendMenu(false);
                            }}
                            className="w-full text-left px-2 py-1 text-xs font-mono text-[#ded9cb] hover:bg-[#8bac0f]/20 hover:text-[#9bbc0f] rounded transition-colors cursor-pointer"
                          >
                            +30 Minutes
                          </button>
                          <button
                            onClick={() => {
                              extendSession(station.id, 60);
                              setShowExtendMenu(false);
                            }}
                            className="w-full text-left px-2 py-1 text-xs font-mono text-[#ded9cb] hover:bg-[#8bac0f]/20 hover:text-[#9bbc0f] rounded transition-colors cursor-pointer"
                          >
                            +1 Hour
                          </button>
                        </div>
                      )}
                    </div>

                    {/* End & Settle Bill */}
                    <button
                      onClick={() => endSession(station.id)}
                      className="py-2 px-2 rounded-xl bg-[#ded9cb] hover:bg-[#f0ebe0] text-[#0f1c12] font-pixel font-bold text-[11px] shadow-gb-pixel transition-all cursor-pointer flex items-center justify-center gap-1 border border-[#e8e5db]"
                      title="End session and generate minute-by-minute bill"
                    >
                      <ReceiptText className="w-3.5 h-3.5" />
                      END &amp; BILL
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
