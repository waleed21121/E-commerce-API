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
    next.mockReset();
    appError.create.mockReset();
})

describe('idValidator middleware', () => {
    it('should call next function if id is valid', async () => {
        req.params = {id: '5f96d83a48562d0c54951234'};
        idValidator(req, res, next);
        expect(next).toBeCalledWith();
    })
})