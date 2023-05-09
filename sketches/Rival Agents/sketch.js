const CANVAS_WIDTH = 1400;
const CANVAS_HEIGHT = 800;


let resetButton;
let backgroundAlpha = 10;
let alphaSlider;
let antsSlider;
let typeSelector;
let startSelector;

let startType = 'Circle'
let antTypes = 1;
let antsSystems = [];
let pheromoneArray = [];
let antsNum = 20000;
const lookAhead = 10;
const turnAngle = 20;

const antPheromoneFactor = 1;
const enemyPheromoneFactor = 1;

const pheromoneDecay = 1;

function setup() {
  // prevent the creation of a canvas element
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  blendMode(MULTIPLY);
  angleMode(DEGREES);
  pixelDensity(1);
  background(0);


  // create the button
  resetButton = createButton('Apply Changes');
  resetButton.position(width - 115, height + 15);
  
  // set the button's event handler
  resetButton.mousePressed(resetAnts);


  alphaSlider = createSlider(10, 100, 10);
  alphaSlider.position(width - 340, height + 20);
  alphaSlider.style('width', '200px');
  alphaSlider.style('background-color', 'black');
  alphaSlider.style('color', 'white');

  // create the title
  let alphaTitle = createDiv('Background Alpha');
  alphaTitle.position(width - 300, height + 40);


  antsSlider = createSlider(5000, 40000, 10000);
  antsSlider.position(width - 600, height + 20);
  antsSlider.style('width', '200px');
  antsSlider.style('background-color', 'black');
  antsSlider.style('color', 'white');
  

  // create the title
  let antsTitle = createDiv('Ant Count');
  antsTitle.position(width - 520, height + 40);



  // create the select element
  typeSelector = createSelect();
  typeSelector.option(1);
  typeSelector.option(2);
  typeSelector.option(3);
  typeSelector.option(4);
  typeSelector.position(width - 780, height + 20);
  typeSelector.style('width', '100px');
  
  // create the title
  let typeTitle = createDiv('Ant Types');
  typeTitle.position(width - 770, height + 40);


    // create the select element
    startSelector = createSelect();
    startSelector.option('Circle');
    startSelector.option('Random');
    startSelector.position(width - 980, height + 20);
    startSelector.style('width', '100px');

    let startTitle = createDiv('Start Position');
    startTitle.position(width - 975, height + 40);



  let colorPalette = genPal(antTypes);

  for (let i = 0; i < antTypes;  i ++) {
    antsSystems.push(new System(i, colorPalette[i]));
  }

}

function draw() {
  // draw the value of the slider

  blendMode(MULTIPLY);
  background(0,backgroundAlpha); // Update viewing trail

  loadPixels();
  for (const system of antsSystems) {
    system.updatePheromone()
    system.updateAngle();
    system.updatePosition();
  }
  updatePixels();
}

class Ant {
  constructor(antIndex, color) {
    this.antIndex = antIndex;
    this.color = color;

    if (startType === 'Circle'){
      let radius = min(width, height) * 0.45;
      let angle = random(360);
      this.x = (width / 2) + (radius * cos(angle));
      this.y = (height / 2) + (radius * sin(angle));
      this.angle = angle + 180;
      this.step = random(.5, 1);
    }
    else{
      this.x = random(width);
      this.y = random(height);
      this.angle = random(360);
      this.step = random(1,2);
    }
  }

  smell(direction) {
    const projection = this.angle + direction;
    let x = 0 | (this.x + lookAhead * cos(projection));
    let y = 0 | (this.y + lookAhead * sin(projection));
    x = (x + width) % width;
    y = (y + height) % height;
    
    let enemy = 0;
    for (let k = 0; k < antTypes; k ++){
      if (k != this.antIndex){
        enemy -= pheromoneArray[k][y][x];
      }
    }

    return pheromoneArray[this.antIndex][y][x] + (enemy * enemyPheromoneFactor);
  }

  updateAngle() {
    const right = this.smell(turnAngle);
    const center = this.smell(0);
    const left = this.smell(-turnAngle);

    if (center > left && center > right) {
    }
    else if (left < right) {
      this.angle += turnAngle;
    }
    else if (left > right) {
      this.angle -= turnAngle;
    }
  }

  updatePosition() {
    this.x += cos(this.angle) * this.step;
    this.y += sin(this.angle) * this.step;
    this.x = (this.x + width) % width;
    this.y = (this.y + height) % height;

    pheromoneArray[this.antIndex][(0 | this.y)][(0 | this.x)] = 255*antPheromoneFactor;

    set((0 | this.x), (0 | this.y), color(this.color))
  }
}

class System {
  constructor(antIndex, color) {
    this.antIndex = antIndex;
    this.ants = [];
    for (let i = floor(antsNum/antTypes); i--;) {
      this.ants.push(new Ant(this.antIndex, color));
    }

    pheromoneArray.push([]);
    for (let i = 0; i < height; i++) {
      let tempRow = [];
      for (let j = 0; j < width; j++) {
        tempRow.push(0);
      }
      pheromoneArray[this.antIndex].push(tempRow);
    }

  }

  updatePheromone() {
  for (let i = 0; i < pheromoneArray[this.antIndex].length; i++) {
    for (let j = 0; j < pheromoneArray[this.antIndex][i].length; j++) {
      if (pheromoneArray[this.antIndex][i][j] > 0) {
        pheromoneArray[this.antIndex][i][j] = min(pheromoneArray[this.antIndex][i][j] - pheromoneDecay, 255);
      }
      if (pheromoneArray[this.antIndex][i][j] < 0) {
        pheromoneArray[this.antIndex][i][j] = max(pheromoneArray[this.antIndex][i][j] + pheromoneDecay, -255);
      }
    }
  }
}

  updateAngle() {
    for (const ant of this.ants) {
      ant.updateAngle();
    }
  }

  updatePosition() {
    for (const ant of this.ants) {
      ant.updatePosition();
    }
  }
}

function genPal(n){
  let palette = [];
  let span = 60*n;
  let base = random(0,360);
  colorMode(HSB);

  for (let i = 0; i < n; i ++){
    let hue = ((span/n)*i + base)%360;
    palette.push(color(hue, 30,100));
  }



  colorMode(RGB);
  return palette;
}

function resetAnts(){
  background(0);
  antsSystems = [];
  pheromoneArray = [];
  backgroundAlpha = alphaSlider.value();
  antsNum = antsSlider.value();
  antTypes = typeSelector.value();
  startType = startSelector.value();

  let colorPalette = genPal(antTypes);

  for (let i = 0; i < antTypes;  i ++) {
    antsSystems.push(new System(i, colorPalette[i]));
  }
}