import _ from "lodash";
import Users from "../../users/models/index.js";
import APIError from "../../../common/utils/api-error.js";
import httpStatus from "http-status";
import CartServices from "../../cart/services/index.js";

const AuthServices = {
  async registerUser({ email, password, profile, role }) {
    const user = await Users.create({ email, password, profile, role });
    const token = await user.generateJWT();

    const cart = await CartServices.createCart({ userId: user._id });

    return { user, token, cart };
  },

  async userLogin({ email, password }) {
    const user = await Users.findOne({ email });

    if (_.isNil(user) || !(await user.comparePassword(password))) {
      throw new APIError({
        message: "Incorrect email or password",
        status: httpStatus.UNAUTHORIZED,
      });
    }

    const token = await user.generateJWT();

    return { user, token };
  },
};

export default AuthServices;
