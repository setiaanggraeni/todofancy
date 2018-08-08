var express = require('express');
var router = express.Router();
const {register, login} = require('../controller/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome, Setia!')
});

router.post('/register', register)
      .post('/login', login)

module.exports = router;
