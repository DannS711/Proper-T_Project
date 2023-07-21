const { Op } = require('sequelize');
const { User, Listing, Type } = require('../models')

class ListingController {
    static async getAllListings(req, res, next) {
        try {
            // console.log(req.query, "<<< req query");
            const { filter, search, selectedOption } = req.query;
            const option = {};

            if (search) {
                option.title = { [Op.iLike]: `%${search}%` };
            }

            if (filter) {
                option.TypeId = filter;
            }

            if (selectedOption) {
                option.status = selectedOption;
            }

            const listings = await Listing.findAll({
                where: {
                    ...option,
                    status: 'showing'
                }
            });

            // console.log(listings);

            res.status(200).json({
                statusCode: 200,
                message: listings
            });
        } catch (err) {
            next(err);
        }
    }

    static async getUsersListings(req, res, next) {
        try {
            // console.log(req.query, "<<< req query");
            const { UserId } = req.userData;
            const { filter, search, selectedOption } = req.query;
            const option = {};
            // console.log(UserId, "<<< USERID");
            if (!UserId) throw { name: "Unauthenticated" }

            if (search) {
                option.title = { [Op.iLike]: `%${search}%` };
            }

            if (filter) {
                option.TypeId = filter;
            }

            if (selectedOption) {
                option.status = selectedOption;
            }

            const listings = await Listing.findAll({
                where: {
                    ...option,
                    UserId: UserId
                },
                include: { model: Type }
            });
            // console.log(listings);
            if (!listings) throw { name: "NotFound" }

            res.status(200).json({
                statusCode: 200,
                message: listings
            });
        } catch (err) {
            next(err);
        }
    }

    static async getUserListingById(req, res, next) {
        try {
            const { id } = req.params

            const listing = await Listing.findByPk(id)
            // console.log(listing);
            if(!listing) throw{name: "NotFound"}
            res.status(200).json({
                statusCode: 200,
                message: listing
            })
        } catch (err) {
            next(err)
        }
    }

    static async postUserListing(req, res, next) {
        try {
            // console.log(req.body);
            const { UserId } = req.userData;
            const {
                title,
                adType,
                address,
                description,
                price,
                landArea,
                buildingArea,
                TypeId,
                imgUrl
            } = req.body;

            const createdListing = await Listing.create({
                title,
                adType,
                address,
                description,
                price,
                landArea,
                buildingArea,
                UserId,
                TypeId,
                imgUrl
            });
            res.status(201).json({
                statusCode: 201,
                message: createdListing
            });
        } catch (err) {
            next(err);
        }
    }

    static async editUserListing(req, res, next) {
        try {
            const { id } = req.params
            let { title, address, description, price, landArea, buildingArea, imgUrl } = req.body
            const listing = await Listing.findOne({
                where: {
                    id: id
                }
            })
            // console.log(listing);

            if (!listing) throw { name: "NotFound" }

            const edited = await Listing.update({ title, address, description, price, landArea, buildingArea, imgUrl }, {
                where: {
                    id: id
                }
            })
            // console.log(edited);
            res.status(201).json({
                statusCode: 201,
                message: "Listing has been edited"
            })
        } catch (err) {
            next(err)
        }
    }

    static async deleteListing(req, res, next) {
        try {
            const { id } = req.params
            let listingTitle = ''
            const listing = await Listing.findOne({
                where: {
                    id: id
                }
            })
            // console.log(listin.title);
            if (!listing) throw { name: "NotFound" }

            listingTitle = listing.title

            const destroyListing = await Listing.destroy({
                where: {
                    id: id
                }
            })
            if (destroyListing) {
                res.status(200).json({
                    statusCode: 200,
                    message: `${listingTitle} has been deleted`
                })
            } else {
                throw { name: "Notfound" }
            }
        } catch (err) {
            next(err)
        }
    }

    static async patchListingStatus(req, res, next) {
        try {
            const { id } = req.params
            const { status } = req.body

            const patched = await Listing.update({ status }, {
                where: {
                    id: id
                }
            })
            // console.log(patched);
            if (!patched) throw { name: "NotFound" }

            if (status === 'delayed') {
                res.status(201).json({
                    statusCode: 201,
                    message: "your ad has been delayed"
                })
            } else if (status === 'showing') {
                res.status(201).json({
                    statusCode: 201,
                    message: "Your listing has been advertised"
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ListingController