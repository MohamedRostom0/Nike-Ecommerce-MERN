import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./slices";
import { authSlice } from "./slices/auth";

const store = configureStore({
  reducer: { cart: cartSlice.reducer, auth: authSlice.reducer },
});

export default store;
