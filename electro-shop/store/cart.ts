import { create } from "zustand";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  brand?: string; // 🆕 əlavə olundu
};

type CartItem = Product & {
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  isOpen: boolean;

  /* SEARCH + CATEGORY */
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  brand: string; // 🆕
  setBrand: (value: string) => void; // 🆕

  /* PRICE FILTER */
  minPrice: number;
  maxPrice: number;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;

  /* SORT */
  sort: string;
  setSort: (value: string) => void;

  /* WISHLIST */
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;

  isInWishlist: (id: number) => boolean;
  toggleWishlist: (product: Product) => void;
  moveToCartFromWishlist: (product: Product) => void;

  /* CART */
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;

  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;

  clearCart: () => void;
  hydrate: () => void;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  resetFilters: () => void;
  getTotalPrice: () => number;
  getTotalCount: () => number;
  isInCart: (id: number) => boolean;
  getItem: (id: number) => CartItem | undefined;
};

const STORAGE_KEY = "electro_cart";
const WISHLIST_KEY = "electro_wishlist";

/* STORAGE FUNCTIONS (dəyişmədim) */

const save = (items: CartItem[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
};

const load = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveWishlist = (items: Product[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  } catch {}
};

const loadWishlist = (): Product[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(WISHLIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  search: "",
  category: "all",
  brand: "all", // 🆕
  minPrice: 0,
  maxPrice: 9999,
  sort: "default",

  wishlist: loadWishlist(),

  setSearch: (value) => set({ search: value }),

  // 🆕 CATEGORY dəyişəndə brand sıfırlanır (çox vacib fix)
  setCategory: (value) =>
    set({
      category: value,
      brand: "all",
    }),

  setBrand: (value) => set({ brand: value }), // 🆕

  setMinPrice: (value) => set({ minPrice: value }),
  setMaxPrice: (value) => set({ maxPrice: value }),
  setSort: (value) => set({ sort: value }),

  /* WISHLIST (dəyişmədim) */

  addToWishlist: (product) => {
    const list = get().wishlist;
    if (list.some((p) => p.id === product.id)) return;

    const updated = [...list, product];
    set({ wishlist: updated });
    saveWishlist(updated);
  },

  removeFromWishlist: (id) => {
    const updated = get().wishlist.filter((p) => p.id !== id);
    set({ wishlist: updated });
    saveWishlist(updated);
  },

  clearWishlist: () => {
    set({ wishlist: [] });
    saveWishlist([]);
  },

  isInWishlist: (id) => {
    return get().wishlist.some((p) => p.id === id);
  },

  toggleWishlist: (product) => {
    const exists = get().wishlist.some((p) => p.id === product.id);

    const updated = exists
      ? get().wishlist.filter((p) => p.id !== product.id)
      : [...get().wishlist, product];

    set({ wishlist: updated });
    saveWishlist(updated);
  },

  moveToCartFromWishlist: (product) => {
    const items = get().items;
    const exists = items.find((p) => p.id === product.id);

    const updatedCart = exists
      ? items.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      : [...items, { ...product, quantity: 1 }];

    const updatedWishlist = get().wishlist.filter(
      (p) => p.id !== product.id
    );

    set({
      items: updatedCart,
      wishlist: updatedWishlist,
    });

    save(updatedCart);
    saveWishlist(updatedWishlist);
  },

  /* CART (dəyişmədim) */

  addToCart: (product) => {
    const items = get().items;
    const exists = items.find((p) => p.id === product.id);

    const updated = exists
      ? items.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      : [...items, { ...product, quantity: 1 }];

    set({ items: updated });
    save(updated);
  },

  removeFromCart: (id) => {
    const updated = get().items.filter((p) => p.id !== id);
    set({ items: updated });
    save(updated);
  },

  increaseQty: (id) => {
    const updated = get().items.map((p) =>
      p.id === id ? { ...p, quantity: p.quantity + 1 } : p
    );
    set({ items: updated });
    save(updated);
  },

  decreaseQty: (id) => {
    const updated = get().items
      .map((p) =>
        p.id === id ? { ...p, quantity: p.quantity - 1 } : p
      )
      .filter((p) => p.quantity > 0);

    set({ items: updated });
    save(updated);
  },

  clearCart: () => {
    set({ items: [] });
    save([]);
  },

  hydrate: () => {
    set({
      items: load(),
      wishlist: loadWishlist(),
    });
  },

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

  /* HELPERS */

  resetFilters: () =>
    set({
      search: "",
      category: "all",
      brand: "all", // 🆕
      minPrice: 0,
      maxPrice: 9999,
      sort: "default",
    }),

  getTotalPrice: () =>
    get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),

  getTotalCount: () =>
    get().items.reduce((sum, item) => sum + item.quantity, 0),

  isInCart: (id) => get().items.some((item) => item.id === id),

  getItem: (id) =>
    get().items.find((item) => item.id === id),
}));