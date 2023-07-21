const passwordComparer = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library')
const midtransClient = require('midtrans-client');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class UserController {
    static async register(req, res, next) {
        try {
            // console.log(req.body);
            let { username, email, password, phoneNumber } = req.body

            const created = await User.create({ username, email, password, phoneNumber })
            if (created) {
                res.status(201).json({
                    statusCode: 201,
                    message: created
                })
            }
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) {
                throw { name: "NoEmail" }
            } else if (!password) {
                throw { name: "NoPassword" }
            }

            const user = await User.findOne({ where: { email: email } })
            // console.log(user);

            if (!user) {
                throw { name: "LoginError" }
            }

            const isValid = passwordComparer(password, user.password)

            if (isValid) {
                const access_token = signToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({
                    id: user.id,
                    email: user.email,
                    membership: user.membership,
                    access_token: access_token
                })
            } else {
                throw { name: "LoginError" }
            }
        } catch (err) {
            next(err)
        }
    }

    static async loginGoogle(req, res, next) {
        // console.log(req.body);
        const { Google_Token } = req.body;
        try {
            const ticket = client.verifyIdToken({ idToken: Google_Token, audience: process.env.GOOGLE_CLIENT_ID });
            // console.log(ticket, "<<< TICKET");
            const payload = (await ticket).getPayload();
            // console.log(payload);
            const email = payload['email'];
            const username = payload['name']
            // console.log(email, username, "<<< username email");
            let user = await User.findOne({ where: { email } });
            // console.log(user, "<<< user");
            if (!user) {
                user = await User.create({
                    username: username,
                    email: email,
                    password: 'P>A>S>S>W>O>R>D',
                    phoneNumber: '1234567890',
                });
            }
            const access_token = signToken({
                id: user.id,
                email: user.email
            });
            // console.log(access_token);
            res.status(200).json({
                id: user.id,
                email: user.email,
                membership: user.membership,
                access_token: access_token
            });
        } catch (err) {
            next(err);
        }
    }

    static async facebookLogin(req, res, next) {
        window.fbAsyncInit = function () {
            FB.init({
                appId: 'YOUR_APP_ID',
                cookie: true,
                xfbml: true,
                version: 'v12.0'
            });

            FB.AppEvents.logPageView();

            // Check if the user is already logged in and handle it accordingly
            FB.getLoginStatus(function (response) {
                console.log(response);
                if (response.status === 'connected') {
                    // The user is logged in and authenticated
                    // You can now make API calls or redirect the user
                    // to your application's authenticated pages
                    const accessToken = response.authResponse.accessToken;
                    console.log('Logged in and authenticated:', accessToken);
                } else {
                    // The user is not logged in or authenticated
                    // Display the Facebook login button or initiate the login process
                    console.log('Not logged in or authenticated');
                }
            });
        };
    }

    static async userMidtransPayment(req, res, next) {
        try {
            const findUser = await User.findByPk(req.userData.UserId)
            if (findUser.membership === 'Active') throw { name: 'Already_Member' }
            // console.log(findUser);
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION_" + Math.floor(39874392 + Math.random() * 992830758),
                    "gross_amount": 15000
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    // "first_name": "budi",
                    // "last_name": "pratama",
                    // "email": "budi.pra@example.com",
                    // "phone": "08111222333"
                    "username": findUser.username,
                    "email": findUser.email,
                    "phone_number": findUser.phone_number
                }
            };

            const midtransToken = await snap.createTransaction(parameter)
            // console.log(midtransToken, "<<<<<</>");
            res.status(201).json(midtransToken)
        } catch (err) {
            next(err)
        }
    }

    static async changeStatus(req, res, next) {
        try {
            await User.update({ membership: 'Active' }, {
                where: {
                    id: req.userData.UserId
                }
            })
            // console.log(updateMember);
            res.status(200).json({
                statusCode: 200,
                message: `User with id ${req.userData.UserId} is now a member`
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController