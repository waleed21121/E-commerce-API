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

    it('should return one user', async () => {
        const user = new userModel.User(userDoc);
        await user.save();
        const users = await userModel.getQueryObject();

        expect(users.length).toBe(1);
        expect(users[0]).toMatchObject(userDoc);
    })

    it('should return the user by its email', async () => {
        const user = new userModel.User(userDoc);
        await user.save();
        const foundUser = await userModel.getUserByEmail(userDoc.email);
        expect(foundUser).toMatchObject({email: userDoc.email});
    })
})

describe("create new user", () => {
    it('should create a new user', async () => {
        await userModel.addNewUser(userDoc);

        const user = await userModel.User.find();
        expect(user.length).toBe(1);
        expect(user[0]).toMatchObject(userDoc);
    })
})