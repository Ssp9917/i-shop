import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { MainContext } from "../../Context/Context";

const ProductBox = ({name,image,tag,price,discount,latest_price}) => {
  const {
    product,
    isHome,
    fetchProduct,
    bestSellor,
    API_BASE_URL,
    productImageUrl,
    cat,
    catFilterProduct,
  } = useContext(MainContext);

  useEffect(() => {
    fetchProduct();
  }, []);

  // console.log(catFilterProduct)
  // console.log(cat)
  return (
   
        <div
          className=" group relative hover:shadow-2xl overflow-hidden  mt-5 "
        >
          <div className="absolute bg-[rgba(0,0,0,0.7)]  w-full h-full z-50 top-full left-0 group-hover:top-0 transition-all duration-500  flex justify-center items-center">
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-red-100 cursor-pointer flex justify-center items-center rounded-full">
                <FaRegHeart size={25} color="blue" />
              </div>
              <div className="w-12 h-12 bg-blue-100 cursor-pointer  flex justify-center items-center rounded-full">
                <BsFillCartPlusFill size={25} color="red" />
              </div>
            </div>
          </div>
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
            <p className="text-red-700 font-medium">${price}</p>
            <p className="line-through">${latest_price}</p>
          </div>
          <div className="text-xl text-center text-green-500">
            {discount} % OFF 😍
          </div>
        </div>
     
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
