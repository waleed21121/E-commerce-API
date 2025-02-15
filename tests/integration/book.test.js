require('../../config/DBconfig');
const productModel = require('../../models/product.model');
require('../../models/category.model');

beforeEach(async () => {
    productModel.Product.deleteMany({});
})

describe("get products", () => {
    it('should return empty array', async () => {
        const products = await productModel.getQueryObject();
        expect(products.length).toBe(0);
    })
})