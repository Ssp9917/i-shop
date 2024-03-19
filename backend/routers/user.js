const { Router } = require("express");
const UserController = require("../controllers/user");

const UserRouter = Router();

// register router
UserRouter.post("/register", (req, res) => {
  new UserController()
    .register(req.body)
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
});

// login router
UserRouter.post("/login", (req, res) => {
  new UserController()
    .login(req.body)
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
});

// Get all user router
UserRouter.get('/get-user/:id?',(req,res)=>{
  new UserController().getAllUser(req.params.id)
  .then((success) => {
    res.send(success);
  })
  .catch((error) => {
    res.send(error);
  });
})

module.exports = UserRouter;
