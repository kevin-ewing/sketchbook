let my_hue = 0;
const my_val = 0;
const my_sat = 0;

let my_stroke = 2
let stroke_shrinking = true

let x, y; // position of the ball
let dx = myRandom(-5,5);
let dy = myRandom(-5,5); // velocity of the ball


let radius = 200; // radius of the ball
let radius_shrinking = true



// let angle = myRandom(0,Math.PI);

function setup() {
  blendMode(ADD)
  colorMode(HSB, 1);
  createCanvas(1000, 1000);
  background(my_hue,my_val,my_sat);

  x = width/2; // start the ball in the center of the canvas
  y = height/2;
}



function draw() {
  background(my_hue,my_val,my_sat, .1)
  noFill()
  
  // Adjusting hue
  if (my_hue + .01 > 1){
    my_hue = 0;
  }

  my_hue += myRandom(0,0.01);


  // Adjusting stroke
  if(my_stroke > 40 && !stroke_shrinking){
    stroke_shrinking = true
    my_stroke -= myRandom(0,0.1);
  }
  else if(my_stroke < 10 && stroke_shrinking){
    stroke_shrinking = false
    my_stroke += myRandom(0,0.1);
  }
  else if (!stroke_shrinking){
    my_stroke += myRandom(0,0.1);
  }
  else{
    my_stroke -= myRandom(0,0.1);
  }

  stroke(my_hue, .2, 1)
  strokeWeight(my_stroke)

  // Adjusting radius
  if(radius > 400 && !radius_shrinking){
    radius_shrinking = true
    radius -= myRandom(0,.1);
  }
  else if(radius < 40 && radius_shrinking){
    radius_shrinking = false
    radius += myRandom(0,.1);
  }
  else if (!radius_shrinking){
    radius += myRandom(0,.1);
  }
  else{
    radius -= myRandom(0,.1);
  }


  ellipse(x, y, radius*2, radius*2);

  // update the ball's position
  x += dx;
  y += dy;
  
  // check if the ball hits the canvas walls
  if (x + (radius+1) > width || x - (radius+1) < 0) {
    dx = -dx; // reverse the x-velocity
  }
  if (y + (radius+1) > height || y - (radius+1) < 0) {
    dy = -dy; // reverse the y-velocity
  }
}


function myRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// function getPoint(angle,){
//   return [500+100*Math.sin(angle), 500+100*Math.cos(angle)]
// }