import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Station, Reservation, ActiveSession, CompletedSessionBill } from '../types';
import { INITIAL_STATIONS } from '../data/initialStations';
import { arcadeAudio, setSoundMuted } from '../utils/audio';
import { calculateSessionCost, getStationRates } from '../utils/pricing';

interface CafeContextType {
  stations: Station[];
  simulatedTime: Date;
  viewMode: 'customer' | 'admin';
  setViewMode: (mode: 'customer' | 'admin') => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  
  // Time simulation controls
  advanceTimeMinutes: (minutes: number) => void;
  resetToRealTime: () => void;
  
  // Actions
  reserveStation: (params: {
    stationId: string;
    customerName: string;
    customerPhone: string;
    startTime: Date;
    durationMinutes: number;
    playersCount?: 1 | 2 | 4;
  }) => { success: boolean; message: string; reservation?: Reservation };
  
  startSession: (stationId: string) => void;
  revokeReservation: (stationId: string, reason?: string) => void;
  extendSession: (stationId: string, additionalMinutes: number) => void;
  endSession: (stationId: string) => CompletedSessionBill | null;
  
  // UI Dialog States
  selectedStationForBooking: Station | null;
  setSelectedStationForBooking: (station: Station | null) => void;
  latestReceipt: CompletedSessionBill | null;
  setLatestReceipt: (bill: CompletedSessionBill | null) => void;
  activePass: Reservation | null;
  setActivePass: (reservation: Reservation | null) => void;
  
  // Reset demo state
  resetAllDemoData: () => void;
  
  // Metrics
  completedBills: CompletedSessionBill[];
  totalRevenue: number;
}

const CafeContext = createContext<CafeContextType | undefined>(undefined);

const STORAGE_KEY_STATIONS = 'arcade_cafe_stations_v1';
const STORAGE_KEY_BILLS = 'arcade_cafe_bills_v1';

