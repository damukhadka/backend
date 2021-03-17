const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
//require('dotenv').config();
const product_items  = require('../routes/productRoutes');

const app = express();
app.use(express.json());
app.use('/product', product_items);

describe('product  router test', () => {
    beforeAll((done) => {
        mongoose.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }).then ((db) => {
            console.log('Connection ...');
            done();
        }).catch((err) => {
            console.error(err);
            process.exit(1);
        })
    })
    afterAll((done) => {
        mongoose.disconnect().then (() => {
            console.log('Disconnecting...');
            done();
        });

    })

    let productID;

    test('should create the new product', () => {

        return request(app)
        .post('/product')
        .send({
            items_name: 'jesttest',
            image: 'lastjest',
            price: 856,
            category: 'jestsucess'
        }).then ((res) => {
            console.log(res.body)
            productId = res.body._id;
            expect(res.statusCode).toBe(200);
            expect(res.body.items_name).toBe('jesttest');
            
        })
        
    })

    test('should get all product', () => {
        return request(app)
        .get('/product')
        .then((res) => {
            console.log(res.body)
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0].items_name).toBe('jesttest');
        })
        
    })

    test('should get product with id', () => {

        return request(app).get(`/product`)
        .then((res) => {
            console.log(res.body);
            expect(res.statusCode).toBe(200);
        })
        
    })

    test('should update product', () => {
        return request(app).put(`/`)
        .send({
            items_name: 'updatetesting'
        })
        .then((res) => {
            console.log(res.body)
            expect(res.body.items_name).toBe('updatetesting');
        })
        
    })
    
    test('should delete the product data', () => {
        return request(app).delete('/product')
        .then((res) => {
            console.log(res.body);
            expect(res.statusCode).toBe(200);
        })
        
    })
    
    test('should delete product data with id', () => {
        return request(app).delete(`/product`)
        .then((res) => {
            console.log(res.body);
            expect(res.statusCode).toBe(200);
        })
        
    })

    })




