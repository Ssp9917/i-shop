import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../Context/Context";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../reducers/cartSlice";

const SingleProduct = () => {
  const [sinProduct, setSinProduct] = useState([]);
  const [singleProductImage, setSingleProductImage] = useState("");

  const { API_BASE_URL, PRODUCT_BASE_URL,CART_BASE_URL } = useContext(MainContext);
  const { id } = useParams();
  // console.log(id)

  const user = useSelector(store=>store.user)

  const addToDbCart = (pId) => {
    console.log('cartId',pId)
    if(user.data != null){
      axios.post(API_BASE_URL+CART_BASE_URL+'/add-to-cart',{user_id:user.data._id,pId}).then(
        (success)=>{
          console.log(success)
        }
      ).catch(
        (err)=>{
          console.log(err)
        }
      )
    }
  }

  // get product details
  useEffect(() => {
    axios
      .get(API_BASE_URL + PRODUCT_BASE_URL + "/" + id)
      .then((success) => {
        setSinProduct([success.data.product]);
        setSingleProductImage(success.data.imageBaseUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const dispatcher = useDispatch()

  console.log(sinProduct);
  return (
    <>
      {sinProduct.map((d, i) => {
        return (
          <div className="flex mx-[170px]">
            <div className="w-[300px] [h-400px] flex justify-center items-center">
              <img
                className=""
                src={API_BASE_URL + singleProductImage + d.image}
                alt=""
              />
            </div>

            <div className="flex flex-col mx-16">
              <h1 className=" text-4xl font-semibold text-blue-500">
                {d.name}
              </h1>
              <div className="mt-2">
                <div className="flex items-center gap-7">
                  <div>New Price : ₹ {d.latest_price} </div>{" "}
                  <div className="text-xl text-center text-green-500">
                    {d.discount} % OFF 😍
                  </div>
                </div>
                <div>
                  Old Price :{" "}
                  <span className="line-through text-red-500">₹ {d.price}</span>{" "}
                </div>
                <ul className="flex  gap-1 mt-2 mb-2">
                  <Stars yellow={5} /> (4.5/5 😍)
                </ul>
              </div>

              <p className="mt-2">
                <span>Category :</span>
                {d.category.name}
              </p>
              <p className="mt-1">
                <span className="flex gap-4">
                  Colors :
                  <div className="flex gap-3">
                    {d.color.map((d) => {
                      return (
                        <div
                          className="w-6 h-6 rounded-[50%]"
                          style={{ backgroundColor: `${d.slug}` }}
                        ></div>
                      );
                    })}
                  </div>
                </span>
              </p>

              <button  onClick={() =>{
                    addToDbCart(d._id)
                    dispatcher(
                      addToCart({ pId: d._id, qty: 1, price: d.latest_price })
                    )}
                  } className="pt-2 pb-2 px-10 mt-5 text-white text-xl rounded text-center bg-[#ff4141]">
                ADD TO CART
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SingleProduct;

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
