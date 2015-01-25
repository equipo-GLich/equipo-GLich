var HungerMeter = function (person, posX, posY) {
    this.person = person;
    this.posX = posX;
    this.posY = posY;
    this.hungerString = 'Hambre: ';
};

HungerMeter.prototype.create = function () {
    var style = { font: "20px Arial", fill: "#777", align: "center" };
    this.hungerText = game.add.text(this.posX, this.posY, this.hungerString + this.person.hunger/100, style);
    this.hungerText.fixedToCamera = true;
};

HungerMeter.prototype.update = function () {
    this.hungerText.setText(this.hungerString + Math.floor(this.person.hunger/100));
};
