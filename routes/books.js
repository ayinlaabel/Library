var express = require('express');
var router = express.Router();

//IMPORT CONTROLLER
const ctrl = require('../controller/users')

router.get('/', ctrl.getBooks);


module.exports = router;