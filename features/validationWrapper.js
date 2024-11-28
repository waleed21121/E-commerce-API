const idValidator = require('./idValidator');
module.exports = (validationArray, validationMiddleware) => {
    const arr = [...validationArray, validationMiddleware];
    return (arr) =>{};
}
