var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var con = require('../src/db/database');


var app = express();
var server = require('http').createServer(app);
var https=require('https');
var io = require('socket.io')(server);
const port=process.env.PORT || 3000;

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


io.on('connection', function (socket) {

    /**
     * $.ajax({
                    url: '/api/v1/chat/join',
                    type: 'post',
                    data: data,
                    success: function () {
                        showList(text);
                        $("#myText").append("[" + data.name + "] has joined\n");
                    },
                    error: function () {
                        showList(text);
                        $("#myText").append("[" + data.name + "] has joined\n");
                    }
                });
     */
    socket.on('login',function (data) {
        socket.name = data.name;
        socket.userid=data.userid;

        io.emit('login', data);
    });


    socket.on('chat', function (data) {
        var msg={
            name:socket.name,
            msg:data.msg
        };

        io.emit('chat', msg);
    });

    socket.on('forceDisconnect', function() {
        socket.disconnect();
    })

    socket.on('disconnect', function() {
        con.query('delete from chatroom where id=?',socket.userid,function (err,rows) {
            if(err) throw err;
            console.log(rows);
        });
    });
});

server.listen(port,function () {
});

module.exports = app;
