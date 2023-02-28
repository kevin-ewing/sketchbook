// Based off of https://christophercarlson.com/portfolio/multi-scale-truchet-patterns/
// and https://archive.bridgesmathart.org/2018/bridges2018-39.html

const STROKE_FACTOR = 5;
const COL1 = [0,0,80,255];
const COL2 = [0,100,0,255];
const BG = [0,0,0,0];

const SIZE = 400

let TEMP_HUE = 0;

let MAX_DEPTH = 5;

let shape1, shape2, shape3, shape4, shape5, shape6, shape7, shape8, shape9, shape10, shape11, shape12, shape13, shape14;
let shapes;

function setup() {
  createCanvas(SIZE*2, SIZE*2);
  // frameRate(1);
  noLoop();

  shape1 = createGraphics(SIZE, SIZE);
  classic(shape1);

  shape2 = createGraphics(SIZE, SIZE);
  rotateShape(shape2,PI/2)
  classic(shape2);

  //DIVISION TILES
  shape3 = createGraphics(SIZE, SIZE);
  division(shape3)

  shape4 = createGraphics(SIZE, SIZE);

  rotateShape(shape4,PI/2)  
  division(shape4);

  //FOUR DOTS TILE
  shape5 = createGraphics(SIZE, SIZE);
  dots(shape5);

  //X TILE
  shape6 = createGraphics(SIZE, SIZE);
  bix(shape6);

  //FROWN TILES
  shape7 = createGraphics(SIZE, SIZE);
  frown(shape7);

  shape8 = createGraphics(SIZE, SIZE);
  rotateShape(shape8,PI/2);
  frown(shape8);

  shape9 = createGraphics(SIZE, SIZE);
  rotateShape(shape9,PI)  
  frown(shape9);

  shape10 = createGraphics(SIZE, SIZE);
  rotateShape(shape10,1.5*PI)  
  frown(shape10);

  //T TILES
  shape11 = createGraphics(SIZE, SIZE);
  tShape(shape11);

  shape12 = createGraphics(SIZE, SIZE);
  rotateShape(shape12,PI/2)  
  tShape(shape12);
  
  shape13 = createGraphics(SIZE, SIZE);
  rotateShape(shape13,PI)  
  tShape(shape13);

  shape14 = createGraphics(SIZE, SIZE);
  rotateShape(shape14,1.5*PI)  
  tShape(shape14);

  shapes = [shape1, shape2, shape3, shape4, shape5, shape6, shape7, shape8, shape9, shape10, shape11, shape12, shape13, shape14]
}

function draw() {
    background(BG);
    drawTilesRec(0, 0, width, MAX_DEPTH);
}



function rotateShape(shape, angle){
  shape.translate(shape.width/2, shape.height/2);
  shape.rotate(angle);
  shape.translate(-shape.height/2, -shape.height/2);
}

function baseShape(shape){
  shape.noStroke();
  shape.rectMode(CENTER);
  shape.fill(COL1);
  shape.rect(shape.width/2, shape.height/2,shape.width*(3/5),shape.height*(3/5));
  shape.circle(shape.width*(1/5), shape.height*(1/5), (shape.height)*(2/5));
  shape.circle(shape.width*(1/5), shape.height*(4/5), (shape.height)*(2/5));
  shape.circle(shape.width*(4/5), shape.height*(1/5), (shape.height)*(2/5));
  shape.circle(shape.width*(4/5), shape.height*(4/5), (shape.height)*(2/5));
  shape.noFill();
  shape.stroke(COL2);
  shape.strokeWeight(shape.width/STROKE_FACTOR);

  // shape.strokeWeight(1)
  // shape.stroke("Black")
  // shape.fill("RED");
  // shape.rect(shape.width/2, shape.height/2,shape.width*(3/5),shape.height*(3/5));
  // shape.noStroke();
}


function classic(shape){
  baseShape(shape);
  shape.arc(shape.width*(1/5), shape.height*(1/5), shape.width*(3/5), shape.height*(3/5), 0, PI/2);
  shape.arc(shape.width*(4/5), shape.height*(4/5), shape.width*(3/5), shape.height*(3/5), PI, 1.5*PI);
}

function division(shape){
  baseShape(shape);
  shape.line(shape.width*(1/5), shape.height*(1/2), shape.width*(4/5), shape.height*(1/2));
  shape.point(shape.width*(1/2), shape.height*(1/5));
  shape.point(shape.width*(1/2), shape.height*(4/5));
}

function dots(shape){
  baseShape(shape);
  shape.point(shape.width*(1/2), shape.height*(1/5));
  shape.point(shape.width*(1/2), shape.height*(4/5));
  shape.point(shape.width*(1/5), shape.height*(1/2));
  shape.point(shape.width*(4/5), shape.height*(1/2));
}

function bix(shape){
  baseShape(shape);
  shape.line(shape.width*(1/5), shape.height*(1/2), shape.width*(4/5), shape.height*(1/2));
  shape.line(shape.width*(1/2), shape.height*(1/5), shape.width*(1/2), shape.height*(4/5));
}

function frown(shape){
  baseShape(shape);
  shape.arc(shape.width*(1/5), shape.height*(1/5), shape.width*(3/5), shape.height*(3/5), 0, PI/2);
  shape.point(shape.width*(1/2), shape.height*(4/5));
  shape.point(shape.width*(4/5), shape.height*(1/2));
}

function tShape(shape){
  baseShape(shape);
  shape.line(shape.width*(1/5), shape.height*(1/2), shape.width*(4/5), shape.height*(1/2));
  shape.line(shape.width*(1/2), shape.height*(1/5), shape.width*(1/2), shape.height*(1/2));
  shape.point(shape.width*(1/2), shape.height*(4/5));
}

function drawTilesRec(x,y, size, maxDepth){
  if(random()>0.1 && maxDepth>0){
    drawTilesRec(x,y, size/2, maxDepth-1);
    drawTilesRec(x+size/2,y+size/2, size/2, maxDepth-1);
    drawTilesRec(x,y+size/2, size/2, maxDepth-1);
    drawTilesRec(x+size/2,y, size/2, maxDepth-1);

  }
  else{
    drawShape(x,y,size)
  }
}

function drawShape(x,y,size){
  //FIRST TWO TILES
  imageMode(CENTER)
  // let SIZE = size*(5/3);


  let randIndex = Math.floor(Math.random() * shapes.length);

  myImg = shapes[randIndex].get();
  myImg.resize(size*(5/3), size*(5/3));
  image(myImg, x+size/2,y+size/2);
}
