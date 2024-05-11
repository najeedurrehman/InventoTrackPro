const { body } = require("express-validator");
const validator = [
  body("password")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Please enter your password.")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d\s])[A-Za-z\d\S]{8,}$/)
    .withMessage(
      "Your password is weak.use at least 8 characters in your password, including uppercase and lowercase letters, numbers, and special symbols"
    ),
  body("cpassword")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Please enter your confirm password.")
    .bail()
    .custom(async (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match. Please re-enter your password");
      }
    }),
];
module.exports = validator;