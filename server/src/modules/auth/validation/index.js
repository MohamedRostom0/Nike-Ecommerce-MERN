import Joi from "joi";
import { PHONE_NUMBER_REGEX } from "../../../common/constants/regex.js";

const AuthValidation = {
  registerUser: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().min(6).required(),
      profile: Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().regex(PHONE_NUMBER_REGEX),
        address: Joi.object({
          street: Joi.string(),
          city: Joi.string(),
          state: Joi.string(),
          country: Joi.string(),
          postalCode: Joi.string(),
        }).required(),
      }),
      role: Joi.string().valid("user"),
    },
  },

  userLogin: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().min(6).required(),
    },
  },
};

export default AuthValidation;
