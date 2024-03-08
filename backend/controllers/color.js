const ColorModel = require("../models/color");

class ColorController {
  constructor() {
    this.model = ColorModel;
  }

  //* Get api logic
  read(id) {
    return new Promise(async (res, rej) => {
      try {
        let data = "";
        if(id){
            data = await this.model.findById(id)
        }else{
            data = await this.model.find();
        }

        res({
          msg: "All Data ",
          status: 1,
          data,
        });
      } catch (error) {
        rej({
          msg: "Data Not Found ",
          status: 0,
        });
      }
    });
  }

  //* Create api logic
  create(data) {
    return new Promise((res, rej) => {
      try {
        const color = new this.model({
          name: data.name,
          slug: data.slug,
        });

        color
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
  update(id, data) {
    return new Promise((res, rej) => {
      try {
          this.model
            .updateOne({ _id: id }, { name: data.name, slug: data.slug })
            .then(() => {
              res({
                msg: "Data updated",
                status: 1,
              });
            })
            .catch(() => {
              rej({
                msg: "Unable to update the data",
                status: 0,
              });
            });
      } catch (err) {
        console.log(err)
        rej({
          msg: "Internal server error",
          status: 0,
        });
      }
    });
  }
}

module.exports = ColorController;
