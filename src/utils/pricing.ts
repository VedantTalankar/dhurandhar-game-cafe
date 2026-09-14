import type { StationType } from '../types';

export const STATION_PRICING = {
  pool: {
    baseHourly: 120,
    minuteRate: 120 / 60, // ₹2.00 / min
  },
  playstation: {
    players: {
      1: { hourly: 80, minuteRate: 80 / 60 },    // ~₹1.33 / min
      2: { hourly: 100, minuteRate: 100 / 60 },  // ~₹1.67 / min
      4: { hourly: 150, minuteRate: 150 / 60 },  // ₹2.50 / min
    },
  },
  simulator: {
    baseHourly: 150,
    minuteRate: 150 / 60, // ₹2.50 / min
  },
};

export function getStationRates(
  type: StationType,
  playersCount: 1 | 2 | 4 = 1
): { hourly: number; minuteRate: number } {
  if (type === 'pool') {
    return {
      hourly: STATION_PRICING.pool.baseHourly,
      minuteRate: STATION_PRICING.pool.minuteRate,
    };
  }
  if (type === 'simulator') {
    return {
      hourly: STATION_PRICING.simulator.baseHourly,
      minuteRate: STATION_PRICING.simulator.minuteRate,
    };
  }
  // Playstation
  const pRates = STATION_PRICING.playstation.players[playersCount] || STATION_PRICING.playstation.players[1];
  return {
    hourly: pRates.hourly,
    minuteRate: pRates.minuteRate,
  };
}

/**
 * Calculates cost based on the rule:
 * - Minimum charge: 1 hour base rate.
 * - Charges after 1 hour calculated by the minute.
 * Example: 80 minutes at pool (₹120/hr) = 80 min * ₹2/min = ₹160.
 */
export function calculateSessionCost(
  durationMinutes: number,
  hourlyRate: number
): {
  baseCost: number;
  extraMinutes: number;
  extraCost: number;
  totalCost: number;
} {
  const baseCost = hourlyRate;
  const minuteRate = hourlyRate / 60;

  if (durationMinutes <= 60) {
    return {
      baseCost,
      extraMinutes: 0,
      extraCost: 0,
      totalCost: baseCost,
    };
  }

  const extraMinutes = durationMinutes - 60;
  const extraCost = extraMinutes * minuteRate;
  const totalCost = Math.round(baseCost + extraCost);

  return {
    baseCost,
    extraMinutes,
    extraCost: Math.round(extraCost * 100) / 100,
    totalCost,
  };
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatDuration(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  if (hrs === 0) return `${mins}m`;
  if (mins === 0) return `${hrs}h`;
  return `${hrs}h ${mins}m`;
}

export function formatTimeHM(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}

export function isOverdueForRevocation(
  startTime: string,
  currentTime: Date,
  thresholdMinutes = 15
): boolean {
  const start = new Date(startTime).getTime();
  const current = currentTime.getTime();
  const diffMinutes = (current - start) / (1000 * 60);
  return diffMinutes >= thresholdMinutes;
}

export function getMinutesPastReservation(
  startTime: string,
  currentTime: Date
): number {
  const start = new Date(startTime).getTime();
  const current = currentTime.getTime();
  return Math.floor((current - start) / (1000 * 60));
}
