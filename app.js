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
const roleRoute = require("./routes/roleRoute");
const accountRoute = require("./routes/accountRoute");
//const userRoute = require("./routes/userRoute");

/* API POINT */
app.use(
  "/api/role",
  [tokenChecker, authorizedPerson([roleHelper.Admin])],
  roleRoute
);
app.use("/api/account", accountRoute);
//app.use("/api/user", userRoute);
module.exports = app;
