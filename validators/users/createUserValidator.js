const { validationResult } = require("express-validator");

/* INCLUDE VALIDAT */
const basicInfoValidator = require("./validationSchemas/basicInfoValidator");
const emailValidator = require("./validationSchemas/emailValidator");
const userNameValidator = require("./validationSchemas/usernameValidator");
const passwordValidator = require("./validationSchemas/passwordValidator");

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
