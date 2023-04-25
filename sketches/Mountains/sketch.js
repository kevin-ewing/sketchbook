let cols, rows;
let scl = 20;
let w = 3000;
let h = 2000;
let noiseScale = 0.2
let terrain = [];

function setup() {
  createCanvas(1200, 800, WEBGL);
  cols = w / scl;
  rows = h / scl;

  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
}

function draw() {
  background(0);

  stroke(255);
  noFill(0);

  rotateX(PI / 3);
  translate(-w / 2, -h / 2, -100);

  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }

  // Generate the terrain using Perlin noise
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff * noiseScale, yoff * noiseScale), 0, 1, -300, 300);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
}
