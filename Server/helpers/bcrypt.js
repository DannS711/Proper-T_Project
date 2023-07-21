const bcrypt = require('bcryptjs')

function passwordComparer(password, userPass) {
    return bcrypt.compareSync(password, userPass)
}

module.exports = passwordComparer