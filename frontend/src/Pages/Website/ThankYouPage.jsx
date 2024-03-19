import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ThankYouPage = () => {

    const {id} = useParams()

    const cart = useSelector(store=>store.cart)

  return (
    <div class="flex items-center justify-center ">
      <div class="p-1 rounded shadow-lg bg-gradient-to-r from-purple-500 via-green-500 to-blue-500">
        <div class="flex flex-col items-center p-1 space-y-1 bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-green-600 w-28 h-28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 class="text-3xl  text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Thank You !
          </h1>
          <p>
            Thank you for your interest! Check your email for a link to the
            guide.
          </p>
          <div class="p-3 border border-gray-200 rounded-3xl w-full group transition-all duration-500 hover:border-gray-400 ">
            <h2 class="font-manrope font-bold text-3xl leading-4 text-black pb-4 border-b border-gray-200 ">
              Order Summary
            </h2>
            <div class="data py-6 border-b border-gray-200">
              <div class="flex items-center justify-between gap-4 mb-5">
                <p class="font-normal text-lg leading-4 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                  Total
                </p>
                <p class="font-medium text-lg leading-4 text-gray-900">
                  {(cart.total)+50}
                </p>
              </div>
              <div class="flex items-center justify-between gap-4 mb-5">
                <p class="font-normal text-lg leading-4 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                  Shipping
                </p>
                <p class="font-medium text-lg leading-4 text-gray-600">
                  Free
                </p>
              </div>
              <div class="flex items-center justify-between gap-4 ">
                <p class="font-normal text-lg leading-4 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">
                  Order ID
                </p>
                <p class="font-medium text-lg leading-4 text-emerald-500">
                  {id}
                </p>
              </div>
            </div>
          </div>
          <Link to={'/'} class="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600  rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3 h-3 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span class="text-sm font-medium">Back To Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
