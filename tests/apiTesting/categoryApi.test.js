const request = require('supertest');
const server = require('../../app');
const mongoose = require('../../config/DBconfig');
const {Product} = require('../../models/product.model');
const {Category} = require('../../models/category.model');
const productDoc = require('../integration/productDoc');
const categoryDoc = require('../integration/categoryDoc');
const {generateToken} = require('../../features/JWT');
beforeEach(async function () {
    await Product.deleteMany({});
    await Category.deleteMany({});
})

afterAll(async function () {
    await mongoose.disconnect();
    server.close();
});
