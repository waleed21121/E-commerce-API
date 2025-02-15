require('../../config/DBconfig');
const productModel = require('../../models/product.model');
require('../../models/category.model');

const productDoc = require('./productDoc');

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
        await productModel.Product.insertMany([productDoc]);
        const products = await productModel.getQueryObject();
        expect(products.length).toBe(1);
        expect(products[0]).toMatchObject({name: 'Test Product', price: 10});
    })

    it('should get the product by its id', async () => {
        const product = new productModel.Product(productDoc);
        await product.save();
        const foundProduct = await productModel.getProductById(product._id);
        expect(foundProduct).toMatchObject({name: 'Test Product', price: 10});
    })
})