

$(function () {
    $("#cancelButton").on("click",()=> {
        location.href = "/";
    })
    var createAvailable=true;
    var isSpace=false;
    $("#createButton").on("click",()=> {
        var newID=$('#new-id').val();
        var newPASS=$('#new-password').val();
        var newNICK=$('#new-nickname').val();

        var userDataObj={
            id: newID,
            pass: newPASS,
            nickname: newNICK
        }

        if(newID.length===0){
            alert("ID 를 입력 하세요");
            createAvailable=false;
        }else{
            for(var i=0; i<newID.length; i++){
                if(newID[i]===' ')
                {
                    isSpace=true;
                    createAvailable=false;
                    break;
                }
            }
        }

        if(newPASS.length===0){
            alert("PASSWORD 를 입력 하세요");
            createAvailable=false;
        }else{
            for(var i=0; i<newPASS.length; i++){
                if(newPASS[i]===' ')
                {
                    isSpace=true;
                    createAvailable=false;
                    break;
                }
            }
        }

        if(newNICK.length===0){
            alert("NICKNAME 을 입력 하세요");
            createAvailable=false;
        }else{
            for(var i=0; i<newNICK.length; i++){
                if(newNICK[i]===' ')
                {
                    isSpace=true;
                    createAvailable=false;
                    break;
                }
            }
        }

        if(isSpace==true){
            alert("공백 포함 불가능");
        }else if(createAvailable==true){
            $.ajax({
               url:'api/v1/users/create',
                type:'post',
                async:false,
                data:userDataObj,
                success:function (result) {
                    location.href = "/";
                },
                error:function (err) {
                    console.log(err);
                }

            });
        }
    });


});