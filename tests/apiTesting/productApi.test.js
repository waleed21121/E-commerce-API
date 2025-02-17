const request = require('supertest');
const server = require('../../app');
const mongoose = require('../../config/DBconfig');
const {Product} = require('../../models/product.model');
const productDoc = require('../integration/productDoc');
const {generateToken} = require('../../features/JWT');
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

    it('should return the book by its id', async () => {

        const product = await Product.create(productDoc);

        const token = generateToken('test@test.com');
        const response = await request(server)
            .get(`/api/products/${product._id}`);
        
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data).toMatchObject({name: productDoc.name, description: productDoc.description});
    })
})