import { create } from "zustand";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => {
    const existingItem = get().items.find((eItem) => eItem.id === item.id);

    if (existingItem) {
      set({
        items: get().items.map((eItem) =>
          eItem.id === item.id
            ? { ...eItem, quantity: eItem.quantity + item.quantity }
            : eItem
        ),
      });
    } else {
      set({ items: [...get().items, { ...item, quantity: 1 }] });
    }
  },
  removeItem: (id) => {
    const updatedItems = get()
      .items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0); // elimina solo si llega a 0

    set({ items: updatedItems });
  },
  clearCart: () => set({ items: [] }),
  total: () =>
    get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
}));
