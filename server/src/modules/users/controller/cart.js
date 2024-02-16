import httpStatus from "http-status";
import CartServices from "../../cart/services/index.js";

const UserCartController = {
  async getUserCart(req, res, next) {
    try {
      const { userId } = req.params;
      const { _id: callerId, role: callerRole } = req.user;

      const response = await CartServices.getCartByUserId(
        { userId },
        { callerId, callerRole }
      );

      return res.status(httpStatus.OK).json(response);
    } catch (err) {
      return next(err);
    }
  },

  async addItemToCart(req, res, next) {
    try {
      const { userId } = req.params;
      const { productId, color, size, quantity } = req.body;

      const response = await CartServices.addItemToCart({
        userId,
        item: { productId, color, size, quantity },
      });

      return res.status(httpStatus.OK).json(response);
    } catch (err) {
      return next(err);
    }
  },

  async updateUserCart(req, res, next) {
    try {
      const { userId } = req.params;
      const { items } = req.body;

      const response = await CartServices.updateUserCart({ userId, items });

      return res.status(httpStatus.OK).json(response);
    } catch (err) {
      return next(err);
    }
  },

  async getCheckoutStripeSecret(req, res, next) {
    try {
      const { userId } = req.params;
      const response = await CartServices.getCheckoutStripeSecret({ userId });

      return res.status(httpStatus.OK).json(response);
    } catch (err) {
      return next(err);
    }
  },
};

export default UserCartController;
