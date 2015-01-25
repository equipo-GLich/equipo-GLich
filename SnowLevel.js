var x = true;
var paralaxSpeed = [1, 1.2, 1.5];

var SnowLevel = function (game) {
    this.game = game;
};

var treesBack;
var treesMid;
var treesFront;

SnowLevel.prototype.preload = function () {
    this.input.keyboard.onDownCallback = null;
    this.world = new SnowMap(game);
    this.world.preload();

    this.you = new Survivor(this.world, 150, 400);
    this.you.preload();

    this.buddy = new Buddy(this.world, 300, 500, this.you);
    this.buddy.preload();

    this.rabbit = new Rabbit(400,400, this);
    this.rabbit.preload();

    this.r2 = new Rabbit(200,200, this);
    this.r2.preload();

    game.load.spritesheet('stone', 'img/sprite/stone.png', 40,40);
    game.load.image('trees-back', 'img/trees-back.png');
    game.load.image('trees-mid', 'img/trees-mid.png');
    game.load.image('trees-front', 'img/trees-front.png');
};

SnowLevel.prototype.create = function () {

    treesBack = game.add.tileSprite(0, 150, 1280, 557, 'trees-back');
    treesBack.fixedToCamera = true;
    treesMid = game.add.tileSprite(0, 150, 1280, 545, 'trees-mid');
    treesMid.fixedToCamera = true;
    treesFront = game.add.tileSprite(0, 150, 1280, 533, 'trees-front');
    treesFront.fixedToCamera = true;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.world.create();
    game.stage.backgroundColor = '#eee';

    this.you.create();
    this.buddy.create();
    this.you.hungerMeter = new HungerMeter(this.you, 100,100);
    this.you.hungerMeter.create();

    this.cursor = game.input.keyboard.createCursorKeys();
    this.cursor.zoom = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.cursor.throwStone = game.input.keyboard.addKey(Phaser.Keyboard.A);

    this.you.cursor = this.cursor;
    this.buddy.cursor = this.cursor;
    this.rabbit.create();
    this.r2.create();
    this.stone = new Stone(this);

    game.camera.follow(this.you.sprite);
};

SnowLevel.prototype.update = function () {
    // treesBack.tilePosition.x -= 1;
    // treesMid.tilePosition.x -= 1.2;
    // treesFront.tilePosition.x -= 1.5;
    this.stone.update();

    this.you.update();
    this.you.hungerMeter.update();
    this.buddy.update();

    this.rabbit.update();
    this.r2.update();
    this.stone.update();

    if (this.cursor.throwStone.isDown) {
        this.stone.throwAway();
    }
};

// SnowLevel.prototype.render = function () {
//     // game.debug.spriteInfo(this.rabbit.sprite, 32, 32);
//     game.debug.body(this.rabbit.sprite);
// };
