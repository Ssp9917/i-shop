import React from "react";
import Container from "../../Container/Website/Container";

const Cart = () => {
  const cartItems = [
    {
      image: "",
      title: "Philips Hue 7W BR30 Connected Downlight Lamp",
      price: 998,
      qty: 1,
      unit_price: 499,
    },
  ];

  return (
    <Container extraClass={"mt-4"}>
      <div className="w-full text-center pt-2 pb-2 bg-[#F6F7F8]">Cart</div>

      <div className=" grid grid-cols-12 mt-4">
        <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
          <div>Image</div>
        </div>
        <div className=" col-span-3 text-center text-[#22262A] font-[600] ">
          Title
        </div>
        <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
          Price
        </div>
        <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
          Qty
        </div>
        <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
          Unit Price
        </div>
        <div className="text-center text-[#22262A] font-[600]">Remove</div>
      </div>

      {cartItems.map((d, i) => {
       
        return (
          <div className=" grid grid-cols-12  mt-4">
            <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
              <div>
                <img src={d.image} alt="" />
              </div>
            </div>
            <div className=" col-span-3 text-center text-[#22262A] font-[600] ">
              {d.title}
            </div>
            <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
              {d.price}
            </div>
            <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
              {d.qty}
            </div>
            <div className=" col-span-2 text-center text-[#22262A] font-[600] ">
              {d.unit_price}
            </div>
            <div className="text-center text-[#22262A] font-[600]">X</div>
          </div>
        );
      })}
    </Container>
  );
};

export default Cart;
