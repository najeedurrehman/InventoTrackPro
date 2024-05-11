const {
  idValidator,
  roleValidator: { roleCreateUpdateValidation, roleExistenceChecker },
} = require("../../validators/validation-chaining/validator");

module.exports = {
  createAccountMiddleware: roleCreateUpdateValidation,
  updateRoleMiddleware: [
    idValidator,
    roleExistenceChecker,
    roleCreateUpdateValidation,
  ],
  verifyRoleMiddleware: [idValidator, roleExistenceChecker],
};
