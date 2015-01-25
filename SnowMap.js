var SnowMap = function (game) {
    this.game = game;
};

SnowMap.prototype.preload = function () {
    this.game.load.tilemap( 'snow', 'img/map/snow.json', null, Phaser.Tilemap.TILED_JSON );
    this.game.load.image( 'snow', 'img/map/snow.png' );
};


SnowMap.prototype.create = function () {
    this.tilemap = this.game.add.tilemap('snow', 16, 16, 8000, 800);
    this.tilemap.addTilesetImage('snow');
    this.floor = this.tilemap.createLayer('floor');
    this.floor.resizeWorld();

    this.game.physics.arcade.enable(this.floor);
    this.tilemap.setCollisionByExclusion([], true, this.floor);
};

SnowMap.prototype.landslide = function () {
    this.landslides = game.add.group();
    this.tilemap.createFromTiles([3,4], -1, 'landslide', this.landslides, this.floor);
    this.landslides.forEach( function (sprite) {
        sprite.animations.add('collapse', [2,3,4,5], 5, false);
        sprite.update = function () {

        };
    });

};
