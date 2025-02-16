const {validationResult} = require('express-validator');
const appError = require('../../features/appError');
const validationMiddleware = require('../../features/validationMiddleware');
const { text } = require('express');

let req, res, next;
beforeEach(() => {
    req = {},
    res = {},
    next = jest.fn();
})

jest.mock('express-validator', () => {
    return {validationResult: jest.fn()}
})

jest.mock('../../features/appError', () => {
    return {create: jest.fn().mockImplementation((code, text, errors) => ({code, text, errors}))}
})


describe('Validation middleware', () => {
    it('should call next with an error', () => {
        const returned = {
            isEmpty: jest.fn().mockReturnValue(false),
            array: jest.fn().mockReturnValue([{msg: 'invalid'}])
        }
        validationResult.mockReturnValue(returned);

        validationMiddleware(req, res, next);

        expect(appError.create).toHaveBeenCalledWith(400, 'fail', [{msg: 'invalid'}]);
        expect(next).toHaveBeenCalledWith({code: 400, text: 'fail', errors: [{msg: 'invalid'}]});
    });
})