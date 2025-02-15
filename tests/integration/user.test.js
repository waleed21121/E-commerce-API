require('../../config/DBconfig');
const userModel = require('../../models/user.model');
const userDoc = require('./userDoc');

beforeEach(async () => {
    await userModel.User.deleteMany({});
})
afterAll(async () => {
    await userModel.User.deleteMany({});
})

describe("get user", () => {
    it('should return no user', async () => {
        const users = await userModel.getQueryObject();
        expect(users.length).toBe(0);
    })
})