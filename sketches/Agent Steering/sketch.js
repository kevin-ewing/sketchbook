const NUM_AGENTS = 2000;
let isMousePressed = false;

let agents = new Array(NUM_AGENTS);

function setup() {
  createCanvas(700, 700);
  ellipseMode(CENTER);
  colorMode(HSB,100);

  for (let i = 0; i < NUM_AGENTS; i ++){
    
    agents[i] = new Agent(random(0,width), random(0,height)); // create a new agent in the center of the canvas
  }
}

function draw() {
  background(255);
  push();
  noFill();
  stroke(0);
  strokeWeight(4);
  rect(0,0,width,height);
  pop();

  for (let i = 0; i < NUM_AGENTS; i ++){
    agents[i].update();
    agents[i].draw();
  }
}


class Agent{
  constructor(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector(random(-2,2), random(-2,2));
    this.acceleration = createVector(random(-1,1), random(-1,1));
    this.maxSpeed = random(2,5);
    this.maxForce = random(.05,.15);
    this.slowRadius = random(80,200);
    this.repelSpeed = random(4,6);
    this.color = color(random(60,75),80,90);
    this.size = random(3,7.5)
  }

  applyForce(force){
    this.acceleration.add(force);
  }

  seek(target){
    // get the desired vector
    let differenceVector = p5.Vector.sub(target, this.position)

    if (abs(differenceVector.x) > width/2){
      if (differenceVector.x > 0){
        differenceVector.x -= width;
      }
      else {
        differenceVector.x += width;
      }
    }

    if (abs(differenceVector.y) > height/2){
      if (differenceVector.y > 0){
        differenceVector.y -= height;
      }
      else {
        differenceVector.y += height;
      }
    }

    let speed = constrain(map(differenceVector.magSq(), 0, pow(this.slowRadius, 2), 0, this.maxSpeed), 0, this.maxSpeed)
    let desired = differenceVector.normalize().mult(speed);
    let steeringForce = p5.Vector.sub(desired, this.velocity);
    steeringForce.limit(this.maxForce);

    this.applyForce(steeringForce);
  }

  flee(target){
    // get the desired vector
    let differenceVector = p5.Vector.sub(this.position, target);

    if (differenceVector.magSq() > 10000){
      return
    }

    if (abs(differenceVector.x) > width/2){
      if (differenceVector.x > 0){
        differenceVector.x -= width;
      }
      else {
        differenceVector.x += width;
      }
    }

    if (abs(differenceVector.y) > height/2){
      if (differenceVector.y > 0){
        differenceVector.y -= height;
      }
      else {
        differenceVector.y += height;
      }
    }

    let desired = differenceVector.normalize().mult(this.repelSpeed);
    let steeringForce = p5.Vector.sub(desired, this.velocity);
    this.applyForce(steeringForce);
  }



  update(){
    if (!isMousePressed){
      this.seek(createVector(mouseX, mouseY))

    }
    else{
      this.flee(createVector(mouseX, mouseY))
    }

    
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    if (this.position.x > width){
      this.position.x -= width;
    }
    if (this.position.x < 0){
      this.position.x += width;
    }

    if (this.position.y > height){
      this.position.y -= height;
    }
    if (this.position.y < 0){
      this.position.y += height;
    }
  }

  draw(){

    stroke(0);
    fill(this.color);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    triangle(-2 * this.size, -1 * this.size,
      -2* this.size, this.size,
      0, 0);
    pop();
  }
}

function mousePressed() {
  isMousePressed = true;
}

function mouseReleased() {
  isMousePressed = false;
}