import type { Station } from '../types';

export const INITIAL_STATIONS: Station[] = [
  // 8-Ball Pool Tables (3 tables @ ₹120/hr)
  {
    id: 'pool-1',
    name: '8-Ball Pool — Table 01',
    type: 'pool',
    baseHourlyRate: 120,
    features: ['Tournament Slate 9ft', 'Aramith Pro Balls', 'Predator Cues'],
    iconType: 'pool',
    currentReservation: null,
    activeSession: null,
  },
  {
    id: 'pool-2',
    name: '8-Ball Pool — Table 02',
    type: 'pool',
    baseHourlyRate: 120,
    features: ['Tournament Slate 9ft', 'LED Canopy Light', 'Chalk & Bridge'],
    iconType: 'pool',
    // Mock active session that started 80 mins ago (1 hr 20 min) -> exactly ₹160
    currentReservation: null,
    activeSession: {
      id: 'sess-pool-2',
      stationId: 'pool-2',
      stationName: '8-Ball Pool — Table 02',
      customerName: 'Aarav Sharma',
      customerPhone: '+91 98765 43210',
      hourlyRate: 120,
      minuteRate: 2.0,
      startedAt: new Date(Date.now() - 80 * 60 * 1000).toISOString(), // 80 mins ago
      plannedDurationMinutes: 60,
      extendedMinutes: 20,
    },
  },
  {
    id: 'pool-3',
    name: '8-Ball Pool — Table 03',
    type: 'pool',
    baseHourlyRate: 120,
    features: ['Standard 8ft Slate', 'Acoustic Lounge Zone'],
    iconType: 'pool',
    // Mock future reservation booked for 1 hour 30 min
    currentReservation: {
      id: 'res-pool-3',
      stationId: 'pool-3',
      stationName: '8-Ball Pool — Table 03',
      customerName: 'Dev Patel',
      customerPhone: '+91 99887 76655',
      reservedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      startTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // starts in 30 mins
      durationMinutes: 90, // booked for 1h 30m
      expectedEndTime: new Date(Date.now() + 120 * 60 * 1000).toISOString(),
      hourlyRate: 120,
      minuteRate: 2.0,
      estimatedCost: 180,
      status: 'pending',
    },
    activeSession: null,
  },

  // PlayStation 5 Arenas (2 consoles @ ₹80, ₹100, ₹150 for 1, 2, 4 players)
  {
    id: 'ps-1',
    name: 'PlayStation 5 — Arena 01',
    type: 'playstation',
    baseHourlyRate: 80,
    playerRates: {
      1: 80,
      2: 100,
      4: 150,
    },
    features: ['65" 4K OLED 120Hz', 'DualSense Edge Haptics', 'EA FC 25 / Tekken 8'],
    iconType: 'gamepad',
    // Mock overdue reservation (>15 mins past start) to showcase Revoke feature
    currentReservation: {
      id: 'res-ps-1',
      stationId: 'ps-1',
      stationName: 'PlayStation 5 — Arena 01',
      customerName: 'Rohan Verma',
      customerPhone: '+91 91234 56789',
      playersCount: 2,
      reservedAt: new Date(Date.now() - 80 * 60 * 1000).toISOString(),
      startTime: new Date(Date.now() - 20 * 60 * 1000).toISOString(), // 20 mins ago (15m+ late!)
      durationMinutes: 60,
      expectedEndTime: new Date(Date.now() + 40 * 60 * 1000).toISOString(),
      hourlyRate: 100,
      minuteRate: 100 / 60,
      estimatedCost: 100,
      status: 'pending',
    },
    activeSession: null,
  },
  {
    id: 'ps-2',
    name: 'PlayStation 5 — Arena 02',
    type: 'playstation',
    baseHourlyRate: 80,
    playerRates: {
      1: 80,
      2: 100,
      4: 150,
    },
    features: ['65" 4K OLED 120Hz', '4x DualSense Wireless', 'Mortal Kombat 1 / FIFA'],
    iconType: 'gamepad',
    currentReservation: null,
    activeSession: null,
  },

  // Racing Simulator (1 rig @ ₹150/hr)
  {
    id: 'sim-1',
    name: 'Motion Sim — Pro Cockpit',
    type: 'simulator',
    baseHourlyRate: 150,
    features: ['Fanatec Direct Drive DD2', 'Hydraulic Loadcell Pedals', 'Triple Curved 32" 165Hz', 'Assetto Corsa / F1 24'],
    iconType: 'steering-wheel',
    currentReservation: null,
    activeSession: null,
  },
];
