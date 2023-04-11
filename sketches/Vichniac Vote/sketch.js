// set up canvas size and colors
const canvasWidth = 800;
const canvasHeight = 800;
const cellColor = [256, 0, 0];

// set up grid size and cell size
const gridSize = 400;
const cellSize = canvasWidth / gridSize;

// initialize the grid with random values
let grid = [];
for (let i = 0; i < gridSize; i++) {
  grid[i] = [];
  for (let j = 0; j < gridSize; j++) {
    grid[i][j] = Math.random() < 0.5 ? 0 : 1;
  }
}

let BG_COLOR;
let BLOCK_COLOR;
let MAIN_COLOR;


function setup() {
  // create the canvas
  createCanvas(canvasWidth, canvasHeight);
  colorMode(HSB,360);
  MAIN_COLOR = color(random(0,360),200,300);
  BLOCK_COLOR = random(getAnalogousColors(MAIN_COLOR));
  BG_COLOR = color(hue(MAIN_COLOR),100,200);

  background(BG_COLOR);
  // set the background color
  noStroke();
  drawGrid();
  frameRate(2);
}

function draw() {
  background(BG_COLOR);
  updateGrid();
  drawGrid();
}

function updateGrid() {
  // create a copy of the grid
  let newGrid = [];
  for (let i = 0; i < gridSize; i++) {
    newGrid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      newGrid[i][j] = 0;
    }
  }

  // update each cell
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // get the neighbors of the cell
      let vote = getNeighborsVote(i, j);
      newGrid[i][j] = vote;
    }
  }

  // update the grid
  grid = newGrid
}

function drawGrid() {
  // set the cell color
  fill(cellColor);

  // draw each cell
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] == 1) {
        fill(BLOCK_COLOR);
        rect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
    }
  }
}


function getNeighborsVote(i, j) {
  // get the indices of the neighbors of the cell at (i, j)
  let count0 = 0;
  let count1 = 0;

  if (i > 0) {
    if (grid[i - 1][j] == 0){
      count0++;
    }
    else{
      count1++;
    }
  }
  if (i < gridSize - 1) {
    if (grid[i + 1][j] == 0){
      count0 ++;
    }
    else{
      count1 ++;
    }
  }
  if (j > 0) {
    if (grid[i][j-1] == 0){
      count0 ++;
    }
    else{
      count1 ++;
    }
  }
  if (j < gridSize - 1) {
    if (grid[i][j + 1] == 0){
      count0 ++;
    }
    else{
      count1 ++;
    }
  }

  if (grid[i][j] == 0){
    count0 ++;
  }
  else{
    count1 ++;
  }

  if (count0 > count1){
    return 0;
  }
  else {
    return 1;
  }
}


function getAnalogousColors(myColor) {
  let colors = [];
  
  // Calculate the hues of the 6 analogous colors
  let myHue = hue(myColor);
  let hues = [];
  hues.push(myHue - 60);
  hues.push(myHue - 30);
  hues.push(myHue - 15);
  hues.push(myHue + 15);
  hues.push(myHue + 30);
  hues.push(myHue + 60);
  
  // Normalize the hues to be within the range of 0 to 360
  for (let i = 0; i < hues.length; i++) {
    hues[i] = (hues[i] + 360) % 360;
  }
  
  // Convert the hues, saturation, and brightness to RGB hex codes
  for (let i = 0; i < hues.length - 1; i++) {
    colors.push(color(hues[i], saturation(myColor), brightness(myColor)));
  }

  colors.push(color(hues.slice(-1)[0] , saturation(myColor), 50));

  colors.push(color("#ffffff"));
  
  return colors;
}
