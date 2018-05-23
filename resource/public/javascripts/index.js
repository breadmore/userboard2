localStorage.setItem("token",null);

$(function () {

    $("#loginButton").on("click", () => {
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

                        alert("ERROR");
                    }
                }
            )
        }
    })

    $("#createButton").on("click", () => {
        location.href = "/create";
    });
})
;