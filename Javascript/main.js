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
    this.animation = [0, 1, 2];
    this.rotation = 0;
    this.radius = 12;
    this.gravity = 0.25;
    this._jump = 4.6;
    this.jumpcount = 2;

    this.jump = function () {
        if(this.jumpcount > 0){
            this.velocity = -this._jump;
            this.jumpcount--;
        }
    }

    this.update = function () {
        var S = currentState === states.splash ? 10 : 5 ;
        this.frame += frames % S === 0 ? 1 : 0;
        this.frame %= this.animation.length;
        
        if(currentState === states.splash){
            this.updateIdleHero();
        }
        else {
            this.updatePlayingHero();
        }

    }
    this.updateIdleHero = function () {
        
    }

    this.updatePlayingHero = function () {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if(this.y >= 170){
            this.y = 170;
            this.jumpcount = 2;
            this.velocity = this._jump;
        }
    };

    this.draw = function (renderingcontext) {
        renderingcontext.save();
        renderingcontext.translate(this.x, this.y);
        renderingcontext.rotate(this.rotation);
        var S = this.animation[this.frame];
        sully[S].draw(renderingcontext, 160, this.y);
        renderingcontext.restore();
    }
}

function onpress(evt) {
    console.log("click happened");

    switch (currentState){
        case states.splash:
            thehero.jump();
            currentState = states.game;
            break;

        case states.game:
            thehero.jump();
            break;
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
    var inputEvent = "touchstart";
    var windowWidth = $(window).width();
        if(windowWidth < 500){
            width = 320;
            height = 430;
        }
    else{
        width = 400;
        height = 430;
        inputEvent = "mousedown"
    }
    document.addEventListener(inputEvent, onpress);
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
    img.src = "Images/nailedit.png";
    img.onload = function () {
        initSprites(this);
        renderingContext.fillStyle = "#008AC9";
        gameLoop();
    };
}

function gameLoop() {
    update();
    render();
    window.requestAnimationFrame(gameLoop);
}

function update() {
    frames ++;
    if(currentState === states.game){

    }
    thehero.update();
}

function render() {
    renderingContext.fillRect(0, 0, width, height);
    backgroundSprite.draw(renderingContext, 0, 50);
    thehero.draw(renderingContext);
}