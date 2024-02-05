import axios from "axios";
import { API_DOMAIN } from "../constants";

export async function getProductsList(query = "") {
  const response = await axios.get(`${API_DOMAIN}/api/products/${query}`);
  return response.data;
}

export async function getProductById(id) {
  const response = await axios.get(`${API_DOMAIN}/api/products/${id}`);
  return response.data;
}
