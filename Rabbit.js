var randomBetween = function (max, min) {
    return Math.random() * (max-min) + min;
};

var Rabbit = function (x, y, level) {
    this.fearDistance = 100;

    this.calm = {
        iddleLimit : 200,
        iddleCounter : 0,
        jumpForce : 120,
        speed : 150
    };

    this.scared = {
        iddleLimit : 30,
        iddleCounter : 50,
        jumpForce : 90,
        speed : 400
    };

    this.state = this.calm;
    this.level = level;

    this.spawnX = x;
    this.spawnY = y;
};

Rabbit.prototype.preload = function () {
    game.load.atlasJSONHash('rabbit', 'img/sprite/rabbit.png', 'img/sprite/rabbit.json');
};

Rabbit.prototype.create = function () {
    if (!this.sprite) {
        this.sprite = game.add.sprite(this.spawnX, this.spawnY, 'rabbit', 'r-alert1.png');
        this.sprite.anchor.set(.5,.5);
        // rabbit animation
        this.sprite.animations.add('alert', framesBetween(1,2, 'r-alert'), 3, true);
        // var frames = framesBetween(1,5, 'r-walk').concat(framesBetween(5,1, 'r-walk'));
        var frames = framesBetween(1,5, 'r-walk');
        this.sprite.animations.add('walk', frames, 10, false);

        this.sprite.animations.play('alert');
        game.physics.arcade.enable(this.sprite);
        // this.sprite.setSize(0.5*
        this.sprite.body.acceleration.y = 481;
    } else {
        this.sprite.reset(this.spawnX, this.spawnY);
    }
};

Rabbit.prototype.update = function () {

    game.physics.arcade.collide(this.sprite, this.level.you.sprite, function (r, p) {

        r.kill();
        sl.you.hunger += 1000;
    });

    if (this.sprite.alive) {
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
            this.sprite.animations.play('alert');
        }

        // the bunny can get scared thanks to this.
        if (Dot.distance([this.sprite.x, this.sprite.y],
                         [this.level.you.sprite.x, this.level.you.sprite.y]) < this.fearDistance) {
            this.state = this.scared;
        }

        if (this.sprite.body.blocked.right) {
            this.sprite.position.y -= 16;
            this.sprite.body.velocity.x = this.state.speed * this.sprite.scale.x*-1;
        }
    }

};

Rabbit.prototype.jump = function () {
    var direction;
    var modifier = 1;



    this.sprite.animations.play('walk');
    if (this.state == this.scared) {
        direction = randomBetween(-1,5);
        if (direction <= 0) {
            // won't wait too much until fleeing away.
            modifier = .6;
            this.state.iddleCounter = this.state.iddleLimit;
        } else {
            direction = 1;
        }
    } else {
        direction = randomBetween(-1,1);
    }

    this.sprite.body.velocity.y = -this.state.jumpForce * modifier;
    this.sprite.body.velocity.x = this.state.speed * direction * modifier;

    if (direction < 0) {
        this.sprite.scale.set(1,1);
    } else {
        this.sprite.scale.set(-1,1);
    }

};
