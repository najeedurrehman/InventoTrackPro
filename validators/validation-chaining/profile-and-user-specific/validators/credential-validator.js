const { validationResult } = require("express-validator");
const {
  credentialValidation,
} = require("../../../validation-schemes/profile-and-user-specific/profile-and-user-validation");

module.exports = [
  credentialValidation,
  (req, res, next) => {
    const validationError = validationResult(req);

    if (!validationError.isEmpty())
      return res.status(400).json({
        error: validationError.array(),
      });

    next();
  },
];
