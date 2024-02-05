import { Router } from "express";
import AuthValidation from "../validation/index.js";
import AuthController from "../controller/index.js";
import { validate } from "../../../common/middlewares/validate.js";

const router = new Router();

router.post(
  "/register",
  validate(AuthValidation.registerUser),
  AuthController.registerUser
);

router.post(
  "/login",
  validate(AuthValidation.userLogin),
  AuthController.userLogin
);

export default router;
