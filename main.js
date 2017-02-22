var timer = require('./score.js');

window.onload = function() {
    const c = document.getElementById('canvas');
    c.width = window.innerWidth;
    c.height = 600;

    const ctx = c.getContext('2d');
    const environment = new Environment(c, ctx);
    const jet = new Jet(350, 100, ctx);
    const pipes = [];
    let pipeSet = generateRandomPipes(ctx, c.width, c.height);
    pipes.push(pipeSet.top, pipeSet.bottom);
    setInterval(function() {
        let pipeSet = generateRandomPipes(ctx, c.width, c.height);
        pipes.push(pipeSet.top, pipeSet.bottom);
    }, 1000);
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

function generateRandomPipes(ctx, canvasWidth, canvasHeight) {
    let lengthTop = Math.round(Math.random() * 200 + 50);
    let lengthBottom = canvasHeight - 150 - lengthTop;
    let returnVal = {};
    returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, ctx);
    returnVal.bottom = new Pipe(canvasWidth, canvasHeight + 5 - lengthBottom, lengthBottom, 4, ctx);
    return returnVal;
};

var go = document.getElementById('gameover');

function drawGameOver(ctx) {
    ctx.drawImage(go, go.width/2, go.height/2);
    document.getElementById('canvas').onclick = function(){
      location.reload();
    };
};
