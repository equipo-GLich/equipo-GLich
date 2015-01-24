var Survivor = function (world, cursor) {
    this.speed = 150;

    this.world = world;
    this.cursor = cursor;
};

Survivor.prototype.preload = function () {
    game.load.spritesheet('sprite', 'img/sprite/sprite.png',80, 160);
};

Survivor.prototype.create = function () {
    this.sprite = game.add.sprite(150, 400, 'sprite');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.acceleration.y = 481;
    this.sprite.anchor.set(1/2, 1/2);
};

Survivor.prototype.update = function () {
    game.physics.arcade.collide(this.world.floor, this.sprite);
    this.sprite.body.velocity.x = 0;

    if (this.cursor.right.isDown) {
        this.sprite.body.velocity.x = this.speed;
        this.sprite.scale.set(1,1);
    }

    if (this.cursor.left.isDown) {
        this.sprite.body.velocity.x = -this.speed;
        this.sprite.scale.set(-1,1);
    }

};