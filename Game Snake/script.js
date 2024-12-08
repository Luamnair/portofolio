var blockSize = 25;
var rows = 15;
var cols = 45;
var board;
var context;

// Snake variables
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];

// Food variables
var foodX;
var foodY;

// Game variables
var gameOver = false;
var gameInterval;
var isPaused = false;
var score = 0;

// Background image
var backgroundImage = new Image();
backgroundImage.src = "img/bg.jpg";

backgroundImage.onload = function () {
    console.log("Background image loaded successfully.");
};

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);

    // Tombol kontrol
    document.getElementById("reStart").addEventListener("click", restartGame);
    document.getElementById("start").addEventListener("click", startGame);
    document.getElementById("pauseButton").addEventListener("click", togglePause);

    // Tombol panah untuk layar kecil
    document.getElementById("up").addEventListener("click", () => moveSnake("up"));
    document.getElementById("down").addEventListener("click", () => moveSnake("down"));
    document.getElementById("left").addEventListener("click", () => moveSnake("left"));
    document.getElementById("right").addEventListener("click", () => moveSnake("right"));

    setSpeed();
};

function update() {
    if (gameOver || isPaused) {
        return;
    }

    // Draw background
    context.drawImage(backgroundImage, 0, 0, board.width, board.height);

    // Draw food
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Snake eats food
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        document.getElementById("score").innerText = "Score: " + score;
    }

    // Move snake body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Update snake head position
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    // Draw snake
    context.fillStyle = "pink";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Check for game over
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        alert(" WKWK MATI KEJEDOT TEMBOK, PECAH PALA KAU :V ");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("YOU DEATH BECAUSE YOURSELF ZZZ");
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function moveSnake(direction) {
    if (direction === "up" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (direction === "down" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (direction === "left" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (direction === "right" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function setSpeed() {
    const speedLevel = document.getElementById("speed").value;
    let intervalTimes;

    if (speedLevel === "pemula") {
        intervalTimes = 200;
    } else if (speedLevel === "pemain") {
        intervalTimes = 130;
    } else if (speedLevel === "suhu") {
        intervalTimes = 90;
    } else if (speedLevel === "sepuh") {
        intervalTimes = 50;
    }

    if (gameInterval) {
        clearInterval(gameInterval);
    }
    gameInterval = setInterval(update, intervalTimes);
}

document.getElementById("speed").addEventListener("change", setSpeed);

function restartGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    gameOver = false;
    isPaused = false;
    score = 0;
    document.getElementById("score").innerText = "Score: " + score;

    placeFood();
    setSpeed();
}

function startGame() {
    if (!gameOver) {
        const event = new KeyboardEvent("keyup", { code: "ArrowRight" });
        document.dispatchEvent(event);
    }
}

function togglePause() {
    isPaused = !isPaused;
    document.getElementById("pauseButton").innerText = isPaused ? "GO!!!" : "STOP";
}
