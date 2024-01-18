import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProduct: [],
};

export const productSlice = createSlice({
  name: "ProductSelected",
  initialState,
  reducers: {
    addSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },

    deleteSelectedProduct: (state, action) => {
      state.selectedProduct = [];
    },
  },
});

export const { addSelectedProduct, deleteSelectedProduct } =
  productSlice.actions;

export default productSlice.reducer;
