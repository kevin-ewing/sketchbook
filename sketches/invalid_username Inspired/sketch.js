const TAIL_LEN = 50;
const NUM_BALLS = 30;
const BALL_SIZE = 150;
const RANDOM_MOVEMENT_VAL = 0.6;
const DIMENSION_STROKE = 20;
const DIMENSION_ALPHA = 15;

let balls = [];

let BG_COLOR;
let COLOR_ARRAY;
let MAIN_COLOR;

function setup() {
  createCanvas(800, 800);

  colorMode(HSB,360);
  MAIN_COLOR = color(random(0,360),200,300);
  COLOR_ARRAY = getAnalogousColors(MAIN_COLOR, 10);
  BG_COLOR = color(hue(MAIN_COLOR),100,200);

  for (let i = 0; i < NUM_BALLS; i++) {
    balls.push(new Ball());
  }
}

function draw() {
  background(BG_COLOR);
  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].display();
  }
}

class Ball {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-1,1);
    this.vy = random(-1,1);
    this.trail = [];
    this.targetX = random(width);
    this.targetY = random(height);
    this.color = random(COLOR_ARRAY);
  }

  update() {
    // Calculate attraction to center
    let dx = this.targetX - this.x;
    let dy = this.targetY - this.y;
    let distance = sqrt(dx*dx + dy*dy);
    let angle = atan2(dy, dx);
    let force = distance * 0.001;
    this.vx += cos(angle) * force;
    this.vy += sin(angle) * force;

    // Move with momentum
    this.vx += random(-RANDOM_MOVEMENT_VAL, RANDOM_MOVEMENT_VAL);
    this.vy += random(-RANDOM_MOVEMENT_VAL, RANDOM_MOVEMENT_VAL);
    this.vx *= 0.99; // friction
    this.vy *= 0.99;
    this.x += this.vx;
    this.y += this.vy;

    // Add current position to trail
    this.trail.push({x: this.x, y: this.y});

    // Remove oldest point if trail is too long
    if (this.trail.length > TAIL_LEN) {
      this.trail.shift();
    }
  }

  display() {
    // Draw trail
    for (let i = 0; i < this.trail.length; i++) {
      let size = map(i, 0, this.trail.length-1, 0, BALL_SIZE);
      let brightness_variation = map(i, 0, this.trail.length-1, 50, 0);
      fill(hue(this.color), saturation(this.color), brightness(this.color)-brightness_variation); // decrease alpha by half for older points
      noStroke();
      ellipse(this.trail[i].x, this.trail[i].y, size);
      noFill();
      stroke(0, DIMENSION_ALPHA);
      strokeWeight(DIMENSION_STROKE)
      strokeCap(SQUARE);

      arc(this.trail[i].x, this.trail[i].y, constrain(size-DIMENSION_STROKE,0, Infinity), constrain(size-DIMENSION_STROKE,0, Infinity), PI/2, PI);
      stroke(360, DIMENSION_ALPHA);
      arc(this.trail[i].x, this.trail[i].y, constrain(size-DIMENSION_STROKE,0, Infinity), constrain(size-DIMENSION_STROKE,0, Infinity), (3*PI)/2, 2*PI);

    }

    // Draw ball
    fill(this.color);
    noStroke(0);
    ellipse(this.x, this.y, BALL_SIZE);    
  }
}


function getAnalogousColors(myColor, numColors) {
  let colors = [];
  
  // Calculate the hue step between each analogous color
  const hueStep = 60 / (numColors - 1);

  // Calculate the hues of the analogous colors
  const myHue = hue(myColor);
  for (let i = 0; i < numColors; i++) {
    const hueValue = (myHue - 30) + (i * hueStep);

    // Normalize the hue to be within the range of 0 to 360
    const normalizedHue = (hueValue + 360) % 360;

    // Convert the hue, saturation, and brightness to RGB hex codes
    colors.push(color(normalizedHue, saturation(myColor), brightness(myColor)));
  }
  
  return colors;
}
