import React, { useContext, useEffect, useState } from "react";
import Container from "../../Container/Website/Container";
import { useDispatch, useSelector } from "react-redux";
import { MainContext } from "../../Context/Context";
import { IoCloseSharp } from "react-icons/io5";
import { incCartQty, removeFromCart } from "../../reducers/cartSlice";
import { FaCirclePlus } from "react-icons/fa6";
import { FaMinusCircle } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Cart = () => {
  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);

  const {
    API_BASE_URL,
    fetchProduct,
    product,
    productImageUrl,
    CART_BASE_URL
  } = useContext(MainContext);

  const dispatcher = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  //for loop
  const cartProducts = [];
  for (let p of product) {
    for (let c of cart.data) {
      if (c.pId == p._id) {
        cartProducts.push({
          ...c,
          ...p,
        });
      }
    }
  }

  const updateDbCart = (pId,newQty) => {
    if(user.data != null){
      axios.put(API_BASE_URL+CART_BASE_URL+'/change-quantity',{user_id:user.data._id,pId,newQty})
    }
  };

  const removeFromDbCart = (pId) =>{
    if(user.data !=null){
      axios.post(API_BASE_URL+CART_BASE_URL+'/remove-from-cart',{
        pId,user_id:user.data._id
      }).then(
        ()=>{

        }
      ).catch(
        ()=>{
          
        }
      )
    }
  }

  const checkOut = () => {
    if(user.data == null){
      navigator('/login')
    }else{
      navigator('/checkout')
    }
  }

  return (
    <Container extraClass={"mt-4"}>
      <div className="w-full text-center pt-2 pb-2 bg-[#F6F7F8]">Cart</div>

      <div className="grid-cols-12 mt-4  hidden sm:grid">
        <div className=" col-span-2  text-center text-[#22262A] font-[600] ">
          <div>Image</div>
        </div>
        <div className=" col-span-3 text-center text-[#22262A] font-[600] ">
          Product Name
        </div>
        <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
          Unit Price
        </div>
        <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
          Qty
        </div>
        <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
          Total Price
        </div>
        <div className="text-center text-[#22262A] font-[600]">Remove</div>
      </div>

      {cartProducts.map((d, i) => {
        return (
          <>
            <div className="grid-cols-12  mt-4 items-center hidden sm:grid">
              <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
                <div className="mx-4">
                  <img
                    src={API_BASE_URL + productImageUrl + d.image}
                    width={150}
                    alt=""
                  />
                </div>
              </div>
              <div className=" col-span-3 text-center text-[#22262A] font-[600] ">
                {d.name}
              </div>
              <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
                {d.latest_price}
              </div>

              <div className=" col-span-2 text-center text-[#22262A] font-[600] flex justify-center items-center gap-3">
                <FaMinusCircle
                  size={20}
                  className="cursor-pointer"
                  color="blue"
                  onClick={() => {
                    dispatcher(
                      incCartQty({
                        pId: d.pId,
                        price: d.latest_price,
                        flag: false,
                      })
                    );
                    updateDbCart(d.pId, d.qty - 1);
                  }}
                />
                <span>{d.qty}</span>
                <FaCirclePlus
                  size={20}
                  className="cursor-pointer"
                  color="blue"
                  onClick={() => {
                    dispatcher(
                      incCartQty({
                        pId: d.pId,
                        price: d.latest_price,
                        flag: true,
                      })
                    );
                    updateDbCart(d.pId, d.qty + 1);
                  }}
                />
              </div>
              <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
                {d.latest_price * d.qty}
              </div>

              <div className="text-center text-[#22262A] font-[600] flex justify-center items-center">
                <IoCloseSharp
                  onClick={() =>{
                    removeFromDbCart(d._id)
                    dispatcher(
                      removeFromCart({
                        pId: d.pId,
                        total_price: d.latest_price * d.qty,
                      })
                    )
                  }
                  }
                  size={25}
                  color="red"
                  className="cursor-pointer"
                />
              </div>
            </div>

            {/* responsive cart */}
            <li class="flex py-6 sm:hidden">
              <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={API_BASE_URL + productImageUrl + d.image}
                  alt=""
                  class="h-full w-full object-cover object-center"
                />
              </div>

              <div class="ml-4 flex flex-1 flex-col">
                <div>
                  <div class="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href="#">{d.name}</a>
                    </h3>
                    <p class="ml-4">₹ {d.latest_price * d.qty}</p>
                  </div>
                </div>
                <div class="flex flex-1 items-end justify-between text-sm">
                  <div className=" col-span-2 text-center text-[#22262A] font-[600] flex justify-center items-center gap-3">
                    <FaMinusCircle
                      size={20}
                      className="cursor-pointer"
                      color="blue"
                      onClick={() => {
                        dispatcher(
                          incCartQty({
                            pId: d.pId,
                            price: d.latest_price,
                            flag: false,
                          })
                        );
                      }}
                    />
                    <span>{d.qty}</span>
                    <FaCirclePlus
                      size={20}
                      className="cursor-pointer"
                      color="blue"
                      onClick={() => {
                        dispatcher(
                          incCartQty({
                            pId: d.pId,
                            price: d.latest_price,
                            flag: true,
                          })
                        );
                      }}
                    />
                  </div>

                  <div class="flex">
                    <button
                      type="button"
                      class="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() =>
                        dispatcher(
                          removeFromCart({
                            pId: d.pId,
                            total_price: d.latest_price * d.qty,
                          })
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </>
        );
      })}

      <div className="grid grid-cols-2">
        <div>
          <div class="py-10">
            <label
              htmlFor="promo"
              class="font-semibold inline-block mb-3 text-sm uppercase"
            >
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              class="p-2 text-sm w-full"
            />
          </div>
          <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            Apply
          </button>
        </div>
        <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-3">
          <div class="mb-2 flex justify-between">
            <p class="text-gray-700">Subtotal</p>
            <p class="text-gray-700">₹ {cart.total}</p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-700">Shipping</p>
            <p class="text-gray-700">Free</p>
          </div>
          <hr class="my-4" />
          <div class="flex justify-between">
            <p class="text-lg font-bold">Total</p>
            <div class="">
              <p class="mb-1 text-lg font-bold">₹ {cart.total}</p>
            </div>
          </div>
          <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={checkOut}>
            Check out
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
