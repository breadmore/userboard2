var router = require('express').Router();
var chatService=require('../../../service/ChatService');
var jwt = require('jsonwebtoken');
var jwt_secret = 'secret';

router.route('/list')
    .get(function (req,res) {
        chatService.getAllUser(function (err,result) {
            if(err){
                res.status(400).send(err);
            }
            else{
                res.status(200).send(result);
            }
        })
    })

router.route('/join')
    .post(function (req,res) {
        chatService.joinUser(req.body,function (err,result) {
            if(err){

                res.status(400).send(err);
            }
            else{
                res.status(200).send(result);
            }
        })
    });

router.route('/exit/:id')
    .delete(function (req,res) {
        chatService.exitUserById(req.params.id,function (err,result) {
            if(err){
                res.status(400).send(err);
            }
            else{
                res.status(200).send(result);

            }
        })
    });
module.exports=router;