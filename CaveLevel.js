var CaveLevel = function () {

};

CaveLevel.prototype.preload = function () {
    this.world = new CaveMap();
    this.world.preload();

    this.you = new Survivor(this.world, 300,200);
    this.buddy = new Buddy(this.world, 500, 250, this.you);
    this.you.preload();
    this.buddy.preload();
};

CaveLevel.prototype.create = function () {
    game.stage.backgroundColor = '#000';
    this.world.create();

    this.you.create();
    this.buddy.create();

    cursor = game.input.keyboard.createCursorKeys();
    cursor.throwStone = game.input.keyboard.addKey(Phaser.Keyboard.A);
    cursor.attack = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.you.cursor = cursor;
    this.buddy.cursor = cursor;
    this.you.hm = new HungerMeter(this.you, 100,100);
    this.you.hm.create();
};

CaveLevel.prototype.update = function () {
    this.you.update();
    this.you.hm.update();
    this.buddy.update();

    if (this.you.hunger < 400 && !this.you.scared) {
        this.buddy.finalShoot();
    }
};
