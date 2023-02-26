let TILES = 4;
const LEVELS = 4;
const STROKE_FACTOR = 5;
const DIFF_TILES = 5;
const ALPHA = 255;
const COL1 = [0,0,80,255];
const COL2 = [0,100,0,255];
const BG = [0,0,0,0];


let MAX_DEPTH = 3;

let shape1, shape2, shape3, shape4, shape5, shape6, shape7, shape8, shape9, shape10, shape11, shape12, shape13, shape14;

function setup() {
  createCanvas(800, 800);
  // frameRate(1);
  noLoop();
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
  let scale_size = size*(5/3);

  shape1 = createGraphics(scale_size, scale_size);
  classic(shape1);

  shape2 = createGraphics(scale_size, scale_size);
  rotateShape(shape2,PI/2)
  classic(shape2);

  //DIVISION TILES
  shape3 = createGraphics(scale_size, scale_size);
  division(shape3)

  shape4 = createGraphics(scale_size, scale_size);

  rotateShape(shape4,PI/2)  
  division(shape4);

  //FOUR DOTS TILE
  shape5 = createGraphics(scale_size, scale_size);
  dots(shape5);

  //X TILE
  shape6 = createGraphics(scale_size, scale_size);
  bix(shape6);

  //FROWN TILES
  shape7 = createGraphics(scale_size, scale_size);
  frown(shape7);

  shape8 = createGraphics(scale_size, scale_size);
  rotateShape(shape8,PI/2);
  frown(shape8);

  shape9 = createGraphics(scale_size, scale_size);
  rotateShape(shape9,PI)  
  frown(shape9);

  shape10 = createGraphics(scale_size, scale_size);
  rotateShape(shape10,1.5*PI)  
  frown(shape10);

  //T TILES
  shape11 = createGraphics(scale_size, scale_size);
  tShape(shape11);

  shape12 = createGraphics(scale_size, scale_size);
  rotateShape(shape12,PI/2)  
  tShape(shape12);
  
  shape13 = createGraphics(scale_size, scale_size);
  rotateShape(shape13,PI)  
  tShape(shape13);

  shape14 = createGraphics(scale_size, scale_size);
  rotateShape(shape14,1.5*PI)  
  tShape(shape14);

  let shapes = [shape1, shape2, shape3, shape4, shape5, shape6, shape7, shape8, shape9, shape10, shape11, shape12, shape13, shape14];
  let randIndex = Math.floor(Math.random() * shapes.length);

  img = image(shapes[randIndex],x+size/2,y+size/2);
}
