var CaveLevel = function () {

};

CaveLevel.prototype.preload = function () {
    this.world = new CaveMap();
    this.world.preload();

    this.you = new Survivor(this.world, 200,200);
    this.you.preload();
};

CaveLevel.prototype.create = function () {
    game.stage.backgroundColor = '#000';
    this.world.create();

    this.you.create();
    cursor = game.input.keyboard.createCursorKeys();
    cursor.throwStone = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.you.cursor = cursor;
};

CaveLevel.prototype.update = function () {
    this.you.update();
};
