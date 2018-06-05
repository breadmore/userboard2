var successResult;

if(localStorage.getItem("token")==null) {
    alert("로그인을 해주세요");
    location.href = "/";
}
$.ajax({
    url: "/api/v1/users/token/" + localStorage.getItem("token"),
    type: "get",
    success: function (result) {

        successResult = result;
        if (document.readyState == "complete") {
            console.log('refresh');
        }
        $(function () {
            var socket = io();
            var $msgForm = $("#msgForm");
            var text = '';

            console.log('ready');

            socket.emit('login', {
                name: successResult[0].nickname,
                userid: successResult[0].id
            });

            socket.on("login", function (data) {
                $.ajax({
                    url: '/api/v1/chat/join',
                    type: 'post',
                    data: data,
                    success: function () {
                        showList(text);
                        $("#myText").append("[" + data.name + "] has joined\n");
                    },
                    error: function () {
                        showList(text);
                        $("#myText").append("[" + data.name + "] has joined\n");
                    }
                });
            });

            socket.on("chat", function (data) {
                $("#myText").append(data.name + " :  " + data.msg + "\n");
            });
            $("form").submit(function (e) {
                e.preventDefault();
                // 서버로 메시지를 전송한다.
                socket.emit("chat", {msg: $msgForm.val()});
                $msgForm.val("");

            });

            if ($msgForm.val() !== "") {
                $(document).keydown(function (event) {
                    if (event.keyCode == '13') {
                        $("form").submit();
                    }
                });
            }
            $("#logoutButton").on("click", () => {
                localStorage.removeItem("token");
                location.href = "/";

            });
            $("#mainButton").on("click", () => {
                location.href = "/main";
            });


        });

    },
    error: function (err) {
        alert("Access Error");
    }
});


function showList(text) {
    $.ajax({
        url: '/api/v1/chat/list',
        type: 'get',
        success: function (result) {
            $.each(result, function (index, item) {
                text += item.nickname + '\n';
            })
            $("#myText2").val(text);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function disconnect(socket, text) {
    socket.on('goodbye', function (data) {
        alert('good');
        console.log("hey");
        $.ajax({
            url: '/api/v1/chat/exit/' + data,
            type: 'delete'
        });
        text = '';
        showList(text);
    });

}