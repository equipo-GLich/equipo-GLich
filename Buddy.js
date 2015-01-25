var Buddy = function (world, spawnX, spawnY, you) {
    this.maxDistance = 200;
    this.you = you;
    this.speed = 150;
    this.jumpPower = 190;
    this.world = world;
    this.spawnX = spawnX;
    this.spawnY = spawnY;
};

Buddy.prototype.preload = function () {
    game.load.atlasJSONHash('buddy', 'img/sprite/character2.png', 'img/sprite/character2.json');
    game.load.audio('stepsfx', ['sfx/snow_step.wav']);
};

var stepsfx;
Buddy.prototype.create = function () {
    this.sprite = game.add.sprite(this.spawnX, this.spawnY, 'buddy', 'c2-jump1.png');
    // this.sprite.tint = 0x775555;
    var jumpFrames = framesBetween(1,3, 'c2-jump').concat(['c2-jump4.png', 'c2-jump4.png', 'c2-jump4.png']).concat(framesBetween(4,8, 'c2-jump'));
    // this.sprite.animations.add('jump', framesBetween(1,8, 'c2-jump'), 7, false);
    this.sprite.animations.add('jump', jumpFrames, 10, false);
    this.sprite.animations.add('fall', framesBetween(4,5, 'c2-jump'), 3, true);
    this.sprite.animations.add('run', framesBetween(1,9, 'c2-run'), 15, true);
    this.sprite.animations.add('stand', framesBetween(1,4, 'c2-stand'), 8, true);
    this.sprite.animations.add('walk', framesBetween(1, 8, 'c2-walk'), 8, true);

    this.sprite.animations.play('fall');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.acceleration.y = 481;
    this.sprite.anchor.set(1/2, 1/2);
    this.sprite.scale.set(1.1, 1.2);
    this.sprite.body.setSize(50, 160);
    this.sprite.smoothed = false;
    stepsfx = game.add.audio('stepsfx');
};

Buddy.prototype.looks = function (action) {
    return this.sprite.animations.currentAnim.name == action;
};

Buddy.prototype.update = function () {
    game.physics.arcade.collide(this.world.floor, this.sprite);

    if (this.sprite.body.blocked.down) {

        if (this.sprite.body.blocked.right || this.sprite.body.blocked.left) {
            this.sprite.body.position.y -= 16;
        }

        this.sprite.body.velocity.x = 0;
        var myPosition = [this.sprite.x, this.sprite.y];
        var yourPosition = [this.you.sprite.x, this.you.sprite.y];

        if (Dot.distance(myPosition, yourPosition) > this.maxDistance) {
            // I'm going to follow you.
            playStepSFX();
            this.sprite.animations.play('walk');
            if (myPosition[X] < yourPosition[X]) {
                this.sprite.body.velocity.x = this.speed;
                this.sprite.scale.set(Math.abs(this.sprite.scale.x),this.sprite.scale.y);
            } else {
                this.sprite.body.velocity.x = -this.speed;
                this.sprite.scale.set(-Math.abs(this.sprite.scale.x),this.sprite.scale.y);
            }
        } else {
            this.sprite.animations.play('stand');
        }

        if (this.shouldJump()) {
            this.sprite.body.velocity.y = -this.jumpPower;
            this.sprite.body.velocity.x = this.speed*2 * this.sprite.scale.x;
            this.sprite.animations.play('jump');
        }

    }

    if (this.sprite.body.velocity.y > 120 && !this.looks('jump')) {
        this.sprite.animations.play('fall');
    }

};

Buddy.prototype.shouldJump = function () {
    var x = Math.round(this.sprite.x/16);
    var y = Math.round((this.sprite.y + this.sprite.anchor.y*this.sprite.height)/16);

    if (this.sprite.scale.x < 0) {
        x--;
    } else {
        x++;
    }

    return !this.world.tilemap.getTile(x,y) && !this.world.tilemap.getTile(x,y+1);

};


playStepSFX = function () {
    if (!stepsfx.isPlaying){
        stepsfx.play();
    }
}
