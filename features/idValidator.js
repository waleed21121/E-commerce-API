const mongoose = require('mongoose');
const appError = require('./appError');

module.exports = (req, res, next) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        const error = appError.create(400, 'fail', 'Invalid id');
        next(error);
    }
    next();
}