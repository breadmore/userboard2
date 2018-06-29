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
});

router.get('/play', function (req,res) {
    res.render('play');
});

router.get('/chating',function (req,res) {
    res.render('chating');
});

router.get('/todo',function (req,res) {
    res.render('todo');
});

module.exports = router;