const express = require('express');
const CartController = require('../controllers/cart');

const CartRouter = express.Router();

CartRouter.post(
    '/state-to-cart/:user_id',
    (req,res)=>{
        new CartController().stateToCart(req.params.user_id,req.body).then(
            (success)=>{
                res.send(success)
            }
        ).catch(
            (error)=>{
                res.send(error)
            }
        )
    }
)

// change quantity function
CartRouter.put(
    '/change-quantity',
    (req,res)=>{
        new CartController().changeQty(req.body).then(
            (success)=>{
                res.send(success)
            }
        ).catch(
            (error)=>{
                res.send(error)
            }
        )
    }
)


// add to cart function
CartRouter.post('/add-to-cart',(req,res)=>{
    new CartController().addToCart(req.body).then(
        (success)=>{
            res.send(success)
        }
    ).catch(
        (error)=>{
            res.send(error)
        }
    )
})


// remove from cart function
CartRouter.post('/remove-from-cart',(req,res)=>{
    new CartController().removeFromCart(req.body).then(
        (success)=>{
            res.send(success)
        }
    ).catch(
        (error)=>{
            res.send(error)
        }
    )
})

module.exports = CartRouter