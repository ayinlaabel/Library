var express = require('express');
var router = express.Router();

const config = require('config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const passport = require('passport')

//INPORT MODEL
const User = require('../models/users');
const Book = require('../models/books');
const Chapter = require('../models/chapters');
const Todo = require('../models/todo')
// const books = require('../models/books');


exports.getUserDetails = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1]

  if(token === 'null') {
    return res.status(401).send( 'Unauthorized request')
  }

  // console.log(token)

  let payload = jwt.verify(token, 'my_Secret')
  if(!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.id = payload.id
  let userId = req.id

  User.findById({_id: userId}).then(
      result => {
          if(!result)
            console.log('No User Found');
        
        res.status(200).json(result)}
  )
}