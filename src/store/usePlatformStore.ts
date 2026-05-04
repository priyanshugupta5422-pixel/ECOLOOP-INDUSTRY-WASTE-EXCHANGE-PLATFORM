import { create } from 'zustand';
import { initialListings } from '@/mock-data';

export type UserRole = 'seller' | 'buyer';
export type InputMode = 'iot' | 'camera';

export interface Listing {
  id: string;
  title: string;
  type: string;
  quantity: number;
  unit: string;
  predictedValue: number;
  location: string;
  imageUrl: string;
  confidenceScore: number;
}

interface PlatformState {
  role: UserRole;
  setRole: (role: UserRole) => void;
  inputMode: InputMode;
  setInputMode: (mode: InputMode) => void;
  listings: Listing[];
  addListing: (listing: Listing) => void;
  environmentalImpact: {
    co2Saved: number;
    wasteRecycled: number;
    costSavings: number;
  };
  incrementImpact: (co2: number, waste: number, cost: number) => void;
}

export const usePlatformStore = create<PlatformState>((set) => ({
  role: 'buyer',
  setRole: (role) => set({ role }),
  inputMode: 'camera',
  setInputMode: (mode) => set({ inputMode: mode }),
  listings: initialListings,
  addListing: (listing) => set((state) => ({ listings: [listing, ...state.listings] })),
  environmentalImpact: {
    co2Saved: 12500, // kg
    wasteRecycled: 45000, // kg
    costSavings: 120000, // $
  },
  incrementImpact: (co2, waste, cost) =>
    set((state) => ({
      environmentalImpact: {
        co2Saved: state.environmentalImpact.co2Saved + co2,
        wasteRecycled: state.environmentalImpact.wasteRecycled + waste,
        costSavings: state.environmentalImpact.costSavings + cost,
      },
    })),
}));
