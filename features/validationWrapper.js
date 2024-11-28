const validationMiddleware = require('./validationMiddleware');
module.exports = (validationArray) => {
    const arr = [...validationArray, validationMiddleware];
    return arr;
}
