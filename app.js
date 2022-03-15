require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', router.auth)
app.use('/event', router.event)



app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))