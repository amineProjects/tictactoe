import Phaser from "phaser";

let width = 600,
  height = 600,
  backgroundColor = "#fff";
const config = {
  type: Phaser.AUTO,
  backgroundColor,
  width,
  height,
  scene: {
    preload,
    create
  }
};

let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  boardLength = board.length,
  human = "X",
  computer = "O",
  players = { X: "player", O: "computer" },
  notAvailable = [],
  currentPlayer = human,
  gameOver = { isOver: false, winner: "" };

const game = new Phaser.Game(config);

function preload() {}

function create() {
  let cellWidth = width / boardLength;
  let cellHeight = height / boardLength;
  //create board
  let grid = this.add
    .grid(0, 0, width, height, cellWidth, cellHeight, 0x00b9f2)
    .setAltFillStyle(0x016fce)
    .setOutlineStyle()
    .setOrigin(0, 0);
  grid.setInteractive();
  grid.on("pointerup", humanPlay(cellWidth, cellHeight, this, grid), this);
  console.log(grid);
}

const humanPlay = (cellWidth, cellHeight, scene, grid) => (pointer, x, y) => {
  if (currentPlayer === computer) return;

  let cellPosition = getCellPosition(x, y, cellWidth, cellHeight);
  console.log(x, y, cellPosition, notAvailable);
  if (!isNotAvailable(notAvailable, cellPosition)) return;
  notAvailable = setNotAvailable(notAvailable, cellPosition);
  console.log(notAvailable, scene);
  playMove(scene, cellWidth, cellHeight, human, cellPosition);
  if (gameOver.isOver) return endGame(gameOver, scene, grid);
  currentPlayer = computer;
  computerPlay(notAvailable, scene, cellWidth, cellHeight, grid);
};

const computerPlay = (notAvailableMove, scene, cellWidth, cellHeight, grid) => {
  if (notAvailable.length === 9 || currentPlayer === human) return;
  let cellPosition = nextMove(boardLength);

  if (!isNotAvailable(notAvailableMove, cellPosition)) {
    return computerPlay(notAvailableMove, scene, cellWidth, cellHeight);
  }
  notAvailable = setNotAvailable(notAvailableMove, cellPosition);
  console.log(notAvailable);
  playMove(scene, cellWidth, cellHeight, computer, cellPosition);
  if (gameOver.isOver) return endGame(gameOver, scene, grid);
  currentPlayer = human;
};

const nextMove = board => {
  return [Phaser.Math.RND.between(1, board), Phaser.Math.RND.between(1, board)];
};

const playMove = (scene, cellWidth, cellHeight, player, cellPosition) => {
  console.log(scene);
  scene.add
    .text(
      cellWidth * cellPosition[0] - cellWidth / 2,
      cellHeight * cellPosition[1] - cellHeight / 2,
      player,
      { fontSize: "166px" }
    )
    .setOrigin(0.5);
  board[cellPosition[1] - 1][cellPosition[0] - 1] = player;
  console.log(winCondition(board));
  gameOver = winCondition(board, gameOver);
};

const getCellPosition = (x, y, cellWidth, cellHeight) => {
  return [Math.ceil(x / cellWidth), Math.ceil(y / cellHeight)];
};
const setNotAvailable = (notAvailable, cellPosition) => {
  return [...notAvailable, cellPosition];
};
const isNotAvailable = (notAvailable, cellPosition) => {
  if (notAvailable.length === 0) return true;
  return !notAvailable.some(cp => {
    console.log(
      "inside isAvailable",
      cp[0] === cellPosition[0] && cp[1] === cellPosition[1]
    );
    return cp[0] === cellPosition[0] && cp[1] === cellPosition[1];
  });
};

const winCondition = (board, gameOver) => {
  console.log(board);
  for (let row = 0; row < board.length; row++) {
    if (
      board[row][0] === board[row][1] &&
      board[row][1] === board[row][2] &&
      board[row][0] !== ""
    ) {
      return { isOver: true, winner: players[board[row][0]], row: "r" };
    }
  }
  for (let column = 0; column < board.length; column++) {
    if (
      board[0][column] === board[1][column] &&
      board[1][column] === board[2][column] &&
      board[0][column] !== ""
    ) {
      return { isOver: true, winner: players[board[0][column]], c: "col" };
    }
  }

  if (
    (board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== "") ||
    (board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== "")
  ) {
    return { isOver: true, winner: players[board[1][1]], d: "d" };
  }
  return gameOver;
};

const endGame = (gameOver, scene, grid) => {
  scene.add.rectangle(width / 2, height / 2, width, height, 0x000, 0.5);
  let text = scene.add.text(
    10,
    height / 2,
    `${gameOver.winner} is the winner`,
    {
      fontSize: "32pt"
    }
  );
  grid.off("pointerup");
};
