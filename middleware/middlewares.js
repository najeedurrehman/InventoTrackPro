/**** AUTHICATION & AUTHORIZATION MIDDLEWARE ****/
const authentication = require("./auth/token-checker-middleware");
const authorization = require("./auth/role-checker-middleware");

const roleMiddleware = require("./pipeline/role-middleware-chaining");

module.exports = {
  authentication,
  authorization,
  roleMiddleware,
};
