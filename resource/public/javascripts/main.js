
console.log(localStorage.getItem("token"));

var successResult;


    $.ajax({
        url: "/api/v1/users/token/" + localStorage.getItem("token"),
        type: "get",
        success: function (result) {
            successResult=result;
            $(function () {


            });
        },
        error: function (err) {
            alert("ERROR");
            location.href = "/";
        }
    });



$(function () {
    $('#playerName').append(successResult[0].nickname);
    $('#playerScore').append(successResult[0].score);
    $("#rankButton").on("click", () => {
        location.href = "/ranking";
    });

    $("#playButton").on("click", () => {
        location.href = "/play";
        
    });

    $("#logoutButton").on("click", () => {
        localStorage.setItem("token",null);
        location.href = "/";
    });
});