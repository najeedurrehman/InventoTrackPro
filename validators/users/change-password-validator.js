const { validationResult } = require("express-validator");

/* INCLUDE VALIDATOR */
const passwordValidator = require("./validationSchemas/password-validation");
const emailValidation = require("./validationSchemas/email-validation-credential");

const changePasswordValidator = [
  emailValidation,
  (request, response, next) => {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      return response.status(400).json({
        errors: validationErrors.array(),
      });
    }
    next();
  },
  passwordValidator,
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
module.exports = changePasswordValidator;
