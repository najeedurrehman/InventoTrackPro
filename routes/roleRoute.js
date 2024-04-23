const express = require("express");
const route = express.Router();

const createRoleValidator = require("../validators/roles/createRoleValidator");
const updateRoleValidator = require("../validators/roles/updateRoleValidator");

/* CONTROLLER FILE   */
const {
  getRoleById,
  getAllRoles,
  createRole,
  getRoleByName,
  updateRole,
} = require("../controllers/role/roleController");

/* CREATE NEW ROLE */
route.post("/", createRoleValidator, createRole);
/* UPDATE ROLE */
route.put("/", updateRoleValidator, updateRole);

/* GET ROLE BY ID */
route.get("/:id", getRoleById);
/* GET ROLE BY NAME  */
route.get("/name/:name", getRoleByName);
/* GET ALL ROLE */
route.get("/", getAllRoles);

module.exports = route;
