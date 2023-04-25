let rows, cols;
let scl = 20; // scale factor
let w = 800;
let h = 800;
let noiseScale = 0.03;

let z_noise = 0;
let thickness_offset;

function setup() {
  createCanvas(w, h);
  strokeCap(SQUARE);
  rows = floor(h / scl);
  cols = floor(w / scl);
  thickness_offset = [random(-100000,100000),random(-100000,100000)];
  stroke(255);
}

function draw() {
  background("#255985");

  for (let i = 2; i < cols-2; i++) {
    for (let j = 2; j < rows-2; j++) {
      push();
      let x = i * scl;
      let y = j * scl;
      translate(x + scl / 2, y + scl / 2);
      rotate(map(noise(i * noiseScale, j * noiseScale, z_noise),0,1,-2*PI,2*PI));
      strokeWeight(map(pow(noise(i * noiseScale + thickness_offset[0], j * noiseScale + thickness_offset[1], z_noise), 3),0,1,0,30));
      line(-scl / 2, 0, scl / 2, 0);
      pop();
    }
  }

  z_noise += 0.005;

  
}
