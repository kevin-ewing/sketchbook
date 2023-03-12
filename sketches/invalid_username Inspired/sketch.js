const TAIL_LEN = 50;
const NUM_BALLS = 200;
const BALL_SIZE = 40;

let balls = [];

let BG_COLOR;
let COLOR_ARRAY;
let MAIN_COLOR;

function setup() {
  createCanvas(400, 400);

  colorMode(HSB,360);
  MAIN_COLOR = color(random(0,360),200,300);
  COLOR_ARRAY = getAnalogousColors(MAIN_COLOR);
  BG_COLOR = color(hue(MAIN_COLOR),100,200);

  for (let i = 0; i < NUM_BALLS; i++) { // create 10 balls
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
    this.vx += random(-0.2, 0.2);
    this.vy += random(-0.2, 0.2);
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
      let alpha = map(i, 0, this.trail.length-1, 0, 360);
      let size = map(i, 0, this.trail.length-1, 0, BALL_SIZE);
      fill(this.color, alpha/2); // decrease alpha by half for older points
      noStroke();
      ellipse(this.trail[i].x, this.trail[i].y, size);
    }

    // Draw ball
    fill(this.color);
    noStroke(0);
    ellipse(this.x, this.y, BALL_SIZE);
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