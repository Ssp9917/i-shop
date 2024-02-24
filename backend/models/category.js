const mongoose  = require('mongoose');

const CategorySchema = new mongoose.Schema(
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
        },
        image:{
            type:String,
            default:null
        }
    },
    {
        timestamps:true
    }
)

const CategoryModel = mongoose.model('Category',CategorySchema);

module.exports = CategoryModel