import React from 'react';
import type { Reservation } from '../types';
import { X, QrCode, AlertCircle, CheckCircle2, Ticket } from 'lucide-react';
import { formatCurrency, formatDuration, formatTimeHM } from '../utils/pricing';

interface CustomerTicketModalProps {
  pass: Reservation | null;
  onClose: () => void;
}

export const CustomerTicketModal: React.FC<CustomerTicketModalProps> = ({ pass, onClose }) => {
  if (!pass) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-[#142117] border-2 border-[#8bac0f] rounded-3xl shadow-gb-pixel overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Game Boy LCD Strip */}
        <div className="h-2 w-full bg-[#8bac0f]" />

        <div className="p-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-[#25372a] pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#1a2711] border border-[#3e4a30] flex items-center justify-center">
                <Ticket className="w-4 h-4 text-[#8bac0f]" />
              </div>
              <div>
                <span className="text-[9px] font-pixel text-[#8bac0f] tracking-widest block">
                  DHURANDHAR // BOOKING PASS
                </span>
                <span className="font-mono text-xs text-[#8e9982]">
                  PASS: #{pass.id.slice(-6).toUpperCase()}
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

          {/* Confirmation Banner */}
          <div className="text-center py-2">
            <div className="inline-flex p-3 rounded-full bg-[#1a2711] border border-[#8bac0f]/40 mb-2">
              <CheckCircle2 className="w-7 h-7 text-[#8bac0f]" />
            </div>
            <h3 className="font-pixel text-lg font-bold text-[#e8e5db] tracking-wide">
              TABLE RESERVED!
            </h3>
            <p className="text-xs text-[#8e9982] font-mono mt-0.5">
              Present this pass at the counter upon arrival
            </p>
          </div>

          {/* Station & Booking Details Card */}
          <div className="mt-4 p-4 rounded-2xl bg-[#0e1710] border border-[#27382c] space-y-3">
            <div>
              <span className="text-[9px] font-pixel text-[#8e9982] block uppercase">STATION</span>
              <span className="font-pixel text-sm font-bold text-[#ded9cb]">
                {pass.stationName}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <span className="text-[9px] text-[#7d8774] block uppercase">CUSTOMER</span>
                <span className="text-[#ded9cb] font-semibold">{pass.customerName}</span>
              </div>
              <div>
                <span className="text-[9px] text-[#7d8774] block uppercase">DURATION</span>
                <span className="text-[#8bac0f] font-bold">{formatDuration(pass.durationMinutes)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1 border-t border-[#223326]">
              <div>
                <span className="text-[9px] text-[#7d8774] block uppercase">START TIME</span>
                <span className="text-[#ded9cb]">{formatTimeHM(pass.startTime)}</span>
              </div>
              <div>
                <span className="text-[9px] text-[#7d8774] block uppercase">EST. TOTAL</span>
                <span className="text-[#9bbc0f] font-bold">{formatCurrency(pass.estimatedCost)}</span>
              </div>
            </div>
          </div>

          {/* Check-In Code Mockup */}
          <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-[#101a12] border border-[#25372a]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#e8e5db] p-1 rounded-lg flex items-center justify-center">
                <QrCode className="w-10 h-10 text-[#0f1c12]" />
              </div>
              <div className="text-[11px] font-mono">
                <span className="text-[#ded9cb] block font-semibold">CHECK-IN TOKEN</span>
                <span className="text-[#7d8774] text-[10px]">Show to manager on arrival</span>
              </div>
            </div>
          </div>

          {/* 15-Minute Policy Note */}
          <div className="mt-4 p-3 rounded-xl bg-[#261d10] border border-[#c78918]/50 flex items-start gap-2.5 text-[11px] text-[#dec385] font-sans">
            <AlertCircle className="w-4 h-4 text-[#c78918] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block font-pixel text-[#c78918] text-[10px]">
                15-MINUTE ARRIVAL WINDOW:
              </span>
              Please arrive within 15 minutes of your reserved time ({formatTimeHM(pass.startTime)}).
              Per cafe policy, tables are subject to revocation by management if uncollected after 15 minutes.
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-5 w-full py-3 rounded-xl bg-[#8bac0f] hover:bg-[#9bbc0f] text-[#0f1c12] font-pixel font-bold text-xs tracking-wider shadow-gb-pixel transition-all cursor-pointer border border-[#9bbc0f]"
          >
            GOT IT / CLOSE PASS
          </button>
        </div>
      </div>
    </div>
  );
};
