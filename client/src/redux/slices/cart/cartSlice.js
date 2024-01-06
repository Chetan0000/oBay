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
        (item) => item._id === action.payload._id
      );

      if (item) {
        return;
      } else {
        state.products.push(action.payload);
      }
      console.log(state.products);
    },
    updateCart: (state, action) => {},
  },
});

export const { addToCartSlice } = cartSlice.actions;
export default cartSlice.reducer;
