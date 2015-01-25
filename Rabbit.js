var randomBetween = function (max, min) {
    return Math.random() * (max-min+1) + min;
};

var Rabbit = function (x, y, level) {
    this.fearDistance = 100;

    this.calm = {
        iddleLimit : 100,
        iddleCounter : 0,
        jumpForce : 120,
        speed : 50
    };

    this.scared = {
        iddleLimit : 25,
        iddleCounter : 50,
        jumpForce : 90,
        speed : 150
    };

    this.state = this.calm;
    this.level = level;

    this.spawnX = x;
    this.spawnY = y;
};

Rabbit.prototype.preload = function () {
    game.load.spritesheet('rabbit', 'img/sprite/rabbit.png', 40,60);
};

Rabbit.prototype.create = function () {
    if (!this.sprite) {
        this.sprite = game.add.sprite(this.spawnX, this.spawnY, 'rabbit');
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.acceleration.y = 481;
    } else {
        this.sprite.reset(this.spawnX, this.spawnY);
    }
};

Rabbit.prototype.update = function () {
    game.physics.arcade.collide(this.level.world.floor, this.sprite);
    this.state.iddleCounter++;

    if (this.state.iddleCounter >= this.state.iddleLimit &&
        // this prevents the rabbit jumping in the air.
        this.sprite.body.blocked.down) {
        this.state.iddleCounter = 0;

        // jumps according to the rabbit this.state
        this.jump()
    } else if (this.sprite.body.blocked.down) {
        this.sprite.body.velocity.x = 0;
    }

    // the bunny can get scared thanks to this.
    if (Dot.distance([this.sprite.x, this.sprite.y],
                     [this.level.you.sprite.x, this.level.you.sprite.y]) < this.fearDistance) {
        this.state = this.scared;
    }

};

Rabbit.prototype.jump = function () {
    var direction;

    if (this.state == this.scared) {
        direction = randomBetween(-1,5);
        if (direction <= 0) {
            // won't wait too much until fleeing away.
            this.state.iddleCounter = this.state.iddleLimit;
            this.sprite.body.velocity.y = -this.state.jumpForce * .6;
            this.sprite.body.velocity.x = this.state.speed * direction * .6;
        }
    } else {
        direction = randomBetween(-1,1);
    }

    this.sprite.body.velocity.y = -this.state.jumpForce;
    this.sprite.body.velocity.x = this.state.speed * direction;
};
