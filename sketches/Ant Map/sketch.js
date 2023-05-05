const CANVAS_WIDTH = 1400;
const CANVAS_HEIGHT = 800;
const ANT_COLOR = [255,255,255,255];

let isVPressed = false;

let ants;
let antColor;
let pheromoneArray = [];
let mapArray = [];
const antsNum = 15000;
const lookAhead = 30;
const turnAngle = 30;

const mapPheromoneFactor = .01;
const antPheromoneFactor = 1;

const pheromoneDecay = 1;
let myMap;

const maxBias = 0.1;
let data; // Define a global variable to hold the JSON data
let selectedCity; // Define a global variable to hold the selected city object
let city, latitude, longitude, population, rank, state; // Define global variables for the city properties
let url

// Two main canvases the buffer canvas and antCanvas
let buffer;
let antCanvas;

function preload() {
  // Load the JSON data
  data = loadJSON("./city.json", parseData);
}

function parseData(data) {
  // Select a random city object from the data array
  const bias = Math.pow(Math.random(), maxBias);
  const randomNumber = Math.floor(1000 * bias);

  selectedCity = data[1000-randomNumber];
  // selectedCity = data[0];
  
  // Set the city properties to the selected city's values
  city = selectedCity.city;
  latitude = selectedCity.latitude;
  longitude = selectedCity.longitude;
  population = selectedCity.population;
  rank = selectedCity.rank;
  state = selectedCity.state;
  url = `https://api.mapbox.com/styles/v1/kewing/clh9irt0p01st01qnanngbgup/static/${longitude},${latitude},11,0/1280x731?access_token=pk.eyJ1Ijoia2V3aW5nIiwiYSI6ImNsaDgyODhxYjAyOWEzc3M5ejVmemdoMW4ifQ.Hr_MUjOmQjUy0ijI0N0K8A`
  
  const cityElement = document.getElementById('city');
  const locationElement = document.getElementById('location');
  const populationElement = document.getElementById('population');
  const rankElement = document.getElementById('rank');


  cityElement.textContent = city + ", " + state;
  rankElement.textContent = getOrdinalSuffix(rank) + ' Largest City in the US'
  locationElement.textContent = "Lat: " + latitude.toFixed(3) + ", Long: " + longitude.toFixed(3);
  populationElement.textContent = "Population: " + population;

  myMap = loadImage(url);
}

function setup() {
  // prevent the creation of a canvas element
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  // blendMode(MULTIPLY);
  angleMode(DEGREES);
  pixelDensity(1);
  background(0);

  antCanvas = createGraphics(width, height);
  buffer = createGraphics(width, height);
  buffer.tint(255,30);
  buffer.image(myMap,0,0,width*1.1,height*1.1);

  for (let i = 0; i < height; i++) {
    mapArray[i] = new Array(width);
  }

  // loop through every pixel in the offscreen buffer and fill the 2D array with brightness values
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      mapArray[i][j] = floor((red(buffer.get(j, i)) * mapPheromoneFactor));
    }
  }

  // select the div element with ID "loading"
  loadingDiv = select('#loading');
  canvasDiv = select('#canvas');

  // hide the loading div
  canvasDiv.show();
  loadingDiv.hide();

  ants = new System();

}

function draw() {

  if (isVPressed) {
    blendMode(BLEND);
    image(buffer, 0, 0);
  } else {
    blendMode(MULTIPLY);
    background(0,10); // Update viewing trail
  }

  loadPixels();
  ants.updatePheromone()
  ants.updateAngle();
  ants.updatePosition();
  updatePixels();
}

class Ant {
  constructor() {
    // let radius = min(width, height) * 0.2;
    // let angle = random(360);
    // this.x = (width / 2) + (radius * cos(angle));
    // this.y = (height / 2) + (radius * sin(angle));
    // this.angle = angle + 180;
    // this.step = random(.5, 1);

    this.x = random(width);
    this.y = random(height);
    this.angle = random(360);
    this.step = random(1,2);
  }

  smell(direction) {
    const projection = this.angle + direction;
    let x = 0 | (this.x + lookAhead * cos(projection));
    let y = 0 | (this.y + lookAhead * sin(projection));
    x = (x + width) % width;
    y = (y + height) % height;

    return pheromoneArray[y][x];
  }

  updateAngle() {
    const right = this.smell(turnAngle);
    const center = this.smell(0);
    const left = this.smell(-turnAngle);

    if (center > left && center > right) {
      /* Carry on straight */
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

    pheromoneArray[(0 | this.y)][(0 | this.x)] = 255*antPheromoneFactor;

    set((0 | this.x), (0 | this.y), color(ANT_COLOR))
  }
}

class System {
  constructor() {
    this.ants = [];
    for (let i = antsNum; i--;) {
      this.ants.push(new Ant());
    }


    for (let i = 0; i < height; i++) {
      let tempRow = [];
      for (let j = 0; j < width; j++) {
        tempRow.push(0);
      }
      pheromoneArray.push(tempRow);
    }

  }

  updatePheromone() {
  for (let i = 0; i < pheromoneArray.length; i++) {
    for (let j = 0; j < pheromoneArray[i].length; j++) {
      if (pheromoneArray[i][j] > 0) {
        pheromoneArray[i][j] = min(pheromoneArray[i][j] - pheromoneDecay + mapArray[i][j], 255);
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


function getOrdinalSuffix(number) {
  if (number < 1 || number > 10000) {
    return "Number out of range";
  }

  const suffixes = {
    1: "st",
    2: "nd",
    3: "rd"
  };

  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return number + "th";
  }

  return number + (suffixes[lastDigit] || "th");
}

function keyPressed() {
  if (key === 'v' || key === 'V') { // Check if the 'v' key is pressed
    // background(0);
    isVPressed = !isVPressed; // Toggle the boolean variable
  }
}