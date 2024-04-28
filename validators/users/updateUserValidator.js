const { validationResult } = require("express-validator");
const basicInfoValidator = require("./validationSchemas/basicInfoValidator");
const passwordValidator = require("./validationSchemas/passwordValidator");
const validator = [
  ...basicInfoValidator,
  ...passwordValidator,
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