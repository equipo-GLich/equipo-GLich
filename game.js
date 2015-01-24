var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game');

snowLevel = new SnowLevel(game);
game.state.add('snow', snowLevel);
game.state.start('snow');
