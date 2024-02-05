import _ from "lodash";
import Carts from "../models/index.js";
import APIError from "../../../common/utils/api-error.js";
import httpStatus from "http-status";
import { ADMINSTRATOR_ROLES } from "../../../common/constants/roles.js";
import CartServicesHelpers from "./helpers/index.js";

const CartServices = {
  async createCart({ userId, items = [] }) {
    let cart = await Carts.findOne({ userId });

    if (_.isNil(cart)) {
      cart = await Carts.create({ userId, items });
    }

    return cart;
  },

  async getCartByUserId({ userId }, { callerId, callerRole }) {
    if (
      callerId.toString() !== userId &&
      !ADMINSTRATOR_ROLES.includes(callerRole)
    ) {
      throw new APIError({
        message: `Caller with id ${callerId} is not authorized to access this resource.`,
        status: httpStatus.UNAUTHORIZED,
      });
    }

    let cart = await Carts.findOne({ userId }).populate({
      path: "items.productId",
      as: "product",
    });

    if (_.isNil(cart)) {
      throw new APIError({
        message: `No Cart for User with id: ${id}`,
        status: httpStatus.NOT_FOUND,
      });
    }

    let total = 0;
    cart = cart.toObject();
    cart.items = cart.items.map((item) => {
      total += item.productId.price * item.quantity;
      return { ...item, product: item.productId, productId: undefined };
    });

    return { cart, total: total + 30 };
  },

  async addItemToCart({ userId, item }) {
    let cart = await Carts.findOne({ userId }).populate({
      path: "items.productId",
      as: "product",
    });

    if (_.isNil(cart)) {
      throw new APIError({
        message: `No Cart for User with id: ${userId}`,
        status: httpStatus.NOT_FOUND,
      });
    }

    cart.items.push(item);

    const validity = await CartServicesHelpers.validateCartItems({ cart });
    if (!validity.isValid) {
      throw new APIError({
        message: validity.validityErrors.map((vErr) => vErr.message).join("\n"),
        status: httpStatus.UNPROCESSABLE_ENTITY,
      });
    }

    await cart.save();

    return cart;
  },

  async updateUserCart({ userId, items }) {
    const cart = await Carts.findOne({ userId });

    if (_.isNil(cart)) {
      throw new APIError({
        message: `No Cart for User with id: ${userId}`,
        status: httpStatus.NOT_FOUND,
      });
    }

    cart.items = items;

    const validity = await CartServicesHelpers.validateCartItems({ cart });
    if (!validity.isValid) {
      throw new APIError({
        message: validity.validityErrors.map((vErr) => vErr.message).join("\n"),
        status: httpStatus.UNPROCESSABLE_ENTITY,
      });
    }

    await cart.save();

    return cart;
  },
};

export default CartServices;
