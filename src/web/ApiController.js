var router = require('express').Router();
var fs = require('fs');
var app = require('../app');
var path = require('path');

router.route('/')
    .get(function (req,res) {
        console.log("testam");
        res.send("return from /api/ [get]");
    });

router.use('/v1', require('./api/v1/V1Controller'));

module.exports = router;
