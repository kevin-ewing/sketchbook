let sunX;
let sunY;
let sunR;

function setup() {
  createCanvas(800, 600);
  noLoop();
}

function draw() {
  sunX = random(0, height/2);;
  sunY = random(width/8,(7*width)/8);
  sunR = random(140,200);
  let sunC = color(255,255,255,255);
  colorMode(HSB, 1);

  let col1 = color(random(0,.1),random(.8,.9),random(.8,.9));
  let col2 = color(random(.18,.2),random(.2,.7),random(.8,1));

  background(0);

  setGradient(0, 0, width, height, col1, col2, col1);

  // Draw a sun in the center of the canvas
  fill(col2);
  noStroke();
  ellipse(sunY, sunX, sunR);
  circularGradient(sunY, sunX, sunR, col2) 


  drawCity(200, 50, 30);
  drawCity(50,300,100);



  // Mirror the top half of the canvas onto the bottom half
  loadPixels();
  for (let y = 0; y < height/2; y++) {
    for (let x = 0; x < width; x++) {
      let mirroredY = height - y - 1;
      let c = get(x, y);
      set(x, mirroredY, c);
    }
  }
  updatePixels();


  fill(0,0,0,.3)
  rect(400,450,800,300);
}


function setGradient(x, y, w, h, c1, c2, c3) {
  noFill();
  for (let i = y; i < y + h; i++) {
    let inter1 = map(i, y, y + h, 0, 1);
    let inter2 = map(i, y, y + h, 0, 0.5);
    let c = lerpColor(lerpColor(c1, c2, inter1), c3, inter2);
    stroke(c);
    line(x, i, x + w, i);
  }
}


function drawCity(heightFactor, widthFactor, num){
  noStroke();
  fill(0);
  rectMode(CENTER);

  // Generate a random number of rectangles to draw
  let numRectangles = floor(random(20, num));
  
  // Define the width range for the rectangles
  let minWidth = 20;
  let maxWidth = widthFactor;
  
  // Define the height range for the rectangles
  let minHeight = 10;
  let maxHeight = heightFactor;
  
  // Define the x position for the rectangles
  let yPos = height / 2;
  
  // Draw the rectangles
  for (let i = 0; i < numRectangles; i++) {
    // Generate a random width and height for the rectangle
    let rectWidth = random(minWidth, maxWidth);
    let rectHeight = random(minHeight, maxHeight);
    
    // Generate a random y position for the rectangle
    let xPos = random(0, width);
    
    // Draw the rectangle
    rect(xPos, yPos, rectWidth, rectHeight);
  }
}

function circularGradient(x, y, r, sunC) {
  let gradient = drawingContext.createRadialGradient(x, y, 0, x, y, r);
  gradient.addColorStop(0, color(sunC));
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  drawingContext.fillStyle = gradient;
  drawingContext.arc(x, y, r, 0, 2 * PI);
  drawingContext.fill();
}
