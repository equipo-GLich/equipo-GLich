var Survivor = function (world, cursor) {
    this.speed = 150;

    this.world = world;
    this.cursor = cursor;
};

Survivor.prototype.preload = function () {
    game.load.atlas('survivor', 'img/sprite/character1.png', 'img/sprite/character1.json');
    game.load.audio('stepsfx', ['sfx/snow_step.wav']);
};

var stepsfx;
Survivor.prototype.create = function () {
    this.sprite = game.add.sprite(150, 400, 'survivor');

    // this.sprite.animations.add('jump', [0,1,2,3,4,4,4,5,6,7], 10, true);
    // this.sprite.animations.add('run', [10,11,12,13,14,15,16], 16, true);
    // this.sprite.animations.add('stop', [17,18,19], 3, true);
    // this.sprite.animations.add('stand', [

    // this.sprite.animations.play('jump');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.acceleration.y = 481;
    this.sprite.anchor.set(1/2, 1/2);
    stepsfx = game.add.audio('stepsfx');
};

Survivor.prototype.update = function () {
    game.physics.arcade.collide(this.world.floor, this.sprite);
    this.sprite.body.velocity.x = 0;

    if (this.cursor.right.isDown) {
        this.sprite.body.velocity.x = this.speed;
        this.sprite.scale.set(1,1);
        playStepSFX();
    }

    if (this.cursor.left.isDown) {
        this.sprite.body.velocity.x = -this.speed;
        this.sprite.scale.set(-1,1);
        playStepSFX();
    }

};

playStepSFX = function () {
    if (!stepsfx.isPlaying){
        stepsfx.play();
    }
}
