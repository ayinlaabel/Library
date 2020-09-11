var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport')

//INPORT MODEL
const User = require('../models/users');
const Book = require('../models/books');
const Chapter = require('../models/chapters');

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


//AddBook Controller
exports.addBook = (req, res, next) => res.send('route is Okay')
exports.postAddBook = async(req, res, next) => {
  Book.find({_id:req.body.id}).then(
    (results) => {
      if (results.length === 0) return res.send('nothing to show')
        
      

      let book = result[0];

      const newChapter = new Chapter({
        ids: req.body.chapterId,
        title: req.body.chapterTile,
        body: req.body.body
    
      }); 
      book.chapter.push(newChapter);

      console.log(book);
    
  }
  )
//  const chapter = new Chapter({
//     ids: req.body.chapterId,
//     title: req.body.chapterTile,
//     body: req.body.body

//   }); 
  
  // if(req.body.chapterId > 1 ) {
  //   chapter.push()
  // }
  

  // const book = new Book({
  //   title: req.body.title,
  //   author: req.body.author,
  //   summary: req.body.summary,
  //   image: 'waiting .......',
  //   chapter: chapter
  // });

  // console.log(chapter)
  // book.save().then(
  //   () =>{
  //     res.redirect('/')   
  //   }
  // ).catch(
  //   (err) => {
  //     res.send(err)
  //   }
  // )
}