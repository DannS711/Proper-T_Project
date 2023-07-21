const { User, Listing } = require('../models')

const userAuthorization = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findOne({ where: { id: req.userData.UserId } })
        if (!user) {
            console.log("No User");
            throw { name: "Forbidden" }
        }
        // console.log(user.id, "<<< ini user id");

        const listing = await Listing.findOne({ where: { id: id } })
        if (!listing) {
            console.log("No Listing");
            throw { name: "NotFound" }
        }
        // console.log(listing.UserId, "<<< ini listing userId");

        if (listing.UserId !== user.id) {
            console.log("skibidibabmdadab");
            throw { name: "Forbidden" }
        }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = userAuthorization