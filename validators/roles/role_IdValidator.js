const mongoose = require("mongoose");
const { param, validationResult } = require("express-validator");
const roleModel = require("../../models/roleModel");
const validator = [
  param("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("A Role id is required")
    .bail()
    .custom(async (value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error(`The provided Role Id ${value} is invalid.`);
      }
    })
    .bail()
    .custom(async (value) => {
      const result = await roleModel.findByRoleId(value);
      if (result == null) {
        throw new Error(
          `We couldn't find a role associated with this Role Id ${value}.`
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
