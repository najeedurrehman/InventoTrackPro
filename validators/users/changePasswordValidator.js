const { validationResult } = require("express-validator");

/* INCLUDE VALIDATOR */
const passwordValidator = require("./validationSchemas/passwordValidator");

const changePasswordValidator = [
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
module.exports = changePasswordValidator;
