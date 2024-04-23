const mongoose = require("mongoose");
const roleScheme = require("../schemas/roleSchema");
const role = new mongoose.model("role", roleScheme);
module.exports = role;