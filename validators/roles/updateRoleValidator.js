const { body, query, validationResult } = require("express-validator");
const roleModel = require("../../models/roleModel");
const validator = [
  body("name")
    .trim()
    .escape()
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
    .bail()
    .custom(async (value) => {
      const existingRole = await roleModel.findByRoleName(value.toLowerCase());
      if (existingRole?.length > 0) {
        throw new Error(
          `The role name ${value} already exists. Please choose a different name.`
        );
      }
    }),

  query("roleId")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("A Role Id is required to create a role.")
    .bail()
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("Please use only letters and numbers for the Role Id")
    .bail()
    .custom(async (value) => {
      console.log(value);
      const result = await roleModel.findByRoleId(value);
      console.log(result, "Role Update Validator");
      if (result.length == 0) {
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

// ,
//   body("roleId")
//     .trim()
//     .escape()
//     .notEmpty()
//     .withMessage("A Role Id is required to create a role.")
//     .bail()
//     .matches(/^[a-zA-Z0-9]+$/)
//     .withMessage("Please use only letters and numbers for the Role Id")
//     .bail()
//     .custom(async (value) => {
//       console.log(value)
//       const result = await roleModel.findByRoleId(value);
//       console.log(result,"Role Update Validator");
//       if (result.length == 0) {
//         throw new Error(
//           `We couldn't find a role associated with this Role Id ${value}.`
//         );
//       }
//     }),
