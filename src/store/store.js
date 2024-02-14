import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import searchValueReducer from "./searchValue";
import toggleLiftSideReducer from "./toglleLiftSide";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    searchValue: searchValueReducer,
    toggleLiftSide: toggleLiftSideReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
