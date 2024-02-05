import Joi from "joi";

const UserCartValidation = {
  getUserCart: {
    params: {
      userId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    },
  },

  addItemToCart: {
    params: {
      userId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    },

    body: {
      productId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),

      color: Joi.string().required(),

      size: Joi.string().required(),

      quantity: Joi.number().required(),
    },
  },

  updateCart: {
    params: {
      userId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    },

    body: {
      items: Joi.array().items(
        Joi.object({
          productId: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),

          color: Joi.string().required(),

          size: Joi.string().required(),

          quantity: Joi.number().required(),
        })
      ),
    },
  },
};

export default UserCartValidation;
