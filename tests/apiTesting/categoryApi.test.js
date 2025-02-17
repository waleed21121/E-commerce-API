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

    it('should return the category by its id', async () => {
        const category = await Category.create(categoryDoc);
        const response = await request(server).get(`/api/categories/${category._id}`);
        expect(response.status).toBe(200);
        expect(response.body.data).toMatchObject(categoryDoc);
    })

    it('should return 404 when category doesn\'t exist', async () => {
        const response = await request(server).get(`/api/categories/6067348b71972b218a39230d`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('category not found');
    })
})

describe('Add new Category', () => {
    it('should create a new category', async () => {
        const response = await request(server)
            .post('/api/categories')
            .send(categoryDoc)
            .set('Authorization', `Bearer ${generateToken('test@test.com')}`);
        expect(response.status).toBe(201);
        expect(response.body.data).toMatchObject(categoryDoc);
    })

    it('should return 400 for already existing category', async () => {
        await Category.create(categoryDoc);
        const response = await request(server)
            .post('/api/categories')
            .send(categoryDoc)
            .set('Authorization', `Bearer ${generateToken('test@test.com')}`);
        expect(response.status).toBe(400);
        expect(response.body.error).toMatch('category is already exist');
    })
})

describe('Update Category', () => {
    it('should update the category', async () => {
        const category = await Category.create(categoryDoc);
        const response = await request(server)
            .patch(`/api/categories/${category._id}`)
            .send({name: 'updated category'})
            .set('Authorization', `Bearer ${generateToken('test@test.com')}`);
        const updatedCategory = await Category.findById(category._id);
        expect(response.status).toBe(200);
        expect(updatedCategory).toMatchObject({name: 'updated category'});
    })

    it('should return 404 when category doesn\'t exist', async () => {
        const response = await request(server)
            .patch(`/api/categories/6067348b71972b218a39230d`)
            .send({name: 'updated category'})
            .set('Authorization', `Bearer ${generateToken('test@test.com')}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('category not found');
    })
})

describe('Delete Category', () => {
    it('should delete the category', async () => {
        const category = await Category.create(categoryDoc);
        const response = await request(server)
            .delete(`/api/categories/${category._id}`)
            .set('Authorization', `Bearer ${generateToken('test@test.com')}`);
        const deletedCategory = await Category.findById(category._id);
        expect(response.status).toBe(200);
        expect(deletedCategory).toBeNull();
    })

    it('should return 404 when category doesn\'t exist', async () => {
        const response = await request(server)
            .delete(`/api/categories/6067348b71972b218a39230d`)
            .set('Authorization', `Bearer ${generateToken('test@test.com')}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('category not found');
    })
})

describe('Get Products by Category', () => {
    it('should return products of a specific category', async () => {
        const category = await Category.create(categoryDoc);
        let firstProduct = {...productDoc};
        let secondProduct = {...productDoc};
        firstProduct.category = category._id;
        secondProduct.category = '6067348b71972b218a39230d';
        firstProduct.name = 'with category';
        secondProduct.name = 'without category';

        console.log(firstProduct, secondProduct);
        
        await Product.create([firstProduct, secondProduct]);

        const response = await request(server).get(`/api/categories/${category._id}/products`);

        console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.data[0].name).toBe('with category');
    })
})