var Stone = function (level) {
    this.level = level;
};

Stone.prototype.preload = function () {
    game.load.spritesheet('stone', 'img/sprite/stone.png', 40,40);
};

Stone.prototype.create = function () {
    this.sprite = game.add.sprite(200,200, 'stone');

    game.physics.arcade.enable(this.sprite);
    this.sprite.body.acceleration.y = 481;
    // this.sprite.kill();
};

Stone.prototype.update = function () {
    if (this.level.cursor.throwStone.isDown) {
        this.sprite.kill();
        this.sprite.reset(this.level.you.sprite.x, this.level.you.sprite.y);
    }
};
