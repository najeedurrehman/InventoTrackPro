const { body, validationResult } = require("express-validator");

const validator = [
  body("firstname")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Please enter your first name.")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First names can only contain letters and spaces.")
    .bail(),
  body("middlename")
    .optional()
    .if(body("middlename").exists())
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
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("last names can only contain letters and spaces.")
    .bail(),
  body("email")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Please enter your email.")
    .bail(),
];
module.exports = validator;
