let branchAngle;
let branchLength;
let branchShrink;

let TOD_INDICATOR = 0;
let sunrise = 0;
let sunset = 0;

const MIN_BRANCH = 0.2;
const MAX_BRANCH = 1;
const WIDTH_FACTOR = .2;
const TREE_PER_LAYER = 3;
const BACKGROUND_GEAR_COLOR = [186, 154, 48, 255];
const FOREGROUND_GEAR_COLOR = [212,175,55,255];
const BACKGROUND_COLOR = [192,192,192]

function setup() {

  createCanvas(800, 800);

  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    // Get the current date
    const today = new Date();
  
    // Get the sunrise and sunset times for the current date and location
    const times = SunCalc.getTimes(today, latitude, longitude);
  
    // Extract the sunrise and sunset times
    sunrise = times.sunrise.getTime();
    sunset = times.sunset.getTime();
  
  }, error => {
    console.log(`Error getting location: ${error.message}`);
  });

}

function draw() {
  const d = new Date();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();

  get_TOD(d);

  background(220);
  drawDisk();
  drawDiskCover();
  push();
  drawAllGears();
  drawWatchFace(hours, minutes, seconds)
  pop();
  drawBoarder();
}

function drawAllGears(){
  const sd = 100;
  randomSeed(16);

  for (let i = 0; i < 40 ; i ++){
    let x = 0;
    let y = 0;
    if (random() < 0.5){
      if (random() < 0.5){
        x = randomGaussian(100,sd);
        y = random(0,800);
      }
      else{
        x = randomGaussian(700,sd);
        y = random(0,800);
      }
    }
    else{
      if (random() < 0.5){
        y = randomGaussian(100,sd);
        x = random(0,800);
      }
      else{
        y = randomGaussian(700,sd);
        x = random(0,800);
      }
    }
    let spin = random(100, 300);
    let radius = random(30,100)
    let choices = [-1, 1];
    let index = Math.floor(random() * choices.length);
    let spinDir = choices[index] * spin;
    drawFilledGear(x, y, frameCount / spinDir, radius, 4, floor(radius*1.2));
  }

  for (let i = 0; i < 50 ; i ++){
    let x = 0;
    let y = 0;
    if (random() < 0.5){
      if (random() < 0.5){
        x = randomGaussian(100,sd);
        y = random(0,800);
      }
      else{
        x = randomGaussian(700,sd);
        y = random(0,800);
      }
    }
    else{
      if (random() < 0.5){
        y = randomGaussian(100,sd);
        x = random(0,800);
      }
      else{
        y = randomGaussian(700,sd);
        x = random(0,800);
      }
    }
    let spin = random(100, 300);
    let radius = random(30,120)
    let choices = [-1, 1];
    let index = Math.floor(random() * choices.length);
    let spinDir = choices[index] * spin;
    drawEmptyGear(x, y, frameCount / spinDir, radius, 4, floor(radius*1.2));
  }

}

function drawEmptyGear(x, y, angle, innerRadius, toothWidth, numTeeth) {
  push();
  translate(x, y);
  rotate(angle);

  let outerRadius = innerRadius + toothWidth; // Outer radius of the gear

  // Draw the gear teeth
  fill(color(FOREGROUND_GEAR_COLOR));
  stroke(0);
  noStroke(1);
  for (let i = 0; i < numTeeth; i++) {
    let angle = map(i, 0, numTeeth, 0, TWO_PI);
    let x1 = innerRadius * cos(angle);
    let y1 = innerRadius * sin(angle);
    let x2 = outerRadius * cos(angle);
    let y2 = outerRadius * sin(angle);
    let x3 = outerRadius * cos(angle + toothWidth / outerRadius);
    let y3 = outerRadius * sin(angle + toothWidth / outerRadius);
    let x4 = innerRadius * cos(angle + toothWidth / innerRadius);
    let y4 = innerRadius * sin(angle + toothWidth / innerRadius);

    beginShape();
    vertex(x1, y1);
    vertex(x2, y2);
    vertex(x3, y3);
    vertex(x4, y4);
    endShape(CLOSE);
  }

  // Draw the gear hole
  // fill(0);
  stroke(color(FOREGROUND_GEAR_COLOR));
  noFill();
  strokeWeight(innerRadius/6);
  ellipse(0, 0, innerRadius * 1.85);
  line(0,-innerRadius+innerRadius/6,0,innerRadius-innerRadius/6);
  line(-innerRadius+innerRadius/6,0,innerRadius-innerRadius/6,0);

  fill(color(FOREGROUND_GEAR_COLOR))
  noStroke();
  ellipse(0, 0, innerRadius * .5);

  pop();
}

