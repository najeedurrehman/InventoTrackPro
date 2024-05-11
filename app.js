const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

/* MIDDLEWARE CHAINING */
app.use(cookieParser());
app.use(bodyParser.json());

const { roleHelper } = require("./util/utilities");
const { authorization, authentication } = require("./middleware/middlewares");
const { accountRoute, roleRoute, profileRoute } = require("./routes/routes");

/* API POINT */
//app.use("/api/account", accountRoute);
//app.use("*", authentication);
app.use("/api/role", roleRoute);
//app.use("/api/profile", profileRoute);
module.exports = app;

//https://www.toptal.com/json/jwt-nodejs-security
