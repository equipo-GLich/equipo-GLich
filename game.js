// // uncomment this to jump to the cave level
// var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game');
// var caveLevel = new CaveLevel();
// game.state.add('caveLevel', caveLevel);
// game.state.start('caveLevel');

// uncomment this to jump the intro (*)
// for debugging purposes...
var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game');
var sl = new SnowLevel(game);
game.state.add('sl', sl);
game.state.start('sl');

// // (*) and comment this
// var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game', {
//     preload: preload,
//     create: create,
//     update: update,
//     render: render
// });

// var logo;

// function preload() {
//     game.load.image('logo', 'img/logo.png');
//     game.load.audio('splsfx', ['sfx/splash.wav']);
// }

// var music;
// var splsfx;
// function create() {
//     logo = game.add.sprite(0, 0, 'logo');
//     splsfx = game.add.audio('splsfx');
//     splsfx.play();
//     game.time.events.add(Phaser.Timer.SECOND * 2, fadeLogo, this);
// }

// function update() {

// }

// function fadeLogo() {
//     var logoTween = game.add.tween(logo);
//     logoTween.to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
//     logoTween.onComplete.add(introGame, this);
// }

// /**
// * Intro Game
// */
// function introGame() {
//     introGame = new IntroGame(game);
//     game.state.add('introGame', introGame);
//     game.state.start('introGame');

// }

// function render() {
//     game.debug.text("Logo duration: " + game.time.events.duration, 32, 32);
// }
