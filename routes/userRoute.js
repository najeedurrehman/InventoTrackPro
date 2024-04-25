const express = require("express");
const userRoute = express.Router();

const createUserValidator = require("../validators/users/createUserValidator");
const idValidator = require("../validators/IDValidator");
const isIDExist = require("../validators/users/userExistenceValidator");

const {
  createUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

userRoute.post("/", createUserValidator, createUser);
userRoute.get("/", getAllUsers);
userRoute.delete("/:id", idValidator, isIDExist, deleteUser);
module.exports = userRoute;