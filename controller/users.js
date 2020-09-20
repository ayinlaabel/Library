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

//CONTROLLER FOR GET

exports.getSignup = (req, res, next) => {
  res.send('route is okay')
}

//Login Controller
exports.getLogin = (req, res, next) => res.send('route is okay');

//CONTROLLER FOR POST

exports.postSignup = (req, res, next) => {
  let password = req.body.password
  bcrypt.hash(password, 10).then(
    (hash) => {
      const user = new User({
        // firstname: req.body.firstname,
        // lastname: req.body.lastname,
        email: req.body.email,
        name: req.body.name,
        username: req.body.email,
        password: hash
      });
      console.log(user);
      user.save().then(
        (user) => {
          res.status(200).json(user)
        }
      ).catch(
        (err) => {
          console.log(err)
        }
      )
    })
}

//Login Controller
exports.postLogin = (req, res, next) => {
  const credential = req.body;
  const username = credential.username;
  const password = credential.password;

  User.findOne({ email: username }).then(
    (user) => {
      console.log(user)
      if (!user) 
        return res.status(401).json({ msg: 'No User Found' });
      
      //Validate Password
      bcrypt.compare(password, user.password)
            .then(
              isMatch => {
                if(!isMatch)
                      return res.status(401).json({ msg: 'Invalid Password' });
                
                jwt.sign(
                  {id: user.id},
                  config.get('jwtSecret'),
                  {expiresIn: 3600},
                  (err, token) => {
                    if (err) throw err;
                    res.status(200).json({user, token})
                  }
                )
              }
            )
      
    }
  )
}

//LogOut Controller
exports.logout = (req, res, next) => {
  req.logout();
  req.flash('success', 'Logout Successful');
  res.redirect('/users/login');
}


//AddBook Controller
exports.addBook = (req, res, next) => res.send('route is Okay')
exports.postAddBook = async (req, res, next) => {
  
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    image: 'waiting .......'
    // chapter: chapter
  });

  // console.log(chapter)
  book.save().then(
    () => {
      res.redirect('/')
    }
  ).catch(
    (err) => {
      res.send(err)
    }
  )
}


exports.postChapters = async (req, res, next) => {
  Book.find({ _id: req.params.id }).then(
    (results) => {
      if (results.length === 0) return res.send('nothing to show')


      let book = results[0];

      const newChapter = new Chapter({
        ids: req.body.chapterId,
        title: req.body.chapterTitle,
        body: req.body.body

      });
      book.chapter.push(newChapter);
      book.save()
      console.log(book);

    }
  )
}

exports.getBooks = (req, res, next) => {
  Book.find({}).then(
    (books) => {
      res.json(books)
    }
  ).catch(
    (err) => {
      console.log(err)
    }
  )
}

exports.postAddTodo = (req, res, next) => {
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

  const todo = req.body;

  const newTodo = new Todo({
    // id: todo.id,
    userId: userId,
    title: todo.title,
    isComplete: false,
    date: todo.date,
    time: todo.time
  })

  console.log(newTodo)

  if(newTodo.userId === '' ||
  newTodo.title === '') {
        res.status(401).json({msg: 'Some Field is Empty'})
      }else {
        newTodo.save()
          .then(
            result => res.status(200).json(result)
          )
      }
}

exports.getTodos = (req, res, next) => {
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
  Todo.find({userId: userId})
      .then(
        result => res.status(200).json(result)
      )
}


exports.verifyToken = (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(401).send( 'Unauthorized request')
  }
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
  console.log(req.id)
  next();
}
