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