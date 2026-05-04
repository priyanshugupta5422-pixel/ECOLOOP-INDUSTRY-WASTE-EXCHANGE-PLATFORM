import { create } from 'zustand';

// ============================================================
// Zustand Global Store – EcoLoop AI
// Manages: classification results, cart, filters
// ============================================================

// Types
export interface Product {
  id: string;
  title: string;
  batch: string;
  location: string;
  price: string;
  unit: string;
  quantity: string;
  resourcePotential: string;
  category: string;
  purityScore: number;
  description: string;
}

export interface ClassificationResult {
  materials: Array<{
    name: string;
    confidence: number;
    recoveryValue: number;
    color: string;
  }>;
  totalValue: number;
  processingStream: string;
  latency: number;
  throughput: string;
}

interface AppState {
  // Cart
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;

  // Classification
  classificationResult: ClassificationResult | null;
  setClassificationResult: (result: ClassificationResult | null) => void;
  isClassifying: boolean;
  setIsClassifying: (v: boolean) => void;

  // Marketplace filters
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Cart state
  cart: [],
  addToCart: (product) =>
    set((state) => ({
      cart: state.cart.find((p) => p.id === product.id)
        ? state.cart
        : [...state.cart, product],
    })),
  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((p) => p.id !== id) })),

  // Classification state
  classificationResult: null,
  setClassificationResult: (result) => set({ classificationResult: result }),
  isClassifying: false,
  setIsClassifying: (v) => set({ isClassifying: v }),

  // Filters
  categoryFilter: 'all',
  setCategoryFilter: (cat) => set({ categoryFilter: cat }),
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
}));
