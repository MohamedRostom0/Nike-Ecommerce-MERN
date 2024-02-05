import axios from "axios";
import { API_DEFAULT_ERROR, API_DOMAIN } from "../constants";

export async function userLogin({ email, password }) {
  let response = null;
  try {
    response = await axios.post(`${API_DOMAIN}/api/auth/login`, {
      email,
      password,
    });
  } catch (error) {
    response = error.response.data;
  }

  if (response.status !== 200) {
    throw new Error(response.message || API_DEFAULT_ERROR);
  }

  return response.data;
}

export async function userRegister({ email, password, profile }) {
  let response = null;
  try {
    response = await axios.post(`${API_DOMAIN}/api/auth/register`, {
      email,
      password,
      profile,
    });
  } catch (error) {
    response = error.response.data;
  }

  if (response.status !== 201) {
    throw new Error(response.message || API_DEFAULT_ERROR);
  }

  return response.data;
}
