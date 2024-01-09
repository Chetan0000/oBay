import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart/cartSlice";
import wishListReducer from "./slices/wishList/wishListSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishList: wishListReducer,
  },
});
