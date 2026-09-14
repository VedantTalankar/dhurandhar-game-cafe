export type StationType = 'pool' | 'playstation' | 'simulator';

export type StationStatus = 'available' | 'reserved' | 'active';

export interface Station {
  id: string;
  name: string;
  type: StationType;
  baseHourlyRate: number; // For PS, default or base
  playerRates?: {
    1: number;
    2: number;
    4: number;
  };
  features: string[];
  iconType: 'pool' | 'gamepad' | 'steering-wheel';
  currentReservation?: Reservation | null;
  activeSession?: ActiveSession | null;
}

export interface Reservation {
  id: string;
  stationId: string;
  stationName: string;
  customerName: string;
  customerPhone: string;
  playersCount?: 1 | 2 | 4;
  reservedAt: string; // ISO string when booking was created
  startTime: string;  // ISO string when booking starts
  durationMinutes: number; // Minimum 60
  expectedEndTime: string; // ISO string (startTime + durationMinutes)
  hourlyRate: number;
  minuteRate: number;
  estimatedCost: number;
  status: 'pending' | 'started' | 'revoked' | 'completed';
}

export interface ActiveSession {
  id: string;
  stationId: string;
  stationName: string;
  customerName: string;
  customerPhone: string;
  playersCount?: 1 | 2 | 4;
  hourlyRate: number;
  minuteRate: number;
  startedAt: string; // ISO string
  plannedDurationMinutes: number;
  extendedMinutes: number; // accumulated extra time added by admin
}

export interface CompletedSessionBill {
  id: string;
  stationId: string;
  stationName: string;
  customerName: string;
  customerPhone: string;
  playersCount?: 1 | 2 | 4;
  startedAt: string;
  endedAt: string;
  totalMinutesPlayed: number;
  baseMinutesCharged: number; // 60
  extraMinutesCharged: number; // total - 60 (if > 0)
  hourlyRate: number;
  minuteRate: number;
  baseCost: number;
  extraCost: number;
  totalAmount: number;
  settledAt: string;
}
