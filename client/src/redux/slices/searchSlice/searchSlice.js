import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchKeyWord: "",
  searchResults: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    putSearchKeyWord: (state, action) => {
      state.searchKeyWord = action.payload;
    },

    removeSearchKeyWord: (state, action) => {
      state.searchKeyWord = "";
    },

    addSearchResults: (state, action) => {
      state.searchResults = [...action.payload];
    },

    deleteSearchResults: (state, action) => {
      state.searchResults = 0;
    },
  },
});

export const {
  putSearchKeyWord,
  removeSearchKeyWord,
  addSearchResults,
  deleteSearchResults,
} = searchSlice.actions;

export default searchSlice.reducer;
