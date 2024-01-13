import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    logUser: (state, action) => {
      state.user = JSON.parse(localStorage.getItem("userInfo"));
    },

    deleteUser: (state, action) => {
      if (state.user) {
        state.user = [];
      } else {
        return;
      }
    },
  },
});
export const { logUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
