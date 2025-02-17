let RESOLUTION = 200;
let TRAIL_LENGTH_CAP = 300;
let DELAY_CAP = 1;
let WINDOW_Y_OFFSET = -80;
let LINE_SPACING_MULTIPLIER = 130; // Adjust as needed for spacing between lines

let angle = 0;
let targetAngle = 0;
let targetSpread = 0;
let smoothing = 0.05; // Smoothing factor for momentum
let colors;
let colorPairs;
let lines = ["KEVIN  EWING", "SOFTWARE", "ENGINEER"];
let letters = [];

let fonts = [];
let selectedFont;
let fontPaths = [
  "fonts/JosefinSans-Light.ttf",
  "fonts/OpenSans_Condensed-Light.ttf",
  "fonts/OpenSans_Condensed-Regular.ttf",
  "fonts/PlusJakartaSans-Light.ttf",
  "fonts/PlusJakartaSans-Regular.ttf",
  "fonts/Raleway-Bold.ttf",
  "fonts/Raleway-ExtraLight.ttf",
  "fonts/Raleway-Regular.ttf",
  "fonts/ZillaSlab-Medium.ttf",
];

let IDLE_THRESHOLD = 5000;
let lastMouseMoved = 0; // Timestamp of last mouse movement
let idleTimer = 0; // Timer for idle movement
let mousePrev;

// Noise parameters
let noiseScale = 0.1; // Adjust noise scale for frequency
let noiseStrength = 0.5; // Adjust noise strength for magnitude

let font;

function preload() {
  // Creates a p5.Font object.
  font = loadFont('fonts/Raleway-Bold.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  randomizeFont();
  mousePrev = createVector(mouseX, mouseY);
  letters = [];
  colors = [
    color("#0364f2"), // Blue
    color("#058500"), // Green
    color("#ff4300"), // Reddish/Orange
    color("#eeba00"), // Yellow
  ];

  randomizeColorPairs();
  BG_COLOR = color("black");
  background(BG_COLOR);
  textAlign(LEFT, CENTER);
  textSize(windowWidth * 0.1);

  noStroke();

  // Initialize letter structures
  let totalChars = 0;

  for (let i = 0; i < lines.length; i++) {
    totalChars += lines[i].length;
  }

  let lettersIndex = 0;
  // for (let lineNum = 0; lineNum < lines.length; lineNum++) { 
  //   for (let lineLength = 0; lineLength < lines[lineNum].length; lineLength++) {
  for (let lineNum = 0; lineNum < 1; lineNum++) { 
    for (let lineLength = 0; lineLength < 1; lineLength++) {
      let letter = lines[lineNum][lineLength];
      let sizeMultiplier = lineNum != 0 ? 0.8 : 1.1;
      textSize(windowWidth * 0.1 * sizeMultiplier);
      let xOffset = -textWidth(lines[lineNum]) / 2; // Initialize x-offset
      let yOffset = lineNum * sizeMultiplier * LINE_SPACING_MULTIPLIER - LINE_SPACING_MULTIPLIER; // Initialize y-offset
      if (lineLength != 0) {
        xOffset =
          letters[lettersIndex - 1].xOffset +
          textWidth(letters[lettersIndex - 1].letter);
      }
      let tempGeometry = new p5.Geometry();
      // let points = font.textToPoints(letter, 0, 0, windowWidth * 0.1 * sizeMultiplier, {
      //   sampleFactor: 1
      // });
      let points = font.textToPoints('p5*js', 6, 60, 35, { sampleFactor:  0.5 });

      for (let pt of points) {
        tempGeometry.vertices.push(pt.x, pt.y, 10);
      }

      letters.push({
        xOffset: xOffset,
        yOffset: yOffset,
        angle: targetAngle,
        colorPair: colorPairs[lettersIndex],
        letter: letter,
        spread: targetSpread,
        delay: 0,
        sizeMultiplier: sizeMultiplier,
        geometry: tempGeometry
      });
      lettersIndex += 1;
    }
  }

  // Add event listener for visibility change
  document.addEventListener("visibilitychange", handleVisibilityChange, false);
}

function draw() {
  console.log(letters[0])
  noLoop()
  background(200);

  // Center the drawing on the screen
  // translate(-width / 2, -height / 2);

  // for (let letterObj of letters) {
  //   push();
  //   // Move to the letter's position
  //   translate(letterObj.xOffset, letterObj.yOffset);

  //   // Apply color
  //   fill(letterObj.colorPair[0]);
  //   stroke(letterObj.colorPair[1]);

  //   sphere(30);
  //   // model(letterObj.geometry)

  //   pop();
  // }

  // Draw the sphere.
  // Set its radius to 30.
  // model(letters[0].letterObj.geometry)
  // sphere(30)  
}


// function draw() {
//   if (document.hidden) {
//     return; // Stop drawing if the document is hidden
//   }

//   background(BG_COLOR);
//   let targetX = mouseX - windowWidth / 2;
//   let targetY = mouseY - (windowHeight + WINDOW_Y_OFFSET) / 2;
//   // Check if mouse is over canvas
//   if (
//     mouseX >= 0 &&
//     mouseX <= windowWidth &&
//     mouseY >= 0 &&
//     mouseY <= windowHeight &&
//     (mousePrev.x != mouseX || mousePrev.y != mouseY)
//   ) {
//     // Update targetAngle based on mouse movement
//     // Reset idle timer since mouse moved
//     idleTimer = 0;
//     lastMouseMoved = millis();
//     mousePrev.set(mouseX, mouseY);
//   } else {
//     // Increment idle timer
//     idleTimer = millis() - lastMouseMoved;
//   }

//   // If idle for more than IDLE_THRESHOLD, move targetAngle using noise
//   if (idleTimer > IDLE_THRESHOLD) {
//     // Use noise to create smooth, unpredictable movement
//     let noiseX = map(noise(millis() * 0.0001), 0, 1, 0, (windowHeight + WINDOW_Y_OFFSET));
//     let noiseY = map(noise(millis() * 0.0001), 0, 1, 0, windowWidth);
//     targetX = noiseX - windowWidth / 2;
//     targetY = noiseY - (windowHeight + WINDOW_Y_OFFSET) / 2;
//   }

//   updateLetters(targetX, targetY);

//   let halfWindowWidth = windowWidth / 2;
//   let halfWindowHeightOffset = (windowHeight + WINDOW_Y_OFFSET) / 2;

//   for (
//     let resolutionIndex = 0;
//     resolutionIndex < RESOLUTION;
//     resolutionIndex++
//   ) {
//     let stepT = resolutionIndex / (RESOLUTION - 1);

//     for (let letterIndex = 0; letterIndex < letters.length; letterIndex++) {
//       let letter = letters[letterIndex];
//       let xOffset = letter.xOffset;
//       let yOffset = letter.yOffset;
//       let stepDistance = letter.spread / RESOLUTION;

//       // Calculate position based on angle, distance, and stepT
//       let cosAngle = cos(letter.angle);
//       let sinAngle = sin(letter.angle);
//       let positionX =
//         halfWindowWidth +
//         (cosAngle * letter.spread) / 2 +
//         xOffset +
//         cosAngle * stepDistance * (resolutionIndex - RESOLUTION);
//       let positionY =
//         halfWindowHeightOffset +
//         (sinAngle * letter.spread) / 2 +
//         yOffset +
//         sinAngle * stepDistance * (resolutionIndex - RESOLUTION);

//       if (resolutionIndex == RESOLUTION - 1) {
//         fill("black");
//       } else {
//         fill(lerpColor(letter.colorPair[0], letter.colorPair[1], stepT));
//       }
//       textSize(windowWidth * 0.1 * letter.sizeMultiplier);
//       text(letter.letter, positionX, positionY);
//     }
//   }
// }

function updateLetters(targetX, targetY) {
  targetAngle = atan2(targetY, targetX);
  let halfWindowWidth = windowWidth / 2;
  let halfWindowHeight = windowHeight / 2;

  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    let distanceToCenter = dist(targetX, targetY, 0, 0);
    let distanceToLetter = dist(
      targetX,
      targetY,
      letter.xOffset,
      letter.yOffset
    );

    // Update values for each letter based on targetAngle
    letter.angle = lerpAngle(letter.angle, targetAngle, smoothing);
    targetSpread = lerp(
      letter.spread,
      constrain(
        map(distanceToCenter, 0, halfWindowWidth, 0, windowHeight), //TODO
        0,
        TRAIL_LENGTH_CAP
      ),
      smoothing / 2
    );
    letter.spread = targetSpread;
    letter.delay = map(distanceToLetter, 0, halfWindowWidth, 0, DELAY_CAP);
  }
}

