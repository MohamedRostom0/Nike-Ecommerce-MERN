import axios from "axios";
import { API_DOMAIN } from "../constants";

export async function createOrder({ order, token }) {
  const response = await axios.post(`${API_DOMAIN}/api/orders`, order, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.data);
  return response.data;
}
