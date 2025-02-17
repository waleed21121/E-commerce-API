const request = require('supertest');
const server = require('../../app');
const mongoose = require('../../config/DBconfig');
const {Product} = require('../../models/product.model');
const productDoc = require('../integration/productDoc');

beforeEach(async function () {
    await Product.deleteMany({});
})

afterAll(async function () {
    await mongoose.disconnect();
    server.close();
});

describe('get books', () => {
    it('should return one book', async () => {
        await Product.create(productDoc);
        const response = await request(server).get('/api/products/');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.length).toBe(1);
        expect(response.body.data[0].name).toBe(productDoc.name);
    })
})