const mongoose = require("mongoose");
const { Schema } = mongoose;

const userScheme = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    middlename: String,
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
    modifiedOn: {
      type: Date,
    },
  },
  {
    statics: {
      isUsernameTaken: async function (username) {
        return await this.find({ username: username });
      },
      isEmailTaken: async function (email) {
        return await this.find({ email: email });
      },
      isIDExist: async function (id) {
        return await this.findById({ _id: id });
      },
    },
  }
);

const userModel = new mongoose.model("user", userScheme);
module.exports = userModel;
