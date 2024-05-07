const express = require("express");
const Route = express.Router();

const tokenChecker = require("../../middleware/auth/token-checker-middleware");
const authorizedPerson = require("../../middleware/auth/role-checker-middleware");
const roleHelper = require("../../util/constant/role-helper");

const updateUserValidator = require("../../validators/users/update-user-validator");
const idValidator = require("../../validators/id-validator");
const isIDExist = require("../../validators/users/user-existence-validator");

const {
  getAllUsers,
  deleteUser,
  updateUser,
  getUser,
} = require("../../controllers/profile-controller");

Route.use("*", tokenChecker);

Route.get("/:id", [idValidator, isIDExist], getUser);
Route.get("/", authorizedPerson(roleHelper.Admin), getAllUsers);
Route.put("/:id", [idValidator, isIDExist, updateUserValidator], updateUser);
Route.delete(
  "/:id",
  authorizedPerson(roleHelper.Admin),
  [idValidator, isIDExist],
  deleteUser
);
module.exports = Route;
