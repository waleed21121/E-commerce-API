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

describe('Get Category', () => {
    it('should return one category', async function () {
        await Category.create(categoryDoc);
        const response = await request(server).get('/api/categories');
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.data[0]).toMatchObject(categoryDoc);
    });

    it('should return no category', async function () {
        const response = await request(server).get('/api/categories');
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
    });
})