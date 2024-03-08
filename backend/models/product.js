const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        slug:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        discount:{
            type:Number,
            default:0
        },
        latest_price:{
            type:Number,
        },
        status:{
            type:Boolean,
            default:true
        },
        image:{
            type:String,
        },
        stock:{
            type:Boolean,
            default:true
        },
        category:{
            type:mongoose.Schema.ObjectId,
            ref:"Category",
            required:true
        },
        color:[
            {
                type:mongoose.Schema.ObjectId,
                ref:"colors",
                required:true
            }
        ],
        bestSellor:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:true
    }
)

const ProductModel = mongoose.model('Product',ProductSchema);
module.exports = ProductModel;