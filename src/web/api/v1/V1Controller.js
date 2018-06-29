var router = require('express').Router();

router.use('/users', require('./UserController'));
router.use('/chat',require('./ChatController'));
router.use('/todo',require('./TodoController'));

module.exports=router;