var router = require('express').Router();

router.use('/users', require('./UserController'));

module.exports=router;