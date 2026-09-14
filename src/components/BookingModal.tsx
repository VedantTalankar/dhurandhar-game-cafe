import React, { useState } from 'react';
import type { Station } from '../types';
import { useCafe } from '../context/CafeContext';
import { 
  X, 
  Clock, 
  Calendar, 
  User, 
  Phone, 
  Sparkles, 
  AlertCircle, 
  Info
} from 'lucide-react';
import { 
  formatCurrency, 
  formatDuration, 
  formatTimeHM, 
  calculateSessionCost, 
  getStationRates 
} from '../utils/pricing';

interface BookingModalProps {
  station: Station | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ station, onClose }) => {
  const { simulatedTime, reserveStation } = useCafe();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [playersCount, setPlayersCount] = useState<1 | 2 | 4>(1);
  const [advanceMinutes, setAdvanceMinutes] = useState<number>(0); // 0 = now, up to 120
  const [durationMinutes, setDurationMinutes] = useState<number>(60); // min 60
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!station) return null;

  // Calculate target start time based on advanceMinutes
  const startTime = new Date(simulatedTime.getTime() + advanceMinutes * 60 * 1000);
  const endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000);

  // Compute pricing
  const rates = getStationRates(station.type, playersCount);
  const costBreakdown = calculateSessionCost(durationMinutes, rates.hourly);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName.trim()) {
      setErrorMessage('Please enter customer name');
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMessage('Please enter customer phone number');
      return;
    }
    if (durationMinutes < 60) {
      setErrorMessage('Minimum reservation duration is 60 minutes (1 hour)');
      return;
    }

    const result = reserveStation({
      stationId: station.id,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      startTime,
      durationMinutes,
      playersCount: station.type === 'playstation' ? playersCount : undefined,
    });

    if (!result.success) {
      setErrorMessage(result.message);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#142117] border-2 border-[#8bac0f] rounded-2xl shadow-gb-pixel overflow-hidden my-8">
        {/* Top Marble Trim */}
        <div className="h-1.5 w-full bg-[#8bac0f]" />

        {/* Modal Header */}
        <div className="p-5 border-b border-[#25372a] flex items-center justify-between bg-[#111c14]">
          <div>
            <span className="text-[9px] font-pixel text-[#8bac0f] tracking-widest uppercase block">
              // JABALPUR CAFE • STATION RESERVATION
            </span>
            <h2 className="font-pixel text-lg font-bold text-[#e8e5db] tracking-wide">
              {station.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8e9982] hover:text-[#ded9cb] hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-[#3a1612] border border-[#a8432a] text-[#f5a191] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Customer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-[#bcb6a5] mb-1">
                CUSTOMER NAME *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#7d8774] absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g., Alex Mercer"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#0e1710] border border-[#2d4233] focus:border-[#8bac0f] rounded-xl text-xs text-[#ded9cb] placeholder:text-[#556353] outline-none transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#bcb6a5] mb-1">
                CONTACT PHONE *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#7d8774] absolute left-3 top-2.5" />
                <input
                  type="tel"
                  required
                  placeholder="e.g., +91 98765 43210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#0e1710] border border-[#2d4233] focus:border-[#8bac0f] rounded-xl text-xs text-[#ded9cb] placeholder:text-[#556353] outline-none transition-all font-mono"
                />
              </div>
            </div>
          </div>

          {/* PlayStation Player Selection */}
          {station.type === 'playstation' && (
            <div>
              <label className="block text-[11px] font-mono text-[#bcb6a5] mb-1.5 flex items-center justify-between">
                <span>SELECT NUMBER OF PLAYERS:</span>
                <span className="text-[#8bac0f] font-semibold">
                  {playersCount === 1 ? '₹80/hr' : playersCount === 2 ? '₹100/hr' : '₹150/hr'}
                </span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { count: 1, label: '1 Player', rate: '₹80/hr' },
                  { count: 2, label: '2 Players', rate: '₹100/hr' },
                  { count: 4, label: '4 Players', rate: '₹150/hr' },
                ].map((item) => (
                  <button
                    key={item.count}
                    type="button"
                    onClick={() => setPlayersCount(item.count as 1 | 2 | 4)}
                    className={`py-2 px-2 rounded-xl text-xs font-pixel flex flex-col items-center border transition-all cursor-pointer ${
                      playersCount === item.count
                        ? 'bg-[#8bac0f] text-[#0f1c12] border-[#8bac0f] shadow-gb-pixel font-bold'
                        : 'bg-[#121d15] border-[#2d4233] text-[#8e9982] hover:text-[#ded9cb]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[9px] font-mono mt-0.5">{item.rate}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Advance Slot Selection (Up to 2 Hours Beforehand Rule) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-mono text-[#bcb6a5] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#8bac0f]" />
                START TIME (UP TO 2 HOURS ADVANCE):
              </label>
              <span className="text-xs font-lcd text-lg font-bold text-[#8bac0f]">
                {formatTimeHM(startTime)}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {[
                { label: 'Now', mins: 0 },
                { label: '+30m', mins: 30 },
                { label: '+1h', mins: 60 },
                { label: '+1.5h', mins: 90 },
                { label: '+2h', mins: 120 },
              ].map((slot) => (
                <button
                  key={slot.mins}
                  type="button"
                  onClick={() => setAdvanceMinutes(slot.mins)}
                  className={`py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    advanceMinutes === slot.mins
                      ? 'bg-[#8bac0f] text-[#0f1c12] font-bold shadow-gb-pixel'
                      : 'bg-[#121d15] border border-[#2d4233] text-[#ded9cb] hover:border-[#8bac0f]/60'
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>

            <div className="mt-1.5 flex items-start gap-1.5 text-[10px] text-[#7d8774] font-mono">
              <Info className="w-3 h-3 shrink-0 mt-0.5 text-[#8bac0f]" />
              <span>
                Cafe rule: Slots can be booked up to 2 hours before start time (e.g. at 2 PM, book for 4 PM).
              </span>
            </div>
          </div>

          {/* Duration Selection (Minimum 1 hour rule) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-mono text-[#bcb6a5] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#8bac0f]" />
                RESERVATION DURATION (MIN 1 HOUR):
              </label>
              <span className="text-xs font-lcd text-lg font-bold text-[#8bac0f]">
                {formatDuration(durationMinutes)}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: '1 Hour', mins: 60 },
                { label: '1h 15m', mins: 75 },
                { label: '1h 30m', mins: 90 },
                { label: '2 Hours', mins: 120 },
              ].map((dur) => (
                <button
                  key={dur.mins}
                  type="button"
                  onClick={() => setDurationMinutes(dur.mins)}
                  className={`py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    durationMinutes === dur.mins
                      ? 'bg-[#ded9cb] text-[#0f1c12] font-bold shadow-gb-pixel'
                      : 'bg-[#121d15] border border-[#2d4233] text-[#ded9cb] hover:border-[#8bac0f]/60'
                  }`}
                >
                  {dur.label}
                </button>
              ))}
            </div>

            {/* Range Slider for custom minutes */}
            <div className="mt-2.5">
              <input
                type="range"
                min="60"
                max="240"
                step="5"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full accent-[#8bac0f] h-1.5 bg-[#0e1710] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#7d8774] mt-1">
                <span>1h (min)</span>
                <span>Selected: {formatDuration(durationMinutes)}</span>
                <span>4h (max)</span>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown Box (Game Boy LCD screen frame) */}
          <div className="p-3.5 rounded-xl bg-[#1a2711] border border-[#3e4a30] space-y-2">
            <span className="text-[10px] font-pixel text-[#8bac0f] block tracking-wider">
              PRICING BREAKDOWN (MINUTE-ACCURATE):
            </span>

            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between text-[#ded9cb]">
                <span>Base 1 Hour (60m minimum):</span>
                <span>{formatCurrency(costBreakdown.baseCost)}</span>
              </div>

              {costBreakdown.extraMinutes > 0 && (
                <div className="flex justify-between text-[#9bbc0f]">
                  <span>
                    Extra {costBreakdown.extraMinutes}m @ ₹{rates.minuteRate.toFixed(2)}/min:
                  </span>
                  <span>+{formatCurrency(costBreakdown.extraCost)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-[#3e4a30] flex justify-between items-center text-sm font-bold">
                <span className="text-[#ded9cb] font-pixel text-xs">ESTIMATED TOTAL:</span>
                <span className="text-[#9bbc0f] text-base font-mono">
                  {formatCurrency(costBreakdown.totalCost)}
                </span>
              </div>
            </div>

            <div className="text-[10px] font-mono text-[#6c8052] pt-1">
              Slot: {formatTimeHM(startTime)} to {formatTimeHM(endTime)}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-[#1b2b1e] hover:bg-[#253828] text-[#ded9cb] font-pixel text-xs tracking-wider transition-all cursor-pointer border border-[#2d4233]"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex-2 py-2.5 rounded-xl bg-[#8bac0f] hover:bg-[#9bbc0f] text-[#0f1c12] font-pixel font-bold text-xs tracking-wider shadow-gb-pixel transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-[#9bbc0f]"
            >
              <Sparkles className="w-4 h-4" />
              CONFIRM RESERVATION
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
