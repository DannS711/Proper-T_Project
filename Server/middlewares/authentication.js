const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function userAuthentication(req, res, next) {
    try {
        // console.log(req.headers, "<<< req.headers");
        const { access_token } = req.headers
        // console.log(access_token);
        if (!access_token) {
            throw { name: "Unauthenticated" }
        }

        const payload = verifyToken(access_token)
        // console.log(payload, "<<< ini payload");

        let user = {};
        user = await User.findOne({
            where: {
                id: payload.id
            }
        })
        // console.log(user.membership);
        if (!user) {
            // console.log("ini user")
            throw { name: "Unauthenticated" }
        }

        req.userData = {
            UserId: user.id,
            email: user.email,
            membership: user.membership
        }
        // console.log(req.userData);
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = userAuthentication
