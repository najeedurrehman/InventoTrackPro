const { param, validationResult } = require("express-validator");
const roleModel = require("../../schemas/models/role-scheme");
const validator = [
  param("id").custom(async (value) => {
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