const express = require("express")
const TypeController = require("../controllers/typeController")
const userAuthentication = require("../middlewares/authentication")
const userAuthorization = require("../middlewares/authorization")
const ListingController = require("../controllers/listingController")
const UserController = require("../controllers/userController")
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.loginGoogle)
router.post('/facebookLogin', UserController.facebookLogin)
router.get('/types', TypeController.getTypes)
router.get('/listings', ListingController.getAllListings)
router.get('/listings/:id', ListingController.getUserListingById)


router.use(userAuthentication)

router.post('/midtrans-token', UserController.userMidtransPayment)
router.patch('/memberships', UserController.changeStatus)

router.get('/members/listings', ListingController.getUsersListings)
router.post('/members/listings', ListingController.postUserListing)
router.get('/members/listings/:id', userAuthorization, ListingController.getUserListingById)
router.put('/members/listings/:id', userAuthorization, ListingController.editUserListing)
router.patch('/members/listings/:id', userAuthorization, ListingController.patchListingStatus)
router.delete('/members/listings/:id', userAuthorization, ListingController.deleteListing)

module.exports = router