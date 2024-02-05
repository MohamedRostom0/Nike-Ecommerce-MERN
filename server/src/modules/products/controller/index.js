import httpStatus from "http-status";
import { ProductsAdminServices } from "../services/index.js";
import ProductsUserServices from "../services/user.js";

const ProductsController = {
  async getProducts(req, res, next) {
    try {
      // console.log(res.advancedResults);
      return res.status(httpStatus.OK).json(res.advancedResults);
    } catch (err) {
      return next(err);
    }
  },

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;

      const response = await ProductsUserServices.getProductById({ id });

      return res.status(httpStatus.OK).json(response);
    } catch (err) {
      return next(err);
    }
  },

  async createProduct(req, res, next) {
    try {
      const { name, description, price, category, images, inventory, colors } =
        req.body;

      const response = await ProductsAdminServices.createProduct({
        name,
        description,
        price,
        category,
        images,
        inventory,
        colors,
      });

      return res.status(httpStatus.OK).json(response);
    } catch (err) {
      return next(err);
    }
  },

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const response = await ProductsAdminServices.deleteProduct({ id });

      return res.status(httpStatus.OK).json(response);
    } catch (err) {
      return next(err);
    }
  },

  async updateInventory(req, res, next) {
    try {
      const { id } = req.params;
      const { color, size, changeQuantityBy } = req.body;

      const response = await ProductsUserServices.updateInventory({
        id,
        color,
        size,
        changeQuantityBy,
      });

      return res.status(httpStatus.OK).json(response);
    } catch (err) {
      return next(err);
    }
  },
};

export default ProductsController;
