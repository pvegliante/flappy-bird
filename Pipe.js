const Pipe = function(xpos, ypos, length, speed, ctx) {
    this.ypos = ypos;
    this.xpos = xpos;
    this.length = length;
    this.ctx = ctx;
    this.speed = speed;
    this.width = 150;
};

Pipe.prototype.update = function() {
    this.xpos -= this.speed;
};

Pipe.prototype.render = function() {
    this.ctx.save();
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(this.xpos - 5, this.ypos, this.width + 10, this.length + 10);
    this.ctx.fillStyle = "#BDAC40"
    this.ctx.fillRect(this.xpos, this.ypos + 5, this.width, this.length);
    this.ctx.restore();
};
