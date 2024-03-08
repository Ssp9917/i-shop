const {Router} = require('express');
const CategoryController = require('../controllers/category');
// express fileUpload
const fileUpload = require('express-fileupload')

const CategoryRouter = Router();

//* get data api
CategoryRouter.get('/read/:id?',(req,res)=>{
   new CategoryController().read(req.params.id).then(
    (success)=>{
        console.log(success)
        res.send(success)
    }
   ).catch(
    (err)=>{
        console.log(err)
        res.send(err)
    }
   )
}) 



//* add data api

CategoryRouter.post('/create',
// middleware
fileUpload({
    createParentPath:true
})

,(req,res)=>{
    new CategoryController().create(req.body,req.files.image).then(
        (success)=>{
            res.send(success)
        }
    ).catch(
        (error)=>{
            res.send(error)
        }
    )
});

//* Delete data api 
CategoryRouter.delete('/delete/:id/name/:image',(req,res)=>{
    new CategoryController().delete(req.params.id,req.params.image).then(
        (success)=>{
            res.send(success)
        }
    ).catch(
        (error)=>{
            res.send(error)
        }
    )
})

//* Change Status api
CategoryRouter.put('/change-status/:id/:status',(req,res)=>{
    new CategoryController().changeStatus(req.params.id,req.params.status).then(
        (success)=>{
            res.send(success);
        }
    ).catch(
        (err)=>{
            res.send(err)
        }
    )
}) 


//* Edit data api
CategoryRouter.put('/update/:id',
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
    new CategoryController().update(req.params.id,req.body,image).then(
        (success)=>{
            res.send(success)
        }
    ).catch(
        (err)=>{
            res.send(err)
        }
    )
})

module.exports = CategoryRouter