const routes = require('express').Router()
const authenticateJWT = require('../middleware/jwtVerify')
const db = require('../models')


routes.route('/').get(authenticateJWT, async (req, res) => {
    try {
        const events = await db.Event.findAll({
            limit: 2,
            offset: 0
        })
        res.json({
            code: 200,
            message: 'Success',
            data: {
                events
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Internal Server Error"
        })
    }
}).post(authenticateJWT, async (req, res) => {
    try {
        const create = await db.Event.create(req.body)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Internal Server Error"
        })
    }
})


module.exports = routes