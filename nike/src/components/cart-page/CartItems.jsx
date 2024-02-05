import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const CartItems = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <ul>
      {cart.items.map((item) => (
        <li key={item.product._id}>
          <CartItem item={item} />
        </li>
      ))}
    </ul>
  );
};

export default CartItems;
