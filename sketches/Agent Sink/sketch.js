const NUM_AGENTS = 5000
const NUM_ATTR = 3;
 
let noiseScaleand = .001;
let baseColor;
let attractors = [];
let agents = new Array(NUM_AGENTS);

function setup() {
  createCanvas(1000, 1000);
  ellipseMode(CENTER);
  background(0);
  colorMode(HSB,100);
  baseColor = random(10,90);

  for (let i = 0; i < NUM_ATTR; i ++){
    attractors[i] = createVector(random(0,width), random(0,height));
  }

  for (let i = 0; i < NUM_AGENTS; i ++){
    agents[i] = new Agent(random(0,width), random(0,height)); // create a new agent in the center of the canvas
  }
}

function draw() {
  // background(255);

  for (let i = 0; i < NUM_AGENTS; i ++){
    agents[i].update();
    agents[i].draw();
  }

}


class Agent{
  
  constructor(x, y){
    this.position = createVector(x, y);
    this.velocity = p5.Vector.fromAngle(map(noise(this.position.x*noiseScaleand, this.position.y*noiseScaleand), 0, 1, -2*PI, 2*PI), random(1,2));
    this.acceleration = createVector(0,0);
    this.maxSpeed = random(4,7);
    this.maxForce = random(.005,.006);
    this.slowRadius = 500;
    this.color = color(baseColor + random(-10,10),80,90);
    this.size = random(6,20)
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



  update(){
    for (let i = 0; i < NUM_ATTR; i ++){ 
      this.seek(attractors[i]);
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

    if (this.velocity.magSq() < .0001 && this.acceleration.magSq() < 0.00000000000000000000000001){
      fill(0);
    }
    strokeWeight(.3)
    ellipse(this.position.x,this.position.y,this.size,this.size);
  }
}