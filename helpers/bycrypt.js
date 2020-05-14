var bcrypt = require('bcryptjs');

function bcryptPass (password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash
}

function compare (password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {bcryptPass , compare}