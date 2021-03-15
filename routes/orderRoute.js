const express=require('express');

const Order=require('../models/orderModel');
const auth=require('../auth');
const router = express.Router();

/* getting all order */
router
  .route("/")
   .get(auth.verifyUser, (req, res, next) => {
        Order.find({ user: req.user._id })
            .populate({
                path: "Product"
            })
            .then(order => {
                if (order == null) 
                throw new Error("Not ordered yet.");
                res.json(order);
            }).catch(next)
  })  
  
  /* make order */
  .post(auth.verifyUser, (req, res, next) => {
     let order = new Order(req.body);
     order.user = req.user._id;
     order
       .save()
       .then((order) => {
         res.statusCode = 201;
         res.json(order);
       })
       .catch(next);
  })
  
  .put((req, res, next) => {
    res.send("Cannot update");
  })

  .delete(auth.verifyUser, (req, res, next) => {
    Order.deleteMany({}).then((order) => {
      res.send("Deleted Succesfully");
    });
  });



module.exports = router;