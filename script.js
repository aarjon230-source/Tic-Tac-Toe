const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameActive = true;

let playerX = "Player X";
let playerO = "Player O";

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

/* NAME SCREEN */
function startGame() {
  playerX = document.getElementById("playerX").value || "Player X";
  playerO = document.getElementById("playerO").value || "Player O";

  document.getElementById("nameScreen").style.display = "none";
  statusText.textContent = `${playerX}'s Turn (X)`;
}

/* CLICK / TAP */
cells.forEach(cell => {
  cell.addEventListener("click", handleMove);
  cell.addEventListener("touchstart", handleMove);
});

function handleMove(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  vibrate();

  if (checkWin()) {
    const winner = currentPlayer === "X" ? playerX : playerO;
    statusText.textContent = `${winner} Wins! 🎉`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  const turnName = currentPlayer === "X" ? playerX : playerO;
  statusText.textContent = `${turnName}'s Turn (${currentPlayer})`;
}

/* WIN CHECK */
function checkWin() {
  return winPatterns.some(p => {
    const [a,b,c] = p;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

/* RESET */
function resetGame() {
  board = ["","","","","","","","",""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = `${playerX}'s Turn (X)`;
  cells.forEach(c => c.textContent = "");
}

/* BUTTON */
restartBtn.addEventListener("click", resetGame);

/* 🔥 SWIPE DOWN GESTURE */
let startY = 0;

document.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", e => {
  let endY = e.changedTouches[0].clientY;

  if (endY - startY > 80) {
    resetGame();
    statusText.textContent = "Reset by swipe 🔄";
  }
});

/* vibration (mobile feel) */
function vibrate() {
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
}