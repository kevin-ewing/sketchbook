const DEEP_SEA_LEVEL = .2;
const DEEP_SEA_COLOR = "#015c98";
const SEA_LEVEL = .50;
const SEA_COLOR = "#0099fe";
const BEACH_LEVEL = .54;
const BEACH_COLOR = "#ffff00";
const FOREST_LEVEL = .60;
const FOREST_COLOR = "#01ff00";
const HIGH_FOREST_LEVEL = .68;
const HIGH_FOREST_COLOR = "#00cc00";
const MOUNT_LEVEL = .74;
const MOUNT_COLOR = "#595959";
const HIGH_MOUNT_LEVEL = .75;
const HIGH_MOUNT_COLOR = "#999999";
const SNOW_COLOR = "#ffffff"

const PIX_SIZE = 5;

let fastTick;
let slowTick;
let graphic;
let x, y;
let speed = 10;

function setup() {
  createCanvas(800, 800);
  pixelDensity(2); // increase pixel density
  noStroke();
  fastTick = floor(random(0,1000));
  slowTick = floor(random(0,1000));
  // frameRate(20);

  graphic = createGraphics(100, 125);
  x = width/2;
  y = (2*height)/3;

  drawPlane();
  imageMode(CENTER);
}

function draw(){
  for (let x = 0; x < width; x += PIX_SIZE) { // draw rectangles instead of individual pixels
    for (let y = 0; y < height; y += PIX_SIZE) {

      noiseDetail(5, 0.43);
      let noiseVal = noise(x / 50, y / 50 - (slowTick/10));

      if(noiseVal < DEEP_SEA_LEVEL){
        fill(DEEP_SEA_COLOR);
      }
      else if(noiseVal < SEA_LEVEL){
        fill(SEA_COLOR);
      }
      else if(noiseVal < BEACH_LEVEL){
        fill(BEACH_COLOR);
      }
      else if(noiseVal < FOREST_LEVEL){
        fill(FOREST_COLOR);
      }
      else if(noiseVal < HIGH_FOREST_LEVEL){
        fill(HIGH_FOREST_COLOR);
      }
      else if(noiseVal < MOUNT_LEVEL){
        fill(MOUNT_COLOR);
      }
      else if(noiseVal < HIGH_MOUNT_LEVEL){
        fill(HIGH_MOUNT_COLOR);
      }
      else{
        fill(SNOW_COLOR);
      }

      rect(x, y, PIX_SIZE, PIX_SIZE);

      noiseDetail(2, 0.8);
      let cloudValue = noise(x / 100, y / 100 - (fastTick/10));
      if(cloudValue > 0.55 ){
        fill(256,(cloudValue+.2)*256);
      }

      rect(x, y, PIX_SIZE, PIX_SIZE);
    }
  }
  fastTick += 1;

  if (fastTick % 5 == 0){
    slowTick += 1;
  }

  image(graphic, x, y);

  if (keyIsDown(LEFT_ARROW)) {
    x -= speed;
    x = constrain(x , 0 + graphic.width, width - graphic.width);
  } else if (keyIsDown(RIGHT_ARROW)) {
    x += speed;
    x = constrain(x, 0 + graphic.width, width - graphic.width);
  }

  if (keyIsDown(UP_ARROW)) {
    y -= speed;
    y = constrain(y, 0 + graphic.height, height - graphic.height);
  } else if (keyIsDown(DOWN_ARROW)) {
    y += speed;
    y = constrain(y, 0 + graphic.height, height - graphic.height);
  }

}

function drawPlane(){
  
  graphic.noStroke();

  //WINGS
  graphic.fill("#2c3a25")
  graphic.rect(5,40,90,20);
  graphic.rect(0,45,100,10);
  graphic.rect(15,60,70,5);
  graphic.rect(25,65,50,5);
  graphic.fill("#415c35")
  graphic.rect(15,55,70,5);
  graphic.rect(25,60,50,5);
  graphic.rect(5,45,90,10);
  graphic.fill("#55764a")
  graphic.rect(15,45,70,10);


  //BODY
  graphic.fill("#2c3a25")
  graphic.rect(40,15,20,100)
  graphic.rect(45,10,10,110)
  graphic.fill("#829678");
  graphic.rect(45,15,10,10);
  graphic.fill("#57744c");
  graphic.rect(45,25,5,80);
  graphic.fill("#648258");
  graphic.rect(50,25,5,80);
  graphic.fill("#bcbdbe");
  graphic.rect(45,0,10,5);
  graphic.fill("#f2f2f2");
  graphic.rect(25,5,50,5);
  graphic.fill("#e7e7e5");
  graphic.rect(35,5,30,5);
  graphic.fill("#ec6a56");
  graphic.rect(45,55,5,10);
  graphic.fill("#f6e4b1");
  graphic.rect(50,55,5,10);
  graphic.fill("#2c3a25")
  graphic.rect(30,95,40,20);
  graphic.rect(25,100,50,10);
  graphic.fill("#415c35")
  graphic.rect(30,100,40,10);
  graphic.rect(45,105,10,10);
  graphic.fill("#57754c");
  graphic.rect(35,100,30,5);
  graphic.rect(40,95,20,5);
  graphic.fill("#ec6a56");
  graphic.rect(50,95,5,15);
  graphic.fill("#f6e4b1");
  graphic.rect(45,95,5,15);
}