import { createSlice } from "@reduxjs/toolkit";
import { fetchUserCart } from "../thunks/cart";

const initialState = {
  items: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload.items;
      state.total = action.payload.total || state.total;
    },

    addToCart(state, action) {
      const newItem = {
        ...action.payload,
      };

      return {
        ...state,
        items: [...state.items, newItem],
        total: state.total + newItem.product.price * newItem.quantity,
      };
    },

    changeCartItemQuantity(state, action) {
      const newItems = state.items.map((item) => {
        if (item._id === action.payload.id) {
          return { ...item, quantity: action.payload.quantity };
        }
        return { ...item };
      });

      let total = 0;
      newItems.forEach((item) => (total += item.product.price * item.quantity));

      return {
        ...state,
        items: [...newItems],
        total,
      };
    },

    removeFromCart(state, action) {
      const itemToRemoveId = action.payload.id;
      const updatedItems = state.items.filter(
        (item) => item.product._id !== itemToRemoveId
      );
      const removedItem = state.items.find(
        (item) => item.product._id === itemToRemoveId
      );

      return {
        ...state,
        items: updatedItems,
        total: state.total - removedItem.product.price * removedItem.quantity,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cart.items;
        state.total = action.payload.total;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const cartActions = cartSlice.actions;
