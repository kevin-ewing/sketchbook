const NOISE_DIFF = 20;
const NOISE_DF = 1;
const NUM_CURVES = 20000;
const HIGHLIGHT_COUNT = 10000;

let COLORS = [
  "#2b0f54",
  "#ab1f65",
  "#ff4f69",
  "#fff7f8",
  "#ff8142",
  "#ffda45",
  "#3368dc",
  "#49d9ec",
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(.025);
  noLoop();
}

function draw() {
  background(0);
  let centerX = width / 2;
  let centerY = height / 2;
  let circleRadius = min(width, height) * 0.3;

  let shuffledColors = COLORS.slice().sort(() => random() - 0.5);

    // Generate a random highlight point on the circle
    let highlightAngle = random(TWO_PI);
    let highlightX = centerX + cos(highlightAngle) * circleRadius;
    let highlightY = centerY + sin(highlightAngle) * circleRadius;
  
    for (let i = 0; i < HIGHLIGHT_COUNT; i++) {
      let targetAngle = random(TWO_PI);
      let targetX = centerX + cos(targetAngle) * circleRadius;
      let targetY = centerY + sin(targetAngle) * circleRadius;
  
      let controlX = centerX + randomGaussian(0, circleRadius);
      let controlY = centerY + randomGaussian(0, circleRadius);
      stroke(255,255,255);
      bezier(highlightX, highlightY, controlX, controlY, controlX, controlY, targetX, targetY);

    }
    ellipseMode(CENTER)
    fill(0,0,0)
    circle(centerX, centerY, circleRadius*2 + 1);
    noFill();

  let curves = [];

  // Generate normal random curves
  for (let i = 0; i < NUM_CURVES; i++) {
    let angle1 = random(TWO_PI);
    let angle2 = random(TWO_PI);

    let x1 = centerX + cos(angle1) * circleRadius;
    let y1 = centerY + sin(angle1) * circleRadius;
    let x2 = centerX + cos(angle2) * circleRadius;
    let y2 = centerY + sin(angle2) * circleRadius;

    let controlX = centerX + randomGaussian(0, circleRadius);
    let controlY = centerY + randomGaussian(0, circleRadius);

    let distanceFromCenter = dist(controlX, controlY, centerX, centerY);
    curves.push({ x1, y1, x2, y2, controlX, controlY, distanceFromCenter });
  }

  // Sort normal curves for better visual layering
  curves.sort((a, b) => a.distanceFromCenter - b.distanceFromCenter);

  // Draw normal curves
  for (let i = 0; i < NUM_CURVES; i++) {
    let colorIndex = floor(map(i, 0, NUM_CURVES, 0, shuffledColors.length));
    stroke(shuffledColors[colorIndex]);
    let { x1, y1, x2, y2, controlX, controlY } = curves[i];
    bezier(x1, y1, controlX, controlY, controlX, controlY, x2, y2);
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
