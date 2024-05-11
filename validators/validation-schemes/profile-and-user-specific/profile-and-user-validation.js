const basicAccountInfoValidation = require("./validation/basic-account-info-validation");
const emailValidationForSignuUp = require("./validation/email-validation-signup");
const passwordValidation = require("./validation/password-validation");
const usernameValidaton = require("./validation/username-validaton");
const credentialValidation = require("./validation/credential-validation");

module.exports = {
  basicAccountInfoValidation,
  emailValidationForSignuUp,
  passwordValidation,
  usernameValidaton,
  credentialValidation,
};