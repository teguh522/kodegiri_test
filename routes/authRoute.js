const routes = require('express').Router()
const db = require('../models')
const bc = require('bcrypt')
const jwt = require('jsonwebtoken')

routes.post('/signin', async (req, res) => {
    const { email, password } = req.body
    try {

        const user = await db.Auth.findOne({
            where: {
                email,
            }
        })
        if (user === null) {
            res.status(404).json({
                code: 404,
                message: "User not found"
            })
        } else {
            const getpass = await bc.compareSync(password, user.password)
            const datajwt = {
                id: user.id,
                email: user.email,
            }
            const token = jwt.sign(datajwt, process.env.SECRET_KEY)
            if (getpass) {
                res.status(201).json({
                    code: 201,
                    message: "Success",
                    token
                })
            } else {
                res.status(404).json({
                    code: 404,
                    message: "Password not match"
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Internal Server Error"
        })
    }
})

routes.route('/').get(async (req, res) => {
    try {
        const users = await db.Auth.findAll()
        res.json({
            code: 200,
            message: 'Success',
            data: {
                users
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Internal Server Error"
        })
    }

}).post(async (req, res) => {
    try {
        const create = await db.Auth.create(req.body)
        res.status(201).json({
            code: 201,
            message: 'success',
            data: {
                id: create.id,
                email: create.email,
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


routes.route('/:id').delete(async (req, res) => {
    try {
        const deletedata = await db.Auth.destroy({
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

}).get(async (req, res) => {
    try {
        const getdata = await db.Auth.findOne({
            where: {
                id: req.params.id
            }
        })
        if (getdata === null) {
            res.status(404).json({
                code: 404,
                message: 'User Not Found!',
            })
        } else {
            res.json({
                code: 200,
                message: 'success',
                data: {
                    getdata
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Internal Server Error"
        })
    }
})



module.exports = routes