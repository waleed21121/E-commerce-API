const request = require('supertest');
const server = require('../../app');
const mongoose = require('../../config/DBconfig');
const {Product} = require('../../models/product.model');
const {Category} = require('../../models/category.model');
const productDocument = require('../integration/productDoc');
const categoryDoc = require('../integration/categoryDoc');
const {generateToken} = require('../../features/JWT');


let productDoc = {...productDocument};

beforeEach(async function () {
    await Product.deleteMany({});
    await Category.deleteMany({});
    const category = new Category(categoryDoc);
    await category.save();
    productDoc.category = category._id; 
})

afterAll(async function () {
    await Product.deleteMany({});
    await Category.deleteMany({});
    await mongoose.disconnect();
});
describe('product testing', () => {

    describe('get products', () => {
        it('should return one product', async () => {
            await Product.create(productDoc);
            const response = await request(server).get('/api/products/');
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data.length).toBe(1);
            expect(response.body.data[0].name).toBe(productDoc.name);
        })

        it('should return the product by its id', async () => {

            const product = await Product.create(productDoc);

            const token = generateToken('test@test.com');
            const response = await request(server)
                .get(`/api/products/${product._id}`);
            
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data).toMatchObject({name: productDoc.name, description: productDoc.description});
        })

        it('should return 404 when the product does not exist', async () => {
            const response = await request(server).get('/api/products/6067348b71972b218a39230d');
            expect(response.status).toBe(404);
            expect(response.body.status).toBe('fail');
            expect(response.body.error).toMatch('product not found');
        })
    })

    describe('add new product', () => {
        it('should create a new product', async () => {
            const token = generateToken('test@test.com');
            const response = await request(server)
                .post('/api/products/')
                .set('Authorization', `Bearer ${token}`)
                .send(productDoc);
            
            expect(response.status).toBe(201);
            expect(response.body.status).toBe('success');
            expect(response.body.data).toMatchObject({name: productDoc.name, description: productDoc.description});
        })
    })

    describe('update product', () => {
        it('should update a product by its id', async () => {
            const product = await Product.create(productDoc);
            const token = generateToken('test@test.com');
            const response = await request(server)
                .patch(`/api/products/${product._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({name: 'Updated Product'});
            
            const updatedProduct = await Product.findById(product._id);
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(updatedProduct).toMatchObject({name: 'Updated Product', description: productDoc.description});
        })

        it('should return 404 when the product does not exist', async () => {
            const token = generateToken('test@test.com');
            const response = await request(server)
                .patch(`/api/products/6067348b71972b218a39230d`)
                .set('Authorization', `Bearer ${token}`)
                .send({name: 'Updated Product'});
            expect(response.status).toBe(404);
            expect(response.body.status).toBe('fail');
            expect(response.body.error).toMatch('product not found');
        })
    })

    describe('delete product', () => {
        it('should delete a product by its id', async () => {
            const product = await Product.create(productDoc);
            const token = generateToken('test@test.com');
            const response = await request(server)
                .delete(`/api/products/${product._id}`)
                .set('Authorization', `Bearer ${token}`);
            
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data).toBeNull();
        })

        it('should return 404 when the product does not exist', async () => {
            const token = generateToken('test@test.com');
            const response = await request(server)
                .delete(`/api/products/6067348b71972b218a39230d`)
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(404);
            expect(response.body.status).toBe('fail');
            expect(response.body.error).toMatch('product not found');
        })
    })
})