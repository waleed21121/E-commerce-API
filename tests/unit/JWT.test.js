const {sign, verify} = require('jsonwebtoken');
const JWT = require('../../features/JWT');
const appError = require('../../features/appError');
require('dotenv').config({path: '.env'})

let req, res, next;

jest.mock('jsonwebtoken', () => {
    return {sign: jest.fn(), verify: jest.fn()}
})

jest.mock('../../features/appError', () => {
    return {create: jest.fn().mockImplementation((code, text, msg) => ({code, text, msg}))}
})


beforeEach(() => {
    req = {};
    res = {};
    next = jest.fn();
})

afterEach(() => {
    next.mockClear();
    appError.create.mockClear();
})

describe('JSON web token', () => {
    it('should sign a token with a user email', () => {
        const email = 'test@test.com';
        sign.mockReturnValue('Test token');
        const token = JWT.generateToken(email);

        expect(token).toBe('Test token');
        expect(sign).toHaveBeenCalledWith({email: email}, process.env.SECRET, {expiresIn: '1m'});
    });
})