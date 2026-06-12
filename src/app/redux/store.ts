import { swapApi } from "@/05.features";
import { assetApi } from "@/06.entities";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  [assetApi.reducerPath]: assetApi.reducer,
  [swapApi.reducerPath]: swapApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(assetApi.middleware, swapApi.middleware),
});

setupListeners(store.dispatch);
