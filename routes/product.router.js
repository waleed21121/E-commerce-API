const express = require('express');
const productController = require('../controllers/product.controller');
const productValidator = require('../features/productValidation');
const token = require('../features/JWT');
const idValidator = require('../features/idValidator');

const router = express.Router();

router.route('/').post(token.verifyToken, productValidator.validationArray, productController.addNewProduct)
                    .get(productController.getProducts);

router.route('/:id').get(idValidator, productController.getProductById)
                            .patch(token.verifyToken, productController.updateProduct)
                            .delete(token.verifyToken, productController.deleteProduct);
module.exports = router;