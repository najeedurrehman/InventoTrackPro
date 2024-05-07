
/**** AUTHICATION & AUTHORIZATION MIDDLEWARE ****/ 
const authentication = require('./auth/token-checker-middleware');
const authorization = require('./auth/role-checker-middleware');


module.exports = {
    authentication,
    authorization
};