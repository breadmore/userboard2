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
    $('#playerName').append(successResult[0].nickname);
    $('#playerScore').append(successResult[0].score);
    $("#rankButton").on("click", () => {
        location.href = "/ranking";
    });
    $("#playButton").on("click", () => {
        location.href = "/play";
    });

    $("#logoutButton").on("click", () => {
        localStorage.removeItem("token");
        location.href = "/";
    });
});