const router = require('express').Router();
const token = require('../features/JWT');
const userValidation = require('../features/userValidation');

const userController = require('../controllers/user.controller');

router.route('/')
                .get(token.verifyToken, userController.getAllUsers);

router.route('/login')
                .post(userController.login);

router.route('/register')
                .post(userValidation.validationArray, userController.register);
module.exports = router;