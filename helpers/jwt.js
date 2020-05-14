let jwt = require('jsonwebtoken');

function jwtToken (password) {
    return jwt.sign(password, 'digituin');
}

function verifyToken (token) {
    return jwt.verify(token, 'digituin');
}

module.exports = {jwtToken, verifyToken}