import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartSlice: (state, action) => {
      const item = state.products.find(
        (item) => item.product._id === action.payload.product._id
      );

      if (item) {
        return;
      } else {
        state.products.push(action.payload);
      }
      console.log(state.products, " --- ");
    },
    increaseQuantitySlice: (state, action) => {
      const idx = state.products.findIndex((item) => {
        return item.product._id === action.payload.product._id;
      });

      if (idx >= 0) {
        state.products[idx].quantity += 1;
      } else {
        return;
      }
    },
    decreaseQuantitySlice: (state, action) => {
      const idx = state.products.findIndex((item) => {
        return item.product._id === action.payload.product._id;
      });
      if (idx >= 0) {
        state.products[idx].quantity -= 1;
      }
    },
    deleteItemSlice: (state, action) => {
      const idx = state.products.findIndex((item) => {
        return item.product._id === action.payload.product._id;
      });
      state.products.slice(idx, 1);
    },
  },
});

export const {
  addToCartSlice,
  increaseQuantitySlice,
  decreaseQuantitySlice,
  deleteItemSlice,
} = cartSlice.actions;
export default cartSlice.reducer;
