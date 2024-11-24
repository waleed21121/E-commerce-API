const jwt = require('jsonwebtoken');
const appError = require('./appError');
exports.generateToken = (email) => {
    return jwt.sign({email: email}, process.env.SECRET, {expiresIn: '1m'})
};

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if(!authHeader) {
        const error = appError.create(401, 'fail', 'token is required');
        return next(error);
    }

    const token = authHeader.split(' ')[1];
    try {

        const currentUser = jwt.verify(token, process.env.SECRET);
        req.currentUser = currentUser;
        next();

    } catch (err) {
        const error = appError.create(401, 'fail', 'Invalid token');
        return next(error);
    }   
    
};