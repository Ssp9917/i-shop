const {Router} = require('express');
const ProductController = require('../controllers/product');
const fileUpload = require('express-fileupload')
const ProductRouter = Router();

// get bestsellor product
ProductRouter.get('/best-sellor',(req,res)=>{
    new ProductController().fetchBestSellor().then(
        (success)=>{
            res.send(success)
        }
    ).catch(
        (err)=>{
            res.send(err)
        }
    )
})

// get product api
ProductRouter.get('/:id?',(req,res)=>{
    new ProductController().read(req.params.id,req.query).then(
        (success)=>{
            res.send(success)
        }
    ).catch(
        (err)=>{
            res.send(err)
        }
    )
})

// create product api
ProductRouter.post('/create',
// middleware
fileUpload({
    createParentPath:true
}),
(req,res)=>{
    new ProductController().create(req.body,req.files.image).then(
        (success)=>{
            res.send(success)
        }
    ).catch(
        (err)=>{
            res.send(err)
        }
    )
})

// change status api
ProductRouter.put('/change-status/:id/:status',(req,res)=>{
    new ProductController().changeStatus(req.params.id,req.params.status).then(
        (success)=>{
            res.send(success)
        }
    ).catch(
        (err)=>{
            res.send(err)
        }
    )
}) 

// change stock api
ProductRouter.put('/change-stock/:id/:stock',(req,res)=>{
    new ProductController().changeStock(req.params.id,req.params.stock).then(
        (success)=>{
            res.send(success)
        }
    ).catch(
        (err)=>{
            res.send(err)
        }
    )
}) 

// delete product api
ProductRouter.delete('/delete/:id/imageName/:image',(req,res)=>{
    new ProductController().delete(req.params.id,req.params.image).then(
        (success)=>{
            res.send(success)
        }
    ).catch(
        (err)=>{
            res.send(err)
        }
    )
})

// bestSellor api
ProductRouter.put('/change-sellor/:id/:status',(req,res)=>{
    new ProductController().changeSellor(req.params.id,req.params.status).then(
        (success)=>{
            res.send(success)
        }
    ).catch(
        (err)=>{
            res.send(err)
        }
    )
})

// update product api
ProductRouter.put('/update/:id',
fileUpload(
    {
        createParentPath:true
    }
),

(req,res)=>{
    let image = null
    if(req.files?.image){
        image=req.files.image
    }
    new ProductController().update(req.params.id,req.body, image).then(
        (success)=>{
            res.send(success)
        }
    ).catch(
        (err)=>{
            res.send(err)
        }
    )
})



module.exports = ProductRouter