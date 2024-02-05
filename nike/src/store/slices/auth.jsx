import { createSlice } from "@reduxjs/toolkit";

// Function to save auth data to sessionStorage
const saveAuthDataToSession = (authData) => {
  sessionStorage.setItem("authData", JSON.stringify(authData));
};

// Function to load auth data from sessionStorage
const loadAuthDataFromSession = () => {
  const savedData = sessionStorage.getItem("authData");
  return savedData ? JSON.parse(savedData) : null;
};

// Load initial state from sessionStorage or use default state
const initialState = loadAuthDataFromSession() || {
  token: "",
  isLoggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
      saveAuthDataToSession({
        token: state.token,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      });
    },

    logout: (state) => {
      state.token = "";
      state.user = null;
      state.isLoggedIn = false;
    },

    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      saveAuthDataToSession({
        token: state.token,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      });
    },
  },
});

// Export actions
export const authActions = authSlice.actions;

// Export reducer
export default authSlice.reducer;
