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

  console.log(response.data);

  return response.data;
}
