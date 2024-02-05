import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserCart } from "../../api/cart";

export const fetchUserCart = createAsyncThunk(
  "myData/fetchUserCart",
  async ({ userId, token }) => {
    return await getUserCart({ userId, token });
  }
);
