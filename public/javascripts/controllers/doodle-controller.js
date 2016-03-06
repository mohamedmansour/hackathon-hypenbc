App.controller('DoodleController', ['$scope',  function($scope) {
    var canvas, ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

    var x = "black",
        y = 2;

    function init() {
        canvas = can;
        ctx = canvas.getContext("2d");
        canvas.width  = window.innerWidth;
        canvas.height  = window.innerHeight * 0.75;
        w = canvas.width;
        h = canvas.height;

        var img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0, w, h);
        }
        img.src = "../../images/frames/frame1.png";

        canvas.addEventListener("mousemove", function (e) {
            findxy('move', e)
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            findxy('down', e)
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            findxy('up', e);
            console.log(e.offsetX);
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            findxy('out', e)
        }, false);
    }

    init();
    $scope.color = function(obj) {
        x=obj;
    }

    function draw() {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = x;
        ctx.lineCap = 'round';
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.closePath();

    }

    function erase() {
        console.log('hello');
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        };
    }

    function findxy(res, e) {
        var realPosition = getMousePos(canvas, e);
        var rect = canvas.getBoundingClientRect();
        if (res == 'down') {
            console.log(rect);
            prevX = currX;
            prevY = currY;
            currX = realPosition.x;
            currY = realPosition.y;

            flag = true;
            dot_flag = true;
            if (dot_flag) {
                ctx.beginPath();
                ctx.fillStyle = x;
                ctx.fillRect(currX, currY, 2, 2);
                ctx.closePath();
                dot_flag = false;
            }
        }
        if (res == 'up' || res == "out") {
            flag = false;
        }
        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = realPosition.x;
                currY = realPosition.y;
                draw();
            }
        }
    }


    var textBtn = document.getElementById('text-btn');
    var text = document.getElementById('text');

    $scope.textBtn = function(){
        console.log(text);
        var removeBtn = document.getElementById('remove-btn');
        text.style.visibility = 'visible';
        removeBtn.style.visibility = 'visible';

        removeBtn.addEventListener('click', function(e){
            e.preventDefault();
            text.style.visibility = 'hidden';
            removeBtn.style.visibility = 'hidden';
            text.value= '';
        });

        document.addEventListener('keypress', function(e){
            if (e.keyCode === 13){
                var memeText = text.value;
                ctx.font = '40pt Impact';
                ctx.fillStyle = '#fff';
                ctx.strokeStyle='#000'
                ctx.lineWidth=3;
                ctx.fillText(memeText.toUpperCase(), 305, 355);
                ctx.strokeText(memeText.toUpperCase(), 305, 355);
                text.style.visibility = 'hidden';
                removeBtn.style.visibility = 'hidden';
                text.value= '';
            }
        })
    }

    $scope.brushBtn = function(obj){
        console.log(text);
        if(true) {
            document.addEventListener('keypress', function(e){
                if (e.keyCode === 13){
                    var memeText = text.value;
                    ctx.font = '40pt Impact';
                    ctx.fillStyle = '#fff';
                    ctx.strokeStyle='#000'
                    ctx.lineWidth=3;
                    ctx.fillText(memeText.toUpperCase(), 305, 355);
                    ctx.strokeText(memeText.toUpperCase(), 305, 355);
                    text.style.visibility = 'hidden';
                    removeBtn.style.visibility = 'hidden';
                    text.value= '';
                }
            })
        }
    }

    function resizeCanvas(){
        init();
    }
}]);