function drawFilledGear(x, y, angle, innerRadius, toothWidth, numTeeth) {
  push();
  translate(x, y);
  rotate(angle);

  let outerRadius = innerRadius + toothWidth; // Outer radius of the gear

  // Draw the gear teeth
  fill(color(BACKGROUND_GEAR_COLOR));
  stroke(0);
  noStroke(1);
  for (let i = 0; i < numTeeth; i++) {
    let angle = map(i, 0, numTeeth, 0, TWO_PI);
    let x1 = innerRadius * cos(angle);
    let y1 = innerRadius * sin(angle);
    let x2 = outerRadius * cos(angle);
    let y2 = outerRadius * sin(angle);
    let x3 = outerRadius * cos(angle + toothWidth / outerRadius);
    let y3 = outerRadius * sin(angle + toothWidth / outerRadius);
    let x4 = innerRadius * cos(angle + toothWidth / innerRadius);
    let y4 = innerRadius * sin(angle + toothWidth / innerRadius);

    beginShape();
    vertex(x1, y1);
    vertex(x2, y2);
    vertex(x3, y3);
    vertex(x4, y4);
    endShape(CLOSE);
  }

  // Draw the gear hole
  ellipse(0, 0, innerRadius * 2);

  pop();
}

function drawWatchFace(hours, minutes, seconds ) {
  push();
  translate(400,400);
  scale(2.5);
  
  // Calculate the angle for each hand (hour, minute, and second)
  let hourAngle = map(hours % 12, 0, 12, 0, TWO_PI);
  let minuteAngle = map(minutes, 0, 60, 0, TWO_PI);
  let secondAngle = map(seconds, 0, 60, 0, TWO_PI);

  // Draw supports
  for (let i = 0; i < 3; i++) {
    push();
    strokeCap(SQUARE);
    rotate(i * TWO_PI / 3 - PI/2);
    stroke("#4b390b");
    strokeWeight(34);
    line(100, 0, 200, 0);
    stroke("#daa520");
    strokeWeight(30);
    line(100, 0, 200, 0);
    pop();
  }

  // Draw the hour markers
  for (let i = 0; i < 12; i++) {
    push();
    rotate(i * TWO_PI / 12 - PI/2);
    stroke("#f7eaca");
    strokeWeight(10);
    line(85, 0, 100, 0);
    pop();
  }

  // Draw the clock face
  noFill();
  stroke("#daa520");
  strokeWeight(20);
  ellipse(0, 0, 200, 200);
  stroke("#4b390b");
  strokeWeight(2);
  ellipse(0, 0, 220, 220);
  stroke("#f7eaca");
  strokeWeight(2);
  ellipse(0, 0, 180, 180);
  
  for (let i = 0; i < 60; i++) {
    push();
    rotate(i * TWO_PI / 60 - PI/2);
    stroke("#f7eaca");
    strokeWeight(2);
    line(90, 0, 93, 0);
    pop();
  }

  // Draw the hour markers
  for (let i = 0; i < 12; i++) {
    push();
    rotate(i * TWO_PI / 12 - PI/2);
    stroke("#daa520");
    strokeWeight(6);
    line(85, 0, 100, 0);
    stroke("#E0115F");
    strokeWeight(2);
    line(85, 0, 90, 0);
    pop();
  }


  
  // Draw the hour hand
  push();
  rotate(hourAngle - PI/2);
  stroke("#4b390b");
  strokeWeight(8);
  line(0, 0, 45, 0);
  stroke("#f7eaca");
  strokeWeight(1);
  line(0, 0, 45, 0);
  pop();
  
  // Draw the minute hand
  push();
  rotate(minuteAngle - PI/2);
  stroke("#4b390b");
  strokeWeight(4);
  line(0, 0, 65, 0);
  stroke("#f7eaca");
  strokeWeight(1);
  line(0, 0, 65, 0);
  pop();
  
  // Draw the second hand
  push();
  rotate(secondAngle - PI/2);
  stroke(0);
  strokeWeight(2);
  line(0, 0, 80, 0);
  pop();

  fill("#daa520");
  noStroke();
  ellipse(0,0,10,10);
  

}

