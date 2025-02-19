const express = require('express');
const dotenv = require('dotenv').config({path: '.env'});
const productRouter = require('./routes/product.router');
const categoryRouter = require('./routes/category.router');
const userRouter = require('./routes/user.router');
const swaggerJSDoc = require('swagger-jsdoc');
const swageerUI = require('swagger-ui-express');
const options = require('./swagger/swaggerOptions');


const app = express();
app.use(express.json())

const specs = swaggerJSDoc(options);

app.use('/api-docs', swageerUI.serve, swageerUI.setup(specs));

app.use('/api/products', productRouter);

app.use('/api/categories', categoryRouter);

app.use('/api/users', userRouter);

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500)
    .json({status: error.statusText || 'Not found', error: error.message});
})

require('./config/DBconfig');

module.exports = app;