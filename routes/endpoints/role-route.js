const express = require("express");
const route = express.Router();

const {
  roleMiddleware: {
    createAccountMiddleware,
    updateRoleMiddleware,
    verifyRoleMiddleware,
  },
} = require("../../middleware/middlewares");

/* CONTROLLER FILE   */
const {
  getRoleById,
  getAllRoles,
  createRole,
  getRoleByName,
  updateRole,
  deleteRole,
  roleWithUsers,
} = require("../../controllers/role-controller");

/* CREATE NEW ROLE */
route.post("/", createAccountMiddleware, createRole);
/* UPDATE ROLE */
route.put("/:id", updateRoleMiddleware, updateRole);
/* DELETE ROLE */
route.delete("/:id", verifyRoleMiddleware, deleteRole);
/* GET ROLE WITH ASSOCIATE USER'S */
route.get("/:id/users", verifyRoleMiddleware, roleWithUsers);
/* GET ROLE BY ID */
route.get("/:id", verifyRoleMiddleware, getRoleById);
/* GET ROLE BY NAME  */
route.get("/name/:name", getRoleByName);
/* GET ALL ROLE */
route.get("/", getAllRoles);

module.exports = route;
