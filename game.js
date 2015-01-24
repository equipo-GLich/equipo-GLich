var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

var logo;

function preload() {
    game.load.image('logo', 'img/logo.png');
}

function create() {
    logo = game.add.sprite(0, 0, 'logo');
    game.time.events.add(Phaser.Timer.SECOND * 2, fadeLogo, this);
}

function update() {

}

function fadeLogo() {
    var logoTween = game.add.tween(logo);
    logoTween.to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
    logoTween.onComplete.add(startGame, this);
}

function startGame() {
    snowLevel = new SnowLevel(game);
    game.state.add('snow', snowLevel);
    game.state.start('snow');
}

function render() {
    game.debug.text("Logo duration: " + game.time.events.duration, 32, 32);
}