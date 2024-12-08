//board

var blockSize = 25;
var rows = 15;
var cols =45;
var board;
var context;

//Kepalanya
var snakeX = blockSize*5;
var snakeY = blockSize*5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//makanan
var foodX;
var foodY;


var gameOver = false;
var gameInterval;
var isPaused = false; // State for pause
var score = 0; // Inisialisasi skor


var snakeX;
var snakeY;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];
var foodX;
var foodY;

var gameOver = false;
var gameInterval;
var score = 0;
var isPaused = false; // Status pause/resume

// Background image
var backgroundImage = new Image();
backgroundImage.src = "img/bg.jpg";
backgroundImage.onload = function () {
    console.log("Background image loaded successfully.");
};


window.onload = function() {
    board = document.getElementById('board');
    board.height = rows*blockSize;
    board.width = cols*blockSize;
    context = board.getContext("2d"); //untuk menggambar di board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setSpeed(); 
    //tombol restart
    document.getElementById("reStart").addEventListener("click", restartGame);
    // Tombol start
    document.getElementById("start").addEventListener("click", startGame);
    //tombol pause
    document.getElementById("pauseButton").addEventListener("click", togglePause);
}

function update() {
    if (gameOver || isPaused) {
        return;
    }

    if (gameOver || isPaused) {
        clearInterval(gameInterval); // Hentikan interval saat game over atau game di-pause
        return;
    }
    

    // Gambar background
    context.drawImage(backgroundImage, 0, 0, board.width, board.height);

    // context.fillStyle ="grey";
    // context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood();
        score++; // Tambah skor saat makanan dimakan
         document.getElementById('score').innerText = "Score: " + score; // Update tampilan skor
    }

    for (let i = snakeBody.length-1; i>0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    
    context.fillStyle="pink";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for(let i =0; i<snakeBody.length;i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    //gameOver Conditions
    if (snakeX < 0 || snakeX > cols * blockSize|| snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        alert(" WKWK MATI KEJEDOT TEMBOK, PECAH PALA KAU :V ")
    }

        for (let i = 0; i <snakeBody.length; i++){
            if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
                gameOver = true;
                alert("YOU DEATH BEACUSE YOURSELF ZZZ")
            }
        }

}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random()* cols) * blockSize;
    foodY = Math.floor(Math.random()* rows) * blockSize;
}

//1. LEVEL SPEED
function setSpeed() {
    const speedLevel = document.getElementById("speed").value;
    var intervalTimes;

    if(speedLevel === "pemula") {
        intervalTimes = 200;
    }
    else if(speedLevel === "pemain") {
        intervalTimes = 130;
    }
    else if(speedLevel === "suhu") {
        intervalTimes = 90;
    }
    else if(speedLevel === "sepuh") {
        intervalTimes = 50;
    }

    if(gameInterval) {
        clearInterval(gameInterval);//menghapus pilihan level sebelumnya
    }
    gameInterval = setInterval(update, intervalTimes);//menggunakan speed yg dipilih
}

//Listen for speed change
document.getElementById("speed").addEventListener('change', setSpeed);

 // Restart the game
function restartGame() {
    // Reset all game variables
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    gameOver = false;
    isPaused = false;
    score = 0; // Reset score
    document.getElementById('score').innerText = "Score: " + score; // Reset score display

    placeFood();
    setSpeed(); // Reset speed yang dipilih
}

// Start game langsung gerak ke kanan
function startGame() {
    // Start game if it's not already started
    if (!gameOver) {
        // Simulate pressing the ArrowRight key (move to the right)
        const event = new KeyboardEvent("keyup", {
            code: "ArrowRight"
        });
        document.dispatchEvent(event);
    }
}

function togglePause() {
    isPaused = !isPaused;
    document.getElementById("pauseButton").innerText = isPaused ? "GO!!!" : "STOP";
}


