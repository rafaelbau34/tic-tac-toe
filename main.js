const cells = document.querySelectorAll(".cell");
const gameStatus = document.querySelector(".gameStatus");
const restartBtn = document.querySelector(".restart");
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "X";
let hasStarted = false;
let cellContent = ["", "", "", "", "", "", "", "", ""];

startGame();

function startGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClick));
  restartBtn.addEventListener("click", restartGame);
  gameStatus.textContent = `${currentPlayer}'s turn`;
  hasStarted = true;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  gameStatus.textContent = `${currentPlayer}'s turn`;
}

function cellClick() {
  const cellIndex = this.getAttribute("cellIndex");

  if (cellContent[cellIndex] != "" || !hasStarted) {
    return;
  }

  cellUpdate(this, cellIndex);
  whoWon();
}

function cellUpdate(cell, index) {
  cellContent[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function whoWon() {
  let hasWon = false;
  for (let i = 0; i < winPatterns.length; i++) {
    const each = winPatterns[i];
    const each1 = cellContent[each[0]];
    const each2 = cellContent[each[1]];
    const each3 = cellContent[each[2]];

    if (each1 == "" || each2 == "" || each3 == "") {
      continue;
    }

    if (each1 == each2 && each2 == each3) {
      hasWon = true;
      break;
    }
  }

  if (hasWon) {
    gameStatus.textContent = `${currentPlayer} wins!`;
    hasStarted = false;
  } else if (!cellContent.includes("")) {
    gameStatus.textContent = "It's a draw!";
    hasStarted = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  cellContent = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.textContent = ""));
  gameStatus.textContent = `${currentPlayer}'s turn`;
  hasStarted = true;
}
