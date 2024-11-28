const express = require('express');
const categoryController = require('../controllers/category.controller');
const categoryValidation = require('../features/categoryValidation');
const idValidator = require('../features/idValidator');
const token = require('../features/JWT');
const validationWrapper = require('../features/validationWrapper');

const router = express.Router();

router.route('/').post(token.verifyToken, validationWrapper(categoryValidation.validationArray), categoryController.addNewCategory)
                    .get(categoryController.getCategories);

router.route('/:id').get(idValidator, categoryController.getCategoryById)
                            .patch(token.verifyToken, categoryController.updateCategory)
                            .delete(token.verifyToken, categoryController.deleteCategory);

router.route('/:categoryId/products').get(categoryController.getCategoryProducts)
module.exports = router;