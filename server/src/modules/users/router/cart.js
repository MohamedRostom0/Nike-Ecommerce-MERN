import { Router } from "express";
import { authenticate } from "../../../common/middlewares/authenticate.js";
import authorize from "../../../common/middlewares/authorize.js";
import { validate } from "../../../common/middlewares/validate.js";
import UserCartValidation from "../validation/cart.js";
import UserCartController from "../controller/cart.js";

const router = new Router();

router.get(
  "/:userId/cart",
  authenticate,
  authorize("user", "admin"),
  validate(UserCartValidation.getUserCart),
  UserCartController.getUserCart
);

router.post(
  "/:userId/cart/items",
  authenticate,
  authorize("user", "admin"),
  validate(UserCartValidation.addItemToCart),
  UserCartController.addItemToCart
);

router.put(
  "/:userId/cart",
  authenticate,
  authorize("user"),
  validate(UserCartValidation.updateCart),
  UserCartController.updateUserCart
);

export default router;
