import React, { useContext, useState } from "react";
import Ishop from "../../Container/Image/iSHOP Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../../Context/Context";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/userSlice";

const SignUp = () => {
  const [showPassword,setShowPassword] = useState(false)


  const { API_BASE_URL, USER_BASE_URL, openToast } = useContext(MainContext);
  const navigator = useNavigate();
  const dispatcher = useDispatch();

  const signUpFormHandler = (e) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios
      .post(API_BASE_URL + USER_BASE_URL + "/register", data)
      .then((success) => {
        if (success.data.status) {
          openToast(success.data.msg, "success");
          dispatcher(
            login({
              user: success.data.user,
            })
          );
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
              Create a new account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={signUpFormHandler}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your name"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
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
                <div className="flex gap-1">
                  <input
                    type={showPassword?"text":"password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border w-[80%] border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                  <div onClick={()=>{setShowPassword(!showPassword)}}  className="cursor-pointer bg-red-500 text-white px-3 rounded flex justify-center items-center">{showPassword?'Hide':'Show'}</div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-[#FF4252]  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have a account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
