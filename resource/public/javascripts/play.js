var successResult;
var updateScore = 0;
var currentScore;

if(localStorage.getItem("token")==null){
    alert("로그인을 해주세요");
    location.href = "/";
}
$.ajax({
    url: "/api/v1/users/token/" + localStorage.getItem("token"),
    type: "get",
    success: function (result) {
        successResult = result;
        $.ajax({
            url: "/api/v1/users/user/" + successResult[0].id,
            type: "get",
            success: function (result) {
                currentScore = result[0].score;
            },
            error: function (err) {
                alert("Access Error");

            }


        });
    },
    error: function (err) {
        alert("ERROR");
        location.href = "/";
    }
});

$(function () {

    $("#playButton").on("click", () => {
        startGame();
        $('#playButton').hide();
        $('#accButton').show();
    });
    $("#logoutButton").on("click", () => {
        localStorage.removeItem("token");
        location.href = "/";
    });
    $("#mainButton").on("click", () => {
        location.href = "/main";
    });
    $("#saveButton").on("click", () => {
        var dataObj = {
            id: successResult[0].id,
            score: updateScore
        };
        console.log(dataObj.id);
        console.log(dataObj.score);

        if (currentScore < dataObj.score) {
            $.ajax({
                url: '/api/v1/users/play',
                type: 'put',
                data: dataObj,
                success: function (result) {
                    location.href = '/main';
                },
                error: function (err) {

                }
            });
        }
        else{
            location.href = '/main';
        }
    });


    $(document).keydown(function (event) {
        if(event.keyCode=='32'){
            // $('#accButton').click();
            accelerate(-0.2);
        }
    });
    $(document).keyup(function (event) {
        if(event.keyCode=='32'){
            accelerate(0.05);
        }
    });



});

var myGamePiece;
var myObstacles = [];
var myScore;

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function () {
        var rockbottom = myGameArea.canvas.height - this.height;
        var rocktop=myGameArea.canvas.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
        if(15>this.y){
            this.y = 15;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            updateScore = myGameArea.frameNo;
            $('#saveButton').show();
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();

    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}


