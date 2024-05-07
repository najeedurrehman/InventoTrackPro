const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (roles = []) => {
  return [
    async (req, res, next) => {
      const { auth_token } = req?.cookies;
      const { role } = jwt.decode(auth_token);

      if (!roles.includes(role))
        return res
          .status(403)
          .json({ error: "Unauthorized access detected. Access denied." });
      next();
    },
  ];
};
