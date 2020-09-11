var express = require('express');
var router = express.Router();

//IMPORT MDOELS
const Book = require('../models/books');

/* GET home page. */
router.get('/', (req, res, next) => {
  Book.find({}).then(
    (books) => {
      console.log(books)
      res.render('index', { 
                            title: 'Express',
                            books:books });
    }
  ).catch(
    (err) => {
      console.log(err)
    }
  )
});

module.exports = router;
