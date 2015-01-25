var Survivor = function (world, cursor) {
    this.speed = 150;
    this.jumpPower = 200;
    this.world = world;
    this.cursor = cursor;
};

Survivor.prototype.preload = function () {
    game.load.atlasJSONHash('survivor', 'img/sprite/chracter1.png', 'img/sprite/character1.json');
    game.load.audio('stepsfx', ['sfx/snow_step.wav']);
};

var stepsfx;
Survivor.prototype.create = function () {
    this.sprite = game.add.sprite(150, 400, 'survivor', 'c-jump1.png');

    this.sprite.animations.add('jump', framesBetween(1,8, 'c-jump'), 7, false);
    this.sprite.animations.add('fall', framesBetween(4,5, 'c-jump'), 3, true);
    this.sprite.animations.add('run', framesBetween(1,9, 'c-run'), 15, true);
    this.sprite.animations.add('stand', framesBetween(1,4, 'c-stand'), 8, true);
    this.sprite.animations.add('walk', framesBetween(1, 8, 'c-walk'), 8, true);

    this.sprite.animations.play('stand');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.acceleration.y = 481;
    this.sprite.anchor.set(1/2, 1/2);
    stepsfx = game.add.audio('stepsfx');
};

Survivor.prototype.looks = function (action) {
    return this.sprite.animations.currentAnim.name == action;
};

Survivor.prototype.update = function () {
    game.physics.arcade.collide(this.world.floor, this.sprite);

    if (this.sprite.body.blocked.down) {
        this.sprite.body.velocity.x = 0;
        if (this.cursor.right.isDown) {
            this.sprite.animations.play('walk');
            this.sprite.body.velocity.x = this.speed;
            this.sprite.scale.set(1,1);
            playStepSFX();
        }

        if (this.cursor.left.isDown) {
            this.sprite.animations.play('walk');
            this.sprite.body.velocity.x = -this.speed;
            this.sprite.scale.set(-1,1);
            playStepSFX();
        }

        if (!this.cursor.left.isDown && !this.cursor.right.isDown) {
            this.sprite.animations.play('stand');
        }

        if (this.cursor.up.isDown) {
            this.sprite.body.velocity.y = -this.jumpPower;
            this.sprite.animations.play('jump');
        }

    }

    if (!this.sprite.body.blocked.down && !this.looks('jump')) {
        this.sprite.animations.play('fall');
    }

};

playStepSFX = function () {
    if (!stepsfx.isPlaying){
        stepsfx.play();
    }
}
