const mongoose = require("mongoose");
const { Schema } = mongoose;

const userScheme = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  middlename: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  modifiedOn: {
    type: Date,
  },
});

const userModel = new mongoose.model("user", userScheme);
module.exports = userModel;
