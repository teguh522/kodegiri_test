const route = require('express').Router()
/**
 * @openapi
 * tags:
 * - name: Auth
 * /auth:
 *   get:
 *     tags:
 *     - Auth
 *     description: Get list user login
 *     responses:
 *       200:
 *         description: Returns list user login
 */
route.get('/', (req, res) => {
    res.json("Selamat Datang")
})



route.route('/:id').get((req, res) => {

}).put((req, res) => {

}).delete((req, res) => {

})



module.exports = route