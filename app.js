const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const tokenChecker = require("./middleware/token-checker-middleware");
const authorizedPerson = require("./middleware/role-checker-middleware");
const roleHelper = require("./helper/role-helper");

const app = express();

/* SETUP MIDDLEWARE. */
app.use(bodyParser.json());
app.use(cookieParser());

/* ROUTE FILE's */
const roleRoute = require("./routes/role-route");
const accountRoute = require("./routes/account-route");
const profileRoute = require("./routes/profile-route");

/* API POINT */
app.use(
  "/api/role",
  [tokenChecker, authorizedPerson([roleHelper.Admin])],
  roleRoute
);
app.use("/api/account", accountRoute);
app.use("/api/profile", profileRoute);
module.exports = app;

//https://www.toptal.com/json/jwt-nodejs-security