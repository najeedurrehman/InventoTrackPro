const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const { auth_token } = req?.cookies;

  if (auth_token == undefined)
    return res.status(401).json({
      error: "Authentication required.",
    });

  if (!jwt.verify(auth_token, process.env.SECRETKEY))
    return res.status(401).json({
      error: "Invalid token.",
    });

  next();
};
