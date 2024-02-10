import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seller: [],
};

export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    logSeller: (state, action) => {
      state.seller = JSON.parse(localStorage.getItem("sellerInfo"));
      console.log("Check Seller Reducer");
    },

    deleteSeller: (state, action) => {
      if (state.seller) {
        state.seller = [];
      } else {
        return;
      }
    },
  },
});

export const { logSeller, deleteSeller } = sellerSlice.actions;

export default sellerSlice.reducer;
