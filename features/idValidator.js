const mongoose = require('mongoose');

exports.validateId = (id) => {
    if(mongoose.Types.ObjectId.isValid(id)) {
        return true;
    }
    return false;
} 