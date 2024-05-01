const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

/* SETUP MIDDLEWARE. */
app.use(cookieParser());
app.use(bodyParser.json());

/* ROUTE FILE's */
const roleRoute = require("./routes/roleRoute");
const accountRoute = require("./routes/accountRoute");
//const userRoute = require("./routes/userRoute");

/* API POINT */
app.use("/api/role", roleRoute);
app.use("/api/account", accountRoute);
//app.use("/api/user", userRoute);
module.exports = app;