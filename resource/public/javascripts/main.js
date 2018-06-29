var successResult=[];

if(localStorage.getItem("token")==null)
{
    alert("로그인을 해주세요");
    location.href = "/";
}
else {
    $.ajax({
        url: "/api/v1/users/token/" + localStorage.getItem("token"),
        type: "get",
        success: function (result) {
            successResult = result;
            $(function () {
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
                $("#todoButton").on("click", () => {
                    location.href = "/todo";
                });
            });
        },
        error: function (err) {
            alert("Access Error");

        }
    });
}