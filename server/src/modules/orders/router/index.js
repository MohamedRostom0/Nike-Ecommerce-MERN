import { Router } from "express";
import { authenticate } from "../../../common/middlewares/authenticate.js";
import { validate } from "../../../common/middlewares/validate.js";
import OrdersValidation from "../validation/index.js";
import OrdersController from "../controller/index.js";
import authorize from "../../../common/middlewares/authorize.js";

const router = new Router();

router.post(
  "/",
  authenticate,
  authorize("user", "admin"),
  validate(OrdersValidation.createOrder),
  OrdersController.createOrder
);

export default router;
