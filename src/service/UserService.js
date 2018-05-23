var userDao = require('../dao/UserDao');

function selectAllUser(callback) {
    userDao.selectAllUser(callback);
}

function selectAuthById(id,callback) {
    userDao.selectAuthById(id,callback);
}

function insertUser(user,token,callback) {
    userDao.insertUser(user,token,callback);
}

function insetTokenToUser(token,id,callback){
    userDao.insetTokenToUser(token,id,callback);
}
function getTokenById(id,callback){
    userDao.getTokenById(id,callback);
}

function createLoginToken(token, id, callback){
    userDao.createLoginToken(token,id,callback);
}

function getRank(callback){
    userDao.getRank(callback);
}
module.exports = {
    selectAllUser:selectAllUser,
    selectAuthById:selectAuthById,
    insertUser:insertUser,
    insetTokenToUser:insetTokenToUser,
    getTokenById:getTokenById,
    createLoginToken:createLoginToken,
    getRank:getRank
}