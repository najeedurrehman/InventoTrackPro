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
      findByRoleName: async function (param) {
        return await this.find({ name: param });
      },
      findByRoleId: async function (param) {
        console.log(param,"RoleScheme")
        return await this.findById({id:param});
      },
    },
  }
);

module.exports = roleSchema;
