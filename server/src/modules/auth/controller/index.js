import httpStatus from "http-status";
import AuthServices from "../services/index.js";

const AuthController = {
  async registerUser(req, res, next) {
    try {
      const { email, password, profile, role } = req.body;

      const response = await AuthServices.registerUser({
        email,
        password,
        profile,
        role,
      });
      return res.status(httpStatus.CREATED).json(response);
    } catch (err) {
      return next(err);
    }
  },

  async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      const response = await AuthServices.userLogin({ email, password });

      return res.status(httpStatus.OK).json(response);
    } catch (err) {
      return next(err);
    }
  },
};

export default AuthController;
