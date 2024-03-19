const { encryptPassword, decryptPassword } = require("../helper");
const UserModel = require("../models/user");

class UserController {

  constructor(){
    this.model = UserModel;
  }

  // signup user logic
  register(data) {
    return new Promise(async (rej, res) => {
      try {
        const existingUser = await this.model.findOne({ email: data.email });

        if (existingUser) {
          rej({
            msg: "Email already exist",
            status: 0,
          });
        } else {
          const user = new this.model({
            name: data.name,
            email: data.email,
            password:encryptPassword(data.password),
          });

          user
            .save()
            .then(() => {
              res({
                msg: "account created",
                status: 1,
                user,
              });
            })
            .catch(() => {
              rej({
                msg: "Unable to create user",
                status: 0,
              });
            });
        }
      } catch (error) {
        rej({
          msg: "Internal server error",
          status: 0,
        });
      }
    });
  }


  // login user logic
  login(data){
    return new Promise(
     async (res,rej)=>{
        try {
          const user = await this.model.findOne({ email: data.email });
          if(user){
            if(decryptPassword(user.password) == data.password){
              res(
                {
                  msg:"Login Successful",
                  status:1,
                  user
                }
              )
            }else{
              rej({
                msg:"Wrong Password",
                status:0
              })
            }
          }else{
            rej({
              msg:"Email does not exist",
              status:0
            })
          }
          
        } catch (error) {
          console.log(error)
        }
      }
    )
  }

  // get all user
  getAllUser(id){
    return new Promise(
    async  (res,rej)=>{
        try {
          let user = []
          if(id){
            user = await this.model.findById(id)
          }else{
            user = await this.model.find()
          }

          res(
            {
              msg:"All users",
              status:1,
              user
            }
          )
        } catch (error) {
          rej(
            {
              msg:"No user found",
              status:0,
            }
          )
        }
      }
    )
  }

}

module.exports = UserController;
