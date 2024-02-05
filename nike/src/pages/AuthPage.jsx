import Login from "../components/auth-page/Login";
import { useLocation } from "react-router-dom";
import Register from "../components/auth-page/Register";

export const AuthPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const paramValue = queryParams.get("fn");

  return (
    <>
      {paramValue === "login" && <Login />}
      {paramValue === "register" && <Register />}
    </>
  );
};
