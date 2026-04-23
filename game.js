let score = 0;

document.addEventListener("DOMContentLoaded", function () {
    const player = document.querySelector(".game-player");
    const gameContainer = document.querySelector(".game-container");
    const gameWidth = gameContainer.clientWidth;
    const gameHeight = gameContainer.clientHeight;

    let playerX = gameWidth / 2 - 25;
    let playerY = gameHeight / 2 - 25;

    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;

    player.dataset.moveWidth = gameWidth;
    player.dataset.moveHeight = gameHeight;

    spawnTanjiro();
    setInterval(spawnTanjiro, 3000);
});

document.addEventListener("keydown", function (event) {
    const player = document.querySelector(".game-player");
    const moveWidth = parseFloat(player.dataset.moveWidth);
    const moveHeight = parseFloat(player.dataset.moveHeight);

    let playerX = parseInt(player.style.left);
    let playerY = parseInt(player.style.top);

    switch (event.key) {
        case "ArrowUp":
            if (playerY > 0) playerY -= 10;
            break;
        case "ArrowDown":
            if (playerY < moveHeight - 50) playerY += 10;
            break;
        case "ArrowLeft":
            if (playerX > 0) playerX -= 10;
            break;
        case "ArrowRight":
            if (playerX < moveWidth - 50) playerX += 10;
            break;
        default:
            return;
    }

    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;

    collectTanjiros();
});

function spawnTanjiro() {
    const tanjiro = document.createElement("div");
    tanjiro.classList.add("tanjiro");

    const gameContainer = document.querySelector(".game-container");
    const gameWidth = gameContainer.clientWidth;
    const gameHeight = gameContainer.clientHeight;

    const tanjiroX = Math.random() * (gameWidth - 40);
    const tanjiroY = Math.random() * (gameHeight - 40);

    tanjiro.style.left = `${tanjiroX}px`;
    tanjiro.style.top = `${tanjiroY}px`;

    gameContainer.appendChild(tanjiro);

    setTimeout(() => {
        tanjiro.remove();
    }, 5000);
}

function collectTanjiros() {
    const player = document.querySelector(".game-player");
    const tanjiros = document.querySelectorAll(".tanjiro");
    const scoreBox = document.getElementById("score-box");

    tanjiros.forEach((tanjiro) => {
        const tanjiroRect = tanjiro.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        if (
            playerRect.x < tanjiroRect.x + tanjiroRect.width &&
            playerRect.x + playerRect.width > tanjiroRect.x &&
            playerRect.y < tanjiroRect.y + tanjiroRect.height &&
            playerRect.y + playerRect.height > tanjiroRect.y
        ) {
            tanjiro.remove();
            score++;
            scoreBox.value = score;
        }
    });
}