import _ from "lodash";
import Products from "../models/index.js";
import APIError from "../../../common/utils/api-error.js";
import httpStatus from "http-status";

const ProductsUserServices = {
  async getProductById({ id }) {
    const product = await Products.findById(id);

    if (_.isNil(product)) {
      throw new APIError({
        message: `No product found with Id: ${id}`,
        status: httpStatus.NOT_FOUND,
      });
    }

    return product;
  },

  async updateInventory({ id, color, size, changeQuantityBy }) {
    const product = await Products.findOneAndUpdate(
      { _id: id, "inventory.color": color, "inventory.size": size },
      { $inc: { "inventory.$.quantity": changeQuantityBy } },
      { new: true }
    );

    if (_.isNil(product)) {
      throw new APIError({
        message: `No product found with Id: ${id}`,
        status: httpStatus.NOT_FOUND,
      });
    }

    return product;
  },
};

export default ProductsUserServices;
