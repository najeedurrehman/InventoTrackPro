const { Router } = require("express");
const router = Router();

const tokenChecker = require("../middleware/token-checker-middleware");

const createAccountValidator = require("../validators/users/create-account-validator");
const credentialValidator = require("../validators/users/credential-validator");
const forgetPasswordValidator = require("../validators/users/change-password-validator");

const {
  signIn,
  signUp,
  logout,
  forgetPassword,
} = require("../controllers/accountController");

router.post("/signin", credentialValidator, signIn);
router.post("/signup", createAccountValidator, signUp);
router.post("/logout", tokenChecker, logout);
router.post("/forget-password",forgetPasswordValidator,forgetPassword);

module.exports = router;