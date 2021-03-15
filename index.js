const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const userRouter=require('./routes/userRoute');
const productRouter=require('./routes/productRoute');
const orderRouter=require('./routes/orderRoute');
const cartRouter=require('./routes/cartRouter');
const upload = require('./routes/upload');

const app = express();

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    
}).then(() => {
    console.log('Connected to database server');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Welcome, to my app');
});


app.use('*/public', express.static('public'));
app.options('*', cors());
app.use(cors());
app.use(morgan('tiny'));
app.use('/users', userRouter);
app.use('/product', productRouter);
app.use('/cart',cartRouter);
app.use('/order', orderRouter);
app.use('/uploads', upload);
app.listen(process.env.Port, () => {
    console.log(`Server is running at localhost:${process.env.Port}`);
});