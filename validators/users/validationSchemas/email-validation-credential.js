const { body } = require("express-validator");
const userModel = require("../../../schemas/userScheme");
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

      if (result.length == 0) {
        throw new Error(
          `We couldn't find an account associated with the email address.`
        );
      }
    }),
];
module.exports = validator;
