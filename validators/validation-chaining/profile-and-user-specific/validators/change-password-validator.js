// const { validationResult } = require("express-validator");
// const changePasswordValidator = [
//   emailValidation,
//   (request, response, next) => {
//     const validationErrors = validationResult(request);
//     if (!validationErrors.isEmpty()) {
//       return response.status(400).json({
//         errors: validationErrors.array(),
//       });
//     }
//     next();
//   },
//   passwordValidator,
//   (request, response, next) => {
//     const validationErrors = validationResult(request);
//     if (!validationErrors.isEmpty()) {
//       return response.status(400).json({
//         errors: validationErrors.array(),
//       });
//     }
//     next();
//   },
// ];
// module.exports = changePasswordValidator;