const {Router} = require('express')
const OrderController = require('../controllers/order')

const OrderRouter = Router()

OrderRouter.post('/place-order/:id?',(req,res)=>{
    new OrderController().placeOrder(req.body,req.params.id).then(
        (success)=>{
            res.send(success)
        }
    ).catch(
        (error)=>{
            res.send(error)
        }
    )
})

module.exports = OrderRouter