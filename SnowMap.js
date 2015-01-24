var Map = function (game) {
    this.game = game;
};

Map.prototype.preload = function () {
    this.game.load.tilemap( 'snowLevel', 'img/map/snow.json', null, Phaser.Tilemap.TILED_JSON );
    this.game.load.image( 'snow', 'img/snow-tilemap.png' );
};


Map.prototype.create = function () {
    this.tilemap = this.game.add.tilemap('snow', 16, 16, 1600, 800);
    this.tilemap.addTilesetImage('img/snow-tileset.png');
    this.tilemap.floor = this.tilemap.createLayer('floor');
    this.tilemap.floor.resizeWorld();
    this.game.physics.arcade.enable(this.tilemap.floor);
    this.tilemap.setCollisionByExclusion([], true, this.tilemap.floor);
};
