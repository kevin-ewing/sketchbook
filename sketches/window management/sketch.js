const MAGNITUDE = 10;
let creatures = [];
const NUM_CREATURES = 40;
const BALL_SIZE = 30;
const LINE_SIZE = 10;

function setup() {
  createCanvas(600, 600);
  background(360);
  colorMode(HSB);
  let baseColor = random(0,360);
  for (let iter = 0; iter < NUM_CREATURES; iter ++){
    let tempOffset = random(-20,20);
    let tempHue = (baseColor+tempOffset)%360;
    creatures[iter] = {color:color(tempHue, 100, 360), position: createVector(width/2, height/2), next:null};
  }
}

function draw() {
  for (let iter = 0; iter < NUM_CREATURES; iter ++){
    let displacement = p5.Vector.random2D();
    displacement.mult(MAGNITUDE);
    creatures[iter].next = p5.Vector.add(creatures[iter].position, displacement);
    creatures[iter].next.x = constrain(creatures[iter].next.x, 0, height);
    creatures[iter].next.y = constrain(creatures[iter].next.y, 0, width);
    
    fill(creatures[iter].color);
    noStroke();
    push()

    rect(creatures[iter].position.x, creatures[iter].position.y, BALL_SIZE, BALL_SIZE);
    pop()

    creatures[iter].position = creatures[iter].next; 
  }
  
  filter(DILATE);

}