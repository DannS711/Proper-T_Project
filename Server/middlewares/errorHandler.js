function errorHandling(err, req, res, next) {
    console.log(err, "<<< error handling");
    console.log({ name: err.name });

    switch (err.name) {
        case 'SequelizeValidationError':
            const errorMsgValidation = err.errors.map((error) => error.message);
            res.status(400).json({
                statusCode: 400,
                message: errorMsgValidation
            });
            break;

        case 'SequelizeUniqueConstraintError':
            // const errorMsgUniqueEmail = err.errors.map((error) => error.message);
            res.status(400).json({
                statusCode: 400,
                message: "Email is already taken"
            });
            break;

        case 'NotFound':
            res.status(404).json({
                statusCode: 404,
                message: "Item not found"
            })
            break;

        case 'LoginError':
            res.status(401).json({
                statusCode: 401,
                message: "Username/Password Invalid"
            })
            break;

        case 'NoEmail':
            res.status(400).json({
                statusCode: 400,
                message: "Email is required"
            })
            break;

        case 'NoPassword':
            res.status(400).json({
                statusCode: 400,
                message: "Password is required"
            })
            break;


        case 'JsonWebTokenError':
            res.status(401).json({
                statusCode: 401,
                message: "Invalid Token"
            })
            break;

        case 'Unauthenticated':
            res.status(401).json({
                statusCode: 401,
                message: "Please login first"
            })
            break;

        case 'Forbidden':
            res.status(403).json({
                statusCode: 403,
                message: "You are not authorized"
            })
            break;

        case 'Already_Member':
            res.status(400).json({
                statusCode: 400,
                message: "You are already a member"
            })
            break;

        default:
            res.status(500).json({ statusCode: 500, message: "Internal Server Error" })
            break;
    }
}

module.exports = errorHandling