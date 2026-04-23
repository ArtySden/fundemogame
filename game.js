let score = 0;

document.addEventListener("DOMContentLoaded", function () {
  const player = document.querySelector(".game-player");
  const gameContainer = document.querySelector(".game-container");
  const gameWidth = gameContainer.clientWidth;
  const gameHeight = gameContainer.clientHeight;

  let playerX = gameWidth / 2 - 20;
  let playerY = gameHeight / 2 - 20;

  player.style.left = `${playerX}px`;
  player.style.top = `${playerY}px`;

  player.dataset.moveWidth = gameWidth;
  player.dataset.moveHeight = gameHeight;

  spawnStar();
  setInterval(spawnStar, 3000);
});

document.addEventListener("keydown", function (event) {
  const player = document.querySelector(".game-player");
  const moveWidth = parseFloat(player.dataset.moveWidth);
  const moveHeight = parseFloat(player.dataset.moveHeight);

  let playerX = parseInt(player.style.left);
  let playerY = parseInt(player.style.top);

  switch (event.key) {
    case "ArrowUp":
      if (playerY > 0) {
        playerY -= 10;
      }
      break;
    case "ArrowDown":
      if (playerY < moveHeight - 40) {
        playerY += 10;
      }
      break;
    case "ArrowLeft":
      if (playerX > 0) {
        playerX -= 10;
      }
      break;
    case "ArrowRight":
      if (playerX < moveWidth - 40) {
        playerX += 10;
      }
      break;
    default:
      return;
  }

  player.style.left = `${playerX}px`;
  player.style.top = `${playerY}px`;

  collectStars();
});

function spawnStar() {
  const star = document.createElement("div");
  star.classList.add("star");

  const gameContainer = document.querySelector(".game-container");
  const gameWidth = gameContainer.clientWidth;
  const gameHeight = gameContainer.clientHeight;

  const starX = Math.random() * (gameWidth - 25);
  const starY = Math.random() * (gameHeight - 25);

  star.style.left = `${starX}px`;
  star.style.top = `${starY}px`;

  gameContainer.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 5000);
}

function collectStars() {
  const player = document.querySelector(".game-player");
  const stars = document.querySelectorAll(".star");
  const scoreBox = document.getElementById("score-box");

  stars.forEach((star) => {
    const starRect = star.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      playerRect.x < starRect.x + starRect.width &&
      playerRect.x + playerRect.width > starRect.x &&
      playerRect.y < starRect.y + starRect.height &&
      playerRect.y + playerRect.height > starRect.y
    ) {
      star.remove();
      score++;
      scoreBox.value = score;
    }
  });
}
