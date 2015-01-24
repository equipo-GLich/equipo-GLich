var Rabbit = function (x, y, level) {
    this.calm = {
        iddleLimit : 100,
        iddleCounter : 0,
        jumpForce : 100,
        speed : 100
    };

    this.scared = {
        iddleLimit : 5,
        iddleCounter : 0,
        jumpForce : 30,
        speed : 300
    };

    this.state = this.calm;

    this.RIGHT = 1;
    this.LEFT = -1;
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

    if (this.state.iddleCounter >= this.state.iddleLimit) {
        this.state.iddleCounter = 0;

        // jump in a random direction (left, right, none)
        this.jump(Math.round(Math.random()*3 - 2));
    } else if (this.sprite.body.blocked.down) {
        this.sprite.body.velocity.x = 0;
    }

};

Rabbit.prototype.jump = function (direction) {
    this.sprite.body.velocity.y = -this.state.jumpForce;
    this.sprite.body.velocity.x = this.state.speed * direction;
};
