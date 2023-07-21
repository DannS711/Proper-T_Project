const { Type } = require('../models')

class TypeController {
    static async getTypes(req, res, next) {
        try {
            const types = await Type.findAll()
            // console.log(types);
            res.status(200).json({
                statusCode: 200,
                message: types
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TypeController