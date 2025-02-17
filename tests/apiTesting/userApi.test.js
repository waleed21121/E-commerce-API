const request = require('supertest');
const server = require('../../app');
const mongoose = require('../../config/DBconfig');
const {User} = require('../../models/user.model');
const bcrypt = require('bcryptjs');
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

    describe('Register user', () => {
        it('should return a token', async () => {
            const response = await request(server)
                .post('/api/users/register')
                .send(userDoc);
            expect(response.status).toBe(201);
            expect(response.body.data.newUser).toMatchObject({email: userDoc.email});
        })

        it('should return 400 when the email is already taken', async () => {
            await User.create(userDoc);
            const response = await request(server)
                .post('/api/users/register')
                .send(userDoc);
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('This Email already has an account');
        })
    })

    describe('Login user', () => {
        it('should return a token if user login successfully', async () => {
            const hashedPassword = await bcrypt.hash(userDoc.password, 10);
            await User.create({...userDoc, password: hashedPassword});
            const response = await request(server)
                .post('/api/users/login')
                .send({email: userDoc.email, password: userDoc.password});
            expect(response.status).toBe(200);
            expect(response.body.data.token).toBeTruthy();
        })

        it('should return 500 when the password is incorrect', async () => {
            const hashedPassword = await bcrypt.hash(userDoc.password, 10);
            await User.create({...userDoc, password: hashedPassword});
            const response = await request(server)
                .post('/api/users/login')
                .send({email: userDoc.email, password: 'wrongPassword'});
            expect(response.status).toBe(500);
            expect(response.body.error).toBe('something wrong');
        })

        it('should return 400 when the user does not exist', async () => {
            const response = await request(server)
                .post('/api/users/login')
                .send({email: 'wrongEmail@test.com', password: userDoc.password});
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('user not found');
        })
    })
})