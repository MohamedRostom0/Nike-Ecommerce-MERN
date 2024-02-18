import Joi from "joi";

const OrdersValidation = {
  createOrder: {
    body: {
      userId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),

      // cart: Joi.object({
      //   userId: Joi.string()
      //     .regex(/^[0-9a-fA-F]{24}$/)
      //     .required(),

      //   items: Joi.array().items(
      //     Joi.object({
      //       productId: Joi.string()
      //         .regex(/^[0-9a-fA-F]{24}$/)
      //         .required(),

      //       color: Joi.string().required(),

      //       size: Joi.string().required(),

      //       quantity: Joi.number().required(),
      //     })
      //   ),
      // }),

      // total: Joi.number().min(0).required(),

      stripe: Joi.object({
        payment_intent: Joi.string(),
        payment_intent_client_secret: Joi.string(),
        status: Joi.string(),
      }),
    },
  },
};

export default OrdersValidation;
