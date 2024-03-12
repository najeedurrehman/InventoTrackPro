const express = require("express");
const app = express();

require("dotenv").config();
app.listen(process.env.PORT || PORT, () => {
  console.log("SERVER START.");
});
