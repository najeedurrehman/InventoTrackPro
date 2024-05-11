const {roleModel} = require('../../../../schemas/schemas');
const { body, validationResult } = require("express-validator");
module.exports = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Please enter a role name.")
    .bail()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Role names can only contain letters and spaces.")
    .bail()
    .isLength({ max: 40 })
    .withMessage(
      "The role name is too long. Please shorten it to 40 characters or less."
    )
    .custom(async (value) => {
      const existingRole = await roleModel.findByRoleName(value.toLowerCase());
      if (existingRole?.length > 0) {
        throw new Error(
          `The role name ${value} already exists. Please choose a different name.`
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