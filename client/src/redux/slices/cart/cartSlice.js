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
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      console.log(state.products);
      return;
    },
  },
});

export const { addToCartSlice } = cartSlice.actions;
export default cartSlice.reducer;
