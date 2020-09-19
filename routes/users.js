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
router.get('/addBook', ctrl.addBook);
router.get('/todos', ctrl.verifyToken, ctrl.getTodos);

router.post('/signup', ctrl.postSignup);
router.post('/login', ctrl.postLogin);
router.post('/addBook', ctrl.postAddBook);
router.post('/addChapter/:id', ctrl.postChapters);
router.post('/addTodo', ctrl.postAddTodo);


module.exports = router;
