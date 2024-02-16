import axios from "axios";
import { API_DOMAIN } from "../constants";

export async function getUserCart({ userId, token }) {
  const response = await axios.get(`${API_DOMAIN}/api/users/${userId}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function addItemToCart({ cartItem, userId, token }) {
  const response = await axios.post(
    `${API_DOMAIN}/api/users/${userId}/cart/items`,
    cartItem,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function updateCart({ cart, userId, token }) {
  const response = await axios.put(
    `${API_DOMAIN}/api/users/${userId}/cart`,
    cart,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function getStripeSecret({ userId, token }) {
  const response = await axios.get(
    `${API_DOMAIN}/api/users/${userId}/cart/checkout/secret`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
