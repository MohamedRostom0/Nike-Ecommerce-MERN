import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserCart, updateCart } from "../../api/cart";

export const fetchUserCart = createAsyncThunk(
  "myData/fetchUserCart",
  async ({ userId, token }) => {
    return await getUserCart({ userId, token });
  }
);

export const updateUserCart = createAsyncThunk(
  "myData/updateUserCart",
  async ({ cart, userId, token }) => {
    return await updateCart({ cart, userId, token });
  }
);
