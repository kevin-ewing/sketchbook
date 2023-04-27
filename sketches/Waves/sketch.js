const COLORS = ["#6f6776", "#9a9a97", "#c5ccb8", "#8b5580", "#c38890", "#a593a5", "#666092", "#9a4f50", "#c28d75", "#7ca1c0", "#416aa3", "#8d6268", "#be955c", "#68aca9", "#387080", "#6e6962", "#93a167", "#6eaa78", "#557064", "#9d9f7f", "#7e9e99", "#5d6872", "#433455"]
const NUM_WAVES = 20;
const NOISE_HEIGHT = 100;

let backgroundColor;
let t = 0; // Time variable
let noiseScale = 0.005; // Scale of the noise
let waves = new Array(NUM_WAVES);

function setup() {
  createCanvas(800, 800);
  noiseDetail(2);
  backgroundColor = random(COLORS);
  for (let i = 0; i < NUM_WAVES; i ++){
    waves[i] = new Wave(random(COLORS), i);
  }
}

function draw() {
  background(backgroundColor);
  waves.forEach((wave)=>wave.update());
  waves.forEach((wave)=>wave.draw());
  t += 0.01;
}

class Wave{
  constructor(color, offset){
    this.color = color;
    this.offset = offset;
    this.curvePoints = [];
    this.width = random(50,200);
  }

  update(){
    for (let x = -10; x <= width+10; x += 10) {
      let noiseVal = map(noise(x * noiseScale, this.offset/8, t), 0, 1, -1*NOISE_HEIGHT, NOISE_HEIGHT); // Map the noise value to a displacement
      let y = height * ((.5+this.offset)/NUM_WAVES) + noiseVal; // Offset the y position
      this.curvePoints.push(createVector(x, y)); // Add the point to the array
    }
  }

  draw(){
    // Draw the curve
    noFill();
    stroke(this.color);
    strokeWeight(this.width);
    beginShape();
    curveVertex(-100, height * ((.5+this.offset)/NUM_WAVES));
    curveVertex(-100, height * ((.5+this.offset)/NUM_WAVES));
    for (let i = 0; i < this.curvePoints.length; i++) {
      let p = this.curvePoints[i];
      curveVertex(p.x, p.y);
    }
    curveVertex(width + 100, height * ((.5+this.offset)/NUM_WAVES));
    curveVertex(width + 100, height * ((.5+this.offset)/NUM_WAVES));
    endShape();
    this.curvePoints = [];
  }
}