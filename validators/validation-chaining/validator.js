const idValidator = require("../validation-schemes/common/id-validation");
const roleValidator = require("../validation-schemes/role-specific/role-specific-validation");
const profileAndUserValidator = require("./profile-and-user-specific/profile-and-user-validator");

/* END  */
module.exports = {
  idValidator,
  roleValidator,
  profileAndUserValidator,
};
