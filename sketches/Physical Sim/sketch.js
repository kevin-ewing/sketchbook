const NUM_BALLS = 1000;
let BG_COLOR;
let COLOR_ARRAY;
let MAIN_COLOR;

let system;
let wind;

function setup() {
  createCanvas(800,800);
  colorMode(HSB,360);
  MAIN_COLOR = color(random(0,360),200,300);
  COLOR_ARRAY = getAnalogousColors(MAIN_COLOR);
  BG_COLOR = color(hue(MAIN_COLOR),100,200, 10);

  system = new System();

  let ball;

  for (let x = 0; x <= NUM_BALLS; x++){
    let temp_rad = random(1,10)
    ball =  new Ball(random(temp_rad, width - temp_rad), random(temp_rad, 300), temp_rad, random(COLOR_ARRAY));
    system.addObject(ball);
  }

  //add gravity
  system.addForce({
    name:"Gravity",
    base: createVector(0,2),
    applyTo(obj){
      obj.applyForce(p5.Vector.mult(this.base, obj.mass));
    }
  }
  );

  //add wind
  wind = {
    name:"Gravity",
    base: createVector(0,2),
    applyTo(obj){
      obj.applyForce(this.base);
    }
  }

  system.addForce(wind);

}



function draw() {
  background(BG_COLOR);

  system.draw();
  system.update();

  if (mouseIsPressed){
    wind.base.x = width/2 - mouseX;
    wind.base.y = height /2 - mouseY;
    wind.base.normalize();
    wind.base.mult(10000);
  }else{
    wind.base.mult(0);
  }
}


class System{
  objects = [];
  forces = [];

  addObject(obj){
    this.objects.push(obj);
  }

  addForce(force){
    this.forces.push(force);
  }

  update(){
    for (let force of this.forces){
      for (let obj of this.objects){
        // obj.applyForce(force);
        force.applyTo(obj);
      }
    }

    this.objects.forEach((obj)=>{
      obj.update();
    });
  }

  draw(){
    this.objects.forEach((obj)=>{
      obj.draw();
    });
  }
}

class Ball {
  constructor(x,y, radius, my_color){
    this.radius = radius;
    this.color = color(my_color);
    this.position = createVector(x,y);
    this.mass = pow(radius,3)*PI*(4/3);
    this.velocity = createVector(random(-10,10),random(-10,10));
    this.force = createVector(0,0);
  }

  update() {
    const acceleration = p5.Vector.div(this.force, this.mass);
    this.force.mult(0);
    this.velocity.add(acceleration);
    this.position.add(this.velocity);

    this.velocity.x *= 0.995;
    
    if (this.position.x - this.radius < 0 || this.position.x + this.radius >= width){
      this.velocity.x *= -0.9;
    }
    if (this.position.y - this.radius < 0 || this.position.y + this.radius >= height){
      this.velocity.y *= -0.9;
    }

    this.position.x = min(width - this.radius, max(this.radius, this.position.x));
    this.position.y = min(height - this.radius, max(this.radius, this.position.y));

  }

  applyForce(force){
    this.force.add(force);
  }

  draw(){
    fill(this.color)
    noStroke();
    circle(this.position.x, this.position.y, this.radius*2);
  }
}


function getAnalogousColors(myColor) {
  let colors = [];
  
  // Calculate the hues of the 6 analogous colors
  let myHue = hue(myColor);
  let hues = [];
  hues.push(myHue - 60);
  hues.push(myHue - 30);
  hues.push(myHue - 15);
  hues.push(myHue + 15);
  hues.push(myHue + 30);
  hues.push(myHue + 60);
  
  // Normalize the hues to be within the range of 0 to 360
  for (let i = 0; i < hues.length; i++) {
    hues[i] = (hues[i] + 360) % 360;
  }
  
  // Convert the hues, saturation, and brightness to RGB hex codes
  for (let i = 0; i < hues.length - 1; i++) {
    colors.push(color(hues[i], saturation(myColor), brightness(myColor)));
  }
  colors.push(color(hues.slice(-1)[0] , saturation(myColor), 50));
  colors.push(color("#ffffff"));

  return colors;
}
