import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema({
  color: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    description: { type: String },

    price: { type: Number, required: true },

    category: {
      type: String,
      enum: [
        "Footwear",
        "T-Shirts",
        "Shorts",
        "Hoodies",
        "Jackets",
        "Pants",
        "Bags",
      ],
      required: true,
    },

    images: { type: [String] },

    inventory: [InventorySchema],

    colors: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default ProductSchema;
