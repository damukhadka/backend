const request = require('supertest');
const express = require('express');
require('dotenv').config();
const userRouter = require('../routes/userRoute');

const app = express();
app.use(express.json());
app.use('/users', userRouter);
// Setup
require('d:/Third Year/SIXTH SEMESTER/AGILE DEVELOPMENT/backend/testing/setup');
describe('Test of User Route', () => {
    test('should be able to register a user', () => {
        return request(app).post('/users/register')
            .send({
                username: 'test123',
                password: 'test123',
                fullname: 'Test',
            })
            .then((res) => {
                expect(res.statusCode).toBe(201);
            })
    })
 
    test('should be able to login', () => {
        return request(app).post('/users/login')
            .send({
                username: 'test123',
                password: 'test123'
            }).then((res) => {
                console.log(res.body);
                expect(res.statusCode).toBe(200);
                expect(res.body.token).not.toBe('undefined');
            })
    })
})