let branchAngle;
let branchLength;
let branchShrink;

const MIN_BRANCH = 0.2;
const MAX_BRANCH = 1;
const WIDTH_FACTOR = .2;
const TREE_PER_LAYER = 3;
function setup() {
  createCanvas(1000, 800);
  background(255);
  stroke(255);
}

function draw() {
  stroke(random(20, 40), random(120, 140), random(20, 40), 100);
  strokeWeight(2);
  for (let i = 0; i < 100; i++) { // generate 100 lines
    let x1 = random(width); // random x-coordinate for the start of the line
    let y1 = height + 5; // the grass is 10 pixels above the bottom of the screen
    let x2 = x1 + random(-10, 10); // random x-coordinate for the end of the line, within a range of -10 to 10 pixels from x1
    let y2 = y1 - random(10, 65); // random y-coordinate for the end of the line, within a range of 5 to 30 pixels above y1
    line(x1, y1, x2, y2); // draw the line
  }


  // Vary the starting position of the trees along the bottom of the canvas
  let startX = random(-width/2,width/2);
  translate(startX,0);


  background(219,240,254,10);
  translate(width / 2, height);

  branchLength = random(100, 200);
  branch(branchLength);

}

function branch(len) {
  // Set the color of the line based on the length of the branch
  if (len > 10) {
    // Make the grey darker and slightly brown
    stroke(105 - len / 4, 89 - len / 4, 75 - len / 4);
  } else {
    // Vary the green slightly and desaturate it
    stroke(random(20, 40), random(120, 140), random(20, 40), 100);
  }

  strokeWeight(len*WIDTH_FACTOR);
  line(0, 0, 0, -len);
  translate(0, -len);

  branchShrink = random(0.7, 0.75);

  if (len > 1) {
    push();
    rotate(random(MIN_BRANCH, MAX_BRANCH));
    branch(len * branchShrink);
    pop();

    push();
    rotate(-random(MIN_BRANCH, MAX_BRANCH));
    branch(len * branchShrink);
    pop();
  }
}

function keyTyped(){
  if (key === 'p'){
    if (isLooping()){
      noLoop();
    }
    else{
      loop()
    }
  }
}