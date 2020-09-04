var express = require('express');
var router = express.Router();


const bcrypt = require('bcrypt');
const mongoose = require('mongoose')

//INPORT MODEL
const User = require('../models/users');

//IMPORT CONTROLLER
const ctrl = require('../controller/users')

/* GET users listing. */
router.get('/signup', ctrl.getSignup);
router.get('/login', ctrl.getLogin);
router.post('/signup', ctrl.postSignup);
router.post('/login', ctrl.postLogin);

module.exports = router;
