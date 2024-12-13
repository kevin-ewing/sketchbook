const NOISE_DIFF = 20;
const NOISE_DF = 1;
let COLORS = [
  "#2b0f54",
  "#ab1f65",
  "#ff4f69",
  "#fff7f8",
  "#ff8142",
  "#ffda45",
  "#3368dc",
  "#49ec9d",
];

function setup() {
  createCanvas(600, 900);
  pixelDensity(4);
  noStroke();
  noLoop();
}

function draw() {
  background(255);
  colorMode(RGB);

  // Define the number of rows and columns
  let numRows = 30;
  let sidePadding = 40;
  let vertPadding = 60;

  // Calculate the space available for rectangles
  let availableWidth = width - 2 * sidePadding;
  let availableHeight = height - 2 * vertPadding;

  // Calculate the height of each row
  let rowHeight = availableHeight / numRows;

  // Draw each row
  for (let row = 0; row < numRows; row++) {
    let y = vertPadding + row * rowHeight;

    // Random split position within the middle 80% of the row
    let split =
      sidePadding + random(0.1 * availableWidth, 0.9 * availableWidth);

    // Set random colors for the two rectangles
    fill(random(COLORS));
    rect(sidePadding, y, split - sidePadding, rowHeight);

    fill(random(COLORS));
    rect(split, y, sidePadding + availableWidth - split, rowHeight);
  }

  addNoise();
}

// Existing addNoise function
function addNoise() {
  // Add noise to the image
  loadPixels();

  // Get the pixel density factor
  let d = pixelDensity();
  let totalPixels = 4 * width * height * d * d;

  // First, swap pixels using normal distribution
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      for (let di = 0; di < d; di++) {
        for (let dj = 0; dj < d; dj++) {
          // Calculate the current pixel index
          let index = 4 * (i * d + di + (j * d + dj) * width * d);

          // Find a random neighboring pixel with normal distribution
          let randX = int(randomGaussian(0, NOISE_DF)); // standard deviation of 3
          let randY = int(randomGaussian(0, NOISE_DF)); // standard deviation of 3

          // Calculate the neighboring pixel coordinates
          let neighborX = constrain(i + randX, 0, width - 1);
          let neighborY = constrain(j + randY, 0, height - 1);

          // Find the corresponding index for the neighboring pixel
          let neighborIndex =
            4 * (neighborX * d + di + (neighborY * d + dj) * width * d);

          // Swap the pixels
          for (let k = 0; k < 4; k++) {
            // iterate through RGBA
            let temp = pixels[index + k];
            pixels[index + k] = pixels[neighborIndex + k];
            pixels[neighborIndex + k] = temp;
          }
        }
      }
    }
  }

  // Second, add random color value noise to the image
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      for (let di = 0; di < d; di++) {
        for (let dj = 0; dj < d; dj++) {
          // Calculate the current pixel index
          let index = 4 * (i * d + di + (j * d + dj) * width * d);

          // Add noise to the color values
          pixels[index] += random(-NOISE_DIFF, NOISE_DIFF); // Red
          pixels[index + 1] += random(-NOISE_DIFF, NOISE_DIFF); // Green
          pixels[index + 2] += random(-NOISE_DIFF, NOISE_DIFF); // Blue
        }
      }
    }
  }

  updatePixels();
}
