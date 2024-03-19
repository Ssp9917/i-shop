import React, { useContext, useEffect, useState } from "react";
import Container from "../../Container/Website/Container";
import { MainContext } from "../../Context/Context";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { emptyCart } from "../../reducers/cartSlice";

const Checkout = () => {
  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  const [orderProduct, setOrderProduct] = useState([]);

  const {
    API_BASE_URL,
    fetchProduct,
    product,
    productImageUrl,
    ORDER_BASE_URL,
  } = useContext(MainContext);

  const dispatcher = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
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

      setOrderProduct(cartProducts);
    }
  }, [product]);

  // console.log(orderProduct)

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log('hello')

    const shipping_details = {
      name: e.target.name.value,
      email: e.target.email.value,
      contact: e.target.contact.value,
      address: e.target.address.value,
      pincode: e.target.pincode.value,
    };

    const payment_mode = e.target.payment_mode.value;

    const order_total = cart.total + (payment_mode == "1" ? 50 : 0);

    axios.post(
      API_BASE_URL + ORDER_BASE_URL + "/place-order",
      {
        payment_mode,
        order_total,
        shipping_details,
        product_details:orderProduct,
        user_id:user.data._id
      }
    ).then(
      (success)=>{
        console.log(success)
        if(success.data.status == 1){
          // console.log('success')
          if(payment_mode == 1){
            // thank you
            dispatcher(emptyCart())
            navigator("/order-placed/"+success.data.order_id)
          }else{
            console.log('razorpay')
            // razorpay
            initRazorpayOrder()

          }
        }
      }
    ).catch(
      (err)=>{
        console.log(err)
      }
    )
  };

  const initRazorpayOrder = () => {

  }

  return (
    <Container>
      <div className="w-full flex justify-center ">
        <div className="text-3xl font-bold text-blue-500">--Checkout--</div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1">
        {/* Contact information */}
        <div className="flex flex-col items-center">
          <form className="mt-4 w-full ps-10 pe-10" onSubmit={formSubmitHandler}>
            <div className="text-xl  font-medium ">1. Contact Information</div>
            <div className="mt-2">
              <label htmlFor="" className="text-xl font-medium">
                Name :{" "}
              </label>
              <br />
              <input
                type="text"
                name="name"
                defaultValue={user.data?.name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="" className="text-xl font-medium">
                E mail :{" "}
              </label>{" "}
              <br />
              <input
                type="text"
                name="email"
                defaultValue={user.data?.email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="" className="text-xl font-medium">
                Phone No. :{" "}
              </label>{" "}
              <br />
              <input
                type="number"
                name="contact"
                defaultValue={user.data?.phone}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="" className="text-xl font-medium">
                Address :{" "}
              </label>{" "}
              <br />
              <input
                type="text"
                name="address"
                defaultValue={user.data?.address}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="" className="text-xl font-medium">
                Pincode :{" "}
              </label>{" "}
              <br />
              <input
                type="number"
                name="pincode"
                defaultValue={user.data?.pincode}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="" className="text-xl font-medium">
                Payment method :{" "}
              </label>{" "}
              <br />
              <input
                type="radio"
                name="payment_mode"
                value={1}
                className="border p-2 ml-2 border-red-500"
              />{" "}
              Cash on delevery (₹ 50 extra charge) <br />
              <input
                type="radio"
                name="payment_mode"
                checked
                value={2}
                className="border p-2 ml-2 border-red-500"
              />{" "}
              Razorpay(No extra charge)
            </div>
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Place Order
            </button>
          </form>
        </div>
        {/* form detail */}
        <div>
          {orderProduct.map((d, i) => {
            return (
              <>
                <li class="flex py-6 items-center">
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
                        <p class="ml-4">
                          Price = ₹ {d.latest_price} X {d.qty}
                        </p>
                        <p class="ml-4">Total = ₹ {d.latest_price * d.qty}</p>
                      </div>
                    </div>
                  </div>
                </li>

                <div> Total : ₹ {cart.total} </div>
              </>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
