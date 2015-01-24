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
};

SnowLevel.prototype.update = function () {
    this.you.update();
};
