var router = require('express').Router();

router.use('/users', require('./UserController'));
router.use('/chat',require('./ChatController'));

module.exports=router;