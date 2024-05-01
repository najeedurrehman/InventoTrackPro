const { body } = require("express-validator");

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
];

module.exports = validator;
