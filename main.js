var timer = require('./score.js');


window.onload = function() {
    const c = document.getElementById('canvas');
    c.width = window.innerWidth;
    c.height = 600;

    const ctx = c.getContext('2d');
    const environment = new Environment(c, ctx);
    const jet = new Jet(350, 100, ctx);
    const pipes = [];
    let speed = 4;
    setInterval(function() {
      speed = speed + 1;
    }, 30000)
    let pipeSet = generateRandomPipes(ctx, c.width, c.height, speed);
    console.log(speed);

    pipes.push(pipeSet.top, pipeSet.bottom);
    setInterval(function() {

        console.log(speed);
        let pipeSet = generateRandomPipes(ctx, c.width, c.height, speed);
        pipes.push(pipeSet.top, pipeSet.bottom);
    }, 30000);
    var clock = new timer();
    clock.start();
    gameLoop();

    function gameLoop() {
        ctx.fillRect(0, 0, c.width, c.heigth);
        environment.update();
        environment.render();
        document.getElementById('timer').innerHTML = clock.getTime();
        pipes.forEach(function(pipe1) {
            pipe1.update();
            pipe1.render();
        });
        jet.update(pipes);
        jet.render();
        if (jet.dead) {
            console.log("BOOM!");
            clock.stop();
            drawGameOver(ctx);
            return;
        }
        window.requestAnimationFrame(gameLoop);
    }
};

function generateRandomPipes(ctx, canvasWidth, canvasHeight, speed) {
    let lengthTop = Math.round(Math.random() * 200 + 50);
    let lengthBottom = canvasHeight - 150 - lengthTop;
    let returnVal = {};
    returnVal.top = new Pipe(canvasWidth, -5, lengthTop, speed, ctx);
    returnVal.bottom = new Pipe(canvasWidth, canvasHeight + 5 - lengthBottom, lengthBottom, speed, ctx);
    return returnVal;
};

var go = document.getElementById('gameover');

function drawGameOver(ctx) {
    ctx.drawImage(go, go.width/2, go.height/2);
    document.getElementById('canvas').onclick = function(){
      location.reload();
    };
};
