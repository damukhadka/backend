const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User=require("../models/userModel");
const Auth = require("../auth");

const router = express.Router();

router.post("/register", (req, res, next) => {
  let {
    fullname,    
    email,
    username,
    password,
    role,
  } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (user) {
        let err = new Error("Username already exists!");
        err.status = 400;
        return next(err);
      }
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.create({
            username,
            password: hash,
            fullname,            
            email,
            role,
          })
            .then((user) => {
              res.status(201).json({ status: "Signup Success" });
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
});

router.post("/login", (req, res, next) => {
  let { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        let err = new Error("User does not exists!");
        err.status = 400;
        return next(err);
      }
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            let err = new Error("Password does not match!");
            err.status = 400;
            return next(err);
          }
          let payload = {
            username: user.username,
            fullname: user.fullname,           
            email: user.email,
            passsword:user.passsword,
            role: user.role,
          };
          let token = jwt.sign(
            { _id: user._id, admin: user.admin },
            process.env.SECRET
          );
          res.json({ status: "Login success!", token: token, role: user.role });
        })
        .catch(next);
    })
    .catch(next);
});

router.get("/myProfile", Auth.verifyUser, (req, res, next) => {
  res.json({
    _id: req.user._id,
    fullname: req.user.fullname,  
    email: req.user.email,
    username: req.user.username,
    role: req.user.role,
  });
});

router.put("/myprofile", Auth.verifyUser, (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
    .then((user) => {
      res.statusCode = 201;
      res.json(user);
    })
    .catch(next());
});

/* Retrving all user for Admin only*/

router.get("/", (req, res, next) => {
  User.find({})
    .then((user) => {
      status = 200;
      res.json(user);
    })
    .catch((err) => next(err));
});
module.exports = router;
