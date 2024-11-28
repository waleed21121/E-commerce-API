const {validationResult} = require('express-validator');
const appError = require('./appError');
module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = appError.create(400, 'fail', errors.array());
        next(error);
    }
    next();
}