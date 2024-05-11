const { validationResult } = require("express-validator");

const {
  basicAccountInfoValidation,
  emailValidationForSignuUp,
  passwordValidation,
  usernameValidaton,
} = require('../../../validation-schemes/profile-and-user-specific/profile-and-user-validation');

const createUserValidator = [
  basicAccountInfoValidation,
  emailValidationForSignuUp,
  usernameValidaton,
  passwordValidation,
  (request, response, next) => {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      return response.status(400).json({
        errors: validationErrors.array(),
      });
    }
    next();
  },
];
module.exports = createUserValidator;