var Stone = function (level) {
    this.level = level;
    this.throwDirection = [0,0];
    this.force = 0;
};

Stone.prototype.preload = function () {
    game.load.spritesheet('stone', 'img/sprite/stone.png', 40, 40);
};

Stone.prototype.create = function () {
    this.sprite = game.add.sprite(0,0, 'stone');
    game.physics.arcade.enable(this.sprite);
    this.sprite.kill();
};

Stone.prototype.update = function () {
    if (this.level.cursor.throwStone.isDown) {
        this.throwAway();
    }
};


Stone.prototype.updateDirection = function () {
    this.throwDirection = Dot.minus([game.input.x, game.input.y],
                                    [this.sprite.x, this.sprite.y]);
    this.throwDirection = Dot.unitVector(this.throwDirection);
    console.log(this.throwDirection);
};

Stone.prototype.updateForce = function () {
    this.force = Dot.distance([game.input.x, game.input.y],
                              [this.sprite.x, this.sprite.y]);
    this.force = this.force/500;
    console.log(this.force);
};

Stone.prototype.spawn = function () {
    // retrieving the top of the sprite.
    var ppj = this.level.you.sprite;
    this.sprite.reset(ppj.x, ppj.y);
};

Stone.prototype.throwAway = function () {
    this.updateDirection();
    this.updateForce();
    this.spawn();

    // this.sprite.body.velocity.x = Math.floor(this.throwDirection[0] * this.force);
    // this.sprite.body.velocity.y = Math.floor(this.throwDirection[1] * this.force);

    // even though the velocity in x = y = 0, the stone is still going downwards :(
    console.log(this.sprite.body.velocity.x + ',' + this.sprite.body.velocity.y);
};
