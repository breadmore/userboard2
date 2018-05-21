var router = require('express').Router();
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var userService = require('../../../service/UserService');
var jwt_secret = 'secret';
router.route('/')
    .get(function (req, res) {

        userService.selectAllUser(function (err, result) {
            if (err) {
                res.status(401).send(err);
            }
            else {
                res.status(200).send(result);
            }
        })
    })
    .post(function (req, res) {
        var header = {"algorithm": "HS256"}
        var payload = JSON.stringify(req.body);
        var token = jwt.sign(payload, jwt_secret, header, {"expiresIn": "1h"});
        userService.selectAuthById(req.body.id, function (err, result) {
            if (err) {
                res.status(400).send(err);
            }
            else {
                if (req.body.pass === result[0].pass) {
                  userService.createLoginToken(token,req.body.id,function (err,result) {
                      if(err){
                          res.status(403).send(err);
                      }
                      else{
                          result=token;
                          res.status(200).send(result);
                      }
                  });
                }
                else {
                    res.status(401).send(err);
                }
            }
        })
    });


router.route('/:id')
    .get(function (req, res) {
        userService.selectAuthById(req.params.id, function (err, result) {
            if (err) {
                res.status(400).send(err);
            }
            else {
                res.status(200).send(result);
            }

        })
    })


router.route('/create')
    .post(function (req, res) {
        userService.insertUser(req.body,function (err, result) {
            if (err) {
                res.status(401).send(err);
            }
            else {
                res.status(200).send(result);
            }
        })
    });
module.exports = router;