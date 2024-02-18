import mongoose from "mongoose";
import OrderSchema from "./schema.js";
import { ORDERS_COLLECTION, ORDERS_MODEL } from "./constants.js";

const Orders = mongoose.model(ORDERS_MODEL, OrderSchema, ORDERS_COLLECTION);

export default Orders;
