const express = require('express');
const categoryController = require('../controllers/category.controller');
const categoryValidation = require('../features/categoryValidation');
const token = require('../features/JWT');

const router = express.Router();

router.route('/').post(token.verifyToken, categoryValidation.validationArray, categoryController.addNewCategory)
                    .get(categoryController.getCategories);

router.route('/:categoryId').get(categoryController.getCategoryById)
                            .patch(token.verifyToken, categoryController.updateCategory)
                            .delete(token.verifyToken, categoryController.deleteCategory);

router.route('/:categoryId/products').get(categoryController.getCategoryProducts)
module.exports = router;