import { createSlice } from "@reduxjs/toolkit";

const getCartFromStorage = () => {
  const cart = localStorage.getItem("cart");

  return cart ? JSON.parse(cart) : [];
};

const saveCartToStorage = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

const initialState = {
  cartItems: getCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      saveCartToStorage(state.cartItems);
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);

      if (item) {
        item.quantity += 1;
      }

      saveCartToStorage(state.cartItems);
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i._id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      saveCartToStorage(state.cartItems);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );

      saveCartToStorage(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];

      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
