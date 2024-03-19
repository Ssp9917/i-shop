const CategoryModel = require("../models/category");
const OrderModel = require("../models/order");
const Razorpay = require("razorpay");

// create instance
var instance = new Razorpay({
  key_id: "rzp_test_xxni8GFoYdKVgk",
  key_secret: "o5Bdoq6MlCg5STSwZZq7qiEh",
});

class OrderController {
  constructor() {
    this.model = OrderModel;
  }

  placeOrder({
    payment_mode,
    order_total,
    shipping_details,
    product_details,
    user_id,
  }) {
    // console.log(payment_mode, order_total, shipping_details,product_details,user_id)
    return new Promise((res, rej) => {
      try {
        const order = this.model({
          payment_mode,
          order_total,
          shipping_details,
          product_details,
          user_id,
        });
        // console.log(order);

        order
          .save()
          .then(async (success) => {
            // console.log(success.data)
            if (payment_mode == 2) {
              // create an order on razorpay

              var options = {
                amount: order_total*100, // amount in the smallest currency unit
                currency: "INR",
                receipt: order._id
              };
              instance.orders.create(options, async function (err, razor_order) {
                if (err) {
                  console.log(err)
                  rej({
                    msg: "Unable to place order",
                    status: 0,
                  });
                } else {
                  console.log(order);
                  await CategoryModel.deleteMany({ user_id: user_id });

                  res({
                    msg: "Order Placed",
                    status: 1,
                    order_id: order._id,
                    razor_order
                  });
                }
              });
            } else {
              await CategoryModel.deleteMany({ user_id: user_id });

              res({
                msg: "Order Placed",
                status: 1,
                order_id: order._id,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            rej({
              msg: "Unable to order placed",
              status: 0,
              order_id: null,
            });
          });
      } catch (error) {}
    });
  }
}

module.exports = OrderController;
