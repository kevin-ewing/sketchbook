const bubbleMin = 30;
const bubbleMax = 40;
const skyColor = [176, 224, 230];

let bubbles = []; // Array to hold bubbles

function setup() {
  blendMode(ADD);
  createCanvas(windowWidth, windowHeight + 10);
  for (let i = 0; i < 50; i++) {
    bubbles.push(
      new Bubble(random(width), random(height), random(bubbleMin, bubbleMax))
    ); // Initialize bubbles
  }
}

function draw() {
  setSkyBackground();
  for (let bubble of bubbles) {
    bubble.move();
    bubble.checkClumping(bubbles);
  }
  for (let bubble of bubbles) {
    bubble.display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight + 10);
  setSkyBackground();
}

// Function to create a gradient sky background
function setSkyBackground() {
  background(color(skyColor));
}

// Bubble class
class Bubble {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xSpeed = random(-1, 1); // Horizontal momentum
    this.ySpeed = random(-0.5, -2); // Upward momentum (negative to rise)
    this.color = color(255, 255, 255, 150); // Semi-transparent color
    this.clump = null; // Reference to the clump this bubble belongs to
  }

  move() {
    if (!this.clump) {
      // Move freely if not in a clump
      this.x += this.xSpeed;
      this.y += this.ySpeed;
    } else {
      // If part of a clump, move with the clump
      this.clump.moveClump();
    }

    // Wrap horizontally
    if (this.x - this.radius > width) {
      this.x = -this.radius;
    } else if (this.x + this.radius < 0) {
      this.x = width + this.radius;
    }

    // Respawn bubble at the bottom if it moves off the top
    if (this.y + this.radius < 0) {
      this.reset();
    }
  }

  reset() {
    // Reset bubble position and momentum
    this.y = height + this.radius;
    this.x = random(width);
    this.xSpeed = random(-1, 1);
    this.ySpeed = random(-0.5, -2);
    if (this.clump) {
      this.clump.removeBubble(this);
    }
    this.clump = null;
  }

  checkClumping(bubbles) {
    for (let other of bubbles) {
      if (other !== this) {
        let d = dist(this.x, this.y, other.x, other.y);
        let threshold = this.radius + other.radius - 10; // Increased overlap requirement for merging
        if (d < threshold) {
          // Merge clumps or create a new clump
          if (!this.clump && !other.clump) {
            let newClump = new Clump([this, other]);
            this.clump = newClump;
            other.clump = newClump;
          } else if (this.clump && !other.clump) {
            this.clump.addBubble(other);
            other.clump = this.clump;
          } else if (!this.clump && other.clump) {
            other.clump.addBubble(this);
            this.clump = other.clump;
          } else if (this.clump && other.clump && this.clump !== other.clump) {
            // Merge two clumps
            this.clump.mergeClump(other.clump);
          }
        }
      }
    }
  }

  display() {
    noStroke();

    // Outer glow effect for the bubble (slightly larger and very faint)
    for (let r = this.radius * 1.2; r > this.radius; r--) {
      let inter = map(r, this.radius, this.radius * 1.2, 0, 1);
      let c = color(
        red(this.color),
        green(this.color),
        blue(this.color),
        50 * (1 - inter) // Very faint glow, fading outward
      );
      fill(c);
      ellipse(this.x, this.y, r * 2);
    }

    // Gradient effect: Draw concentric circles to simulate transparency in the center
    for (let r = this.radius; r > 0; r--) {
      let inter = map(r, 0, this.radius, 0, 1);
      let c = lerpColor(
        color(red(skyColor), green(skyColor), blue(skyColor), 0),
        this.color,
        inter
      ); // Mostly transparent center to semi-transparent edges
      fill(c);
      ellipse(this.x, this.y, r * 2);
    }

    // Draw a highlight spot (primary)
    let highlightColor = color(255, 255, 255, 180); // Bright white, semi-transparent
    noStroke();
    fill(highlightColor);
    ellipse(
      this.x - this.radius * 0.3,
      this.y - this.radius * 0.3,
      this.radius * 0.5
    );

    // Subtle secondary highlight
    fill(255, 255, 255, 80);
    ellipse(
      this.x + this.radius * 0.4,
      this.y + this.radius * 0.4,
      this.radius * 0.3
    );

    // Inner reflection glow for realism
    fill(255, 255, 255, 30);
    ellipse(
      this.x - this.radius * 0.1,
      this.y + this.radius * 0.2,
      this.radius * 0.8
    );
  }
}

// Clump class to manage groups of clumped bubbles
class Clump {
  constructor(bubbles) {
    this.bubbles = bubbles;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.updateMomentum();
  }

  addBubble(bubble) {
    this.bubbles.push(bubble);
    this.updateMomentum();
  }

  removeBubble(bubble) {
    this.bubbles = this.bubbles.filter((b) => b !== bubble);
    this.updateMomentum();
  }

  mergeClump(otherClump) {
    this.bubbles = [...this.bubbles, ...otherClump.bubbles];
    for (let bubble of otherClump.bubbles) {
      bubble.clump = this;
    }
    this.updateMomentum();
  }

  updateMomentum() {
    // Combine the momentum of all bubbles in the clump without compounding speeds
    let totalXSpeed = 0;
    let totalYSpeed = 0;
    for (let bubble of this.bubbles) {
      totalXSpeed += bubble.xSpeed;
    }
    this.xSpeed = totalXSpeed / this.bubbles.length;
    this.ySpeed = -0.3;
  }

  moveClump() {
    for (let bubble of this.bubbles) {
      bubble.x += this.xSpeed;
      bubble.y += this.ySpeed;
    }
  }
}
