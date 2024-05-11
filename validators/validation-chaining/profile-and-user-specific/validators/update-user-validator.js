const { validationResult } = require("express-validator");

const {basicAccountInfoValidation} = require("../../../validation-schemes/profile-and-user-specific/profile-and-user-validation");

const validator = [
  basicAccountInfoValidation,
  (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        errors: validationErrors.array(),
      });
    }
    next();
  },
];
module.exports = validator;