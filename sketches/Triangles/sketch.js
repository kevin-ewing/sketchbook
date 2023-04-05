const NUM_ROW = 10;
const NUM_COL = 20;

function setup() {
  createCanvas(500, 800);
}

function draw() {
  for (let x = 0; x < NUM_ROW; x ++){
    beginShape(TRIANGLE_STRIP);
    for (let y = 0; y < NUM_COL; y ++){
      vertex(x*(NUM_COL/width), (y)*(NUM_ROW/height));
      vertex((x+0.5)*(NUM_COL/width), (y+0.5)*(NUM_ROW/height));
    }
    endShape();
  }
}
