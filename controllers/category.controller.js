const categoryModel = require('../models/category.model');
const productModel = require('../models/product.model');
const apiFeatures = require('../features/apiFeatures');
const asyncWrapper = require('../features/asyncWrapper');
const appError = require('../features/appError');

exports.addNewCategory = asyncWrapper(async(req, res, next) => {
    const category = await categoryModel.Category.findOne({name: req.body.name});
    if(category) {
        const error = appError.create(400, 'fail', 'The category is already exist');
        throw error;
    }
    await categoryModel.addNewCategory(req.body);
    res.status(201).json({
        status: 'success',
        data: {...req.body}
    });
})

exports.getCategories = asyncWrapper(async(req, res, next) => {
    const queryObject = categoryModel.getQueryObject();
    const features = new apiFeatures(queryObject, req.query).fieldsFilter().paginate().sort();
    const categories = await features.queryObject;
    res.status(200).json({
        status: 'success',
        data: categories
    });
})

exports.getCategoryById = asyncWrapper(async(req, res, next) => {
    const id = req.params.id;
    const category = await categoryModel.getCategoryById(id);
    if(!category) {
        const error = appError.create(404, 'fail', 'category not found');
        throw error;
    }
    res.status(200).json({
        status: 'success',
        data: category
    });
})

exports.updateCategory = asyncWrapper(async(req, res, next) => {
    const id = req.params.id;
    const category = await categoryModel.getCategoryById(id);
    if(!category) {
        const error = appError.create(404, 'fail', 'category not found');
        throw error;
    }

    const updCategory = await categoryModel.updateCategory(req.params.id, {...req.body});
    res.status(200).json({
        status: 'success',
        data: updCategory
    });
})

exports.deleteCategory = asyncWrapper(async(req, res, next) => {
    const id = req.params.id;
    const category = await categoryModel.getCategoryById(id);
    if(!category) {
        const error = appError.create(404, 'fail', 'category not found');
        throw error;
    }

    await categoryModel.deleteCategory(req.params.id);
    res.status(200).json({
        status: 'success',
        data: null
    });
})

exports.getCategoryProducts = asyncWrapper(async(req, res, next) => {
    const queryObject = productModel.getQueryObject();
    req.query.category = req.params.id;
    const features = new apiFeatures(queryObject, req.query).fieldsFilter().paginate().sort();
    const products = await features.queryObject;
    res.status(200).json({
        status: 'success',
        data: products
    });
})