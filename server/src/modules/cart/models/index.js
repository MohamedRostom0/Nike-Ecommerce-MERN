import mongoose from "mongoose";
import { CARTS_COLLECTION, CARTS_MODEL } from "./constants.js";
import CartSchema from "./schema.js";

const Carts = mongoose.model(CARTS_MODEL, CartSchema, CARTS_COLLECTION);

export default Carts;
