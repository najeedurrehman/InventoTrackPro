const express = require("express");
const userRoute = express.Router();

const createUserValidator = require("../validators/users/createUserValidator");
const updateUserValidator = require("../validators/users/updateUserValidator");
const changePasswordValidator = require("../validators/users/changePasswordValidator");

const idValidator = require("../validators/IDValidator");
const isIDExist = require("../validators/users/userExistenceValidator");

const {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getUser,
  changePassword,
  authenticateUser,
} = require("../controllers/userController");

userRoute.get("/:id", idValidator, isIDExist, getUser);
userRoute.get("/", getAllUsers);
/* AUTHENTICATION */
userRoute.post("/login", authenticateUser);
userRoute.post("/", createUserValidator, createUser);
userRoute.put("/:id", idValidator, isIDExist, updateUserValidator, updateUser);
userRoute.put(
  "/:id/change-password",
  idValidator,
  isIDExist,
  changePasswordValidator,
  changePassword
);


userRoute.delete("/:id", idValidator, isIDExist, deleteUser);
module.exports = userRoute;
