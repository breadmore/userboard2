var router = require('express').Router();
// var fs = require('fs');
// var path = require('path');

router.get('/', function (req, res) {
    res.render('index');
});
router.get('/main', function (req, res) {
    res.render('main');
});

router.get('/ranking', function (req, res) {
    res.render('ranking');
});

router.get('/create', function (req,res) {
    res.render('create');
})

module.exports = router;