import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, MenuItem } from '@/types';

export type OrderMode = 'dine-in' | 'pickup' | 'delivery' | null;

interface CartState {
  items: CartItem[];
  totalAmount: number;
  itemCount: number;
  orderMode: OrderMode;
  tableNumber: string | null;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  itemCount: 0,
  orderMode: null,
  tableNumber: null,
};

const calculateTotals = (items: CartItem[]) => {
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { totalAmount, itemCount };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<MenuItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.itemCount = totals.itemCount;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.itemCount = totals.itemCount;
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.itemCount = totals.itemCount;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.itemCount = 0;
      // Note: We don't reset tableNumber or orderMode here because they remain valid for a session
    },
    setOrderMode: (state, action: PayloadAction<OrderMode>) => {
      state.orderMode = action.payload;
    },
    setTableNumber: (state, action: PayloadAction<string | null>) => {
      state.tableNumber = action.payload;
    },
    loadCartFromStorage: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.itemCount = totals.itemCount;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, loadCartFromStorage, setOrderMode, setTableNumber } = cartSlice.actions;
export default cartSlice.reducer;
