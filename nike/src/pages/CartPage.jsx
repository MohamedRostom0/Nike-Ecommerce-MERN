import { useState } from "react";
import { getStripeSecret } from "../api/cart";
import Button from "../components/UI/Button";
import Modal from "../components/UI/Modal";
import CartItems from "../components/cart-page/CartItems";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/stripe/CheckoutForm";

const SHIPPING_ESTIMATE = 10.0;
const TAX_ESTIMATE = 20.0;

const stripePromise = loadStripe(
  "pk_test_51K9u9vFeJ4SBKw6F5yW2bvQsULFHpgAHbLnvwXXeDFmTvyh2KPTyqkZ6YZ2lKklewpv66KoeuaYvk1kqFx0hDWfk00EmVrUFH9"
);

const CartPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [stripeSecret, setStripeSecret] = useState(null);

  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/products");
  };

  const handleCheckout = async () => {
    const tempStripeSecret = await getStripeSecret({
      userId: auth.user._id,
      token: auth.token,
    });
    setStripeSecret(tempStripeSecret);
    // console.log(stripeSecret);

    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {cart.items.length > 0 && (
        <div className="pt-20 flex flex-1 justify-center">
          <div className="w-1/2 p-3">
            <h1 className="font-palanquin text-4xl max-sm:text-[72px] font-bold text-slate-gray">
              Shopping Cart
            </h1>

            <CartItems />
          </div>

          <div className="w-1/2 max-w-[600px] p-24">
            <div className="bg-red-50 flex flex-col space-y-4 p-4">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <hr />
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${cart.total.toFixed(2)}</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p>Shipping estimate</p>
                <p>${SHIPPING_ESTIMATE.toFixed(2)}</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p>Tax estimate</p>
                <p>${TAX_ESTIMATE.toFixed(2)}</p>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-lg">
                <h2>Order total</h2>
                <p>${cart.total.toFixed(2)}</p>
              </div>
              <hr />

              <Button label="Checkout" onClick={handleCheckout} />
            </div>
          </div>
        </div>
      )}

      {cart.items.length === 0 && (
        <div className="pt-32 flex flex-1 flex-col items-center h-screen">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Your cart is currently empty
          </h1>

          <Button label="Shop now" onClick={handleClick} />
        </div>
      )}

      {showModal && stripeSecret !== null && (
        <Modal onClose={onCloseModal} title="Payment Details">
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: stripeSecret.client_secret,
              appearance: { theme: "stripe" },
            }}
          >
            <CheckoutForm />
          </Elements>
        </Modal>
      )}
    </>
  );
};

export default CartPage;
