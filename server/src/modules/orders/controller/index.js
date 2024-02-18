import httpStatus from "http-status";
import OrdersService from "../services/index.js";

const OrdersController = {
  async createOrder(req, res, next) {
    try {
      const { userId, stripe } = req.body;

      const response = await OrdersService.createOrder({
        userId,
        stripe,
      });

      return res.status(httpStatus.OK).json(response);
    } catch (err) {
      return next(err);
    }
  },
};

export default OrdersController;
