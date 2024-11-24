const asyncWrapper = require('../features/asyncWrapper');
const apiFeatures = require('../features/apiFeatures');
const appError = require('../features/appError');
const generateToken = require('../features/JWT');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const userModel = require('../models/user.model');

exports.getAllUsers = asyncWrapper(async(req, res, next) => {
    const queryObject = userModel.getQueryObject();
    const features = new apiFeatures(queryObject, req.query).fieldsFilter().paginate().sort();

    const products = await features.queryObject;
    res.status(200).json({
        status: 'success',
        data: products
    });
})

exports.register = asyncWrapper(async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = appError.create(400, 'fail', errors.array());
        throw error;
    }
    
    const { firstName, lastName, email, password } = req.body;
    
    const user = await userModel.getUserByEmail(email);
    if(user) {
        const error = appError.create(400, 'fail', 'This Email already has an account');
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
    };
    const token = generateToken.generateToken(email);
    await userModel.addNewUser(newUser);
    res.status(201).json({
        status: 'success',
        data: {
            newUser,
            token: token
        }
    });
})

exports.login = asyncWrapper(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email && !password) {
        const error = appError.create(400, 'fail', 'email and password are required');
        throw error;
    }

    const user = await userModel.getUserByEmail(email);

    if(!user) {
        const error = appError.create(400, 'fail', 'user not found');
        throw error;
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if(user && matchedPassword) {
        const token = generateToken.generateToken(email);
        res.status(200).json({
            status: 'success',
            data:{
                token: token
            }
        })
    } else {
        const error = appError.create(500, 'error', 'something wrong')
        throw error;
    }

})