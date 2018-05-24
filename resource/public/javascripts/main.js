var successResult=[];

$.ajax({
    url: "/api/v1/users/token/" + localStorage.getItem("token"),
    type: "get",
    success: function (result) {
        successResult=result;
        alert("nope");
        $(function () {
            alert("ready");
            $('#playerName').append(successResult[0].nickname);
            $('#playerScore').append(successResult[0].score);

            $("#rankButton").on("click", () => {
                location.href = "/ranking";
            });
            $("#playButton").on("click", () => {
                location.href = "/play";
            });
            $("#chatButton").on("click", () => {
                location.href = "/chating";
            });


            $("#logoutButton").on("click", () => {
                localStorage.removeItem("token");
                location.href = "/";
            });
        });
    },
    error: function (err) {
        alert("Access Error");
        location.href = "/";
    }
});

