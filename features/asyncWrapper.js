const idValidator = require('./idValidator');
module.exports = (func, id = null) => {
    return (req, res, next) => {
        if(id) {
            idValidator.validateId(req.params[id]);
        }
        func(req, res, next).catch((err) => {
            next(err);
        });
    }
}