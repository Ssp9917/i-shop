const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const ColorModel = require("../models/color");
const { unlinkSync } = require("fs");

class ProductController {
  constructor() {
    this.model = ProductModel;
  }

  // read api logic
  read(id, query) {
    // console.log(query);

    return new Promise(async (res, rej) => {
      try {
        let product = [];
        const dbQuery = {};

        const skip = (query.page - 1) * query.limit;

        const count = await this.model.countDocuments();

        const pageCount = Math.ceil(count / query.limit);

        // category filter logic
        if (query.category_slug) {
          const category = await CategoryModel.findOne({
            slug: query.category_slug,
          });
          if (category != null) {
            dbQuery.category = category._id;
          }
        }

        // color filter logic
        if (query.color_id != "null") {
          const color = await ColorModel.findById(query.color_id);
          if (color != null) {
            dbQuery.color = color._id;
          }
        }

        // price filter logic
        // if (query.minPrice && query.maxPrice) {
        //     dbQuery.price = { $gte: query.minPrice, $lte: query.maxPrice };
        // }

        if (id) {
          product = await this.model
            .findById(id)
            .populate(["category", "color"]);
        } else {
          if (query.limit != 0) {
            product = await this.model
              .find(dbQuery)
              .populate(["category", "color"])
              .limit(query.limit)
              .sort(query.sort)
              .skip(skip);
          } else {
            product = await this.model
              .find(dbQuery)
              .populate(["category", "color"]);
          }
        }
        res({
          msg: "data found",
          status: 1,
          product,
          imageBaseUrl: "/images/product/",
          pagination: {
            count,
            pageCount,
          },
        });
      } catch (error) {
        rej({
          msg: "Unable to get data",
          status: 0,
        });
      }
    });
  }

  // Add Product Logic
  create(data, image) {
    return new Promise((res, rej) => {
      try {
        const imageName =
          new Date().getTime() + Math.floor(Math.random() * 1000) + image.name;

        const destination = "./public/images/product/" + imageName;

        image.mv(destination, (err) => {
          if (err) {
            rej({
              msg: "Unable to upload image",
              status: 0,
            });
          } else {
            const product = new this.model({
              name: data.name,
              slug: data.slug,
              price: data.price,
              discount: data.discount,
              latest_price: data.latest_price,
              image: imageName,
              category: data.category,
              color: JSON.parse(data.color),
            });

            product
              .save()
              .then(() => {
                res({
                  msg: "Product Added successfully",
                  status: 1,
                });
              })
              .catch(() => {
                rej({
                  msg: "Unable to add product",
                  status: 0,
                });
              });
          }
        });
      } catch (error) {}
    });
  }

  // changeStatus logic
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

  // changeStock logic
  changeStock(id, new_stock) {
    // console.log(new_stock)
    return new Promise((res, rej) => {
      try {
        this.model
          .updateOne(
            {
              _id: id,
            },
            {
              stock: new_stock,
            }
          )
          .then(() => {
            res({
              msg: "Stock Changed",
              status: 1,
            });
          })
          .catch(() => {
            rej({
              msg: "Unable to change stock",
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

  // delete logic
  delete(id, image) {
    return new Promise((res, rej) => {
      try {
        this.model
          .deleteOne({ _id: id })
          .then(() => {
            unlinkSync(`./public/images/product/${image}`),
              res({
                msg: "Product deleted successful",
                status: 1,
              });
          })
          .catch(() => {
            rej({
              msg: "Unable to delete product",
              status: 0,
            });
          });
      } catch (error) {
        rej({
          msg: "Internal server error",
          status: 0,
        });
      }
    });
  }

  // update logic
  update(id, data, image) {
    return new Promise((res, rej) => {
      try {
        if (image == null) {
          this.model
            .updateOne(
              { _id: id },
              {
                name: data.name,
                slug: data.slug,
                price: data.price,
                discount: data.discount,
                latest_price: data.latest_price,
                category: data.category,
                color: JSON.parse(data.color),
              }
            )
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
        } else {
          const imageName =
            new Date().getTime() +
            Math.floor(Math.random() * 1000) +
            image.name;

          const destination = "./public/images/product/" + imageName;
          image.mv(destination, (err) => {
            if (!err) {
              this.model
                .updateOne(
                  { _id: id },
                  {
                    name: data.name,
                    image: imageName,
                    slug: data.slug,
                    price: data.price,
                    discount: data.discount,
                    latest_price: data.latest_price,
                    category: data.category,
                    color: JSON.parse(data.color),
                  }
                )
                .then(() => {
                  unlinkSync(`./public/images/product/${data.old_name}`);
                  res({
                    msg: "Data updated",
                    status: 0,
                  });
                })
                .catch(() => {
                  rej({
                    msg: "Unable to update the data",
                    status: 0,
                  });
                });
            } else {
              rej({
                msg: "Unable to upload file",
                status: 0,
              });
            }
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

  // changeStatus logic
  changeSellor(id, new_sellor) {
    return new Promise((res, rej) => {
      try {
        this.model
          .updateOne(
            {
              _id: id,
            },
            {
              bestSellor: new_sellor,
            }
          )
          .then(() => {
            res({
              msg: "Sellor Changed",
              status: 1,
            });
          })
          .catch(() => {
            rej({
              msg: "Unable to change sellor",
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

  // bestSellor logic
  fetchBestSellor() {
    return new Promise(async (res, rej) => {
      try {
        let bestSellor = [];
        bestSellor = await this.model.find({ bestSellor: true });

        res({
          msg: "All Best Sellor Product",
          status: 1,
          bestSellor,
          imageBaseUrl: "/images/product/",
        });
      } catch (error) {
        console.log(error);
        rej({
          msg: "Unable to get best sellor product",
          status: 0,
        });
      }
    });
  }
}

module.exports = ProductController;
