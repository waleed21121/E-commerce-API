const express = require('express');
const productController = require('../controllers/product.controller');
const productValidator = require('../features/productValidation');
const token = require('../features/JWT');

const router = express.Router();

router.route('/').post(token.verifyToken, productValidator.validationArray, productController.addNewProduct)
                    .get(productController.getProducts);

router.route('/:productId').get(productController.getProductById)
                            .patch(token.verifyToken, productController.updateProduct)
                            .delete(token.verifyToken, productController.deleteProduct);
module.exports = router;