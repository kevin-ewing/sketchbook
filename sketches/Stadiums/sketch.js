const NOISE_DIFF = 20;
const NOISE_DF = 1;
let COLORS = [
  [264, 82, 33], // #2b0f54
  [330, 82, 67], // #ab1f65
  [351, 69, 100], // #ff4f69
  [353, 3, 97], // #fff7f8
  [20, 74, 100], // #ff8142
  [48, 73, 100], // #ffda45
  [221, 77, 86], // #3368dc
  [187, 69, 93], // #49d9ec
];

function setup() {
  createCanvas(1000, 1259);
  pixelDensity(2);
  noLoop();
}

function draw() {
  background(255);
  colorMode(HSB);

  // Define the number of stadiums and the spacing between them
  let numStadiums = 7;
  let spacing = 50; // Spacing between stadiums

  // Calculate the initial dimensions of the outermost stadium
  let initialWidth = width * 0.8;
  let initialHeight = height * 0.9;
  let x = width / 2;
  let y = height / 2;

  // Draw multiple gradient stadiums using a loop
  for (let i = 0; i < numStadiums; i++) {
    let w = initialWidth - i * 2 * spacing;
    let h = initialHeight - i * 2 * spacing;

    // Adjust position if needed (in this case, the stadiums are centered)
    let numColors = 2; // Number of colors in the gradient

    drawGradientStadium(x, y, w, h, numColors);
  }

  // Calculate the dimensions for the white stadium
  let whiteW = initialWidth - numStadiums * 2 * spacing;
  let whiteH = initialHeight - numStadiums * 2 * spacing;

  // Draw the white stadium in the middle
  drawSolidStadium(x, y, whiteW, whiteH, color(255));

  // Add noise to the entire image
  addNoise();
}

// Function to draw a gradient-filled stadium
function drawGradientStadium(x, y, stadiumWidth, stadiumHeight, numColors) {
  // Create a gradient with multiple randomly generated colors
  let gradientGraphics = createGraphics(width, height);

  let colors = [];
  let baseColor = color(random(COLORS)); // Pick a random base color

  for (let i = 0; i < numColors; i++) {
    let h = hue(baseColor); // Keep the hue of the base color
    let s = saturation(baseColor); // Keep the saturation of the base color
    let b = brightness(baseColor) * random(0.8, 1.2); // Randomly alter the brightness
    b = constrain(b, 0, 100); // Ensure brightness stays within bounds
    colors.push(color(h, s, b)); // Add the modified color to the gradient
  }

  // Draw the gradient vertically
  for (let yPos = 0; yPos < height; yPos++) {
    let t = map(yPos, 0, height - 1, 0, numColors - 1);
    let index = floor(t);
    let inter = t - index;
    let c;
    if (index < numColors - 1) {
      c = lerpColor(colors[index], colors[index + 1], inter);
    } else {
      c = colors[numColors - 1];
    }
    gradientGraphics.stroke(c);
    gradientGraphics.line(0, yPos, width, yPos);
  }

  // Create a graphics buffer for the mask (stadium shape)
  let maskGraphics = createGraphics(width, height);
  maskGraphics.pixelDensity(1); // Ensures the mask aligns properly
  maskGraphics.clear(); // Clear to make the background transparent

  // Draw the stadium shape onto the mask graphics buffer
  drawStadium(maskGraphics, x, y, stadiumWidth, stadiumHeight);

  // Create images from the graphics buffers
  let gradientImage = gradientGraphics.get();
  let maskImage = maskGraphics.get();

  // Apply the mask to the gradient image
  gradientImage.mask(maskImage);

  // Draw the masked gradient (stadium shape) onto the canvas
  image(gradientImage, 0, 0);
}

// Function to draw a solid-colored stadium onto the canvas
function drawSolidStadium(x, y, w, h, col) {
  fill(col);
  noStroke();
  ellipseMode(CENTER);
  rectMode(CENTER);

  // Draw the central rectangle part of the stadium
  rect(x, y, w, h - w);

  // Draw the semicircular ends of the stadium
  ellipse(x, y - (h - w) / 2, w, w);
  ellipse(x, y + (h - w) / 2, w, w);
}

// Function to draw a stadium shape onto a graphics buffer
function drawStadium(pg, x, y, w, h) {
  pg.fill(255); // White fill for the mask
  pg.noStroke();
  pg.ellipseMode(CENTER);
  pg.rectMode(CENTER);

  // Draw the central rectangle part of the stadium
  pg.rect(x, y, w, h - w);

  // Draw the semicircular ends of the stadium
  pg.ellipse(x, y - (h - w) / 2, w, w);
  pg.ellipse(x, y + (h - w) / 2, w, w);
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
