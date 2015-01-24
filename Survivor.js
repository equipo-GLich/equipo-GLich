var Survivor = function (world) {
    this.world = world;
};

Survivor.prototype.preload = function () {
    game.load.spritesheet('sprite', 'img/sprite/sprite.png',80, 160);
};

Survivor.prototype.create = function () {
    this.sprite = game.add.sprite(100, 400, 'sprite');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.acceleration.y = 481;
};

Survivor.prototype.update = function () {
    game.physics.arcade.collide(this.world.floor, this.sprite);
};
