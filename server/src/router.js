import { Router } from "express";
import AuthRouter from "./modules/auth/router/index.js";
import ProductsRouter from "./modules/products/router/index.js";
import UsersRouter from "./modules/users/router/index.js";
import OrdersRouter from "./modules/orders/router/index.js";

const router = new Router();
router.use("/api/auth", AuthRouter);
router.use("/api/products", ProductsRouter);
router.use("/api/users", UsersRouter);
router.use("/api/orders", OrdersRouter);

export default router;
