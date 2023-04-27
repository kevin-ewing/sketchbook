/** Original code from u/Deadfev
 *  url: https://www.reddit.com/r/processing/comments/dswnx6/a_galaxy_in_35_lines_of_code/
 *  url: https://www.reddit.com/r/processing/comments/dswnx6/a_galaxy_in_35_lines_of_code/
 */

const ringPop = 50;
const starPop = 3000;

var rings = [];

function setup() {
  createCanvas(1200, 600, WEBGL);
  blendMode(ADD);  // Actually, blendMode doesnt work properly on WebGL.
  camera(-width/2, -height/2, 150, 0, 0, 0, 0, 1, 0);
  
  strokeWeight(0.1);

  let innerRad = 1.0,
    outerRad = 9.0,
    inc = 1.0;
  
  for (let ringIndex = 0; ringIndex < ringPop; ++ringIndex) {
    append(rings, []);
    let currentRing = rings[rings.length - 1];
    for (let starIndex = 0; starIndex < starPop; ++starIndex) {
      let a = random(0, 1) * TWO_PI;
      let r = sqrt(random(sq(innerRad), sq(outerRad)));
      append(currentRing, createVector(r * cos(a), r * sin(a), random(-inc, inc)));
    }
    innerRad += inc;
    outerRad += inc * 1.5;
    inc += 1;
  }
}

function draw() {
  background(0);

  for (let ringIndex = 0; ringIndex < ringPop; ++ringIndex) {
    push();
    let c = lerpColor(color(73, 115, 161), color(157, 47, 77), ringIndex/ringPop);
    stroke(red(c), green(c), blue(c), 00);
    rotateY((TWO_PI/(ringIndex*ringIndex+1)*frameCount)/10);
    rotateX(1.45);
    drawRing(ringIndex);
    pop();
  }
}

function drawRing(index) {
  let currentRing = rings[index];
  beginShape(POINTS);
  for (let starIndex = 0; starIndex < currentRing.length; ++starIndex)
    vertex(currentRing[starIndex].x, currentRing[starIndex].y, currentRing[starIndex].z);
  endShape();
}