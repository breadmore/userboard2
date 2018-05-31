var chatDao=require('../dao/ChatDao');

function joinUser(user,callback){
    chatDao.joinUser(user,callback);
}

function exitUserById(id,callback){
    chatDao.exitUserById(id,callback);
}

function getAllUser(callback){
    chatDao.getAllUser(callback);
}

module.exports={
    joinUser:joinUser,
    exitUserById:exitUserById,
    getAllUser:getAllUser
}