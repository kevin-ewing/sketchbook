const NOISE_DIFF = 20;

function setup() {
  createCanvas(600, 900);
  pixelDensity(2);
  noLoop();
}

function draw() {
  let topColor = color("#529cbf");
  let middleColor = color("#c5c0a0");
  let lowerMiddleColor = color("#8f2b2a");
  let bottomColor = color(0);

  // Loop through every pixel row
  for (let y = 0; y < height; y++) {
    let inter = 0;
    if (y < height * 0.45) {
      // Transition from topColor to middleColor in the top 45%
      inter = map(y, 0, height * 0.45, 0, 1);
      let c = lerpColor(topColor, middleColor, inter);
      stroke(c);
    } else if (y < height * 0.9) {
      // Transition from middleColor to lowerMiddleColor between 45% and 90%
      inter = map(y, height * 0.45, height * 0.9, 0, 1);
      let c = lerpColor(middleColor, lowerMiddleColor, inter);
      stroke(c);
    } else {
      // Transition from lowerMiddleColor to black at the bottom 10%
      inter = map(y, height * 0.9, height, 0, 1);
      let c = lerpColor(lowerMiddleColor, bottomColor, inter);
      stroke(c);
    }
    line(0, y, width, y); // Draw each row as a line
  }

  // Apply a blur effect of 6 pixels
  filter(BLUR, 6);

  // Predefined circle colors
  let circleColors = [
    "#ffb500",
    "#c70000",
    "#4ab4e2",
    "#007a57",
    "#e60000",
    "#e89e00",
    "#ffb600",
    "#ecf3df",
    "#ecf3df",
    "#ffc878",
    "#ffc878",
    "#b80000",
    "#e94e00",
    "#e6ad00",
    "#ffcd00",
  ];

  // Add 100 circles using predefined colors
  for (let i = 0; i < 100; i++) {
    let x;
    if (random() > 0.2) {
      x = height - 5 - 23 * int(random(4));
    } else {
      x = height - random(60);
    }
    noStroke();
    let col = circleColors[i % circleColors.length]; // Cycle through the colors
    fill(col + "80"); // Adding alpha for transparency
    ellipse(random(width), x, 20);
  }

  // Apply a blur effect of 2 pixels
  filter(BLUR, 2);

  addNoise();
}

function addNoise() {
  // Add noise to the image
  loadPixels();
  // for (let i = 0; i < width; i++) {
  //   for (let j = 0; j < height; j++) {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height * 4; j++) {
      let index = (i + j * width) * 4;
      let r = pixels[index];
      let g = pixels[index + 1];
      let b = pixels[index + 2];

      // Add noise to the color values
      r += random(-NOISE_DIFF, NOISE_DIFF);
      g += random(-NOISE_DIFF, NOISE_DIFF);
      b += random(-NOISE_DIFF, NOISE_DIFF);

      pixels[index] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
    }
  }
  updatePixels();
}
