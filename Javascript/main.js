var width,
    height,
    currentState,
    frames = 0,
    thehero;

var states = {
    splash: 0,
    game: 1,
    score: 2
};
var canvas;
var renderingContext;

function Sully() {
    this.x = -60;
    this.y = 170;
    this.width = 45;
    this.height = 55;
    this.frame = 0;
    this.velocity = 0;
    this.animation = [0];
    this.rotation = 0;
    this.radius = 12;
    this.gravity = 0.25;
    this._jump = 4.6;

    this.update = function () {
        var S = currentState === states.splash ? 10 : 7 ;
        this.frame += frames % S === 0 ? 1 : 0;
        this.frame %= this.animation.length;

    }

    this.draw = function (renderingcontext) {
        renderingcontext.save();
        renderingcontext.translate(this.x, this.y);
        renderingcontext.rotate(this.rotation);
        var S = this.animation[this.frame];
        sully[S].draw(renderingcontext, 160, this.y);
        renderingcontext.restore();
    }
}

function main(){
    windowSetup();
    canvasSetup();
    currentState = states.splash;
    document.body.appendChild(canvas)
    loadGraphics();
    thehero = new Sully();
}

function windowSetup(){
    var windowWidth = $(window).width();
    if(windowWidth < 500){
        width = 320;
        height = 430;
    }
    else{
        width = 400;
        height = 430;
    }
}

function canvasSetup() {
    canvas = document.createElement('canvas');
    canvas.style.border = "3px solid black";
    canvas.width = width;
    canvas.height = height;
    renderingContext = canvas.getContext("2d");
}

function loadGraphics() {
    var img = new Image();
    img.src = "Images/container.ico";
    img.onload = function () {
        initSprites(this);
        renderingContext.fillStyle = "#3DB0DD";
        gameLoop();
    }
}

function gameLoop() {
    update();
    render();
    window.requestAnimationFrame(gameLoop);
}

function update() {
    frames ++;
    thehero.update();
}

function render() {
    renderingContext.fillRect(0, 0, width, height);
    thehero.draw(renderingContext);
}