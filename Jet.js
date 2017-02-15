const Jet = function(x, y, ctx) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.velY = 0;
    this.width = 55;
    this.height = 15;
    this.ticks = 0;
    this.burnIndex = 0;
    this.dead = false;
    this.sprites = [
        document.getElementById('Jet')
    ];
    this.burn = [
        document.getElementById('f1'),
        document.getElementById('f2'),
        document.getElementById('f3')
    ];
    var self = this;
    window.addEventListener('keydown', function(e) {
        event.preventDefault();
        if (e.keyCode === 32) {
            self.velY = -5;
        }
    })
};

Jet.prototype.update = function(pipes) {
    this.ticks++;
    if (this.ticks % 30 === 0) this.burnIndex = (this.burnIndex+1) % this.burn.length;
    this.y += this.velY;
    this.velY += .25;
    if (this.detectCollisions(pipes)) {
        this.dead = true;
    };
};

Jet.prototype.render = function() {
    let renderX = -this.width / 2;
    let renderY = -this.height / 2;
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    let angle = Math.PI / 7 * this.velY / 5;
    this.ctx.rotate(angle)
    if (!this.dead) {
        this.ctx.drawImage(this.sprites[0], renderX, renderY);
    } else {
        this.ctx.drawImage(this.burn[this.burnIndex], renderX, renderY);
    }
    this.ctx.restore();

};

Jet.prototype.detectCollisions = function(pipes) {
    let collisionDetected = false;
    for (var i = 0; i < pipes.length; i++) {
        let e = pipes[i];
        let highPipe = e.ypos <= 0;
        let x0 = e.xpos,
            x1 = e.xpos + e.width;
        let a2 = this.x + 35;
        let b2 = this.y;
        if (highPipe) {
            let y0 = e.ypos + e.length;
            let a = this.x;
            let b = this.y - this.height / 2;
            if (a > x0 && a < x1 && b < y0 ||
                a2 > x0 && a2 < x1 && b < y0) {
                return true;
            }
        } else {
            let y2 = e.ypos;
            let a = this.x;
            let b = this.y + this.height / 2;
            if (a > x0 && a < x1 && b > y2 ||
                a2 > x0 && a2 < x1 && b2 > y2) {
                return true;
            }
        }
    }
    return false;
};
