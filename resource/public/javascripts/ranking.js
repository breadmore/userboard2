
var successResult;

$.ajax({
    url: "/api/v1/users/token/" + localStorage.getItem("token"),
    type: "get",
    success: function (result) {
        $(function () {

        })
    },
    error: function (err) {
        alert("ERROR");
        location.href = "/";
    }
});

$(function () {

    var table=$('#rankingTable').DataTable({
        paging:false,
        processing:true,
        ordering:false,
        serverSide:false,
        searching:true,
        ajax:{
            url:"/api/v1/users/rank",
            dataSrc: function (result) {
            return result;
            }
        },
        columns:[
            {data:"nickname"},
            {data:"score"},
            {data:"rank"}
        ]
    });

    $("#returnButton").on("click", () => {
        location.href = "/main";
    });
    $("#logoutButton").on("click", () => {
        localStorage.setItem("token",null);
        location.href = "/";
    });

});