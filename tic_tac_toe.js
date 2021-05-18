const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//players
const playerOne = "X";
const playerTwo = "O";

let player = playerOne;

//create board
const board = new Array(9);
for (var i = 0; i < board.length; i++) {
  board[i] = i + 1;
}

//display board
function printBoard() {
  let printableBoard = [];
  for (slice = 0; slice < board.length; ) {
    const row = board.slice(slice, (slice += 3)).join(" | ") + "\n";
    printableBoard.push(row);
  }
  console.log(printableBoard.join("----------\n"));
}

//game loop
function playGame() {
  let gameOn = false;
  for (i = 0; i < board.length; i++) {
    if (board[i] !== "X" || board[i] !== "O") {
      gameOn = true;
    }
  }

  if (gameOn) {
    rl.question("Play your move: ", function (pos) {
      playMove(pos);
    });
  }
}

//play move and change players
function playMove(pos) {
  let actualPosition = pos - 1;
  //console.log(checkIsInt(actualPosition))

  //checks if postion is taken
  if (!checkAvailable(actualPosition)) {
    console.log("Position taken! Please pick available position ");
  }

  //check if entered position is valid
  if (!checkIsInt(pos)) {
      console.log("Enter a valid position between 1-9 ")
  }

  let i;
  for (i = 0; i < board.length; i++) {
    if (actualPosition == i && checkAvailable(actualPosition) && checkIsInt(actualPosition)) {
      board[i] = player;
      if (player === playerOne) {
        player = playerTwo;
      } else if (player === playerTwo) {
        player = playerOne;
      }
    }
    playGame();
  }

  console.log("\n");
  printBoard();

  const winner = checkWinner();
  if (winner !== " ") {
    console.log(`${winner} is the winner!`);
    process.exit(0);
  }
  playGame();
}

//checks if the position available
function checkAvailable(pos) {
  return board[pos] !== "X" && board[pos] !== "O";
}

//checks if position entered is a number or is more than length of array
function checkIsInt(pos) {
  if (isNaN(pos) || pos > 8) {
    return false;
  }
  return true;
}

//check for winner
function checkWinner() {
  if (board[0] === board[1] && board[0] === board[2]) {
    return board[0];
  } else if (board[3] === board[4] && board[3] === board[5]) {
    return board[3];
  } else if (board[6] === board[7] && board[6] === board[8]) {
    return board[6];
  } else if (board[0] === board[3] && board[0] === board[6]) {
    return board[0];
  } else if (board[1] === board[4] && board[1] === board[7]) {
    return board[1];
  } else if (board[2] === board[5] && board[2] === board[8]) {
    return (winner = board[2]);
  } else if (board[0] === board[4] && board[0] === board[8]) {
    return board[0];
  } else if (board[2] === board[4] && board[2] === board[6]) {
    return board[2];
  }
  return ' ';
}

printBoard();
playGame();
