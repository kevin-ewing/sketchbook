const MAGNITUDE = 10;
let creatures = [];
const NUM_CREATURES = 100;

function setup() {
  createCanvas(600, 600);
  background(0);
  colorMode(HSB);
  for (let iter = 0; iter < NUM_CREATURES; iter ++){
    creatures[iter] = {color:color(random(20,60), 360, 360), position: createVector(width/2, height/2), next:null};
  }
}

function draw() {
  for (let iter = 0; iter < NUM_CREATURES; iter ++){
    let displacement = p5.Vector.random2D();
    displacement.mult(MAGNITUDE);
    creatures[iter].next = p5.Vector.add(creatures[iter].position, displacement);
    creatures[iter].next.x = constrain(creatures[iter].next.x, 0, height);
    creatures[iter].next.y = constrain(creatures[iter].next.y, 0, width);
    stroke(creatures[iter].color);
    strokeWeight(5);
    line(creatures[iter].position.x, creatures[iter].position.y, creatures[iter].next.x, creatures[iter].next.y);
  }
  
  filter(BLUR, 2)

  for (let iter = 0; iter < NUM_CREATURES; iter ++){
    stroke(creatures[iter].color);
    strokeWeight(1);
    line(creatures[iter].position.x, creatures[iter].position.y, creatures[iter].next.x, creatures[iter].next.y);

    creatures[iter].position = creatures[iter].next; 
    creatures[iter].next = null;
  }
}