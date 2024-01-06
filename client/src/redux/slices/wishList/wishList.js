import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWish: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (!item) {
        state.products.push(action.payload);
      }
    },
  },
});

export const { addToWish } = wishListSlice.actions;
export default wishListSlice.reducer;
