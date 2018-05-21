var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();


var resourcePath = path.join(__dirname, '../resource');

// view engine setup
app.set('views', path.join(resourcePath, '/views'));
app.set('view engine', 'jade');
app.use(express.static(resourcePath + '/public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./web/ViewController'));
app.use("/api", require('./web/ApiController'));
app.use("/v1",require('./web/api/v1/V1Controller'));

module.exports = app;
