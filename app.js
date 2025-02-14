const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config({path: '.env'});
const productRouter = require('./routes/product.router');
const categoryRouter = require('./routes/category.router');
const userRouter = require('./routes/user.router');

const app = express();
app.use(express.json())

app.use('/api/products', productRouter);

app.use('/api/categories', categoryRouter);

app.use('/api/users', userRouter);

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500)
    .json({status: error.statusText || 'Not found', error: error.message});
})

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    console.log(`listening on port ${PORT}`);
})