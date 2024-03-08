const {Router} = require('express')
const ColorController = require('../controllers/color')

const ColorRouter = Router()

//* read color api
ColorRouter.get('/get-color/:id?',(req,res)=>{
    new ColorController().read(req.params.id).then(
        (success)=>{
            res.send(success);
        }
    ).catch(
        (err)=>{
            res.send(err)
        }
    )
})

//*  add color api
ColorRouter.post('/create',(req,res)=>{
    new ColorController().create(req.body).then(
        (success)=>{
            res.send(success);
        }
    ).catch(
        (err)=>{
            res.send(err)
        }
    )
})

//* delete color api
ColorRouter.delete('/delete/:id',(req,res)=>{
    new ColorController().delete(req.params.id).then(
        (success)=>{
            res.send(success)
        }
    ).catch(
        (err)=>{
            res.send(err)
        }
    )
}) 

//* edit color api
ColorRouter.put('/update/:id',(req,res)=>{
    new ColorController().update(req.params.id,req.body).then(
        (success)=>{
            res.send(success)
        }
    ).catch(
        (err)=>{
            res.send(err)
        }
    )
}) 

//* changeStatus api
ColorRouter.put('/change-status/:id/:status',(req,res)=>{
    new ColorController().changeStatus(req.params.id,req.params.status).then(
        (success)=>{
            res.send(success)
        }
    ).catch(
        (err)=>{
            res.send(err)
        }
    )
}) 

module.exports = ColorRouter