import { Router } from "express";
import { authenticate } from "../../../common/middlewares/authenticate.js";
import { validate } from "../../../common/middlewares/validate.js";
import ProductsValidation from "../validation/index.js";
import ProductsController from "../controller/index.js";
import advancedResults from "../../../common/middlewares/advanced-results.js";
import Products from "../models/index.js";

const router = new Router();

router.get(
  "/",
  advancedResults(Products, null, ["category"]),
  ProductsController.getProducts
);

router.get(
  "/:id",
  validate(ProductsValidation.getProductById),
  ProductsController.getProductById
);

router.post(
  "/",
  authenticate,
  validate(ProductsValidation.createProduct),
  ProductsController.createProduct
);

router.delete(
  "/:id",
  authenticate,
  validate(ProductsValidation.deleteProduct),
  ProductsController.deleteProduct
);

router.put(
  "/:id/inventory",
  authenticate,
  validate(ProductsValidation.updateInventory),
  ProductsController.updateInventory
);

export default router;
