const Environment = function(c, ctx) {
    this.c = c;
    this.ctx = ctx;
    this.bgPos = 0;
    this.fgPos = 0;
    this.bgSpeed = 2;
    this.bgWidth = 914;
    this.bgImg = document.getElementById('bg');
    this.timer = document.getElementById('timer');
};
Environment.prototype.update = function() {
    this.bgPos -= this.bgSpeed;
    if (this.bgPos < -this.bgWidth)
        this.bgPos = 0;
};
Environment.prototype.render = function() {
    for (let i = 0; i <= Math.ceil(this.c.width / this.bgWidth); i++)
        this.ctx.drawImage(this.bgImg, this.bgPos + i * this.bgWidth, 0);
}
