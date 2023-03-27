const noiseScaleand =  0.03;
const numAnts = 4000;
const lifeMin = 5;
const lifeMax = 100;
const bgFade = 5;

const noiseZrate = 0.001;

let noiseZ = 0;
let antArray = [];


function setup() {
  blendMode(DARKEST);
  createCanvas(800, 800);
  background(0);
  stroke(255,20);
  noFill();
  strokeWeight(2);
  noiseDetail(8, 0.65);
  
  for (let x = 0; x < numAnts; x ++){
    antArray[x] = new Ant();
  }
}

function draw() {
  background(0,bgFade);
  noiseZ += noiseZrate;
  for (let x = 0; x < numAnts; x ++){
    antArray[x].update();

    if (antArray[x].life <= 0){
      antArray[x] = new Ant();
    }
  }
}

class Ant {
  constructor() {
    this.position = createVector(random(0,width), random(0,height));
    this.life = random(lifeMin, lifeMax);
  }

  // Methods
  update() {
    let scaledNoise = noise(this.position.x*noiseScaleand, this.position.y*noiseScaleand, noiseZ);

    beginShape(LINES);
    vertex(this.position.x, this.position.y);
    this.position.add(p5.Vector.fromAngle(map(scaledNoise, 0, 1, 0, 2*PI), 2));
    vertex(this.position.x, this.position.y);
    endShape();

    if (this.position.x > width){
      this.position.x -= width;
    }
    if (this.position.y > height){
      this.position.y -= height;
    }
    if (this.position.x < 0){
      this.position.x += width;
    }
    if (this.position.y < 0){
      this.position.y += height;
    }

    this.life -= 1;
  }
}