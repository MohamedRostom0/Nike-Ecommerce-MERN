import mongoose from "mongoose";
import { PRODUCTS_COLLECTION, PRODUCTS_MODEL } from "./constants.js";
import ProductSchema from "./schema.js";

const Products = mongoose.model(
  PRODUCTS_MODEL,
  ProductSchema,
  PRODUCTS_COLLECTION
);

export default Products;
