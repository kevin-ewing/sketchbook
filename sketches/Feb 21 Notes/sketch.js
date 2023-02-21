const NUM_SLICES = 50;
const RADIUS = 300;

let divisionSlider;

function setup(){
  createCanvas(800,800)
  colorMode(HSB,1);
  noStroke()

  divisionSlider = createSlider(3,100,50,1);
  divisionSlider.position(width/2-150, height + 10);
  divisionSlider.style("width","300px")
}

 function draw(){
  background(0,0,1);
  const slices = divisionSlider.value()

  const inc_angle = TWO_PI /slices;
  const inc_hue = 1/slices;

  const cx = width/2;
  const cy = height/2;

  beginShape(TRIANGLE_FAN);
  vertex(cx, cy)
  for (let i = 0; i <= slices; i ++){
    fill(i*inc_hue,1,1);
    vertex (cx + RADIUS * cos(i*inc_angle), cy + RADIUS * sin(i*inc_angle));
  }
  endShape()
 }

 function getPoint(angle){
  return [(width/2)+RADIUS*Math.sin(angle), (height/2)+RADIUS*Math.cos(angle)]
}