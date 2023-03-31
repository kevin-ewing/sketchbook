const RADIUS1 = 20;
const RADIUS2 = 10;

let system;
let wind;

function setup() {
  createCanvas(800,800);
  background(220);

  system = new System();

  let ball = new Ball(random(RADIUS1, width - RADIUS1), random(RADIUS1, 300),RADIUS1, "red");
  system.addObject(ball);

  let ball2 = new Ball(random(RADIUS2, width - RADIUS2), random(RADIUS2, 300),RADIUS2, "blue");
  system.addObject(ball2);

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
  background(220);

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

  noFill();
  stroke("black");
  rect(0,0,width,height);
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
    this.velocity = createVector(10,4);
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
    circle(this.position.x, this.position.y, this.radius*2);
  }
}