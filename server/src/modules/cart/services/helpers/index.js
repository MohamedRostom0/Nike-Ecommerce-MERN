import _ from "lodash";
import Products from "../../../products/models/index.js";

const CartServicesHelpers = {
  async validateCartItems({ cart }) {
    const validityErrors = [];

    for (const cartItem of cart.items) {
      const product = await Products.findOne({ _id: cartItem.productId });

      if (_.isNil(product)) {
        validityErrors.push({
          message: `No product found with Id: ${product._id}`,
        });
        continue;
      }

      let inventoryItem = product.inventory.find(
        (invItem) =>
          invItem.color === cartItem.color && invItem.size === cartItem.size
      );

      if (_.isNil(inventoryItem)) {
        validityErrors.push({
          message: `No inventory item found for productId: ${product._id} with Color: ${cartItem.color} and Size: ${cartItem.size}`,
        });
        continue;
      }

      if (inventoryItem.quantity < cartItem.quantity) {
        validityErrors.push({
          message: `Not enough quantity for Inventory item => productId: ${product._id} with Color: ${cartItem.color} and Size: ${cartItem.size}`,
        });
      }
    }

    return { isValid: validityErrors.length === 0, validityErrors };
  },

  formatCartResponse({ cart }) {
    let total = 0;
    cart = cart.toObject();
    cart.items = cart.items.map((item) => {
      total += item.productId.price * item.quantity;
      return { ...item, product: item.productId, productId: undefined };
    });

    return { cart, total: total + 30 };
  },
};

export default CartServicesHelpers;
