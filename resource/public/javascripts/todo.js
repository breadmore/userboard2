var successResult;

if (localStorage.getItem("token") == null) {
    alert("로그인을 해주세요");
    location.href = "/";
}
else {
    $.ajax({
        url: "/api/v1/users/token/" + localStorage.getItem("token"),
        type: "get",
        success: function (result) {
            successResult = result;
            start();
        },
        error: function (err) {
            alert("Access Error");

        }
    });
}


function start() {
    $(function () {
        $.ajax({
            url: '/api/v1/todo/list/'+successResult[0].id,
            type: 'get',
            success:function (result) {
                var complete='';

                $.each(result,function (index,item) {


                    $('.todo-list').append('<li class='+item.complete+'><div class="view">' +
                        '<input class="toggle" type="checkbox">'+
                        '<label>'+ item.todo +'</label>'+
                        '<button class = "destroy"></button>'+
                        ' </div>'+
                        '<input class="edit" value="Rule the web">'+
                        '</li>')
                })
                $('.toggle').click(function () {

                })
            },

            error:function (err) {
              console.log(err);
            }
        })






        $("#logoutButton").on("click", () => {
            localStorage.setItem("token", null);
            location.href = "/";
        });
        $("#mainButton").on("click", () => {
            location.href = "/main";
        });
    });
}