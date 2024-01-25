import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart/cartSlice";
import wishListReducer from "./slices/wishList/wishListSlice";
import userReducer from "./slices/userSlice/userSlice";
import productReducer from "./slices/Product/ProductSlice";
import searchReducer from "./slices/searchSlice/searchSlice";
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

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "cart"],
};
const rootReducer = combineReducers({
  cart: cartReducer,
  wishList: wishListReducer,
  selectedProduct: productReducer,
  user: userReducer,
  search: searchReducer,
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
