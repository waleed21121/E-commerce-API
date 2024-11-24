const {check} = require('express-validator');

exports.validationArray = [
    check('firstName')
        .notEmpty().withMessage('The first name is required')
        .isLength({min: 3}).withMessage('The name must be at least three characters'),
    check('lastName')
        .notEmpty().withMessage('The last name is required')
        .isLength({min: 2}).withMessage('The last name must be at least two characters'),
    check('email')
        .isEmail().withMessage('The email is not valid'),
    check('password')
        .notEmpty().withMessage('The passowrd is required')
        .isLength({min: 8}).withMessage('The password must be at least 8 characters')
];