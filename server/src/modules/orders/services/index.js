import _ from "lodash";
import Carts from "../../cart/models/index.js";
import CartServicesHelpers from "../../cart/services/helpers/index.js";
import Orders from "../models/index.js";

const OrdersService = {
  async createOrder({ userId, stripe }) {
    const cart = await Carts.findOne({ userId }).populate({
      path: "items.productId",
      as: "product",
    });
    const { total } = CartServicesHelpers.formatCartResponse({ cart });

    const order = await Orders.create({ userId, cart, total, stripe });

    await Carts.updateOne({ userId }, { $set: { items: [] } });

    return order;
  },
};

export default OrdersService;
