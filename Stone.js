var Stone = function (level) {
    this.level = level;
    this.throwDirection = [0,0];
    this.force = 0;
    this.sprite = game.add.sprite(200,200, 'stone');
    this.sprite.anchor.set(.5,.5);
    this.sprite.animations.add('play', [0,0,0], 2, true);
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.acceleration.y = 481;
};

Stone.prototype.update = function () {
    game.physics.arcade.collide(this.sprite, this.level.world.floor);
};


// Stone.prototype.updateDirection = function () {
//     this.throwDirection = Dot.minus([game.input.x, game.input.y],
//                                     [this.sprite.x, this.sprite.y]);
//     this.throwDirection = Dot.unitVector(this.throwDirection);
//     console.log(this.throwDirection);
// };

// Stone.prototype.updateForce = function () {
//     this.force = Dot.distance([game.input.x, game.input.y],
//                               [this.sprite.x, this.sprite.y]);
//     this.force = this.force/500;
//     console.log(this.force);
// };

// Stone.prototype.throwAway = function () {
//     this.updateDirection();
//     this.updateForce();

//     this.sprite.body.velocity.x = Math.floor(this.throwDirection[0] * this.force);
//     this.sprite.body.velocity.y = Math.floor(this.throwDirection[1] * this.force);

//     // even though the velocity in x = y = 0, the stone is still going downwards :(
//     // console.log(this.sprite.body.velocity.x + ',' + this.sprite.body.velocity.y);
// };
