const mongoose = require("mongoose");
const { param, validationResult } = require("express-validator");

const validator = [
  param("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Id is required")
    .bail()
    .custom(async (value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error(`The provided Id ${value} is invalid.`);
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
