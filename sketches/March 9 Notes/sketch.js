const NUM_CIRCLES = 100;
const HUE_VARIATION = 10;

function setup() {
  createCanvas(900, 900);
  colorMode(HSB, 100);
  background(0);
  noStroke();
  noLoop();
}

function draw() {
  let baseHue = random(100);

  for (let x = 0; x <= NUM_CIRCLES; x++){
    let tempX = random(height);
    let tempY = random(height);
    let tempSize = random(100, 400);
    let tempHueVariation = random(-HUE_VARIATION,HUE_VARIATION);
    let tempSaturation= random(30,85);
    let tempBrightness = random(85);
    let tempAlpha = random(0,70);

    myCircle(tempX,tempY,tempSize,(baseHue+tempHueVariation)%100,tempSaturation,tempBrightness,tempAlpha)
  }
}

function myCircle(x,y,size,hue,saturation,brightness,alpha){
  fill(color(hue,saturation,brightness,alpha));
  ellipse(x,y,size,size);
}