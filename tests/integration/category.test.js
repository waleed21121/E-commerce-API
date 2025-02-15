require('../../config/DBconfig')
const categoryModel = require('../../models/category.model');
const categoryDoc = require('./categoryDoc');

beforeEach(async () => {
    await categoryModel.Category.deleteMany({});
})
afterAll(async () => {
    await categoryModel.Category.deleteMany({});
});

describe('get category', () => {

    it('should return no category', async () => {
        const categories = await categoryModel.getQueryObject();
        expect(categories.length).toBe(0);
    })

    
})