var express = require('express');
var router = express.Router();
const {register, login, loginFb, sendMail} = require('../controller/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome, Setia!')
});

router.post('/register', register)
      .post('/login', login)
      .post('/loginFb', loginFb)
      .post('/sendmail', sendMail)

module.exports = router;
