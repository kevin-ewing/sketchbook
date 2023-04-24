// https://i.redd.it/vqo1sx7tojva1.jpg inspiration

let grainSize = 2;
const NOISE_DIFF = 13;

let NOISE_SIZE;


let cols = 100; // number of columns
let rows = 130; // number of rows
let hexSize = 5; // size of each hexagon
let xOffset = hexSize * 1.65; // distance between rows
let yOffset = hexSize * Math.sqrt(2); // distance between columns

let BG_COLOR;
let COLOR_ARRAY;
let MAIN_COLOR;

function setup() {
  createCanvas(800, 800);
  noStroke();
  angleMode(DEGREES);
  colorMode(HSB,360);
  NOISE_SIZE = random(10, 30);
  MAIN_COLOR = color(random(0,360),200,300);
  COLOR_ARRAY = getAnalogousColors(MAIN_COLOR);
  BG_COLOR = color(hue(MAIN_COLOR),100,100);
  background(BG_COLOR);
  noLoop();
}

function draw() {

  
  // loop through each row and column to draw hexagons
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * xOffset + (i % 2) * xOffset / 2;
      let y = i * yOffset;
      let sizeQuot = constrain(noise(i / NOISE_SIZE, j / NOISE_SIZE) * 1.4, 0, 1); // use noise to determine size
      let colorQuot = constrain(floor(sizeQuot * 7) - 1 + randomNormal(), 0, COLOR_ARRAY.length - 1);
      drawHexagon(x, y, sizeQuot * hexSize, COLOR_ARRAY[colorQuot]);
    }
  }

  push();
  noFill();
  stroke(BG_COLOR);
  strokeWeight(60);
  rect(0,0,width,height);
  stroke(COLOR_ARRAY[0]);
  strokeWeight(4);
  rect(30,30,width-60,height-60);
  pop();


  console.log("Noising");
  // Add noise to the image
  loadPixels();
  // for (let i = 0; i < width; i++) {
  //   for (let j = 0; j < height; j++) {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height * 4; j++) {
      let index = (i + j * width) * 4;
      let r = pixels[index];
      let g = pixels[index + 1];
      let b = pixels[index + 2];
      
      // Add noise to the color values
      r += random(-NOISE_DIFF, NOISE_DIFF);
      g += random(-NOISE_DIFF, NOISE_DIFF);
      b += random(-NOISE_DIFF, NOISE_DIFF);
      
      pixels[index] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
    }
  }
  updatePixels();
}




function drawHexagon(x, y, size, color) {
  push();
  fill(color);
  translate(x, y);
  beginShape();
  for (let i = 0; i < 6; i++) {
    let angle = 60 * i + 30;
    let px = size * cos(angle);
    let py = size * sin(angle);
    vertex(px, py);
  }
  endShape(CLOSE);
  pop();
}




function randomWeightedNumber(min, max, weight = .1) {
  let rand = Math.random();
  let diff = max - min;
  let threshold = weight * diff;
  if (rand < weight) {
    return min + rand * threshold;
  } else {
    return min + threshold + (rand - weight) * (diff - threshold);
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
  
  colors.push(color(hues.slice(-1)[0] , saturation(myColor), 50));

  
  // Convert the hues, saturation, and brightness to RGB hex codes
  for (let i = 0; i < hues.length - 1; i++) {
    colors.push(color(hues[i], saturation(myColor), brightness(myColor)));
  }


  colors.push(color("#ffffff"));
  
  return colors;
}


function randomNormal() {
  let u = Math.random();
  let v = Math.random();
  let num = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return round(num);
}