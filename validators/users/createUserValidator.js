const { body, validationResult } = require("express-validator");
const userModel = require("../../schemas/userScheme");
const validator = [
  body("firstname")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Please enter your first name.")
    .bail()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First names can only contain letters and spaces.")
    .bail(),
  body("middlename")
    .optional()
    .if(body("middlename").exists())
    .if(body("middlename").notEmpty())
    .escape()
    .trim()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Middle names can only contain letters and spaces.")
    .bail(),
  body("lastname")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Please enter your last name.")
    .bail()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("last names can only contain letters and spaces.")
    .bail(),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Please enter the username")
    .bail()
    .matches(/^[A-Za-z0-9]+$/)
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
      console.log(result, "UserCreateValidaor Custom");
      if (result.length > 0) {
        throw new Error(
          `The email ${value} is already in use. Please try a different email.`
        );
      }
    }),
  (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        errors: validationErrors.array(),
      });
    }
    next();
  },
];
module.exports = validator;