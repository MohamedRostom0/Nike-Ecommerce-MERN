import Joi from "joi";

const ProductsValidation = {
  createProduct: {
    body: {
      name: Joi.string().required(),
      description: Joi.string(),
      price: Joi.number().required(),
      category: Joi.string().required(),
      images: Joi.array().items(Joi.string()),
      inventory: Joi.array().items(
        Joi.object({
          color: Joi.string().required(),
          size: Joi.string().required(),
          quantity: Joi.number().required(),
        })
      ),
      colors: Joi.array().items(Joi.string()),
    },
  },

  getProductById: {
    params: {
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    },
  },

  deleteProduct: {
    params: {
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    },
  },

  updateInventory: {
    params: {
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    },

    body: {
      color: Joi.string().required(),
      size: Joi.string().required(),
      changeQuantityBy: Joi.number().required(),
    },
  },
};

export default ProductsValidation;
