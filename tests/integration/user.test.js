require('../../config/DBconfig');
const userModel = require('../../models/user.model');

beforeEach(() => {
    userModel.User.deleteMany({});
})
afterAll(() => {
    userModel.User.deleteMany({});
})