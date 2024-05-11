const { body } = require("express-validator");
const { userModel } = require("../../../../schemas/schemas");

module.exports = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Please enter the username")
    .bail()
    .isAlphanumeric()
    .withMessage("Please use only letters and numbers to create your username.")
    .bail()
    .custom(async (value) => {
      const result = await userModel.isUsernameTaken(value);
      if (result.length > 0) {
        throw new Error(
          `The username ${value} is unavailable. Please try a different username.`
        );
      }
    }),
];
