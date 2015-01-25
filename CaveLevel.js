var CaveLevel = function (hunger) {
    this.hunger = hunger;
};

CaveLevel.prototype.preload = function () {
    this.world = new CaveMap();
    this.world.preload();

    this.you = new Survivor(this.world, 300,200);
    this.buddy = new Buddy(this.world, 500, 250, this.you);
    this.you.buddy = this.buddy;
    this.you.preload();
    this.buddy.preload();

};

CaveLevel.prototype.create = function () {
    game.stage.backgroundColor = '#000';
    this.world.create();

    this.you.create();
    this.you.hunger = this.hunger;
    this.buddy.create();

    cursor = game.input.keyboard.createCursorKeys();
    cursor.throwStone = game.input.keyboard.addKey(Phaser.Keyboard.A);
    cursor.attack = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.you.cursor = cursor;
    this.buddy.cursor = cursor;
    this.you.hm = new HungerMeter(this.you, 100,100);
    this.you.hm.create();
    this.you.dialogue = new Dialogue(['what do we\ndo now?', "it's been 3 days...",
                                      'what do we\ndo now?'], this.you,
                                     "please forgive me");
    this.you.dialogue.waitTimeCounter = -800;

    this.buddy.dialogue = new Dialogue(['where is the exit?', "i'm really hungry...", "I can't handle this anymore"], this.buddy, 'you should not have trusted me\nthis is all your fault');
    this.buddy.dialogue.waitTimeCounter = -600;
};

CaveLevel.prototype.update = function () {
    this.you.update();
    this.you.dialogue.update();
    this.you.hm.update();
    this.buddy.update();
    this.buddy.dialogue.update();

    if (this.you.hunger < 400 && !this.you.scared) {
        this.buddy.finalShoot();
    }
};