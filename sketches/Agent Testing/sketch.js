const AGENT_NUM = 200;
const AGENT_COLOR = [255, 255, 255];
const TRAIL_COLOR = [173, 216, 230];
const MAX_SPEED = 1.5;
const MAX_FORCE = 0.1;
const TRAIL_SIZE = 100;
const TRAIL_ALPHA = 150;
const NEIGHBOR_DIST = 50;
const EDGE_BUFFER = 1;
const NOISE_SCALE = 0.02;


let agents = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < AGENT_NUM; i++) {
    agents.push(new Agent(random(EDGE_BUFFER, width - EDGE_BUFFER), random(EDGE_BUFFER, height - EDGE_BUFFER)));
  }
}

function draw() {
  background(0);
  agents.forEach(agent => {
    agent.update();
    agent.show();
  });
}

class Agent {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.trail = [];
  }
  
  update() {
    this.trail.push(this.pos.copy());
    if (this.trail.length > TRAIL_SIZE) {
      this.trail.shift();
    }
    let neighbors = this.getNeighbors();
    let steer = this.getSteer(neighbors);
    this.acc.add(steer);
    this.vel.add(this.acc);
    this.vel.limit(MAX_SPEED);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.constrain();
  }
  
  constrain() {
    if (this.pos.x < EDGE_BUFFER) {
      this.pos.x = EDGE_BUFFER;
      this.vel.x *= -1;
    } else if (this.pos.x > width - EDGE_BUFFER) {
      this.pos.x = width - EDGE_BUFFER;
      this.vel.x *= -1;
    }
    if (this.pos.y < EDGE_BUFFER) {
      this.pos.y = EDGE_BUFFER;
      this.vel.y *= -1;
    } else if (this.pos.y > height - EDGE_BUFFER) {
      this.pos.y = height - EDGE_BUFFER;
      this.vel.y *= -1;
    }
  }
  
  show() {
    // stroke(AGENT_COLOR);
    // strokeWeight(8);
    // point(this.pos.x, this.pos.y);
    noFill();
    stroke(TRAIL_COLOR[0], TRAIL_COLOR[1], TRAIL_COLOR[2], TRAIL_ALPHA);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < this.trail.length; i++) {
      let alpha = map(i, 0, this.trail.length, 0, TRAIL_ALPHA);
      stroke(TRAIL_COLOR[0], TRAIL_COLOR[1], TRAIL_COLOR[2], alpha);
      vertex(this.trail[i].x, this.trail[i].y);
    }
    endShape();
  }
  
  getNeighbors() {
    let neighbors = [];
    agents.forEach(other => {
      if (other !== this) {
        let dist = this.pos.dist(other.pos);
        if (dist < NEIGHBOR_DIST) {
          neighbors.push(other);
        }
      }
    });
    return neighbors;
  }
  
  getSteer(neighbors) {
    let sum = createVector();
    let count = 0;
    neighbors.forEach(neighbor => {
      let dist = this.pos.dist(neighbor.pos);
      if (dist > 0) {
        let diff = p5.Vector.sub(neighbor.pos, this.pos);
        diff.normalize();
        diff.div(dist);
        sum.add(diff);
        count++;
      }
    });
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(MAX_SPEED);
      let steer = p5.Vector.sub(sum, this.vel);
      this.acc.add(p5.Vector.random2D().mult(NOISE_SCALE));
      steer.limit(MAX_FORCE);
      return steer;
    } else {
      return createVector();
    }
  }
}