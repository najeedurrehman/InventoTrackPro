const express = require("express");
const route = express.Router();

const roleValidator = require("../validators/roles/roleValidator");
const idValidator = require("../validators/IDValidator");
const roleExistenceChecker = require("../validators/roles/roleExistenceChecker");
/* CONTROLLER FILE   */
const {
  getRoleById,
  getAllRoles,
  createRole,
  getRoleByName,
  updateRole,
  deleteRole,
  roleWithUsers,
} = require("../controllers/roleController");

/* CREATE NEW ROLE */
route.post("/", roleValidator, createRole);
/* UPDATE ROLE */
route.put("/:id", idValidator, roleExistenceChecker, roleValidator, updateRole);
/* DELETE ROLE */
route.delete("/:id", idValidator, roleExistenceChecker, deleteRole);
/* GET ROLE WITH ASSOCIATE USER'S */
route.get("/:id/users", idValidator, roleExistenceChecker, roleWithUsers);
/* GET ROLE BY ID */
route.get("/:id", idValidator, roleExistenceChecker, getRoleById);
/* GET ROLE BY NAME  */
route.get("/name/:name", getRoleByName);
/* GET ALL ROLE */
route.get("/", getAllRoles);

module.exports = route;
