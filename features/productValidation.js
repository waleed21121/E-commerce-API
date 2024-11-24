const {check} = require('express-validator');
const categoryModel = require('../models/category.model').Category;

const categoryValidator = async(categoryId) => {
    const category = await categoryModel.findById(categoryId);
    if(!category) {
        throw new Error();
    }
    return true;
}

exports.validationArray = [
    check('name')
        .notEmpty().withMessage('The name is required')
        .isLength({min: 3}).withMessage('The name must be at least three characters'),
    check('description')
        .notEmpty().withMessage('The description is required')
        .isLength({min: 3}).withMessage('The description must be at least three characters'),
    check('category')
        .custom(categoryValidator).withMessage('The category is not found'),
    check('price')
        .notEmpty().withMessage('The price is required')
        .isNumeric({min: 1}).withMessage('The price must be number and at least 1$')
];