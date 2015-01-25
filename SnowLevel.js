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

    this.stone = new Stone(this);
    this.stone.preload();
};

SnowLevel.prototype.create = function () {
    game.stage.backgroundColor = '#eee';
    this.world.create();
    this.you.create();
    this.stone.create();

    this.cursor = game.input.keyboard.createCursorKeys();
    this.cursor.zoom = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.cursor.throwStone = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.you.cursor = this.cursor;
    this.rabbit.create();

    game.camera.follow(this.you.sprite);
};

SnowLevel.prototype.update = function () {
    this.you.update();
    this.rabbit.update();
    this.stone.update();
};

// SnowLevel.prototype.render = function () {
//     // game.debug.spriteInfo(this.rabbit.sprite, 32, 32);
//     game.debug.body(this.rabbit.sprite);
// };
