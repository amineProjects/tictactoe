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
  computer = "O";

const game = new Phaser.Game(config);

function preload() {}

function create() {
  let cellWidth = width / board.length;
  let cellHeight = height / board.length;
  console.log(cellHeight, cellWidth, width, height);
  //create board
  this.add
    .grid(0, 0, width, height, cellWidth, cellHeight, 0x00b9f2)
    .setAltFillStyle(0x016fce)
    .setOutlineStyle()
    .setOrigin(0, 0);
}
