var secretCode = require('../properties')
var jwt = require('jsonwebtoken');
var secretCode = require("../properties");
async function authorizationUser(token) {
    var token = token
    var decoded = await jwt.verify(token, secretCode.constant.secretCode);
    var email = decoded.email
    return { email: email,
        decoded: decoded
    }
}

module.exports = {
    authorizationUser: authorizationUser,
}