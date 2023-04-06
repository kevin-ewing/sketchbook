// https://en.wikipedia.org/wiki/Double_pendulum
// https://www.myphysicslab.com/pendulum/double-pendulum-en.html
// https://www.youtube.com/watch?v=tc2ah-KnDXw

const MAS_MIN = 4;
const MAS_MAX = 20;
const BG_ALPHA = 4;

let SHOW_MECH = false;
let MAX_TAIL_LENGTH = 200;
let NUM_PENDS = 3;

let gravity = .2;

let system;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 100)
  background(0);
  centerX = width / 2; 
  centerY = width / 2;

  system = new System();

  let pend;

  for (let x = 0; x < NUM_PENDS; x++){
    pend =  new Pendulum();
    system.addObject(pend);
  }

}

function draw() {
  translate(centerX, centerY);
  if (SHOW_MECH){
    background(256);
  }

  system.update();
}

class System {
  pendulums = []

  addObject(obj){
    this.pendulums.push(obj);
  }

  update(){
    for (let pend of this.pendulums){
      pend.update();
    }
  }

  reset(){
    for (let pend of this.pendulums){
      pend.reset();
    }
  }
}


class Pendulum {
  points = [];

  constructor() {
    this.hue = random(0,100); 
    this.l1 = random(100, 300); // Length of the first pendulum
    this.l2 = (width/2) - this.l1 - 10; // Length of the second pendulum
    this.m1 = random(MAS_MIN, MAS_MAX); // Mass of the first pendulum
    this.m2 = random(MAS_MIN, MAS_MAX); // Mass of the second pendulum
    this.theta1 = PI + random(-0.001, 0.001); // Starting angle of the first pendulum
    this.theta2 = PI + random(-0.001, 0.001); // Starting angle of the second pendulum
    this.omega1 = 0; // Starting angular velocity of the first pendulum
    this.omega2 = 0; // Starting angular velocity of the second pendulum
    this.points = [];
  }

  update(){
    let num1 = -gravity  * (2 * this.m1 + this.m2) * sin(this.theta1);
    let num2 = -this.m2 * gravity  * sin(this.theta1 - 2 * this.theta2);
    let num3 = -2 * sin(this.theta1 - this.theta2) * this.m2;
    let num4 = pow(this.omega2,2) * this.l2 + pow(this.omega1,2) * this.l1 * cos(this.theta1 - this.theta2);
    let den = this.l1 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.theta1 - 2 * this.theta2));
    let a1a = (num1 + num2 + num3 * num4) / den;
  
    num1 = 2 * sin(this.theta1 - this.theta2);
    num2 = pow(this.omega1, 2) * this.l1 * (this.m1 + this.m2);
    num3 = gravity * (this.m1 + this.m2) * cos(this.theta1);
    num4 = pow(this.omega2, 2) * this.l2 * this.m2 * cos(this.theta1 - this.theta2);
    den = this.l2 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.theta1 - 2 * this.theta2));
    let a2a = (num1 * (num2 + num3 + num4)) / den;
  
    let x1 = this.l1 * sin(this.theta1);
    let y1 = this.l1 * cos(this.theta1);
  
    let x2 = x1 + this.l2 * sin(this.theta2);
    let y2 = y1 + this.l2 * cos(this.theta2);


    if (SHOW_MECH){
      strokeWeight(3);
      fill(0);
      ellipse(0, 0, 10);
      line(0, 0, x1, y1);
      line(x1, y1, x2, y2);
      fill(256);
      ellipse(x1, y1, this.m1);
      ellipse(x1, y1, this.m1);
      ellipse(x2, y2, this.m2);
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

    this.omega1 += a1a;
    this.omega2 += a2a;
    this.theta1 += this.omega1;
    this.theta2 += this.omega2;

    if (this.points.length >= MAX_TAIL_LENGTH){
      this.points.shift();
    }

    this.points.push(createVector(x2, y2));

    this.hue += 0.01;
    if (this.hue >= 100) {
      this.hue = 0;
    }

    drawCurveFormatter(this.points, this.hue);
  }

  reset() {
    this.points = [];
    this.l1 = random(100, 300);
    this.l2 = (width/2) - this.l1 - 10;
    this.m1 = random(MAS_MIN, MAS_MAX);
    this.m2 = random(MAS_MIN, MAS_MAX);
    this.theta1 = PI + random(-0.001, 0.001);
    this.theta2 = PI + random(-0.001, 0.001);
    this.hue = random(0,100);

    // Reset angular velocity of the pendulums
    this.omega1 = 0;
    this.omega2 = 0;

    gravity = abs(gravity);
  }
}


function drawCurveFormatter(points, temp_hue) {
  if (SHOW_MECH){
    strokeCap(ROUND);
    stroke(0);
    noFill();
    strokeWeight(3);
    stroke(temp_hue, 100, 100);
    drawCurve(points);
    stroke(0);
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
    system.reset();
  }
  if (key === 'f'){
    gravity *= -1;
  }
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