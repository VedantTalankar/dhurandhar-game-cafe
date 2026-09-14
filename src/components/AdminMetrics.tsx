import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Clock, 
  Receipt, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';
import { formatCurrency, formatDuration, formatTimeHM, isOverdueForRevocation } from '../utils/pricing';

export const AdminMetrics: React.FC = () => {
  const { stations, simulatedTime, completedBills, totalRevenue } = useCafe();
  const [showHistory, setShowHistory] = useState(false);

  // Calculate station states
  const activeCount = stations.filter((s) => s.activeSession).length;
  const reservedCount = stations.filter((s) => s.currentReservation).length;
  const availableCount = stations.length - activeCount - reservedCount;

  // Calculate overdue no-shows (>15 mins past start)
  const overdueReservations = stations.filter(
    (s) => s.currentReservation && isOverdueForRevocation(s.currentReservation.startTime, simulatedTime)
  );

  return (
    <div className="space-y-4 mb-6">
      {/* Overview Stat Cards in Game Boy & Stone Theme */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Revenue Card */}
        <div className="p-4 rounded-2xl bg-[#142117] border-2 border-[#2d4233] shadow-gb-pixel">
          <div className="flex items-center justify-between text-[#8e9982] text-xs font-mono mb-1">
            <span>CAFE REVENUE</span>
            <TrendingUp className="w-4 h-4 text-[#8bac0f]" />
          </div>
          <div className="text-2xl font-lcd font-bold text-[#9bbc0f]">
            {formatCurrency(totalRevenue)}
          </div>
          <span className="text-[10px] font-mono text-[#7d8774] block mt-1">
            {completedBills.length} sessions settled
          </span>
        </div>

        {/* Occupancy Card */}
        <div className="p-4 rounded-2xl bg-[#142117] border-2 border-[#2d4233] shadow-gb-pixel">
          <div className="flex items-center justify-between text-[#8e9982] text-xs font-mono mb-1">
            <span>FLOOR OCCUPANCY</span>
            <Users className="w-4 h-4 text-[#ded9cb]" />
          </div>
          <div className="text-2xl font-lcd font-bold text-[#e8e5db]">
            {activeCount} <span className="text-[#8e9982] text-sm font-normal font-mono">/ {stations.length} Active</span>
          </div>
          <span className="text-[10px] font-mono text-[#8bac0f] block mt-1">
            {reservedCount} Booked • {availableCount} Open
          </span>
        </div>

        {/* Pending Bookings Card */}
        <div className="p-4 rounded-2xl bg-[#142117] border-2 border-[#2d4233] shadow-gb-pixel">
          <div className="flex items-center justify-between text-[#8e9982] text-xs font-mono mb-1">
            <span>UPCOMING BOOKINGS</span>
            <Clock className="w-4 h-4 text-[#8bac0f]" />
          </div>
          <div className="text-2xl font-lcd font-bold text-[#8bac0f]">
            {reservedCount}
          </div>
          <span className="text-[10px] font-mono text-[#7d8774] block mt-1">
            Awaiting customer arrival
          </span>
        </div>

        {/* Grace Period / No-Show Alert Card */}
        <div
          className={`p-4 rounded-2xl border-2 transition-all shadow-gb-pixel ${
            overdueReservations.length > 0
              ? 'bg-[#291715] border-[#a8432a]'
              : 'bg-[#142117] border-[#2d4233]'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono mb-1">
            <span className={overdueReservations.length > 0 ? 'text-[#f5a191] font-bold font-pixel text-[10px]' : 'text-[#8e9982]'}>
              NO-SHOW ALERTS
            </span>
            <AlertTriangle
              className={`w-4 h-4 ${
                overdueReservations.length > 0 ? 'text-[#f5a191] animate-bounce' : 'text-[#687361]'
              }`}
            />
          </div>
          <div
            className={`text-2xl font-lcd font-bold ${
              overdueReservations.length > 0 ? 'text-[#f5a191]' : 'text-[#8e9982]'
            }`}
          >
            {overdueReservations.length}
          </div>
          <span className="text-[10px] font-mono text-[#bcb6a5] block mt-1">
            {overdueReservations.length > 0
              ? 'Past 15m grace — Revoke ready'
              : 'All arrivals on schedule'}
          </span>
        </div>
      </div>

      {/* History Toggle Bar */}
      <div className="rounded-xl bg-[#111c14] border-2 border-[#2d4233] overflow-hidden shadow-gb-pixel">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-pixel text-[#ded9cb] hover:text-[#9bbc0f] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#8bac0f]" />
            <span>SESSION SETTLEMENT LOGS ({completedBills.length})</span>
          </div>
          {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showHistory && (
          <div className="p-4 border-t border-[#25372a] bg-[#0c160e] overflow-x-auto">
            {completedBills.length === 0 ? (
              <p className="text-xs text-[#7d8774] font-mono text-center py-3">
                No settled sessions in history yet.
              </p>
            ) : (
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#223326] text-[#8e9982] text-[11px]">
                    <th className="pb-2 font-normal">STATION</th>
                    <th className="pb-2 font-normal">CUSTOMER</th>
                    <th className="pb-2 font-normal">PLAY TIME</th>
                    <th className="pb-2 font-normal">BASE RATE</th>
                    <th className="pb-2 font-normal">EXTRA MINS</th>
                    <th className="pb-2 font-normal">SETTLED AMOUNT</th>
                    <th className="pb-2 font-normal">TIME</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2d21]">
                  {completedBills.map((bill) => (
                    <tr key={bill.id} className="hover:bg-white/[0.02]">
                      <td className="py-2.5 text-[#ded9cb] font-pixel text-[11px]">{bill.stationName}</td>
                      <td className="py-2.5 text-[#bcb6a5]">{bill.customerName}</td>
                      <td className="py-2.5 text-[#8bac0f]">{formatDuration(bill.totalMinutesPlayed)}</td>
                      <td className="py-2.5 text-[#8e9982]">₹{bill.hourlyRate}/hr</td>
                      <td className="py-2.5 text-[#8e9982]">
                        {bill.extraMinutesCharged > 0 ? `+${bill.extraMinutesCharged}m (+₹${bill.extraCost})` : '0m'}
                      </td>
                      <td className="py-2.5 font-bold text-[#9bbc0f]">{formatCurrency(bill.totalAmount)}</td>
                      <td className="py-2.5 text-[#7d8774] text-[10px]">{formatTimeHM(bill.settledAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
