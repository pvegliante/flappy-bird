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
