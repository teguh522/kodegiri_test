require('dotenv').config()
const express = require('express')
const router = require('./routes')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'],
};
const openapiSpecification = swaggerJsdoc(options);
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use('/auth', router.auth)



app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))