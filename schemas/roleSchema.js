const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
    modifiedOn: Date,
  },
  {
    statics: {
      findByRoleName: async function (name) {
        return await this.find({ name: name });
      },
      findByRoleId: async function (id) {
        return await this.findById({_id:id});
      },
    },
  }
);

module.exports = roleSchema;