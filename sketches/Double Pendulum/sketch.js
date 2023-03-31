//https://en.wikipedia.org/wiki/Double_pendulum

const MAS_MIN = 4;
const MAS_MAX = 20;
const BG_ALPHA = 4;

let SHOW_MECH = false;
let tail_length = 500;

let l1; // Length of the first pendulum
let l2; // Length of the second pendulum
let m1; // Mass of the first pendulum
let m2; // Mass of the second pendulum
let theta1 = 0; // Starting angle of the first pendulum
let theta2 = 0; // Starting angle of the second pendulum
let omega1 = 0; // Starting angular velocity of the first pendulum
let omega2 = 0; // Starting angular velocity of the second pendulum
let centerX;
let centerY;
let hue;

let gravity = .2;

let points = [];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 100)
  background(0);
  centerX = width / 2; 
  centerY = width / 2;

  hue = random(0,100);
  l1 = random(100, 300);
  l2 = (width/2) - l1 - 10;
  m1 = random(MAS_MIN, MAS_MAX);
  m2 = random(MAS_MIN, MAS_MAX);
  theta1 = PI + random(-0.001, 0.001);
  theta2 = PI + random(-0.001, 0.001);

}

function draw() {
  translate(centerX, centerY);

  let num1 = -gravity  * (2 * m1 + m2) * sin(theta1);
  let num2 = -m2 * gravity  * sin(theta1 - 2 * theta2);
  let num3 = -2 * sin(theta1 - theta2) * m2;
  let num4 = pow(omega2,2) * l2 + pow(omega1,2) * l1 * cos(theta1 - theta2);
  let den = l1 * (2 * m1 + m2 - m2 * cos(2 * theta1 - 2 * theta2));
  let a1a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(theta1 - theta2);
  num2 = pow(omega1, 2) * l1 * (m1 + m2);
  num3 = gravity * (m1 + m2) * cos(theta1);
  num4 = pow(omega2, 2) * l2 * m2 * cos(theta1 - theta2);
  den = l2 * (2 * m1 + m2 - m2 * cos(2 * theta1 - 2 * theta2));
  let a2a = (num1 * (num2 + num3 + num4)) / den;

  let x1 = l1 * sin(theta1);
  let y1 = l1 * cos(theta1);

  let x2 = x1 + l2 * sin(theta2);
  let y2 = y1 + l2 * cos(theta2);

  if (SHOW_MECH){
    background(256);
    strokeWeight(3);
    fill(0);
    ellipse(0, 0, 10);
    line(0, 0, x1, y1);
    line(x1, y1, x2, y2);
    fill(256);
    ellipse(x1, y1, m1);
    ellipse(x1, y1, m1);
    ellipse(x2, y2, m2);
    noFill()
    strokeWeight(6)
    rect(-centerX, -centerY, width, height);

    if (gravity > 0){
      drawArrow(true);
    }
    else{
      drawArrow(false);
    }
  }
  else{
    background(0, BG_ALPHA);
  }

  omega1 += a1a;
  omega2 += a2a;
  theta1 += omega1;
  theta2 += omega2;

  if (points.length >= tail_length){
    points.shift();
  }

  points.push(createVector(x2, y2));

  drawCurveFormatter(points)
}

function drawCurveFormatter(points) {
  if (SHOW_MECH){
    strokeCap(round);
    noFill();
    strokeWeight(3);
    stroke(0);
    drawCurve(points);
  }
  else {
    strokeCap(SQUARE);
    let tip
    if(points[points.length - 2]){
      tip = points[points.length - 2];
    }
    else{
      tip = points[points.length - 1];
    }
    let temp_hue = fadingHue();
    fill(temp_hue, 100, 100);
    noStroke();
    ellipse(tip.x, tip.y , 10);
    noFill();
    strokeWeight(10);
    stroke(temp_hue, 100, 100);
    drawCurve(points);
    strokeWeight(8);
    stroke(temp_hue, 80, 100);
    drawCurve(points);
    strokeWeight(6);
    stroke(temp_hue, 60, 100);
    drawCurve(points);
    strokeWeight(4);
    stroke(temp_hue, 40, 100);
    drawCurve(points);
    strokeWeight(2);
    stroke(temp_hue, 0, 100);
    drawCurve(points);
  }
}

function drawCurve(points){
  beginShape();
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    curveVertex(p.x, p.y);
  }
  endShape();
}

function keyTyped(){
  if (key === 'v'){
    if (SHOW_MECH){
      background(0)
      SHOW_MECH = false;
    }
    else{
      background(256)
      SHOW_MECH = true;
    }
  }
  if (key === 'r'){
    points = [];
    l1 = random(100, 300);
    l2 = (width/2) - l1 - 10;
    m1 = random(MAS_MIN, MAS_MAX);
    m2 = random(MAS_MIN, MAS_MAX);
    theta1 = PI + random(-0.001, 0.001);
    theta2 = PI + random(-0.001, 0.001);
    hue = random(0,100);

    // Reset angular velocity of the pendulums
    omega1 = 0;
    omega2 = 0;

    gravity = abs(gravity);
  }
  if (key === 'f'){
    gravity *= -1;
  }
}

function fadingHue() {
  hue += 0.01;
  if (hue >= 100) {
    hue = 0;
  }
  return hue;
}

function drawArrow(isUp) {
  let arrowSize = 18;
  
  push()

  fill(0);
  stroke(3);
  translate(-centerX + 20 , -centerY + 20);
  if (isUp) {
    triangle(0 - arrowSize/2, arrowSize - arrowSize/2, arrowSize/2, arrowSize - arrowSize/2, 0, arrowSize + arrowSize/2);
  } else {
    triangle(-arrowSize/2, arrowSize/2, arrowSize/2, arrowSize/2, 0, - arrowSize/2);
  }
  line(0,0,0, arrowSize);

  pop();
}