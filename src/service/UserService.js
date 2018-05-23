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


function getTokenById(id,callback){
    userDao.getTokenById(id,callback);
}

function createLoginToken(token, id, callback){
    userDao.createLoginToken(token,id,callback);
}

function getRank(callback){
    userDao.getRank(callback);
}

function updateScore(score,id,callback){
    userDao.updateScore(score,id,callback);
}


module.exports = {
    selectAllUser:selectAllUser,
    selectAuthById:selectAuthById,
    insertUser:insertUser,
    getTokenById:getTokenById,
    createLoginToken:createLoginToken,
    getRank:getRank,
    updateScore:updateScore
}