let offscreenGraphics;
let sfProFont;
let sfProBoldFont;
let backgroundImage;
let shadow;


function preload() {
  // Specify the path to your SF Pro font file
  sfProFont = loadFont('./SF-Pro.ttf');
  sfProFontBold = loadFont('./SF-Pro-Text-Bold.otf');
  backgroundImage = loadImage('./Monterey_Graphic.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create an offscreen graphics buffer
  offscreenGraphics = createGraphics(300, 100);
  shadow = createGraphics(320, 120);
  drawShadow(shadow);

  offscreenGraphics.textFont(sfProFont)
  drawBoxPopup(offscreenGraphics, 0, 0, 300, 100, 5);
  background(backgroundImage);
}

function draw() {
  if (frameCount % 10 === 0) {
    let x = random(-300, width+300)
    let y = random(-200, height+200)
    image(shadow, x-5, y-2);
    image(offscreenGraphics, x, y);
  }
}

function drawBoxPopup(graphics, x, y, w, h, radius) {
  graphics.strokeWeight(1);
  graphics.stroke("#d1d1d1");
  graphics.fill("#ececec");
  
  // Draw the rounded box
  graphics.rect(x, y, w, h, radius);


  // Create a gradient from #e8e6e8 at the top to #c0bec0 at the bottom
  let gradient = graphics.drawingContext.createLinearGradient(x, y, x, y + 30);
  gradient.addColorStop(0, "#e8e6e8");
  gradient.addColorStop(1, "#c0bec0");
  
  // Set the gradient as the fill style for the shape
  graphics.drawingContext.fillStyle = gradient;

  graphics.rect(x, y, w, 20, radius, radius, 0, 0);


  // Create a gradient from #e8e6e8 at the top to #c0bec0 at the bottom
  let gradient2 = graphics.drawingContext.createLinearGradient(x, y+80, x, y + 100);
  gradient2.addColorStop(0, "#69b1fa");
  gradient2.addColorStop(1, "#1477fb");
  
  // Set the gradient as the fill style for the shape
  graphics.drawingContext.fillStyle = gradient2;
  graphics.rect(x+200, y+70, 80, 20, radius);

  
  // Draw the close button
  graphics.fill(255, 0, 0);
  graphics.noStroke();
  
  // Draw the content text
  graphics.fill(0);
  graphics.textSize(14);
  graphics.textAlign(LEFT, TOP);
  graphics.textFont(sfProFontBold)
  graphics.text("Attention", x + 20, y + 30, w - 40, h - 80);

  graphics.textFont(sfProFont)
  graphics.textSize(12);
  graphics.text("Your system has detected a critical vulnerability.", x + 20, y + 50, w, h - 80);

  graphics.fill(255);
  graphics.textSize(14);
  graphics.text("Accept", x+220, y+71, w - 40, h - 80);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(backgroundImage);
}


function drawShadow(g) {
  g.clear();
  g.noStroke();
  g.fill(0, 80);
  g.rect(10,10,300,100);
  g.filter(BLUR, 5);
}