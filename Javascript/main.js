var width,
    height,
    currentState,
    frames = 0,
    theContainer,
    thehero,
    score = 0,
    highscore = localStorage.getItem("highscore");

var states = {
    splash: 0,
    game: 1,
    score: 2
};
var canvas;
var renderingContext;
function containerGroup() {
    this.collection = [];
    this.reset = function () {
        this.collection = [];
    }
    this.add = function () {
        this.collection.push(new Container());
    };
    this.update = function () {
        if(frames % 100 === 0){
            this.add();
        }
        for(var i = 0, len = this.collection.length; i < len; i ++){
            var container = this.collection[i];
            if(i === 0){
                container.detectCollision();
            }
            container.x -= 2;
            if(container.x < -container.width){
                this.collection.splice(i, 1);
                i--;
                len --;
            }
        }
    };
    this.draw = function () {
        for (var i = 0, len = this.collection.length; i < len; i ++){
            var container = this.collection[i];
            container.draw();
        }
    }
}
function Container() {
    this.x = 400;
    this.y = 310;
    this.width = containerSprite.width;
    this.height = containerSprite.height;
    this.detectCollision = function () {
        if (this.x <= (thehero.x + thehero.width) && this.x >= thehero.x && thehero.y >= 140)
        {
            console.log("You're Dead");
            switch (currentState){
                case states.game:
                    currentState = states.score;
                    sethighscore();
                    sully[0].draw(renderingcontext, this.x, this.y);
                    break;
            }
        }
        else
        {
            score ++;
            document.getElementById('score').innerHTML = score;
        }
    };
    this.draw = function () {
        containerSprite.draw(renderingContext, this.x, this.y);
    }
}
function Sully() {
    this.x = 35;
    this.y = 170;
    this.width = 80;
    this.height = 55;
    this.frame = 0;
    this.velocity = 0;
    this.animation = [0, 1, 2];
    this.rotation = 0;
    this.radius = 12;
    this.gravity = 0.2;
    this._jump = 4.6;
    this.jumpcount = 10;
    this.jump = function () {
        if(this.jumpcount > 0){
            this.velocity = -this._jump;
            this.jumpcount--;
        }
    };
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
    };
    this.updateIdleHero = function () {

    };
    this.updatePlayingHero = function () {
        this.velocity += this.gravity;
        this.y += this.velocity;
        if(this.y >= 170){
            this.y = 170;
            this.jumpcount = 10;
            this.velocity = this._jump;
        }


    };
    this.draw = function (renderingcontext) {
        renderingcontext.save();
        renderingcontext.translate(this.x, this.y);
        renderingcontext.rotate(this.rotation);
        var S = this.animation[this.frame];
        sully[S].draw(renderingcontext, this.x, this.y);
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
    document.body.appendChild(canvas);
    loadGraphics();
    thehero = new Sully();
    theContainer = new containerGroup();
    document.getElementById('highscore').innerHTML = highscore;

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
    img.src = "Images/sullysprite.png";
    img.onload = function () {
        initSprites(this);
        renderingContext.fillStyle = "#1f1f1f";
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
        theContainer.update();
    }
    thehero.update();
}
function render() {
    renderingContext.fillRect(0, 0, width, height);
    backgroundSprite.draw(renderingContext, 0, 50);
    theContainer.draw(renderingContext);
    thehero.draw(renderingContext);
}

function restart() {
    location.reload();
}



function sethighscore() {
    if(highscore !== null){
        if (score > highscore) {
            localStorage.setItem("highscore", score);
        }
    }
    else{
        localStorage.setItem("highscore", score);
    }
}
