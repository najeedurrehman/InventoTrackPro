const express = require("express");
const userRoute = express.Router();

const updateUserValidator = require("../validators/users/updateUserValidator");
const changePasswordValidator = require("../validators/users/changePasswordValidator");

const idValidator = require("../validators/id_validator");
const isIDExist = require("../validators/users/userExistenceValidator");

const {
  getAllUsers,
  deleteUser,
  updateUser,
  getUser,
} = require("../controllers/userController");



userRoute.get("/:id", idValidator, isIDExist, getUser);
userRoute.get("/", getAllUsers);
/* AUTHENTICATION */
userRoute.put("/:id", idValidator, isIDExist, updateUserValidator, updateUser);
userRoute.delete("/:id", idValidator, isIDExist, deleteUser);
module.exports = userRoute;
