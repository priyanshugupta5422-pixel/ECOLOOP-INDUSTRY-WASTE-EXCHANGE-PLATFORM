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

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
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
  // Authentication
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;

  // Cart
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

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

  // Seller custom products
  customProducts: Product[];
  addCustomProduct: (product: Product) => void;

  // Deleted products (hides both default and custom products)
  deletedProductIds: string[];
  deleteProduct: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Auth state
  isAuthenticated: false,
  user: null,
  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),

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
  clearCart: () => set({ cart: [] }),

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

  // Custom seller products
  customProducts: [],
  addCustomProduct: (product) => set((state) => ({ customProducts: [...state.customProducts, product] })),

  // Deleted products
  deletedProductIds: [],
  deleteProduct: (id) => set((state) => ({ deletedProductIds: [...state.deletedProductIds, id] })),
}));
