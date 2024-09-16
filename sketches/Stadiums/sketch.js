function setup() {
  createCanvas(600, 900);
  pixelDensity(2);
  noLoop();
}

function draw() {
  background(255);
  colorMode(HSB);
  // Define the number of stadiums and the spacing between them
  let numStadiums = 7;
  let spacing = 30; // Spacing between stadiums

  // Calculate the initial dimensions of the outermost stadium
  let initialWidth = width * 0.8;
  let initialHeight = height * 0.8;
  let x = width / 2;
  let y = height / 2;

  // Draw multiple gradient stadiums using a loop
  for (let i = 0; i < numStadiums; i++) {
    let w = initialWidth - i * 2 * spacing;
    let h = initialHeight - i * 2 * spacing;

    // Adjust position if needed (in this case, the stadiums are centered)
    let numColors = 7; // Number of colors in the gradient

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

  // Generate random colors for the gradient
  let baseColorHue = random(255);
  let colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(
      color(baseColorHue + random(-60, 60), random(60, 100), random(60, 85))
    );
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
  // Define the noise intensity
  const NOISE_DIFF = 25;

  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    // Add random noise to each color channel
    pixels[i] += random(-NOISE_DIFF, NOISE_DIFF); // Red
    pixels[i + 1] += random(-NOISE_DIFF, NOISE_DIFF); // Green
    pixels[i + 2] += random(-NOISE_DIFF, NOISE_DIFF); // Blue
  }
  updatePixels();
}
