var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport')

//INPORT MODEL
const User = require('../models/users');
const { route } = require('../routes');

//CONTROLLER FOR GET

exports.getSignup = (req, res, next) => {
  res.send('route is okay')
  }

  //Login Controller
  exports.getLogin = (req, res, next)=> res.send('route is okay');

//CONTROLLER FOR POST

exports.postSignup = (req, res, next) => {
    let password = req.body.password
    bcrypt.hash(password, 10).then(
      (hash) => {
        const user = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          username: req.body.username,
          password: hash
        });
        console.log(user);
        user.save().then(
          () => {
            console.log('User registration Successful...');
            res.redirect('/')
          }
        ).catch(
          (err) => {
            console.log(err)
          }
        )
      })
  }

  //Login Controller
exports.postLogin = (req, res, next) =>{
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
  }

//LogOut Controller
exports.logout = (req, res, next) => {
    req.logout();
    req.flash('success', 'Logout Successful');
    res.redirect('/users/login');
  }