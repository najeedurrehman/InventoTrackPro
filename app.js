const express = require("express");
const bodyParser = require("body-parser");



const app = express();

/* ACCEPT ONLY JSON FORMAT */
app.use(bodyParser.json());


/* ROUTE FILE's */
const roleRoute = require("./routes/roleRoute");

/* API POINT */
app.use("/api/role", roleRoute);
module.exports = app;