export const CafeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stations, setStations] = useState<Station[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_STATIONS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved stations', e);
      }
    }
    return INITIAL_STATIONS;
  });

  const [completedBills, setCompletedBills] = useState<CompletedSessionBill[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_BILLS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: 'bill-initial-1',
        stationId: 'pool-1',
        stationName: '8-Ball Pool — Table 01',
        customerName: 'Vikram Mehta',
        customerPhone: '+91 98111 22334',
        startedAt: new Date(Date.now() - 150 * 60 * 1000).toISOString(),
        endedAt: new Date(Date.now() - 70 * 60 * 1000).toISOString(),
        totalMinutesPlayed: 80,
        baseMinutesCharged: 60,
        extraMinutesCharged: 20,
        hourlyRate: 120,
        minuteRate: 2,
        baseCost: 120,
        extraCost: 40,
        totalAmount: 160,
        settledAt: new Date(Date.now() - 70 * 60 * 1000).toISOString(),
      },
    ];
  });

  const [viewMode, setViewMode] = useState<'customer' | 'admin'>('customer');
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true);
  const [timeOffsetMs, setTimeOffsetMs] = useState<number>(0);
  const [simulatedTime, setSimulatedTime] = useState<Date>(new Date());

  const [selectedStationForBooking, setSelectedStationForBooking] = useState<Station | null>(null);
  const [latestReceipt, setLatestReceipt] = useState<CompletedSessionBill | null>(null);
  const [activePass, setActivePass] = useState<Reservation | null>(null);

  // Sync simulated time
  useEffect(() => {
    const timer = setInterval(() => {
      setSimulatedTime(new Date(Date.now() + timeOffsetMs));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeOffsetMs]);

  // Persist stations
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STATIONS, JSON.stringify(stations));
  }, [stations]);

  // Persist completed bills
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BILLS, JSON.stringify(completedBills));
  }, [completedBills]);

  const toggleSound = () => {
    setSoundEnabledState((prev) => {
      const next = !prev;
      setSoundMuted(!next);
      if (next) arcadeAudio.playBlip();
      return next;
    });
  };

  const advanceTimeMinutes = (minutes: number) => {
    setTimeOffsetMs((prev) => prev + minutes * 60 * 1000);
    arcadeAudio.playBlip();
  };

  const resetToRealTime = () => {
    setTimeOffsetMs(0);
    arcadeAudio.playBlip();
  };

  const resetAllDemoData = () => {
    localStorage.removeItem(STORAGE_KEY_STATIONS);
    localStorage.removeItem(STORAGE_KEY_BILLS);
    setStations(INITIAL_STATIONS);
    setCompletedBills([]);
    setTimeOffsetMs(0);
    setLatestReceipt(null);
    setActivePass(null);
    arcadeAudio.playBlip();
  };

  // Customer reservation function
  const reserveStation = ({
    stationId,
    customerName,
    customerPhone,
    startTime,
    durationMinutes,
    playersCount = 1,
  }: {
    stationId: string;
    customerName: string;
    customerPhone: string;
    startTime: Date;
    durationMinutes: number;
    playersCount?: 1 | 2 | 4;
  }): { success: boolean; message: string; reservation?: Reservation } => {
    const station = stations.find((s) => s.id === stationId);
    if (!station) {
      return { success: false, message: 'Station not found' };
    }

    if (station.activeSession) {
      return { success: false, message: 'Station is currently occupied with an active session' };
    }

    if (station.currentReservation && station.currentReservation.status === 'pending') {
      return { success: false, message: 'Station is already booked for this slot' };
    }

    if (durationMinutes < 60) {
      return { success: false, message: 'Minimum booking duration is 1 hour (60 minutes)' };
    }

    // Advance booking rule: customer can book up to 2 hours (120 minutes) in advance from current cafe time
    const maxAllowedBookingTime = new Date(simulatedTime.getTime() + 120 * 60 * 1000 + 60000); // 2 hours + 1 min grace buffer
    if (startTime.getTime() > maxAllowedBookingTime.getTime()) {
      return {
        success: false,
        message: 'Slots can only be booked up to 2 hours before the start time.',
      };
    }

    const { hourly, minuteRate } = getStationRates(station.type, playersCount);
    const { totalCost } = calculateSessionCost(durationMinutes, hourly);

    const expectedEndTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000);

    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      stationId,
      stationName: station.name,
      customerName,
      customerPhone,
      playersCount: station.type === 'playstation' ? playersCount : undefined,
      reservedAt: simulatedTime.toISOString(),
      startTime: startTime.toISOString(),
      durationMinutes,
      expectedEndTime: expectedEndTime.toISOString(),
      hourlyRate: hourly,
      minuteRate,
      estimatedCost: totalCost,
      status: 'pending',
    };

    setStations((prev) =>
      prev.map((s) => (s.id === stationId ? { ...s, currentReservation: newReservation } : s))
    );

    arcadeAudio.playCoin();
    setActivePass(newReservation);
    return { success: true, message: 'Table reserved successfully!', reservation: newReservation };
  };

  // Admin: Start active session when customer arrives
  const startSession = (stationId: string) => {
    const station = stations.find((s) => s.id === stationId);
    if (!station) return;

    let customerName = 'Walk-in Guest';
    let customerPhone = 'N/A';
    let plannedDurationMinutes = 60;
    let playersCount: 1 | 2 | 4 | undefined = 1;
    let hourlyRate = station.baseHourlyRate;
    let minuteRate = station.baseHourlyRate / 60;

    if (station.currentReservation) {
      customerName = station.currentReservation.customerName;
      customerPhone = station.currentReservation.customerPhone;
      plannedDurationMinutes = station.currentReservation.durationMinutes;
      playersCount = station.currentReservation.playersCount;
      hourlyRate = station.currentReservation.hourlyRate;
      minuteRate = station.currentReservation.minuteRate;
    }

    const newActiveSession: ActiveSession = {
      id: `sess-${Date.now()}`,
      stationId,
      stationName: station.name,
      customerName,
      customerPhone,
      playersCount,
      hourlyRate,
      minuteRate,
      startedAt: simulatedTime.toISOString(),
      plannedDurationMinutes,
      extendedMinutes: 0,
    };

    setStations((prev) =>
      prev.map((s) => {
        if (s.id === stationId) {
          return {
            ...s,
            currentReservation: null, // cleared as it is now live
            activeSession: newActiveSession,
          };
        }
        return s;
      })
    );

    arcadeAudio.playStart();
  };

  // Admin: Revoke reservation (table becomes free immediately)
  const revokeReservation = (stationId: string) => {
    setStations((prev) =>
      prev.map((s) => {
        if (s.id === stationId) {
          return {
            ...s,
            currentReservation: null,
          };
        }
        return s;
      })
    );
    arcadeAudio.playWarning();
  };

  // Admin: Extend active session
  const extendSession = (stationId: string, additionalMinutes: number) => {
    setStations((prev) =>
      prev.map((s) => {
        if (s.id === stationId && s.activeSession) {
          return {
            ...s,
            activeSession: {
              ...s.activeSession,
              plannedDurationMinutes: s.activeSession.plannedDurationMinutes + additionalMinutes,
              extendedMinutes: s.activeSession.extendedMinutes + additionalMinutes,
            },
          };
        }
        return s;
      })
    );
    arcadeAudio.playBlip();
  };

  // Admin: End session and calculate minute-by-minute bill
  const endSession = (stationId: string): CompletedSessionBill | null => {
    const station = stations.find((s) => s.id === stationId);
    if (!station || !station.activeSession) return null;

    const session = station.activeSession;
    const startMs = new Date(session.startedAt).getTime();
    const endMs = simulatedTime.getTime();
    const totalMinutesPlayed = Math.max(1, Math.ceil((endMs - startMs) / (1000 * 60)));

    const costBreakdown = calculateSessionCost(totalMinutesPlayed, session.hourlyRate);

    const bill: CompletedSessionBill = {
      id: `bill-${Date.now()}`,
      stationId,
      stationName: session.stationName,
      customerName: session.customerName,
      customerPhone: session.customerPhone,
      playersCount: session.playersCount,
      startedAt: session.startedAt,
      endedAt: simulatedTime.toISOString(),
      totalMinutesPlayed,
      baseMinutesCharged: 60,
      extraMinutesCharged: costBreakdown.extraMinutes,
      hourlyRate: session.hourlyRate,
      minuteRate: session.minuteRate,
      baseCost: costBreakdown.baseCost,
      extraCost: costBreakdown.extraCost,
      totalAmount: costBreakdown.totalCost,
      settledAt: simulatedTime.toISOString(),
    };

    setCompletedBills((prev) => [bill, ...prev]);
    setLatestReceipt(bill);

    // Free the table
    setStations((prev) =>
      prev.map((s) => (s.id === stationId ? { ...s, activeSession: null } : s))
    );

    arcadeAudio.playSettled();
    return bill;
  };

  const totalRevenue = completedBills.reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <CafeContext.Provider
      value={{
        stations,
        simulatedTime,
        viewMode,
        setViewMode,
        soundEnabled,
        toggleSound,
        advanceTimeMinutes,
        resetToRealTime,
        reserveStation,
        startSession,
        revokeReservation,
        extendSession,
        endSession,
        selectedStationForBooking,
        setSelectedStationForBooking,
        latestReceipt,
        setLatestReceipt,
        activePass,
        setActivePass,
        resetAllDemoData,
        completedBills,
        totalRevenue,
      }}
    >
      {children}
    </CafeContext.Provider>
  );
};

export const useCafe = (): CafeContextType => {
  const context = useContext(CafeContext);
  if (!context) {
    throw new Error('useCafe must be used within a CafeProvider');
  }
  return context;
};
