require('../../config/DBconfig');
const productModel = require('../../models/product.model');
require('../../models/category.model');

beforeEach(async () => {
    await productModel.Product.deleteMany({});
})
afterAll(async () => {
    await productModel.Product.deleteMany({});
});

describe("get products", () => {
    it('should return empty array', async () => {
        const products = await productModel.getQueryObject();
        expect(products.length).toBe(0);
    })

    it('should return one product', async () => {
        await productModel.Product.insertMany([{
            name: 'Test Product',
            description: 'This is a test product.',
            price: 10,
            category: '672a18300427a1123af52f63'
        }]);
        const product = await productModel.getQueryObject();
        expect(product.length).toBe(1);
        expect(product[0]).toMatchObject({name: 'Test Product', price: 10});
    })
})