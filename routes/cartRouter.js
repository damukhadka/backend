const express = require("express");
const Cart = require("../models/cart");
const auth = require('../auth');

const router = express.Router();

//ROUTES FOR OPERATING Cart
router.route("/")
    .get(auth.verifyUser, (req, res, next) => {
        Cart.find({ user: req.user._id })
            .populate({
                path: 'product'
            })
            .populate({
                path: 'product.name'
            })
            .then((cart) => {
                if (cart == null) throw new Error("Nothing at Cart yet.");
                res.json(cart);
            }).catch(next)
    })
    /* Adding to cart */
    .post(auth.verifyUser,(req, res, next) => {
        let cart = new Cart(req.body);
        cart.user = req.user._id;
        cart.save()
            .then((cart) => {
                res.json(cart);
            }).catch(next)
    })

    .put((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed" });
    })
    /* delete  cart */
    .delete(auth.verifyUser, (req, res, next) => {
        Cart.deleteMany({ user: req.user._id })
            .then(response => {
                res.json(response);
            })
            .catch(next);
    })

//ROUTES FOR OPERATING SPECIFIC Cart
router.route('/:wid')
    .get(auth.verifyUser, (req, res, next) => {
        Cart.findOne({ user: req.user._id, _id: req.params.wid })
        .populate({ 
            path: 'product'
        })
        .populate({
            path: 'product.name'
        })
            .then((cart) => {
                res.json(cart);
            })

    })

    /*  delete cart */
    .delete(auth.verifyUser, (req, res, next) => {
        Cart.findOneAndDelete({ user: req.user._id, _id: req.params.wid })
            .then(response => {
                res.json(response);
            })
            .catch(next);
    })

module.exports = router;