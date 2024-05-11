const { body } = require("express-validator");
const userModel = require("../../../../schemas/models/user-scheme");
const validator = [
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
    .bail()
    .custom(async (value) => {
      const result = await userModel.isEmailTaken(value);

      if (result.length > 0) {
        throw new Error(
          `The email ${value} is already in use. Please try a different email.`
        );
      }
    }),
];
module.exports = validator;
