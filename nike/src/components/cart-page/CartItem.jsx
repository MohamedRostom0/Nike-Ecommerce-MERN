import { useDispatch } from "react-redux";
import { cartActions } from "../../store/slices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DUMMY_IMAGES = [
  "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
  "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
];

const CartItem = (props) => {
  const { item } = props;

  const dispatch = useDispatch();

  let images = item.images;
  if (!item.images) {
    images = DUMMY_IMAGES;
  }

  const handleQuantityChange = (e) => {
    if (parseFloat(e.target.value) > 0)
      dispatch(
        cartActions.changeCartItemQuantity({
          id: item._id,
          quantity: parseFloat(e.target.value),
        })
      );
  };

  const handleRemoveItem = () => {
    dispatch(cartActions.removeFromCart({ id: item.product._id }));
  };

  return (
    <div className="flex flex-1 m-4 p-2 space-x-10">
      <div className="w-64 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={images[Math.floor(Math.random() * images.length)]}
          alt="Image alt"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="flex justify-between w-full">
        <div className="flex flex-col space-y-2 font-montserrat">
          <h3 className="text-xl font-semibold">{item.product.name}</h3>
          <p className="text-slate-gray">
            {item.color} - {item.size}
          </p>
          <p className="text-lg">${item.product.price.toFixed(2)}</p>
        </div>

        <div>
          <div className="flex space-x-3">
            <label>Quantity:</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min={1}
              value={item.quantity}
              onChange={handleQuantityChange}
              className="block w-14 h-8 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>

          <div className="flex justify-end mt-3">
            <button
              className="rounded p-1 hover:bg-red-100"
              onClick={handleRemoveItem}
            >
              Remove <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
