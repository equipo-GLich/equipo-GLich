var x = true;

var SnowLevel = function (game) {
    this.game = game;
};

SnowLevel.prototype.preload = function () {
    this.input.keyboard.onDownCallback = null;
    this.world = new SnowMap(game);
    this.world.preload();

    this.you = new Survivor(this.world);
    this.you.preload();

    this.rabbit = new Rabbit(400,400, this);
    this.rabbit.preload();

    game.load.spritesheet('stone', 'img/sprite/stone.png', 40,40);
};

SnowLevel.prototype.create = function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.world.create();
    game.stage.backgroundColor = '#eee';

    this.you.create();

    this.cursor = game.input.keyboard.createCursorKeys();
    this.cursor.zoom = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.cursor.throwStone = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.you.cursor = this.cursor;
    this.rabbit.create();
    stone = new Stone(this);

    game.camera.follow(this.you.sprite);
};

SnowLevel.prototype.update = function () {
    this.you.update();
    this.rabbit.update();
    stone.update();

    if (this.cursor.throwStone.isDown) {
        console.log('ding');
        x = false;
        stone.sprite.x = 300;
        stone.sprite.y = 300;
    } else {
        stone.sprite.x = 100;
        stone.sprite.y = 100;
    }
};

// SnowLevel.prototype.render = function () {
//     // game.debug.spriteInfo(this.rabbit.sprite, 32, 32);
//     game.debug.body(this.rabbit.sprite);
// };
