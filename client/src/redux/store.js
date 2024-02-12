import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart/cartSlice.js";
import wishListReducer from "./slices/wishList/wishListSlice.js";
import userReducer from "./slices/userSlice/userSlice.js";
import productReducer from "./slices/Product/ProductSlice.js";
import searchReducer from "./slices/searchSlice/searchSlice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import sellerReducer from "./slices/SellerSlices/sellerSlice.js";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "cart", "seller"],
};
const rootReducer = combineReducers({
  cart: cartReducer,
  wishList: wishListReducer,
  selectedProduct: productReducer,
  user: userReducer,
  search: searchReducer,
  seller: sellerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
