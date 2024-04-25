const express = require("express");
const bodyParser = require("body-parser");



const app = express();

/* ACCEPT ONLY JSON FORMAT */
app.use(bodyParser.json());


/* ROUTE FILE's */
const roleRoute = require("./routes/roleRoute");
const userRoute = require("./routes/userRoute");


/* API POINT */
app.use("/api/role", roleRoute);
app.use("/api/user", userRoute);
module.exports = app;