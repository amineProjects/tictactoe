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
  human = "X",
  computer = "O",
  notAvailable = [],
  currentPlayer = human;

const game = new Phaser.Game(config);

function preload() {}

function create() {
  let cellWidth = width / board.length;
  let cellHeight = height / board.length;
  //create board
  let grid = this.add
    .grid(0, 0, width, height, cellWidth, cellHeight, 0x00b9f2)
    .setAltFillStyle(0x016fce)
    .setOutlineStyle()
    .setOrigin(0, 0);
  grid.setInteractive();
  grid.on("pointerup", humanPlay(cellWidth, cellHeight, this), this);
  console.log(grid);
}

const humanPlay = (cellWidth, cellHeight, secne) => (pointer, x, y) => {
  if (currentPlayer === computer) return;

  let cellPosition = getCellPosition(x, y, cellWidth, cellHeight);
  console.log(x, y, cellPosition, notAvailable);
  if (!isNotAvailable(notAvailable, cellPosition)) return;
  notAvailable = setNotAvailable(notAvailable, cellPosition);
  console.log(notAvailable);
  secne.add
    .text(
      cellWidth * cellPosition[0] - cellWidth / 2,
      cellHeight * cellPosition[1] - cellHeight / 2,
      human,
      { fontSize: "166px" }
    )
    .setOrigin(0.5);
  currentPlayer = computer;
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
