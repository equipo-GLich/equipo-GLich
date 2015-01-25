var x = true;

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

    this.you = new Survivor(this.world);
    this.you.preload();

    this.rabbit = new Rabbit(400,400, this);
    this.rabbit.preload();

    game.load.spritesheet('stone', 'img/sprite/stone.png', 40,40);
    game.load.image('trees-back', 'img/trees-back.png');
    game.load.image('trees-mid', 'img/trees-mid.png');
    game.load.image('trees-front', 'img/trees-front.png');
};

SnowLevel.prototype.create = function () {
    treesBack = game.add.tileSprite(0, 150, 1280, 557, 'trees-back');
    treesMid = game.add.tileSprite(0, 150, 1280, 545, 'trees-mid');
    treesFront = game.add.tileSprite(0, 150, 1280, 533, 'trees-front');
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.world.create();
    game.stage.backgroundColor = '#eee';

    this.you.create();

    this.cursor = game.input.keyboard.createCursorKeys();
    this.cursor.zoom = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.cursor.throwStone = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.you.cursor = this.cursor;
    this.rabbit.create();
    this.stone = new Stone(this);

    game.camera.follow(this.you.sprite);
};

SnowLevel.prototype.update = function () {
    treesBack.tilePosition.x -= 1;
    treesMid.tilePosition.x -= 1.2;
    treesFront.tilePosition.x -= 1.5;
    this.stone.update();
    this.you.update();
    this.rabbit.update();
    this.stone.update();

    if (this.cursor.throwStone.isDown) {
        this.stone.throwAway();
    }
};

// SnowLevel.prototype.render = function () {
//     // game.debug.spriteInfo(this.rabbit.sprite, 32, 32);
//     game.debug.body(this.rabbit.sprite);
// };
