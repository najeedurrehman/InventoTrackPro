const { body, validationResult } = require("express-validator");
const emailValidation = require("./validationSchemas/email-validation-credential");

const validator = [
  emailValidation,
  body("password")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Please enter your password."),

  (req, res, next) => {
    const validationError = validationResult(req);

    if (!validationError.isEmpty())
      return res.status(400).json({
        error: validationError.array(),
      });

    next();
  },
];
module.exports = validator;
