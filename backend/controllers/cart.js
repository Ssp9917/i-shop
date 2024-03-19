const CartModel = require("../models/cart");

class CartController {
  constructor() {
    this.model = CartModel;
  }

  //change Quantity
  changeQty({user_id,pId,newQty}){
    return new Promise(
     async (res,rej)=>{
            try {
                await this.model.updateOne({user_id:user_id,pId:pId},{qty:newQty})
            } catch (error) {
                rej({
                    msg:"Internal server error",
                    status:0
                })
            }
        }
    )
  }   


  //   state to cart
  stateToCart(user_id, { state_cart }) {
    return new Promise(async (res, rej) => {
      try {
        console.log(user_id, state_cart);
        //destruct every cart inside the database
        for (let sc of state_cart) {
          // find login user
          const existingCart = await this.model.findOne({
            pId: sc.pId,
            user_id: user_id,
          });

          if (existingCart) {
            await this.model.updateOne(
              { _id: existingCart._id },
              {
                qty: sc.qty + existingCart.qty,
              }
            );
          } else {
            await this.model({
              pId: sc.pId,
              qty: sc.qty,
              user_id: user_id,
            }).save();
          }
        }

        // db to cart
        const userCart = await this.model.find({user_id:user_id}).populate("pId")
        res({
          msg: "success",
          status: 1,
          userCart
        });
      } catch (error) {
        console.log(error);
        rej({
          msg: "Internal server error",
          status: 0,
        });
      }
    });
  }

  // add to cart
  addToCart({user_id,pId}){
    return new Promise(
     async (res,rej)=>{
            try {
               const currentCart = await this.model.findOne({user_id:user_id,pId:pId})
               if(currentCart){
                await this.model.updateOne({_id:currentCart._id},{qty:currentCart.qty+1})
               }else{
                 new this.model({
                  user_id:user_id,
                  pId:pId,
                  qty:1
                }).save().then(
                  ()=>{
                    res({
                      msg:"Added Successful",
                      status:0
                  })
                  }
                ).catch(
                  (err)=>{
                    console.log(err)
                    rej({
                      msg:"Cant added",
                      status:0
                  })
                  }
                )
               }
            } catch (error) {
              console.log(error)
                rej({
                    msg:"Internal server error",
                    status:0
                })
            }
        }
    )
  }   

  // remove from cart
  removeFromCart({user_id,pId}){
    return new Promise(
     async (res,rej)=>{
            try {

              this.model.deleteOne({user_id:user_id,pId:pId}).then(
                  ()=>{
                    res({
                      msg:"Deleted Successful",
                      status:0
                  })
                  }
                ).catch(
                  (err)=>{
                    console.log(err)
                    rej({
                      msg:"Cant deleted",
                      status:0
                  })
                  }
                )
               }
             catch (error) {
              console.log(error)
                rej({
                    msg:"Internal server error",
                    status:0
                })
            }
        }
    )
  } 
}

module.exports = CartController;
