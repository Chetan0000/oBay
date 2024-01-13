import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart/cartSlice";
import wishListReducer from "./slices/wishList/wishListSlice";
import userReducer from "./slices/userSlice/userSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishList: wishListReducer,
    user: userReducer,
  },
});
