import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // LocalStorage for persistence

interface CartItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
  thumbnail: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// Redux Persist configuration
const persistConfig = {
  key: "cart",
  storage,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateItemQuantity } =
  cartSlice.actions;

const persistedCartReducer = persistReducer(persistConfig, cartSlice.reducer);

export default persistedCartReducer;
