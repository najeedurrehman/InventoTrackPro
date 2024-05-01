const { validationResult } = require("express-validator");

/* INCLUDE VALIDAT */
const basicInfoValidator = require("./validationSchemas/basic-account-info-validation");
const emailValidator = require("./validationSchemas/email-validation-signup");
const userNameValidator = require("./validationSchemas/username-validaton");
const passwordValidator = require("./validationSchemas/password-validation");

const createUserValidator = [
  ...basicInfoValidator,
  ...emailValidator,
  ...userNameValidator,
  ...passwordValidator,
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
