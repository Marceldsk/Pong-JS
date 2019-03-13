const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

//piłka
const ballSize = 20;
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;

//rakietka
const racketWidth = 20;
const racketHeight = 100;

//pozycja gracza i ai
const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

//linia dzieląca boisko
const lineWidth = 6;
const lineHeight = 16;

let ballSpeedX = 3;
let ballSpeedY = 3;


function player() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(playerX, playerY, racketWidth, racketHeight);
    if (ballX - racketWidth <= playerX && ballY >= playerY - ballSize && ballY <= playerY + racketHeight) {
        ballSpeedX = -ballSpeedX;
    }
}

function ai() {
    ctx.fillStyle = "red";
    ctx.fillRect(aiX, aiY, racketWidth, racketHeight)
    if (ballX + ballSize >= aiX && ballY <= aiY + racketHeight && ballY >= aiY - ballSize) {
        ballSpeedX = -ballSpeedX;
    }
}

function ball() {

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY + ballSize >= ch) {
        ballSpeedY = -ballSpeedY;
        speedUp();
    }
    if (ballX <= 0 || ballX + ballSize >= cw) {
        ballSpeedX = -ballSpeedX;
        speedUp();
    }

}

function table() {
    //stół
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, cw, ch);
    //linia dzieląca
    ctx.fillStyle = "lightgray"
    for (let linePosition = 20; linePosition < ch; linePosition += 30) {
        ctx.fillStyle = "lightgray"
        ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight)
    }

}


topCanvas = canvas.offsetTop;
console.log(topCanvas)

function playerPosition(e) {
    playerY = e.clientY - topCanvas - racketHeight / 2;
    if (playerY >= ch - racketHeight) {
        playerY = ch - racketHeight
    }
    if (playerY <= 0) {
        playerY = 0;
    }

}

function speedUp() {
    //prędkość X
    if (ballSpeedX > 0 && ballSpeedX < 16) {
        ballSpeedX += .4;
    } else if (ballSpeedX < 0 && ballSpeedX > -16) {
        ballSpeedX -= .4;
    }
    //prędkość Y

    if (ballSpeedY > 0 && ballSpeedY < 16) {
        ballSpeedY += .3;
    } else if (ballSpeedY < 0 && ballSpeedY > -16) {
        ballSpeedY -= .3;
    }

}

//AI
function aiPosition() {
    let middleRacket = aiY + racketHeight / 2;
    let middleBall = ballY + ballSize / 2;

    if (ballX > 500) {
        if (middleRacket - middleBall > 200) {
            aiY -= 20;

        } else if (middleRacket - middleBall > 50) {
            aiY -= 10;
        } else if (middleRacket - middleBall < -200) {
            aiY += 20;
        } else if (middleRacket - middleBall < -50) {
            aiY += 10;
        }


    } else if (ballX <= 500 && ballX > 150) {
        if (middleRacket - middleBall > 100) {
            aiY -= 3;
        } else if (middleRacket - middleBall < -100) {
            aiY += 3;
        }
    }
}

canvas.addEventListener("mousemove", playerPosition)

function game() {
    table()
    ball()
    player()
    ai()
    aiPosition()
}
setInterval(game, 16.6)
