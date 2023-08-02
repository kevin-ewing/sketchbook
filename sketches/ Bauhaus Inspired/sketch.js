// Inspired by https://www.vecteezy.com/vector-art/2764586-abstract-bauhaus-geometric-background-illustration-colorful-mural-geometric-shapes-flat-design-free-vector
const NUM_HORIZ = 5;
const NUM_VERT = 7;
const BOARDER = 50;
const LINE_ODDS = 0.1;
const ARC_LINE_ODDS = 0.25;

// let BG_COLOR = "#009774";
// let COLOR_ARRAY = ["#ffffff","#004c71","#4fc8ce","#102154","#025346","#1e1127"];

let BG_COLOR;
let COLOR_ARRAY;
let MAIN_COLOR;

function setup() {
  createCanvas(600, 800);
  colorMode(HSB,360);
  MAIN_COLOR = color(random(0,360),200,300);
  COLOR_ARRAY = getAnalogousColors(MAIN_COLOR);
  BG_COLOR = color(hue(MAIN_COLOR),100,200);
  // noLoop()
}

function draw() {
  background(BG_COLOR);
  const boardSize = (width - BOARDER*2)/NUM_HORIZ;

  for (let x = 1; x <= NUM_HORIZ; x ++){
    for (let y = 1; y <= NUM_VERT; y ++){
      myArc(x*boardSize,y*boardSize,boardSize,random(COLOR_ARRAY),random([0, PI/2, PI, (3*PI)/2]));

      if (random()< LINE_ODDS){
        myLines(x*boardSize,y*boardSize,boardSize,random(COLOR_ARRAY));
      }
      if (random()< ARC_LINE_ODDS){
        myArcLines(x*boardSize,y*boardSize,boardSize,random(COLOR_ARRAY),random([0, PI/2, PI, (3*PI)/2]));
      }
    }
  }
}

function myLines(x,y,size, color){
  push();
  translate(x,y);


  strokeCap(SQUARE);
  stroke(color);
  strokeWeight(7);
  for (let x = 1; x <= 5; x ++){
    line(((x*size)/6) - (size/2), size/2, ((x*size)/6) - (size/2), -size/2);
  }
  pop();
}

function myArc(x,y,size, color, rotation){
  push();
  translate(x,y);
  rotate(rotation)
  ellipseMode(CENTER)

  noStroke();
  fill(color);
  arc(0-size/2,0-size/2,size*2,size*2,0,PI/2);
  pop();
}

function myArcLines(x,y,size, color, rotation){
  push();
  translate(x,y);
  rotate(rotation)
  ellipseMode(CENTER)

  strokeCap(SQUARE);
  noFill();
  stroke(color);
  strokeWeight(7);
  for (let x = 1; x <= 5; x ++){
    arc(0-size/2,0-size/2,(x*size)/3,(x*size)/3,0,PI/2);
  }
  pop();

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
