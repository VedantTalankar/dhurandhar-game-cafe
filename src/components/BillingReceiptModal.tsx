import React from 'react';
import type { CompletedSessionBill } from '../types';
import { X, Receipt, Printer, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatDuration, formatTimeHM } from '../utils/pricing';

interface BillingReceiptModalProps {
  bill: CompletedSessionBill | null;
  onClose: () => void;
}

export const BillingReceiptModal: React.FC<BillingReceiptModalProps> = ({ bill, onClose }) => {
  if (!bill) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-[#142117] border-2 border-[#ded9cb] rounded-3xl shadow-gb-pixel overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Marble Trim */}
        <div className="h-2 w-full bg-[#ded9cb]" />

        <div className="p-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-[#25372a] pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#1a2711] border border-[#3e4a30] flex items-center justify-center">
                <Receipt className="w-4 h-4 text-[#8bac0f]" />
              </div>
              <div>
                <span className="text-[9px] font-pixel text-[#8bac0f] tracking-widest block uppercase">
                  DHURANDHAR // SETTLEMENT SLIP
                </span>
                <span className="font-mono text-xs text-[#8e9982]">
                  REF: #{bill.id.slice(-6).toUpperCase()}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#8e9982] hover:text-[#ded9cb] hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Header text */}
          <div className="text-center py-1 mb-3">
            <h3 className="font-pixel text-lg font-bold text-[#e8e5db] tracking-wider">
              SESSION COMPLETE
            </h3>
            <p className="text-xs text-[#8e9982] font-mono">
              Station is now free and open for new reservations
            </p>
          </div>

          {/* Itemized Thermal / Stone Slip */}
          <div className="p-4 rounded-2xl bg-[#0e1710] border border-[#27382c] space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-[#223326]">
              <span className="text-[#8e9982] uppercase text-[10px]">STATION:</span>
              <span className="text-[#ded9cb] font-bold font-pixel text-xs">{bill.stationName}</span>
            </div>

            <div className="flex justify-between items-center text-[#ded9cb]">
              <span className="text-[#8e9982]">Customer:</span>
              <span className="font-semibold">{bill.customerName}</span>
            </div>

            {bill.playersCount && (
              <div className="flex justify-between items-center text-[#ded9cb]">
                <span className="text-[#8e9982]">Players:</span>
                <span className="text-[#8bac0f]">{bill.playersCount} Players</span>
              </div>
            )}

            <div className="flex justify-between items-center text-[#ded9cb]">
              <span className="text-[#8e9982]">Session Window:</span>
              <span>
                {formatTimeHM(bill.startedAt)} – {formatTimeHM(bill.endedAt)}
              </span>
            </div>

            <div className="flex justify-between items-center text-[#ded9cb]">
              <span className="text-[#8e9982]">Total Play Time:</span>
              <span className="text-[#8bac0f] font-bold">
                {formatDuration(bill.totalMinutesPlayed)} ({bill.totalMinutesPlayed} mins)
              </span>
            </div>

            {/* Per-minute calculation breakdown */}
            <div className="pt-3 border-t border-dashed border-[#344438] space-y-1.5">
              <div className="flex justify-between text-[#ded9cb]">
                <span>Base 1 Hour (60m minimum):</span>
                <span>{formatCurrency(bill.baseCost)}</span>
              </div>

              {bill.extraMinutesCharged > 0 ? (
                <div className="flex justify-between text-[#9bbc0f]">
                  <span>
                    Extra {bill.extraMinutesCharged}m @ ₹{bill.minuteRate.toFixed(2)}/min:
                  </span>
                  <span>+{formatCurrency(bill.extraCost)}</span>
                </div>
              ) : (
                <div className="flex justify-between text-[#687361] text-[11px]">
                  <span>Extra Minutes:</span>
                  <span>0m (within 1h base)</span>
                </div>
              )}

              <div className="pt-2 border-t border-[#344438] flex justify-between items-baseline text-sm">
                <span className="font-pixel font-bold text-[#e8e5db] text-xs">TOTAL CHARGE:</span>
                <span className="font-lcd font-bold text-[#9bbc0f] text-2xl">
                  {formatCurrency(bill.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 py-2.5 rounded-xl bg-[#1b2b1e] hover:bg-[#253a2b] text-[#ded9cb] font-pixel text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#2d4233]"
            >
              <Printer className="w-3.5 h-3.5" />
              PRINT
            </button>
            <button
              onClick={onClose}
              className="flex-2 py-2.5 rounded-xl bg-[#8bac0f] hover:bg-[#9bbc0f] text-[#0f1c12] font-pixel font-bold text-xs tracking-wider shadow-gb-pixel transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-[#9bbc0f]"
            >
              <CheckCircle2 className="w-4 h-4" />
              SETTLE &amp; CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
