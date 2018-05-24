var successResult;

$.ajax({
    url: "/api/v1/users/token/" + localStorage.getItem("token"),
    type: "get",
    success: function (result) {
        successResult=result;
    },
    error: function (err) {
        alert("Access Error");
        location.href = "/";
    }
});

$(function () {

    var socket=io();

    socket.emit('login',{
        name:successResult[0].nickname,
        userid:successResult[0].id
    });

    socket.on("login", function(data) {
        $("#chatLogs").append("<div><strong>" + data + "</strong> has joined</div>");
    });

    socket.on("chat", function(data) {
        $("#chatLogs").append("<div>" + data.msg + " : from <strong>" + data.from.name + "</strong></div>");
    });

    $("form").submit(function(e) {
        e.preventDefault();
        var $msgForm = $("#msgForm");

        // 서버로 메시지를 전송한다.
        socket.emit("chat", { msg: $msgForm.val() });
        $msgForm.val("");
    });
})