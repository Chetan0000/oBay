import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalPrice: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartSlice: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );

      if (item) {
        return;
      } else {
        state.products.push(action.payload);
      }
      // console.log(state.products, " --- ");
      // state.products.push(action.payload);
    },
    increaseQuantitySlice: (state, action) => {
      const idx = state.products.findIndex((item) => {
        return item._id === action.payload._id;
      });

      if (idx >= 0) {
        state.products[idx] = action.payload;
      } else {
        return;
      }
    },
    decreaseQuantitySlice: (state, action) => {
      const idx = state.products.findIndex((item) => {
        return item._id === action.payload._id;
      });
      if (idx >= 0) {
        state.products[idx] = action.payload;
      } else {
        return;
      }
    },
    deleteItemSlice: (state, action) => {
      const idx = state.products.findIndex((item) => {
        return item._id === action.payload._id;
      });
      state.products.splice(idx, 1);
    },
    clearCartSlice: (state, action) => {
      state.products = [];
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
  },
});

export const {
  addToCartSlice,
  increaseQuantitySlice,
  decreaseQuantitySlice,
  deleteItemSlice,
  clearCartSlice,
  setTotalPrice,
} = cartSlice.actions;
export default cartSlice.reducer;
