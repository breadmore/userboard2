var db = require('../db/database');
/**
 * User Table
 * create table user(
 'id' varchar(20) NOT NULL PRIMARY KEY,
 'pass' varchar(15) NOT NULL,
 'nickname' varchar(15) NOT NULL UNIQUE,
 'score' int,
 'rank' int
 );
 **/


var Users = {

    insertUser: function (user,callback) {
        return db.query('insert into user (id,pass,nickname) values(?,?,?)'
            , [user.id, user.pass, user.nickname]
            , callback);
    },

    selectAllUser: function (callback) {
        return db.query('select * from user', callback);
    },

    selectAuthById: function (id, callback) {
        return db.query('select * from user where id = ?', id, callback);
    },

    createLoginToken: function(token,id,callback){
        return db.query('UPDATE user SET token= ? WHERE id=?',[token,id],callback);
    },

    insetTokenToUser: function (token,id,callback) {
        return db.query('UPDATE user SET token= ? WHERE id=?',token,id,callback);
    },

    getTokenById:function (id,callback) {
      return db.query('select token from user where id = ?',id,callback);
    },
    getRank:function (callback) {
        return db.query('SELECT nickname ,score, FIND_IN_SET( score, (SELECT GROUP_CONCAT( score ORDER BY score DESC )FROM user )) AS rank FROM user',callback);
    }

};

module.exports = Users;