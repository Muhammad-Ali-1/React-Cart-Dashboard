import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  orderItems: [],
  history: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newItem = {
          id,
          name,
          price,
          quantity,
        };
        state.cartItems.push(newItem);
        state.orderItems.push(newItem);
      }
    },

    deleteFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity = Math.max(quantity, 1);
      }
    },
    emptyCart: (state, action) => {
      state.cartItems = [];
    },
    updateHistory: (state, action) => {
      // state.history.push(action.payload);
      state.history = [action.payload, ...state.history];
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  deleteFromCart,
  emptyCart,
  updateHistory,
} = cartSlice.actions;
export default cartSlice.reducer;
