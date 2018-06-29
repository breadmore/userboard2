var db = require('../db/database');

/**
 create table todo(
 id varchar(20) NOT NULL,
 nickname varchar(15) NOT NULL,
 todo text,
 completed INT(1) NOT NULL DEFAULT 0
 );
 **/


var Todo = {
    getListById: function (id, callback) {
        return db.query('select todo,completed from todo where id=? ', id, callback);
    },
    addTodo: function (user, todo, callback) {
        return db.query('insert into todo (id,nickname,todo) VALUES (?,?,?)'
            , [user.userid, user.name, todo]
            , callback);
    },
    deleteTodoById: function (id, callback) {
        return db.query('delete from todo where id=?', id, callback);
    },
    completeTodo: function (callback) {
        return db.query('delete from todo where completed=1',callback);
    }
}

module.exports = Todo;