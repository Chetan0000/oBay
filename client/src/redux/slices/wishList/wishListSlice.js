import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishListSlice: (state, action) => {
      const item = state.products.find(
        (item) => item.product._id === action.payload.product._id
      );
      if (item) {
        return;
      } else {
        state.products.push(action.payload);
      }
      console.log();
    },
  },
});

export const { addToWishListSlice } = wishListSlice.actions;
export default wishListSlice.reducer;
