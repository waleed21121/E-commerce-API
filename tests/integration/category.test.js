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

    it('should return one category', async () => {
        await categoryModel.Category.insertMany([categoryDoc]);
        const categories = await categoryModel.getQueryObject();
        expect(categories.length).toBe(1);
        expect(categories[0]).toMatchObject({name: 'Electronics'});
    })
    
    it('should return one category by id', async () => {
        const category = new categoryModel.Category(categoryDoc);
        await category.save();
        const foundCategory = await categoryModel.getCategoryById(category._id);
        expect(foundCategory).toMatchObject({name: 'Electronics'});
    })
})

describe('add new category', () => {
    it('should create a new category', async () => {
        await categoryModel.addNewCategory(categoryDoc);

        const categories = await categoryModel.Category.find({});
        expect(categories.length).toBe(1);
        expect(categories[0]).toMatchObject({name: 'Electronics'});
    })
})

describe('update category', () => {
    it('should update a category', async () => {
        const category = new categoryModel.Category(categoryDoc);
        await category.save();

        await categoryModel.updateCategory(category._id, {name: 'Updated Electronics'});
        const updatedCategory = await categoryModel.Category.findById(category._id);
        expect(updatedCategory.name).toBe('Updated Electronics');
    })
})

describe('delete category', () => {
    it('should delete a category', async () => {
        const category = new categoryModel.Category(categoryDoc);
        await category.save();

        await categoryModel.deleteCategory(category._id);
        const foundCategory = await categoryModel.Category.findById(category._id);
        expect(foundCategory).toBeNull();
    })
})