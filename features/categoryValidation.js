const {check} = require('express-validator');

exports.validationArray = [
    check('name')
        .notEmpty().withMessage('The name is required')
        .isLength({min: 3}).withMessage('The name must be at least three characters'),
    check('description')
        .notEmpty().withMessage('The description is required')
        .isLength({min: 3}).withMessage('The description must be at least three characters')
];