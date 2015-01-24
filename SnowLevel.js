var SnowLevel = function (game) {
    this.game = game;
};

SnowLevel.prototype.preload = function () {
    this.world = new SnowMap(game);
    this.world.preload();

    this.you = new Survivor(this.world);
    this.you.preload();
};

SnowLevel.prototype.create = function () {
    game.stage.backgroundColor = '#eee';
    this.world.create();
    this.you.create();

    this.cursor = game.input.keyboard.createCursorKeys();
    this.cursor.zoom = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.you.cursor = this.cursor;

    game.camera.follow(this.you.sprite);
};

SnowLevel.prototype.update = function () {
    this.you.update();
    game.camera.y += 500;
};
