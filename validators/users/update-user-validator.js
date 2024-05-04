const { validationResult } = require("express-validator");
const basicInfoValidator = require("./validationSchemas/basic-account-info-validation");
const validator = [
  ...basicInfoValidator,
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