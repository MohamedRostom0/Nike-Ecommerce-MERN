import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { headerLogo, nike_ad } from "../../assets/images";
import useHttp from "../../hooks/use-http";
import { userRegister } from "../../api/auth";
import { authActions } from "../../store/slices";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sendRequest, data, error: apiError, status } = useHttp(userRegister);

  if (status === "completed" && data !== null) {
    dispatch(authActions.login({ user: data.user, token: data.token }));
    navigate("/");
  }
  return (
    <div className="flex flex-1 justify-between">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <a href="/">
            <img className="mx-auto h-10 w-auto" src={headerLogo} alt="Nike" />
          </a>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[75%] p-5">
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              name: "",
              street: "",
              city: "",
              state: "",
              country: "",
              postalCode: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.name) {
                errors.name = "Name field is required";
              }

              if (!values.email) {
                errors.email = "Email field is required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              if (!values.password) {
                errors.password = "Password field is required";
              }

              if (!values.confirmPassword) {
                errors.confirmPassword = "Confirm-Password field is required";
              }

              if (values.password !== values.confirmPassword) {
                errors.password =
                  "Password and Confirm-Password fields must match";
              }

              if (!values.phone) {
                errors.phone = "Phone field is required";
              }

              if (!values.street) {
                errors.street = "street field is required";
              }

              if (!values.city) {
                errors.city = "city field is required";
              }

              if (!values.country) {
                errors.country = "country field is required";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              // setTimeout(() => {
              //   alert(JSON.stringify(values, null, 2));
              //   setSubmitting(false);
              // }, 400);
              setSubmitting(false);
              const profile = {
                name: values.name,
                phone: values.phone,
                address: {
                  street: values.street,
                  city: values.city,
                  state: values.state,
                  country: values.country,
                  postalCode: values.postalCode,
                },
              };
              sendRequest({
                email: values.email,
                password: values.password,
                profile,
              });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="md:grid md:grid-cols-2 md:gap-3 flex flex-col">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        required
                        className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        required
                        className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        required
                        className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Confirm Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        required
                        className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-2 grid grid-cols-3 gap-3">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          name="phone"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          required
                          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street
                      </label>
                      <div className="mt-2">
                        <input
                          id="street"
                          name="street"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.street}
                          required
                          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          name="city"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.city}
                          required
                          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 grid grid-cols-3 gap-3">
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State
                      </label>
                      <div className="mt-2">
                        <input
                          id="state"
                          name="state"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.state}
                          required
                          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <input
                          id="country"
                          name="country"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.country}
                          required
                          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Postal Code
                      </label>
                      <div className="mt-2">
                        <input
                          id="postalCode"
                          name="postalCode"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.postalCode}
                          required
                          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 mt-4">
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-1/2 justify-center rounded-md bg-coral-red px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-red"
                      >
                        Sign up
                      </button>
                    </div>
                  </div>

                  <div className="text-red-700 flex flex-col space-y-1">
                    {apiError && <p>{apiError}</p>}

                    {errors.name && touched.name && <p>{errors.name}</p>}
                    {errors.email && touched.email && <p>{errors.email}</p>}
                    {errors.password && touched.password && (
                      <p>{errors.password}</p>
                    )}
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p>{errors.confirmPassword}</p>
                    )}
                    {errors.phone && touched.phone && <p>{errors.phone}</p>}
                    {errors.street && touched.street && <p>{errors.street}</p>}
                  </div>
                </div>
              </form>
            )}
          </Formik>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <a
              href="/auth?fn=login"
              className="font-semibold leading-6 text-coral-red hover:text-red-400"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="flex justify-end items-center h-screen">
          <img src={nike_ad} alt="shoe" className=" max-h-full" />
        </div>
      </div>
    </div>
  );
};

export default Register;
