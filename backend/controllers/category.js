const CategoryModel = require("../models/category");
const {unlinkSync} = require('fs')

class CategoryController {
  constructor() {
    this.model = CategoryModel;
  }

  //* Get api logic
  read() {
    return new Promise(async (res, rej) => {
      try {
        let data = "";
        data = await this.model.find();
        res({
          msg: "All Data ",
          status: 1,
          data,
          imageBaseUrl:'/images/category/'
        });
      } catch (error) {
        rej({
          msg: "Data Not Found ",
          status: 0,
        });
      }
    });
  }

  //* Create api logi
  create(data, image) {
    return new Promise((res, rej) => {
      try {
        // file related code start
        const imageName = new Date().getTime()+Math.floor(Math.random()*1000)+image.name
        const destination = "./public/images/category/" + imageName;
        image.mv(destination, (err) => {
          if (err) {
            rej({
              msg: "Unable to upload the file",
              status: 0,
            });
          } else {
            const category = new this.model({
              name: data.name,
              slug: data.slug,
              image: imageName
            });

            category
              .save()
              .then(() => {
                res({
                  msg: "Category Added Successfully",
                  status: 1,
                });
              })
              .catch((err) => {
                // console.log(err)
                rej({
                  msg: "Unable to add category",
                  status: 0,
                });
              });
          }
        });
        // file related code end
      } catch (error) {
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }

  //* Delete api logic
  delete(id) {
    return new Promise((res, rej) => {
      try {
        this.model
          .deleteOne({ _id: id })
          .then(() => {
            res({
              msg: "Data deleted success",
              status: 1,
            });
          })
          .catch((err) => {
            console.log(err.message);
            rej({
              msg: "Unable to delete data",
              status: 0,
            });
          });
      } catch (error) {
        console.log(error);
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }

  //* Change status logic
  changeStatus(id, new_status) {
    return new Promise((res, rej) => {
      try {
        this.model
          .updateOne(
            {
              _id: id,
            },
            {
              status: new_status,
            }
          )
          .then(() => {
            res({
              msg: "Status Changed",
              status: 1,
            });
          })
          .catch(() => {
            rej({
              msg: "Unable to change status",
              status: 0,
            });
          });
      } catch (error) {
        () => {
          rej({
            msg: "Internal server error",
            status: 0,
          });
        };
      }
    });
  }


  //* Edit data logic
  update(id,data,image){
    return new Promise(
      (res,rej)=>{
        try{
          if(image == null){
            this.model.updateOne({_id:id},{name:data.name,slug:data.slug}).then(
              ()=>{
                res({
                  msg:"Data updated",
                  status:1
                })
              }
            ).catch(
              ()=>{
                rej({
                  msg:"Unable to update the data",
                  status:0
                })
              }
            )
          }else{
            const imageName = new Date().getTime()+Math.floor(Math.random()*1000)+image.name
            const destination = './public/images/category/'+imageName;

            image.mv(
              destination,
              (err)=>{
                if(!err){
                  this.model.updateOne({_id:id},{name:data.name,slug:data.slug,image:imageName}).then(
                    ()=>{
                      unlinkSync(`./public/images/category/${data.old_name}`)
                      res({
                        msg:"Data updated",
                        status:1
                      })
                    }
                  ).catch(
                    ()=>{
                      rej({
                        msg:"Unable to update the data",
                        status:0
                      })
                    }
                  )
                }else{
                  rej({
                    msg:"Unable to upload file",
                    status:0
                  })
                }
              }
            )
          }
        }catch(err){
          rej({
            msg:"Internal server error",
            status:0
          })
        }
      }
    )
  } 
}

module.exports = CategoryController;
