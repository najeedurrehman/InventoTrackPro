/* IMPORTING ALL ROUTES */
const accountRoute = require("./endpoints/account-route");
const profileRoute = require("./endpoints/profile-route");
const roleRoute = require("./endpoints/role-route");

module.exports = {
  accountRoute,
  profileRoute,
  roleRoute,
};