const express = require('express');
const Product  = require('../models/productModel');
const router = express.Router();

router.route('/') 

//Getting all products
.get((req,res,next)=>{
    Product.find({})
    .then((product)=>{
        status=200;
        res.json(product);
    })
})

 //Insert new product to the database
.post((req,res,next)=>{
    Product.create(req.body)
    .then((product)=>{
        res.status=200;
        res.json(product);
    })
    .catch((err) => next(err));
})

.put((_req,res,_next)=>{
    res.statusCode=201;
    res.json("You cannot update items");

})
 //Deleting all products from database
.delete((_req,res,_next)=>{
    Product.deleteMany({})
    .then((product)=>{
        res.json(product);
    })
});

 //Getting particular product through id from database
 router.route('/:id')
  .get((req,res,next)=>{
    Product.findById(req.params.id)
     .then((product)=>{
        res.json(product);
     })
     .catch((err) => next(err));
 })
 .post((_req,res,_next)=>{
     res.statusCode=201;
     res.json("You cannot add product items");
 })

 //Updating the particular product by id

 .put((req,res,next)=>{
    Product.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true})
     .then((product)=>{
         res.json(product);

     })
     .catch((err)=> next(err));
 })

 // Deleting particular through id

 .delete((req,res,next)=>{
    Product.findByIdAndDelete(req.params.id)
     .then((product)=>{
         res.json(product);
     })
     .catch((err)=> next(err));
 })

module.exports= router;


