const request = require('supertest');
const server = require('../../app');
const mongoose = require('../../config/DBconfig');
const {User} = require('../../models/user.model');
const userDoc = require('../integration/userDoc');
const {generateToken} = require('../../features/JWT');

beforeEach(async function () {
    await User.deleteMany({});
})

afterAll(async function () {
    await User.deleteMany({});
    await mongoose.disconnect();
});

describe('Testing user', () => {
    describe('Get all users', () => {
        it('should return one user', async () => {
            const user = await User.create(userDoc);
            const token = generateToken('test@test.com');
            const response = await request(server).get('/api/users').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.data[0]).toMatchObject({email: user.email});
        })
    })
})