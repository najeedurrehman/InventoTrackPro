const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenExistence = (req, res, next) => {
  const { auth_token } = req?.cookies;

  if (auth_token == undefined || !jwt.verify(auth_token, process.env.SECRETKEY))
    return res.status(401).json({
      error: "Unauthorized access detected.",
    });
  next();
};

module.exports = tokenExistence;