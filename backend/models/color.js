const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            maxLength:50
        },
        slug:{
            type:String,
            required:true,
            maxLength:50
        },
        status:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:true
    }
)

const ColorModel = mongoose.model('colors',ColorSchema)

module.exports = ColorModel