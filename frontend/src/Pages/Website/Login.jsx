import React, { useContext, useState } from "react";
import Ishop from "../../Container/Image/iSHOP Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MainContext } from "../../Context/Context";
import axios from "axios";
import { login } from "../../reducers/userSlice";
import { dbToCart } from "../../reducers/cartSlice";

const Login = () => {
  const [showPassword,setShowPassword] = useState(false)

  const { API_BASE_URL, USER_BASE_URL, CART_BASE_URL, openToast } =
    useContext(MainContext);
  const navigator = useNavigate();
  const dispatcher = useDispatch();
  const cart = useSelector((store) => store.cart);

  const loginFormHandler = (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios
      .post(API_BASE_URL + USER_BASE_URL + "/login", data)
      .then((success) => {
        if (success.data.status) {
          openToast(success.data.msg, "success");
          dispatcher(
            login({
              user: success.data.user,
            })
          );
          stateToCart(success.data.user._id);
          setTimeout(() => {
            navigator("/");
          }, 1000);
        } else {
          openToast(success.data.msg, "error");
        }
      })
      .catch((err) => {
        openToast(err.message);
      });
  };
  // state to cart function
  const stateToCart = (userId) => {
    axios
      .post(API_BASE_URL + CART_BASE_URL + "/state-to-cart/" + userId, {
        state_cart: cart.data,
      })
      .then((success) => {
        if (success.data.status == 1) {
          // console.log(success.data.userCart)
          // save into cartSlice
          let total = 0
          const cartData = success.data.userCart.map((c) => {
            total += (c.pId.latest_price*c.qty);
            return {
              pId: c.pId._id,
              qty:c.qty
            };
          });
          dispatcher(dbToCart({data:cartData,total})) 
        }
      })
      .catch(() => {});
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center  text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-20 h-20 mr-2" src={Ishop} alt="logo" />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 border border-[#FF4252] rounded-xl">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={loginFormHandler}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div>
                <input
                  type={showPassword?"text":"password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                 <div onClick={()=>{setShowPassword(!showPassword)}}  className="cursor-pointer bg-red-500 text-white px-3 rounded flex justify-center items-center">{showPassword?'Hide':'Show'}</div>
                 </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-[#FF4252]  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
