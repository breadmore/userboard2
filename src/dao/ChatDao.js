var db = require('../db/database');

/**
 * create table chatroom(
 id varchar(20) NOT NULL PRIMARY KEY,
 nickname varchar(15) NOT NULL
 );
 */

var Chat = {

    getAllUser: function (callback) {
        return db.query('select nickname from chatroom',callback);
    },

    joinUser: function (user, callback) {
        return db.query('insert into chatroom (id,nickname) values (?,?)'
            , [user.userid, user.name]
            , callback);
    },
    exitUserById: function (id, callback) {
        return db.query('delete from chatroom WHERE id=?', id, callback);
    },

}

module.exports = Chat;