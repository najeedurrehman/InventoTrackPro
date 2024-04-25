const express = require("express");
const route = express.Router();

const createRoleValidator = require("../validators/roles/createRoleValidator");
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
} = require("../controllers/role/roleController");

/* CREATE NEW ROLE */
route.post("/", createRoleValidator, createRole);
/* UPDATE ROLE */
route.put(
  "/:id",
  idValidator,
  roleExistenceChecker,
  createRoleValidator,
  updateRole
);
/* DELETE ROLE */
route.delete("/:id", idValidator, roleExistenceChecker, deleteRole);
/* GET ROLE BY ID */
route.get("/:id", idValidator, roleExistenceChecker, getRoleById);
/* GET ROLE BY NAME  */
route.get("/name/:name", getRoleByName);
/* GET ALL ROLE */
route.get("/", getAllRoles);

module.exports = route;
