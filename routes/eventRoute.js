const routes = require('express').Router()
const authenticateJWT = require('../middleware/jwtVerify')
const db = require('../models')


routes.route('/list/:limit/:offset').get(authenticateJWT, async (req, res) => {
    try {
        const events = await db.Event.findAll({
            limit: req.params.limit,
            offset: req.params.offset
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
})

routes.route('/').post(authenticateJWT, async (req, res) => {
    try {
        const create = await db.Event.create(req.body)
        res.status(201).json({
            code: 201,
            message: "success",
            data: {
                id: create.id,
                event: create.eventname
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Internal Server Error"
        })
    }
})

routes.route('/:id').get(authenticateJWT, async (req, res) => {
    try {
        const event = await db.Event.findOne({
            where: {
                id: req.params.id
            }
        })
        res.json({
            code: 200,
            message: 'Success',
            data: {
                event
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Internal Server Error"
        })
    }
}).delete(authenticateJWT, async (req, res) => {
    try {
        const deletedata = await db.Event.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({
            code: 200,
            message: 'success',
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Internal Server Error"
        })
    }
}).put(authenticateJWT, async (req, res) => {
    try {
        const updatedata = await db.Event.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.json({
            code: 200,
            message: 'success'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Internal Server Error"
        })
    }
})

module.exports = routes