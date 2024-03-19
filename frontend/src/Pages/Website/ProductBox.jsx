import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { MainContext } from "../../Context/Context";
import { addToCart } from "../../reducers/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductBox = ({
  name,
  image,
  tag,
  price,
  discount,
  latest_price,
  _id,
  grid,
}) => {
  const dispatcher = useDispatch();
  const navigator = useNavigate();

  const { API_BASE_URL, productImageUrl } = useContext(MainContext);

  // console.log(catFilterProduct)
  // console.log(cat)
  return (
    <>
      {grid ? (
        <div
          className=" group relative hover:shadow-2xl overflow-hidden  mt-5 "
          onClick={() => navigator("/" + _id)}
        >
          {tag ? (
            <div className="w-12 h-8 bg-[#FF4858] text-white flex justify-center items-center font-[600]">
              HOT
            </div>
          ) : (
            ""
          )}

          <img
            src={API_BASE_URL + productImageUrl + image}
            alt="macbook"
            className="h-[100px] mx-auto"
          />
          <h2 className="text-center font-semibold">{name}</h2>
          <ul className="flex justify-center gap-1 mt-2 mb-2">
            <Stars yellow={5} />
          </ul>
          <div className="flex gap-5 justify-center">
            <p className="text-red-700 font-medium">₹{latest_price}</p>
            <p className="line-through">₹{price}</p>
          </div>
          <div className="text-xl text-center text-green-500">
            {discount} % OFF 😍
          </div>
        </div>
      ) : (
        <div className="flex h-[165px] justify-around items-center group relative hover:shadow-2xl overflow-hidden  mt-5 ">
          {tag ? (
            <div className="w-12 h-8 bg-[#FF4858] text-white flex justify-center items-center font-[600]">
              HOT
            </div>
          ) : (
            ""
          )}
          <div className="w-[250px]">
            <img
              src={API_BASE_URL + productImageUrl + image}
              alt="macbook"
              className="h-[100px] mx-auto"
            />
          </div>
          <div>
            <h2 className="text-center font-semibold">{name}</h2>
            <ul className="flex justify-center gap-1 mt-2 mb-2">
              <Stars yellow={5} />
            </ul>
            <div className="flex gap-5 justify-center">
              <p className="text-red-700 font-medium">₹{latest_price}</p>
              <p className="line-through">₹{price}</p>
            </div>
            <div className="text-xl text-center text-green-500">
              {discount} % OFF 😍
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductBox;

function Stars({ yellow }) {
  let stars = [];
  let white = 5 - stars;

  for (let i = 1; i <= 5; i++) {
    if (i < yellow) {
      stars.push(<FaStar color="#FFC600" />);
    } else {
      stars.push(<FaStar color="#C1C8CE" />);
    }
  }

  return <>{stars}</>;
}
