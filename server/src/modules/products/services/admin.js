import _ from "lodash";
import Products from "../models/index.js";
import APIError from "../../../common/utils/api-error.js";
import httpStatus from "http-status";

const ProductsAdminServices = {
  async createProduct({
    name,
    description,
    price,
    category,
    images,
    inventory,
    colors,
  }) {
    const product = await Products.create({
      name,
      description,
      price,
      category,
      images,
      inventory,
      colors,
    });

    return product;
  },

  async deleteProduct({ id }) {
    const product = await Products.findOne({ _id: id });

    if (_.isNil(product)) {
      return new APIError({
        message: "Product Not Found",
        status: httpStatus.NOT_FOUND,
      });
    }

    await Products.deleteOne({ _id: id });

    return product;
  },
};

export default ProductsAdminServices;
