import mongoose from "mongoose";
import CartSchema from "../../cart/models/schema.js";
import { USERS_MODEL } from "../../users/models/constants.js";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: USERS_MODEL,
      required: true,
    },

    cart: {
      type: CartSchema,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    stripe: {
      payment_intent: {
        type: String,
      },
      payment_intent_client_secret: {
        type: String,
      },
      status: { type: String },
    },
  },
  { timestamps: true }
);

export default OrderSchema;
