(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    }, 2000);
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

},{"./score.js":2}],2:[function(require,module,exports){
function timer() {
  var seconds = 0;

  var timerInterval;

  this.start = function() {
    timerInterval = setInterval(function() {
      seconds++;
    }, 1);
  };

  this.stop = function() {
    clearInterval(timerInterval);
  };

  this.getTime = function() {
    return seconds;
  };

}

module.exports = timer;

},{}]},{},[1]);
