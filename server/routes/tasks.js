var express = require('express');
var router = express.Router();
const {create, edit, deleteTask, tasks, getOneTask} = require('../controller/taskController')
const {auth} = require('../middleware/auth')

/* GET users listing. */
router.get('/', auth, tasks)
      .post('/create', auth, create)
      .put('/edit/:id', auth, edit)
      .delete('/delete/:id', auth, deleteTask)
      .get('/:id', auth, getOneTask)

module.exports = router;
