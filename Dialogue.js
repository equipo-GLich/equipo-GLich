var Dialogue = function (text, person, hiddenText) {
    this.hiddenText = hiddenText
    this.currentMessage = 0;
    this.person = person;
    this.text = text;
    this.showTimeCounter = 0;
    this.showTime = 200;
    this.waitTimeCounter = 0;
    this.waitTime = 100;
    var style = { font: '15px sans', fill: '#777', align: 'center' };
    this.textbox = game.add.text(this.person.sprite.x, this.person.sprite.y, '', style);
    this.textbox.anchor.set(0.5,0.5)
    this.textbox.alpha = 0;
};

Dialogue.prototype.update = function () {
    if (this.person.frenzy) {
        this.textbox.setText(this.hiddenText);
        this.textbox.alpha = 1;
    } else {

        this.textbox.x = this.person.sprite.x;
        this.textbox.y = this.person.sprite.y;

        if (this.textbox.alpha == 0){
            console.log('transparent');
            if ( this.waitTimeCounter >= this.waitTime) {
                this.currentMessage++;
                this.currentMessage = this.currentMessage % this.text.length;
                this.waitTimeCounter =0;
                this.pop(this.currentMessage);
            } else {
                this.waitTimeCounter++;
            }

        } else if (this.textbox.alpha != 0 ) {
            console.log('show');

            if (this.showTimeCounter >= this.showTime) {
                this.showTimeCounter = 0;
                this.unpop();
            } else {
                this.showTimeCounter++;
            }

        }
    }

};


Dialogue.prototype.pop = function (index) {
    this.textbox.alpha = 1;
    this.textbox.setText(this.text[index]);
};

Dialogue.prototype.unpop = function () {
    this.textbox.alpha = 0;
};