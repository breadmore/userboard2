var router = require('express').Router();
var jwt = require('jsonwebtoken');
var userService = require('../../../service/UserService');
var jwt_secret = 'secret';
router.route('/user')
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
        var header = {"algorithm": "HS256"};
        var payload = req.body.id;
        var token = jwt.sign(payload, jwt_secret, header, {"expiresIn": "1h"});
        userService.selectAuthById(req.body.id, function (err, result) {
            if (err) {
                res.status(400).send(err);
            }
            else {
                if (req.body.pass === result[0].pass) {
                    userService.createLoginToken(token, req.body.id, function (err, result) {
                        if (err) {
                            res.status(403).send(err);
                        }
                        else {
                            result = token;
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


router.route('/user/:id')
    .get(function (req, res) {
        userService.selectAuthById(req.params.id, function (err, result) {
            if (err) {
                res.status(400).send(err);
            }
            else {
                res.status(200).send(result);
            }

        })
    });


router.route('/create')
    .post(function (req, res) {
        userService.insertUser(req.body, function (err, result) {
            if (err) {
                res.status(401).send(err);
            }
            else {
                res.status(200).send(result);
            }
        })
    });

router.route('/token/:token')
    .get(function (req, res) {
        jwt.verify(req.params.token, jwt_secret, function (err, decoded) {
            if (err) {
                console.log("verify error");
                res.status(400).send(err);
            }
            else {
                userService.getTokenById(decoded, function (err, result) {
                    if (err) {
                        console.log("get error");
                        res.status(401).send(err);
                    }
                    else {
                        userService.selectAuthById(decoded, function (err, result) {
                            res.status(200).send(result);
                        });
                    }
                })
            }
        });
    });
router.route('/rank')
    .get(function (req, res) {
        userService.getRank(function (err, result) {
            if (err) {
                res.status(400).send(err);
            }
            else {
                console.log(result);
                res.status(200).send(result);
            }
        })
    });
router.route('/play')
    .put(function (req, res) {
        userService.updateScore(req.body.score, req.body.id, function (err, result) {
            if (err) {
                res.status(400).send(err);
            }
            else {
                res.status(200).send(result);
            }
        })
    });


module.exports = router;