import React, { useContext, useEffect, useState } from "react";
import Container from "../../Container/Website/Container";
import { useDispatch, useSelector } from "react-redux";
import { MainContext } from "../../Context/Context";
import { IoCloseSharp } from "react-icons/io5";
import { removeFromCart } from "../../reducers/cartSlice";

const Cart = () => {
  const cart = useSelector((store) => store.cart);

  const { API_BASE_URL, PRODUCT_BASE_URL,fetchProduct,product,productImageUrl } = useContext(MainContext);

  const dispatcher = useDispatch()

  useEffect(() => {
   fetchProduct()
  }, []);

  //for loop
  const cartProducts = []
  for(let p of product){
    for(let c of cart.data){
      if(c.pId == p._id){
        cartProducts.push(
          {
            ...c,
            ...p
          }
        )
      }
    }
  }

  return (
    <Container extraClass={"mt-4"}>
      <div className="w-full text-center pt-2 pb-2 bg-[#F6F7F8]">Cart</div>

      <div className=" grid grid-cols-12 mt-4">
        <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
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
          <div className=" grid grid-cols-12  mt-4 items-center">
            <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
              <div className="mx-4">
                <img src={API_BASE_URL+productImageUrl+d.image} width={150} alt="" />
              </div>
            </div>
            <div className=" col-span-3 text-center text-[#22262A] font-[600] ">
              {d.name}
            </div>
            <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
              {d.price}
            </div>
           
            <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
              {d.qty}
            </div>
            <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
              {d.price*d.qty}
            </div>
            
            <div className="text-center text-[#22262A] font-[600] flex justify-center items-center"><IoCloseSharp onClick={()=>dispatcher(removeFromCart({pId:d.pId,total_price:d.price*d.qty}))} size={25} color="red" className="cursor-pointer"/></div>
          </div>
        );
      })}
    </Container>
  );
};

export default Cart;
