var router = require('express').Router();
var todoService=require('../../../service/TodoService');

router.route('/list/:id')
    .get(function (req,res) {
        todoService.getListById(req.params.id,function (err,result) {
            if(err){
                res.status(400).send(err);
            }
            else{
                res.status(200).send(result);
            }
        })
    })

router.route('/add')
    .post(function (req,res) {
        todoService.addTodo(req.body, todo,function (err,result) {
            if(err){
                res.status(400).send(err);
            }
            else{
                res.status(200).send(result);
            }
        })
    })

router.route('/delete')
    .delete(function (req,res) {
        todoService.deleteTodoById(id,function (err,result) {
            if(err){
                res.status(400).send(err);
            }
            else{
                res.status(200).send(result);
            }
        })
    })

router.route('/complete')
    .get(function (req,res) {
        todoService.completeTodo(function (err,result) {
            if(err){
                res.status(400).send(err);
            }
            else{
                res.status(200).send(result);
            }
        })
    })

module.exports=router;