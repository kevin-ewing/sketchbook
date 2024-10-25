let t;
let cellSize = 10; // Size of each cell in pixels
let radius = 150;
let noiseRadius = 2;
let color;
let blobCount = 5; // Configurable number of noise blobs
let blobs = []; // Array to hold each blob's position
let speedFactor = 0.002; // Slower speed factor for movement

function setup() {
  colorMode(HSB, 100, 100, 100);
  createCanvas(windowWidth, windowHeight);
  color = [random(0, 100), 50, 80];

  noFill();
  for (let i = 0; i < blobCount; i++) {
    blobs.push({ x: 0, y: 0, offset: random(10000) }); // Each blob gets a unique noise offset
  }
}

function draw() {
  t = frameCount * speedFactor; // Slower time increment for smoother, slower animation
  background(color);
  // Update blob positions using noise
  blobs.forEach((blob) => {
    blob.x = map(
      noise(blob.offset + noiseRadius * cos(TWO_PI * t)),
      0,
      1,
      0,
      width
    );
    blob.y = map(
      noise(blob.offset + 10000 + noiseRadius * sin(TWO_PI * t)),
      0,
      1,
      0,
      height
    );
  });

  // Calculate number of cells based on cell size and canvas dimensions
  let cols = Math.ceil(width / cellSize);
  let rows = Math.ceil(height / cellSize);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      stroke(255);
      strokeWeight(2);

      // Calculate radius based on noise at this grid point
      let currentRadius =
        100 *
          noise(
            x * cellSize * 0.01,
            y * cellSize * 0.01,
            noiseRadius * cos(TWO_PI * t),
            noiseRadius * sin(TWO_PI * t)
          ) +
        100;

      // Check how many blobs are within the radius for this cell
      let blobCountInRadius = blobs.filter(
        (blob) =>
          dist(x * cellSize, y * cellSize, blob.x, blob.y) < currentRadius
      ).length;

      // Draw lines based on blob overlap condition
      if (blobCountInRadius === 1) {
        // Only one blob influences this cell - skewed line
        line(
          x * cellSize,
          y * cellSize,
          (x + 1) * cellSize,
          (y + 1) * cellSize
        );
      } else {
        // Multiple blobs influence this cell - revert to original direction
        line(
          (x + 1) * cellSize,
          y * cellSize,
          x * cellSize,
          (y + 1) * cellSize
        );
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
