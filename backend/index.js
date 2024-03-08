const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const CategoryRouter = require('./routers/category');
const ColorRouter = require('./routers/color');
const ProductRouter = require('./routers/product');

const app = express()

// middleware
app.use(express.json())
app.use(cors())
// serve static folder from backend0
app.use(express.static('public'));

// routers
app.use('/category',CategoryRouter)
app.use('/color', ColorRouter)
app.use('/product',ProductRouter)

mongoose.connect(
    'mongodb://localhost:27017',
    {dbName:"ishop"}
).then(
    ()=>{
        console.log('db connected successfully')
        app.listen(5000,()=>{
            console.log("Server Started")
        })
    } 
).catch(
    (err)=>{
        console.log(err.message)
    }
)