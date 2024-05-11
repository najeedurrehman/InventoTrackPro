const changePasswordValidator = require("./validators/change-password-validator");
const createAccountValidation = require("./validators/create-account-validator");
const credentialValidator = require("./validators/credential-validator");
const updateUserValidator = require("./validators/update-user-validator");
const userExistenceChecker = require("./validators/user-existence-validator");


module.exports = [
    credentialValidator,
    createAccountValidation,
    updateUserValidator,
    changePasswordValidator,
    userExistenceChecker
]; 