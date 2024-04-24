const express = require("express");
const route = express.Router();

const createRoleValidator = require("../validators/roles/createRoleValidator");
const roleIdValidator = require("../validators/roles/role_IdValidator");
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
route.put("/:id", roleIdValidator, createRoleValidator, updateRole);
/* DELETE ROLE */
route.delete("/:id", roleIdValidator, deleteRole);
/* GET ROLE BY ID */
route.get("/:id", roleIdValidator, getRoleById);
/* GET ROLE BY NAME  */
route.get("/name/:name", getRoleByName);
/* GET ALL ROLE */
route.get("/", getAllRoles);

module.exports = route;
