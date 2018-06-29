var TodoDao=require('../dao/TodoDao');

function getListById(id,callback) {
    TodoDao.getListById(id,callback);
}

function addTodo(user, todo, callback) {
    TodoDao.addTodo(user,todo,callback);
}

function deleteTodoById(id,callback) {
    TodoDao.deleteTodoById(id,callback);
}

function completeTodo(callback) {
    TodoDao.completeTodo(callback);
}

module.exports={
    getListById:getListById,
    addTodo:addTodo,
    deleteTodoById:deleteTodoById,
    completeTodo:completeTodo
}