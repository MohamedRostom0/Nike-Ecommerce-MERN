import { hamburger } from "../../../assets/icons";
import { headerLogo } from "../../../assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { navLinks } from "../../../constants";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserCart } from "../../../store/thunks/cart";

const Nav = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isLoggedIn) {
      dispatch(fetchUserCart({ token: auth.token, userId: auth.user._id }));
    }
  }, [dispatch, auth]);

  return (
    <header className="padding-x py-8 absolute z-10 w-full">
      <nav className="flex justify-between items-center max-container">
        <Link to="">
          <img alt="Logo" src={headerLogo} width={130} height={29} />
        </Link>

        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.href}
                className="font-montserrat leading-normal text-lg text-slate-gray"
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="border p-1.5 rounded-full border-coral-red hover:cursor-pointer">
            <Link
              to="/cart"
              className="font-montserrat leading-normal text-lg text-coral-red"
            >
              My Cart
            </Link>
            <span className="ml-1">
              <FontAwesomeIcon icon={faCartShopping} color="red" />
            </span>
          </li>

          {!auth.isLoggedIn && (
            <li className="border p-1.5 rounded-full border-coral-red">
              <Link
                to="/auth?fn=login"
                className="font-montserrat leading-normal text-lg text-coral-red"
              >
                Login/Register
              </Link>
            </li>
          )}
        </ul>

        <div className="hidden max-lg:block">
          <img alt="Hamburger icon" src={hamburger} width={25} height={25} />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
