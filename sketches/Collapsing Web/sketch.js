let agents = [];
let trail = [];
let my_hue = 0;
let circle_hue_offset = .1

function setup() {
  colorMode(HSB, 1);
  createCanvas(1000, 1000);
  for (let i = 0; i < 100; i++) {
    agents.push(new Agent(random(width), random(height)));
  }
}

function draw() {
  background(255);

  // Adjusting hue
  if (my_hue + .01 > 1){
    my_hue = 0;
  }
  my_hue += myRandom(0,0.001);


  for (let i = 0; i < agents.length; i++) {
    agents[i].update();
    agents[i].display();
  }
}

class Agent {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.maxSpeed = 2;
    this.maxForce = 0.1;
  }

  update() {
    this.acc.set(0, 0);
    this.acc.add(this.followTrail());
    this.acc.add(this.avoidSelf());
    this.acc.add(this.randomMovement());

    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);

    trail.push(this.pos.copy());
    if (trail.length > 50) {
      trail.shift();
    }
  }

  display() {
    // noStroke();
    // let complement_hue = my_hue + circle_hue_offset;
    // if (complement_hue > 1){
    //   complement_hue -= 1;
    // }
    // fill(complement_hue, 1, 1, .5);
    // ellipse(this.pos.x, this.pos.y, 10, 10);
    for (let i = 0; i < trail.length; i++) {
      let d = dist(this.pos.x, this.pos.y, trail[i].x, trail[i].y);
      stroke(my_hue + myRandom(-0.02,0.02), 1, .8, .2);
      line(this.pos.x, this.pos.y, trail[i].x, trail[i].y);
    }
  }

  followTrail() {
    let desired = createVector();
    for (let i = 0; i < trail.length; i++) {
      let d = dist(this.pos.x, this.pos.y, trail[i].x, trail[i].y);
      if (d < 50) {
        desired.add(trail[i].copy().sub(this.pos));
      }
    }
    if (desired.mag() > 0) {
      desired.setMag(this.maxSpeed);
      desired.sub(this.vel);
      desired.limit(this.maxForce);
    }
    return desired;
  }

  avoidSelf() {
    let desired = createVector();
    for (let i = 0; i < trail.length; i++) {
      let d = dist(this.pos.x, this.pos.y, trail[i].x, trail[i].y);
      if (d < 10) {
        desired.add(trail[i].copy().sub(this.pos));
      }
    }
    if (desired.mag() > 0) {
      desired.setMag(this.maxSpeed);
      desired.sub(this.vel);
      desired.limit(this.maxForce);
      desired.mult(-1);
    }
    return desired;
  }

  randomMovement() {
    let desired = p5.Vector.random2D();
    desired.mult(10);
    desired.sub(this.vel);
    desired.limit(this.maxForce);
    return desired;
  }
}



function myRandom(min, max) {
  return Math.random() * (max - min) + min;
}
