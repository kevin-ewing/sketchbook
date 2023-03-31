const PART_PER_DRAW = 50;
const MAX_AGE = 250;
let system;
let attractor;
let smoke;


function setup() {
  createCanvas(600, 600);
  noStroke();
  imageMode(CENTER);
  smoke = createGraphics(50, 50);
  drawSmoke(smoke);

  system = new ParticleSystem(width / 2, height);
  system.addForce({
    name: "rising gravity",
    base: createVector(0, -0.005),
    applyTo(p) {
      p.applyForce(this.base);
    },
  });

  // system.addForce({
  //   name: "wind",
  //   base: createVector(0.01, 0),
  //   applyTo(p) {
  //     p.applyForce(this.base);
  //   },
  // });

  attractor = new Attractor(-10);
  system.addForce({
    name: "attractor",
    applyTo(particle){
      let v = p5.Vector.sub(attractor.position, particle.position);
      let magnitude = attractor.strength/constrain(v.magSq(),25, width);
      let v_hat = v.normalize();
      particle.applyForce(v_hat.mult(magnitude));
    }
  });


}

function draw() {
  background(0);
  system.update();
  system.draw();
  attractor.position.x = mouseX;
  attractor.position.y = mouseY;
}


class Attractor {

  constructor(strength) {
    this.strength = strength;
    this.position = createVector(0, 0);
  }
}


class ParticleSystem {
  particles = [];
  forces = [];
  pool = [];

  constructor(x, y) {
    this.position = createVector(x, y);
    this.pool = []
  }

  addForce(force) {
    this.forces.push(force);
  }

  update() {

    for (let x =0; x <= PART_PER_DRAW; x ++){
      let p;
      if (this.pool.length > 0){
        p = this.pool.pop();
        p.life = random(50,MAX_AGE);
        p.velocity.mult(0);
        p.force.mult(0);
      }
      else{
        p = new Particle();
        this.particles.push(p);
      }
      const angle = random(245, 295);
      p.position.x = this.position.x + random(-30, 30);
      p.position.y = this.position.y;
      const f = p5.Vector.fromAngle(radians(angle), random(.5,1));
      p.applyForce(f);
    }
 

    for (let force of this.forces) {
      for (let p of this.particles) {
        force.applyTo(p);
      }
    }

    for (let p of this.particles) {
        p.update();
        if (p.life <= 0){
          this.pool.push(p);
        }
    }
  }

  draw() {
    for (let p of this.particles) {
        p.draw();
    }
  }
}

class Particle {
  constructor() {
    this.position = createVector(0, 0)
    this.velocity = createVector(0, 0);
    this.force = createVector(0, 0);
    this.life = random(50,MAX_AGE)
  }

  applyForce(force) {
    this.force.add(force);
  }

  update() {
    if (this.life > 0){
      // the particle is massless, so we can just use the force as the acceleration
      this.velocity.add(this.force);
      this.position.add(this.velocity);

      this.force.x = 0;
      this.force.y = 0;

      this.life --;
    }
  }

  draw() {
    if (this.life > 0){
      // fill(256,256*(this.life/200));
      // circle(this.position.x, this.position.y, 2);
      image(smoke, this.position.x, this.position.y)
    }
  }
}

function drawSmoke(g) {
  g.clear();
  g.noStroke();
  let center = createVector(g.width / 2, g.height / 2);
  for (let x = 0; x < g.width; x++) {
    for (let y = 0; y < g.height; y++) {
      let pos = createVector(x, y);
      let d = dist(pos.x, pos.y, center.x, center.y);
      let alpha = map(d, 0, g.width / 3, 16, 0, true);
      g.fill(255, alpha);
      g.rect(x, y, 1, 1);
    }
  }
}