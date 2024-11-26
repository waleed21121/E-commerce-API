const mongoose = require('mongoose');
const appError = require('./appError');
exports.validateId = (id) => {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        const error = appError.create(400, 'fail', 'Invalid id');
        throw error;
    }
} 