function lerpAngle(a, b, t) {
  let difference = b - a;
  if (difference > PI) {
    difference -= TWO_PI;
  } else if (difference < -PI) {
    difference += TWO_PI;
  }
  return a + difference * t;
}

function randomDifferentColor() {
  let color1, color2;
  do {
    color1 = random(colors);
    color2 = random(colors);
  } while (color1 === color2);
  return [color1, color2];
}

function randomizeColorPairs() {
  colorPairs = [];
  let totalChars = 0;

  for (let i = 0; i < lines.length; i++) {
    totalChars += lines[i].length;
  }

  for (let i = 0; i < totalChars; i++) {
    colorPairs.push(randomDifferentColor());
  }
}

function resizeWindow() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
  draw();
}

function mousePressed() {
  randomizeFont();
  randomizeColorPairs();

  let lettersIndex = 0;
  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    for (let lineLength = 0; lineLength < lines[lineNum].length; lineLength++) {
      let letter = lines[lineNum][lineLength];
      let sizeMultiplier = lineNum != 0 ? 0.8 : 1.1;
      textSize(windowWidth * 0.1 * sizeMultiplier);
      let xOffset = -textWidth(lines[lineNum]) / 2;
      let yOffset = lineNum * sizeMultiplier * LINE_SPACING_MULTIPLIER - LINE_SPACING_MULTIPLIER;
      if (lineLength != 0) {
        xOffset =
          letters[lettersIndex - 1].xOffset +
          textWidth(letters[lettersIndex - 1].letter);
      }

      letters[lettersIndex].xOffset = xOffset;
      letters[lettersIndex].yOffset = yOffset;
      letters[lettersIndex].colorPair = colorPairs[lettersIndex];
      lettersIndex += 1;
    }
  }
}

function randomizeFont() {
  currentFont = random(fonts);
  // font = currentFont;
}

function handleVisibilityChange() {
  if (document.hidden) {
    noLoop(); // Stop the draw loop
  } else {
    loop(); // Start the draw loop again
  }
}
