const { param, validationResult } = require("express-validator");
const userModel = require("../../schemas/models/user-scheme");
const validator = [
  param("id").custom(async (value) => {
    const result = await userModel.isIDExist(value);
    if (result == null) {
      throw new Error(
        `We couldn't find a user associated with this profile Id ${value}.`
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
