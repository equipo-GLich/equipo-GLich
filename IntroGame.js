var IntroGame = function (game) {
    this.game = game;
};

IntroGame.prototype.preload = function() {
    game.load.audio('bgm', ['bgm/BGM_1.mp3']);
    game.load.image('background-night', 'img/background-night.png')
    game.load.image('trees-back', 'img/trees-back.png');
    game.load.image('trees-mid', 'img/trees-mid.png');
    game.load.image('trees-front', 'img/trees-front.png');
    game.load.image('plane', 'img/plane.png');
    game.load.image('fire', 'img/fire.png');
    game.load.image('smoke', 'img/smoke.png');
    game.load.atlasJSONHash('survivor', 'img/sprite/chracter1.png', 'img/sprite/character1.json');
    game.load.image('juan', 'img/juan.png');
    game.load.image('press-any-button', 'img/press-any-button.png');
};

IntroGame.prototype.create = function() {
    backgroundNight = game.add.sprite(0,0, 'background-night');
    treesBack = game.add.sprite(0, 0, 'trees-back');
    treesBack = game.add.sprite(0, 0, 'trees-mid');
    treesBack = game.add.sprite(0, 0, 'trees-front');
    plane = game.add.sprite(-150, 300, 'plane');
    smoke = game.add.sprite(200, -120, 'smoke');
    smoke1 = game.add.sprite(350, -120, 'smoke');
    smoke.scale.x = 1/1.5;
    smoke.scale.y = 1/1.5;
    smoke1.scale.x = 1/1.5;
    smoke1.scale.y = 1/1.5;
    // Fire sprites group
    fire = game.add.sprite(650, 300, 'fire');
    fire1 = game.add.sprite(400, 500, 'fire');
    fire2 = game.add.sprite(500, 400, 'fire');
    fire3 = game.add.sprite(600, 500, 'fire');
    fire.anchor.setTo(1/2, 1/2);
    fire1.anchor.setTo(1/2, 1/2);
    fire2.anchor.setTo(1/2, 1/2);
    fire3.anchor.setTo(1/2, 1/2);
    fire.scale.x = 1/2;
    fire.scale.y = 1/2;
    fire1.scale.x = 1/3;
    fire1.scale.y = 1/3;
    fire2.scale.x = 1/4;
    fire2.scale.y = 1/4;
    fire3.scale.x = 1/2;
    fire3.scale.y = 1/2;
    fireTween = game.add.tween(fire.scale);
    fireTween.to({x: 1/1.5, y: 1/1.5}, 600);
    fireTween.loop().start();
    fireTween1 = game.add.tween(fire1.scale);
    fireTween1.to({x: 1/2, y: 1/2}, 400);
    fireTween1.loop().start();
    fireTween2 = game.add.tween(fire2.scale);
    fireTween2.to({x: 1/2.5, y: 1/2.5}, 500);
    fireTween2.loop().start();
    fireTween3 = game.add.tween(fire3.scale);
    fireTween3.to({x: 1/3, y: 1/3}, 800);
    fireTween3.loop().start();


    survivor = game.add.sprite(800, 400, 'survivor', 'c-jump1.png');
    var text = "PRESS ANY KEY TO START";
    var style = {
        font: "65px Arial",
        fill: "#fff",
        align: "center"
    };

    juan = game.add.sprite(500, 200, 'juan');
    juan.scale.x = 1/3;
    juan.scale.y = 1/3;
    pressAnyButton = game.add.sprite(250, 350, 'press-any-button');
    // Read any key
    this.input.keyboard.onDownCallback = function(e) {
        // Start game
        snowLevel = new SnowLevel(game);
        game.state.add('snow', snowLevel);
        game.state.start('snow');
        music = game.add.audio('bgm');
        music.play();
    }
};

IntroGame.prototype.update = function() {
};

IntroGame.prototype.render = function() {
    game.debug.text("Intro Game", 32, 32);
};