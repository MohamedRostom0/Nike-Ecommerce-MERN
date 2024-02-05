import mongoose from "mongoose";
import { PRODUCTS_MODEL } from "../../products/models/constants.js";
import { USERS_MODEL } from "../../users/models/constants.js";

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: PRODUCTS_MODEL,
    required: true,
  },

  color: { type: String, required: true },

  size: { type: String, required: true },

  quantity: { type: Number, required: true, default: 1 },
});

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: USERS_MODEL,
      required: true,
    },

    items: { type: [CartItemSchema], required: true },
  },
  { timestamps: true }
);

export default CartSchema;
