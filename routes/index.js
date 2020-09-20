var express = require('express');
var router = express.Router();

//IMPORT MDOELS
const Book = require('../models/books');


//IMPORT CONTROLLER
const ctrl = require('../controller/index');

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

router.get('/nav', ctrl.getUserDetails)

module.exports = router;
