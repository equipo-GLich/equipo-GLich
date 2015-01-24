var IntroGame = function (game) {
    this.game = game;
};

IntroGame.prototype.preload = function() {
};

IntroGame.prototype.create = function() {
    var text = "PRESS ANY KEY TO START";
    var style = {
        font: "65px Arial",
        fill: "#fff",
        align: "center"
    };

    var text = game.add.text(250, 300, text, style);
    // Read any key
    this.input.keyboard.onDownCallback = function(e) {
        // Start game
        snowLevel = new SnowLevel(game);
        game.state.add('snow', snowLevel);
        game.state.start('snow');
    }
};

IntroGame.prototype.update = function() {

};

IntroGame.prototype.render = function() {
    game.debug.text("Intro Game", 32, 32);
};