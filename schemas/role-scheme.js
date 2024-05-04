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
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    statics: {
      findByRoleName: async function (name) {
        return await this.find({ name: name });
      },
      findByRoleId: async function (id) {
        return await this.findById({ _id: id });
      },
    },
  }
);
const roleModel = new mongoose.model("role", roleSchema);
module.exports = roleModel;
