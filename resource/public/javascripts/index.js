//localStorage.removeItem("token");
// if (document.location.protocol == 'http:') {
//     document.location.href = document.location.href.replace('http:', 'https:');
// }
$.ajax({
    url: "/api/v1/users/token/" + localStorage.getItem("token"),
    type: "get",
    success: function (result) {
        successResult = result;
        location.href = "/main";
    },
    error: function (err) {
        location.href = "/"
    }
});

$(function () {

    $(document).keydown(function (event) {
        if(event.keyCode=='13'){
            $("#loginButton").click();
        }
    });

    $("#loginButton").on("click", () => {
        login();
    })

    $("#createButton").on("click", () => {
        location.href = "/create";
    });
});

function login() {
    var userID = $('#id').val();
    var userPASS = $('#password').val();

    var loginData = {
        id: userID,
        pass: userPASS
    }


    if (userID.length === 0 || userPASS.length === 0) {
        alert("입력해주세요");
    }
    else {
        $.ajax({
                url: "/api/v1/users/user",
                type: "post",
                data: loginData,
                success: function (token) {
                    localStorage.setItem("token",token);
                    location.href = "/main";
                },
                error: function (err) {
                    location.href = "/";
                }
            }
        )
    }
}