const idValidator = require('../../features/idValidator');
const appError = require('../../features/appError');

jest.mock('../../features/appError', () => {
    return {create: jest.fn().mockImplementation((code, text, errors) => ({code, text, errors}))}
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

describe('idValidator middleware', () => {
    it('should call appError.create with 400 status code and error message if id is invalid', async () => {
        req.params = {id: 'invalidId'};
        await idValidator(req, res, next);
        expect(appError.create).toBeCalledWith(400, 'fail', 'Invalid id');
        expect(next).toBeCalledWith({code: 400, text: 'fail', errors: 'Invalid id'});
    })
    
    it('should call next function if id is valid', async () => {
        req.params = {id: '5f96d83a48562d0c54951234'};
        idValidator(req, res, next);
        expect(appError.create).not.toBeCalled();
        expect(next).toBeCalledWith();
    })
})