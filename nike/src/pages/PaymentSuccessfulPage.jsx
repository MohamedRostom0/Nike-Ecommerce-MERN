import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { createOrder } from "../api/orders";

export default function PaymentSuccessfulPage() {
  const authState = useSelector((state) => state.auth);
  const location = useLocation();
  const hasRunOnceRef = useRef(false);

  const queryParams = new URLSearchParams(location.search);
  const payment_intent = queryParams.get("payment_intent");
  const payment_intent_client_secret = queryParams.get(
    "payment_intent_client_secret"
  );
  const redirect_status = queryParams.get("redirect_status");

  const { sendRequest: createOrderReq } = useHttp(createOrder);
  useEffect(() => {
    if (!hasRunOnceRef.current) {
      const order = {
        stripe: {
          payment_intent,
          payment_intent_client_secret,
          status: redirect_status,
        },

        userId: authState.user._id,
      };
      createOrderReq({ order, token: authState.token });

      hasRunOnceRef.current = true;
    }
  }, [
    payment_intent,
    payment_intent_client_secret,
    redirect_status,
    createOrderReq,
    authState,
  ]);

  return (
    <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Your payment was successful !!
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-coral-red px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-coral-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </a>
        </div>
      </div>
    </div>
  );
}
