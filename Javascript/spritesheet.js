var sully;
var background;
var container;

function Sprite(img, x, y, width, height) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Sprite.prototype.draw = function (rendersingContext, x, y) {
    rendersingContext.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
}

function initSprites(img) {
    sully = [
        new Sprite(img, 0, 0, 59, 59),
        new Sprite(img, 60, 0, 58, 60),
        new Sprite(img, 120, 0, 65, 59)
    ];
    backgroundSprite = new Sprite(img, 200, 0, 400, 250);
}