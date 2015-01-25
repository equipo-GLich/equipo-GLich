var Stone = function (level) {
    this.level = level;
    this.throwDirection = [0,0];
    this.force = 0;

    this.sprite = game.add.sprite(200,200, 'stone');
    this.sprite.kill();

    game.physics.arcade.enable(this.sprite);
    this.sprite.body.acceleration.y = 481;
    this.sprite.body.maxVelocity.set(400,400);
};

Stone.prototype.update = function () {
    game.physics.arcade.collide(this.sprite, this.level.world.floor);
};

Stone.prototype.spawn = function () {
    this.sprite.reset(this.level.you.sprite.x, this.level.you.sprite.y);
    this.sprite.body.acceleration.y = 481;
};


Stone.prototype.updateDirection = function () {
    this.throwDirection = Dot.minus([game.input.x, game.input.y],
                                    [this.sprite.x, this.sprite.y]);
    this.throwDirection = Dot.unitVector(this.throwDirection);
};

Stone.prototype.updateForce = function () {
    this.force = Dot.distance([game.input.x, game.input.y],
                              [this.sprite.x, this.sprite.y]);
    // this.force = this.force;
};

Stone.prototype.throwAway = function () {
    this.spawn();
    this.updateDirection();
    this.updateForce();

    this.sprite.body.velocity.x = Math.floor(this.throwDirection[0] * this.force);
    this.sprite.body.velocity.y = Math.floor(this.throwDirection[1] * this.force);
};
