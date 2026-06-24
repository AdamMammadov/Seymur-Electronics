import { create } from "zustand";

type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  date: string;
};

type OrderStore = {
  orders: Order[];

  addOrder: (order: Order) => void;
  hydrate: () => void;
};

const STORAGE_KEY = "orders";

/* STORAGE */
const save = (orders: Order[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

const load = (): Order[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const useOrder = create<OrderStore>((set, get) => ({
  orders: [],

  hydrate: () => {
    set({ orders: load() });
  },

  addOrder: (order) => {
    const updated = [order, ...get().orders];
    set({ orders: updated });
    save(updated);
  },
}));