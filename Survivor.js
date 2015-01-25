var Survivor = function (world, spawnX, spawnY) {
    this.speed = 150;
    this.jumpPower = 190;
    this.world = world;
    this.spawnX = spawnX;
    this.spawnY = spawnY;
    this.hunger = 50000;
};

Survivor.prototype.preload = function () {
    game.load.atlasJSONHash('survivor', 'img/sprite/character1.png', 'img/sprite/character1.json');
    game.load.audio('stepsfx', ['sfx/snow_step.wav']);
    game.load.audio('jumpSFX', ['sfx/snow_jump.wav']);
};

var stepsfx;
Survivor.prototype.create = function () {
    this.sprite = game.add.sprite(this.spawnX, this.spawnY, 'survivor', 'c-jump1.png');
    var jumpFrames = framesBetween(1,3, 'c-jump').concat(['c-jump4.png', 'c-jump4.png', 'c-jump4.png']).concat(framesBetween(4,8, 'c-jump'));
    // this.sprite.animations.add('jump', framesBetween(1,8, 'c-jump'), 7, false);
    this.sprite.animations.add('jump', jumpFrames, 10, false);
    this.sprite.animations.add('fall', framesBetween(4,5, 'c-jump'), 3, true);
    this.sprite.animations.add('run', framesBetween(1,9, 'c-run'), 15, true);
    this.sprite.animations.add('stand', framesBetween(1,4, 'c-stand'), 8, true);
    this.sprite.animations.add('walk', framesBetween(1, 8, 'c-walk'), 8, true);
    this.sprite.animations.add('die', framesBetween(1,4, 'c-die'), 2, false);

    this.sprite.animations.play('stand');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.acceleration.y = 481;
    this.sprite.anchor.set(1/2, 1/2);
    stepsfx = game.add.audio('stepsfx');
    jumpSFX = game.add.audio('jumpSFX');
};

Survivor.prototype.looks = function (action) {
    return this.sprite.animations.currentAnim.name == action;
};

Survivor.prototype.die = function () {
    this.sprite.anchor.set(0,1);
    this.sprite.position.y += this.sprite.height*.5;
    this.sprite.animations.play('die');
    this.sprite.body.velocity.x = 0;
};


Survivor.prototype.update = function () {
    game.physics.arcade.collide(this.world.floor, this.sprite);
    if (!this.looks('die')) {

        if (this.hunger <= 0) {
            this.die();
        } else {

            this.hunger--;

            if (this.sprite.body.blocked.down) {

                if (this.sprite.body.blocked.right || this.sprite.body.blocked.left) {
                    this.sprite.body.position.y -= 16;
                }

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
                    if (treesBack && treesMid && treesFront) {
                        treesBack.tilePosition.x -= 0;
                        treesMid.tilePosition.x -= 0;
                        treesFront.tilePosition.x -= 0;
                    }
                } else {
                    if (treesBack && treesMid && treesFront) {
                        treesBack.tilePosition.x -= paralaxSpeed[0] * this.sprite.scale.x;
                        treesMid.tilePosition.x -=  paralaxSpeed[1] * this.sprite.scale.x;
                        treesFront.tilePosition.x -=  paralaxSpeed[2] * this.sprite.scale.x;
                    }
                }

                if (this.cursor.up.isDown) {
                    this.sprite.body.velocity.y = -this.jumpPower;
                    this.sprite.body.velocity.x = this.speed*2 * this.sprite.scale.x;
                    this.sprite.animations.play('jump');
                    playJumpSFX();
                }

            }

            if (this.sprite.body.velocity.y > 120 && !this.looks('jump')) {
                this.sprite.animations.play('fall');
            }

            if (this.sprite.body.velocity.x == this.speed) {
                this.hunger--;
            } else if (this.sprite.body.velocity.x > this.speed) {
                this.hunger -= 5;
            }
        }
    }

};

playStepSFX = function () {
    if (!stepsfx.isPlaying){
        stepsfx.play();
    }
}

playJumpSFX = function() {
    if(!jumpSFX.isPlaying){
        jumpSFX.play();
    }
    else{
        jumpSFX.restart();
    }
}
