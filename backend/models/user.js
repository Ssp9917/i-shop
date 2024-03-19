const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: [
      {
        street: {
          type: String,
          //   required: true
        },
        city: {
          type: String,
          //   required: true
        },
        state: {
          type: String,
          //   required: true
        },
        country: {
          type: String,
          //   required: true
        },
        postalCode: {
          type: String,
          //   required: true
        },
      },
    ],
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      // required: true
    },
    age: {
      type: Number,
      // required: true
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
