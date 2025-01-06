import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistedCartReducer from "./slice/CartSlice";
import productsReducer from "./slice/ProductSlice";
import snackbarReducer from "./slice/SnackbarSlice";

const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    product: productsReducer,
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { persistor, store };
