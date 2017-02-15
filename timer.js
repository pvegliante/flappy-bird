function timer() {
var time = 0;
var interval;
var offset;
}

function update() {
  time += delta();
  console.log(time);
}

function delta() {
  var now = Date.now();
  var timePassed = offset - now;
  offset = now;
  return timePassed;
}

function timeFormatter() {

  this.isOn = false;
  this.start = function() {
    if(this.isOn) {
      interval = setInterval(update, 10);
      offset = Date.now();
      this.isOn = true;
    }
  };
  this.stop = function() {
    if (this.isOn) {
      clearInterval(interval);
      interval = null;
      this.isOn = false;
    }
  };
  this.reset = function() {
    time = 0;
  };
};

var timer = new timer();
// time.start();
// time.stop();
// time.reset();
