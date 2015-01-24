var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

snowLevel = new SnowLevel(game);
game.state.add('snow', snowLevel);
game.state.start('snow');
