import { Router } from "express";
import CartRouter from "./cart.js";

const router = new Router();
router.use(CartRouter);

export default router;
