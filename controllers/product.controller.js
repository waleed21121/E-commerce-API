const productModel = require('../models/product.model');
const apiFeatures = require('../features/apiFeatures');
const appError = require('../features/appError');
const asyncWrapper = require('../features/asyncWrapper');
const {validationResult} = require('express-validator');

exports.addNewProduct = asyncWrapper(async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = appError.create(400, 'fail', errors.array());
        throw error;
    }
    await productModel.addNewProduct(req.body);
    res.status(201).json({
        status: 'success',
        data: {...req.body}
    });
})

exports.getProducts = asyncWrapper(async(req, res, next) => {
    const queryObject = productModel.getQueryObject();
    const features = new apiFeatures(queryObject, req.query).fieldsFilter().paginate().sort();

    const products = await features.queryObject;
    res.status(200).json({
        status: 'success',
        data: products
    });
})

exports.getProductById = asyncWrapper(async(req, res, next) => {
    const product = await productModel.getProductById(req.params.productId);
    if(!product) {
        const error = appError.create(404, 'fail', 'product not found');
        throw error;
    }
    res.status(200).json({
        status: 'success',
        data: product
    });
})

exports.updateProduct = asyncWrapper(async(req, res, next) => {
    const product = await productModel.getProductById(req.params.productId);
    if(!product) {
        const error = appError.create(404, 'fail', 'product not found');
        throw error;
    }

    const updProduct = await productModel.updateProduct(req.params.productId, {...req.body});

    res.status(200).json({
        status: 'success',
        data: updProduct
    });
})

exports.deleteProduct = asyncWrapper(async(req, res, next) => {
    const product = await productModel.getProductById(req.params.productId);
    if(!product) {
        const error = appError.create(404, 'fail', 'product not found');
        throw error;
    }

    await productModel.deleteProduct(req.params.productId);
    res.status(200).json({
        status: 'success',
        data: null
    });
});