function drawBoarder(){
  push()
  noFill();
  stroke("#4b390b")
  strokeWeight(60);
  rect(0,0,800,800);
  stroke("#daa520")
  strokeWeight(50);
  rect(0,0,800,800);
  pop()
}

function drawDisk(){
  push();
  randomSeed(16);


  let placeholder = PI/2;
  if (TOD_INDICATOR == 1){
    placeholder = 3*PI/2
  }
  translate(width/2, 555)
  rotate(placeholder);
  
  // set the fill colors
  fill("navy");
  noStroke();

  // draw the top half of the circle
  arc(0,0, width, height, -HALF_PI, HALF_PI, PIE);
  fill("#87cefa");
  // draw the bottom half of the circle
  arc(0, 0, width, height, HALF_PI, 3*HALF_PI, PIE);

  stroke(255);
  strokeWeight(2)
  for (let i = 0; i < 600; i++) {
    let x = random(0, 500);
    let y = random(-height/2, height/2);
    point(x, y);
  }

  noStroke();
  fill(255);
  ellipse(200,120,80,80);


  noStroke();
  fill("#FFE87C");
  ellipse(-200,120,80,80);



  push()
  randomSeed(13);
  rotate(PI/2);
  nightBranch(40);
  pop();


  push()
  randomSeed(13);
  rotate(-PI/2);
  branch(40);
  pop();

  stroke("#daa520")
  strokeWeight(10)
  line(0,-500,0,500);


  pop()

}

function drawDiskCover(){
  push();
  translate(width/2, 555)
  rotate(-PI/2);

  stroke("#daa520");
  strokeWeight(20);
  fill(BACKGROUND_COLOR);

  beginShape();
  vertex(-40, 0);
  for (let i = -90; i <= 90; i++) {
    let x = 280 * cos(radians(i))+30;
    let y = 380 * sin(radians(i));
    vertex(x, y);
  }
  vertex(-40, 0);
  vertex(-1000, 0);
  vertex(-1000, 1000);
  vertex(1000, 1000);
  vertex(1000, -1000);
  vertex(-1000, -1000);
  vertex(-1000, 0);
  endShape();

  fill(BACKGROUND_COLOR);
  noStroke();
  rect(-50,50,-1000,-100);
  pop()

}

function branch(len) {
  // Set the color of the line based on the length of the branch
  if (len > 10) {
    // Make the grey darker and slightly brown
    stroke(105 - len / 4, 89 - len / 4, 75 - len / 4);
  } else {
    // Vary the green slightly and desaturate it
    stroke(random(20, 40), random(120, 140), random(20, 40), 100);
  }

  strokeWeight(len*WIDTH_FACTOR);
  line(0, 0, 0, -len);
  translate(0, -len);

  branchShrink = random(0.7, 0.75);

  if (len > 2) {
    push();
    rotate(random(MIN_BRANCH, MAX_BRANCH));
    branch(len * branchShrink);
    pop();

    push();
    rotate(-random(MIN_BRANCH, MAX_BRANCH));
    branch(len * branchShrink);
    pop();
  }
}

function nightBranch(len) {
  // Set the color of the line based on the length of the branch
  stroke(0);

  strokeWeight(len*WIDTH_FACTOR);
  line(0, 0, 0, -len);
  translate(0, -len);

  branchShrink = random(0.7, 0.75);

  if (len > 2) {
    push();
    rotate(random(MIN_BRANCH, MAX_BRANCH));
    nightBranch(len * branchShrink);
    pop();

    push();
    rotate(-random(MIN_BRANCH, MAX_BRANCH));
    nightBranch(len * branchShrink);
    pop();
  }
}

function get_TOD(time){
  if (sunrise != 0 && sunset != 0){
    if (time.getTime() < sunrise || time.getTime() > sunset){
      TOD_INDICATOR = 1;
    }
  }
}