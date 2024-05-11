const { body } = require("express-validator");
module.exports = [
  body("email")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Please enter your email.")
    .bail()
    .isEmail()
    .withMessage(
      `The email address appears to be invalid. Please check the format and try again`
    )
    .bail(),
  body("password")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Please enter your password.")
    .bail(),
];