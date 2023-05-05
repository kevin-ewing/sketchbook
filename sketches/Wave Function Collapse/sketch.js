// Wave Function Collapse (tiled model)

let timing = {};

let totalTime0;
let totalTime1;

// Array for modules and moduleImages
const modules = [];
const moduleImages = [];


// Current state of the grid
let grid = [];

// Num of slots each dimension
const DIM = 20;

// Load images
function preload() {
    for (let i = 1; i <= 24; i++) {
        moduleImages[i-1] = loadImage(`tiles/tile-${i.toString().padStart(2, '0')}.png`);
    }
}

function setup() {
    createCanvas(1000, 1000);
    pixelDensity(12);
    noSmooth();
    background("#8ab060");
    noStroke();

    // Create and label the modules
    modules[0] = new Module(moduleImages[0], ["ABA", "ACA", "ABA", "ACA"], .1);
    modules[1] = new Module(moduleImages[1], ["DDD", "DDD", "DDD", "DDD"], .05);
    modules[2] = new Module(moduleImages[2], ["ABA", "AAD", "DDD", "DAA"], .05);
    modules[3] = new Module(moduleImages[3], ["AAA", "AAA", "AAD", "DAA"], .2);
    modules[4] = new Module(moduleImages[4], ["ABA", "ABA", "ABA", "ABA"], .5);
    modules[5] = new Module(moduleImages[5], ["ABA", "ABA", "AAA", "AAA"], .2);
    modules[6] = new Module(moduleImages[6], ["AAA", "AAA", "AAA", "AAA"], .3);
    modules[7] = new Module(moduleImages[7], ["AAA", "ABA", "ABA", "ABA"], .9);
    modules[8] = new Module(moduleImages[8], ["ABA", "AAA", "ABA", "AAA"], .8);
    modules[9] = new Module(moduleImages[9], ["ACA", "AAA", "ABA", "AAA"], .2);
    modules[10] = new Module(moduleImages[10], ["ABA", "ABA", "AAA", "AAA"], .7);
    modules[11] = new Module(moduleImages[11], ["ABA", "AAA", "ABA", "AAA"], .6);
    modules[12] = new Module(moduleImages[12], ["AAA", "ACA", "AAA", "ACA"], .4);
    modules[13] = new Module(moduleImages[13], ["ABA", "AAA", "AAA", "AAA"], .3);
    modules[14] = new Module(moduleImages[14], ["AAA", "AAA", "AAD", "DAA"], .2);
    modules[15] = new Module(moduleImages[15], ["ACA", "ACA", "AAA", "AAA"], .1);
    modules[16] = new Module(moduleImages[16], ["ABA", "ABA", "ABA", "ABA"], .9);
    modules[17] = new Module(moduleImages[17], ["DAA", "AAD", "DDD", "DDD"], .03);
    modules[18] = new Module(moduleImages[18], ["ACA", "ABA", "ABA", "ABA"], .01);
    modules[19] = new Module(moduleImages[19], ["ACA", "ABA", "AAA", "ABA"], .01);
    modules[20] = new Module(moduleImages[20], ["ACA", "AAA", "AAA", "ABA"], .01);
    modules[21] = new Module(moduleImages[21], ["ACA", "ABA", "ABA", "AAA"], .01);
    modules[22] = new Module(moduleImages[22], ["ACA", "AAA", "ABA", "ABA"], .01);
    modules[23] = new Module(moduleImages[23], ["ACA", "ABA", "AAA", "AAA"], .01);


    let length = modules.length;
    for (let i = 0; i <= length; i++) {
        for (let j = 1; j < 4; j++) {
            modules.push(modules[i].rotate(j));
        }
    }

    // Generate the adjacency rules based on edges
    for (let i = 0; i < modules.length; i++) {
        let module = modules[i];
        module.analyze(modules);
    }

    // Start over
    startOver();
    
}

function startOver() {
    // Create slot for each spot on the grid
    background("#8ab060");
    for (let i = 0; i < DIM * DIM; i++) {
        grid[i] = new Slot(modules.length);
    }
}

function checkValid(arr, valid) {

    for (let i = arr.length - 1; i >= 0; i--) {
        let element = arr[i];
        if (!valid.includes(element)) {
            arr.splice(i, 1);
        }
    }

}


function draw() {

    drawGrid();

    let gridCopy = grid.slice();
    gridCopy = gridCopy.filter((a) => !a.collapsed);
    
    if (gridCopy.length == 0) {
        // startOver();
        noLoop();
        return;
    }

    gridCopy.sort((a, b) => {
        return a.options.length - b.options.length;
    });

    let len = gridCopy[0].options.length;
    let stopIndex = 0;

    for (let i = 1; i < gridCopy.length; i++) {
        if (gridCopy[i].options.length > len) {
            stopIndex = i;
            break;
        }
    }
    if (stopIndex > 0) gridCopy.splice(stopIndex);
    
    const slot = random(gridCopy);
    slot.collapsed = true;
    const pick = makePick(slot.options);
    if (pick === undefined) {
        startOver();
        // noLoop();
        return;
    }
    slot.options = [pick];

    // Updating entropy
    const nextGrid = [];
    for (let j = 0; j < DIM; j++) {
        for (let i = 0; i < DIM; i++) {
        let index = i + j * DIM;
        if (grid[index].collapsed) {
            nextGrid[index] = grid[index];
        } else {
            let options = new Array(modules.length).fill(0).map((x, i) => i);

            // Look up
            if (j > 0) {
            let up = grid[i + (j - 1) * DIM];
            let validOptions = [];
            for (let option of up.options) {
                let valid = modules[option].down;
                validOptions = validOptions.concat(valid);
            }
            checkValid(options, validOptions);
            }

            // Look right
            if (i < DIM - 1) {
            let right = grid[i + 1 + j * DIM];
            let validOptions = [];
            for (let option of right.options) {
                let valid = modules[option].left;
                validOptions = validOptions.concat(valid);
            }
            checkValid(options, validOptions);
            }

            // Look down
            if (j < DIM - 1) {
            let down = grid[i + (j + 1) * DIM];
            let validOptions = [];
            for (let option of down.options) {
                let valid = modules[option].up;
                validOptions = validOptions.concat(valid);
            }
            checkValid(options, validOptions);
            }

            // Look left
            if (i > 0) {
            let left = grid[i - 1 + j * DIM];
            let validOptions = [];
            for (let option of left.options) {
                let valid = modules[option].right;
                validOptions = validOptions.concat(valid);
            }
            checkValid(options, validOptions);
            }

            // I could immediately collapse if only one option left?
            nextGrid[index] = new Slot(options);
            }
        }
    }

    grid = nextGrid;
}


// Module class
class Module {
    constructor(img, edges, prob) {
        // Image
        this.img = img;
        this.prob = prob;
        // Edges
        this.edges = edges;
        // Valid neighbors
        this.up = [];
        this.right = [];
        this.down = [];
        this.left = [];
    }
    
    // Find the valid neighbors
    analyze(modules) {
        for (let i = 0; i < modules.length; i++) {
            let module = modules[i];
            // UP
            if (compareEdge(module.edges[2], this.edges[0])) {
                this.up.push(i);
            }
            // RIGHT
            if (compareEdge(module.edges[3], this.edges[1])) {
                this.right.push(i);
            }
            // DOWN
            if (compareEdge(module.edges[0], this.edges[2])) {
                this.down.push(i);
            }
            // LEFT
            if (compareEdge(module.edges[1], this.edges[3])) {
                this.left.push(i);
            }
        }
    }
    
    // Rotate a module and its edges to create a new one
    rotate(num) {
        // Draw new module
        const w = this.img.width;
        const h = this.img.height;
        const newImg = createGraphics(w, h);
        newImg.imageMode(CENTER);
        newImg.noSmooth();
        newImg.translate(w / 2, h / 2);
        newImg.rotate(HALF_PI * num);
        newImg.image(this.img, 0, 0);
        
        // Rotate edges
        const newEdges = [];
        const len = this.edges.length;
        for (let i = 0; i < len; i++) {
            newEdges[i] = this.edges[(i - num + len) % len];
        }
        return new Module(newImg, newEdges, this.prob);
    }
  }


// Function to reverse a string
function reverseString(s) {
    let arr = s.split("");
    arr = arr.reverse();
    return arr.join("");
}
  
// Function to compare two edges
function compareEdge(a, b) {
    return a == reverseString(b);
}

// Class for a slot
class Slot {
    constructor(value) {
        // Is it collapsed?
        this.collapsed = false;
    
        // Initial options via constructor
        if (value instanceof Array) {
            this.options = value;
        } else {
            // or all options to start
            this.options = [];
            for (let i = 0; i < value; i++) {
            this.options[i] = i;
            }
        }
    }
}

function drawGrid(){
    const w = width / DIM;
    const h = height / DIM;
    for (let j = 0; j < DIM; j++) {
        for (let i = 0; i < DIM; i++) {
            let slot = grid[i + j * DIM];
            if (slot.collapsed) {
                if (slot.options.length == 0){
                    fill("yellow");
                    rect(i * w, j * h, w, h);
                    return;
                }
                let index = slot.options[0];
                image(modules[index].img, i * w, j * h, w, h);
            }
        }
    }
}

function makePick(options){
    let totalProb = 0;
    for (let i = 0; i < options.length; i++) {
        totalProb += modules[options[i]].prob;
    }

    let randomNum = random(0, totalProb);
    let sumProb = 0;
    for (let i = 0; i < options.length; i++) {
        sumProb += modules[options[i]].prob;
        if (randomNum < sumProb) {
            return options[i];
        }
    }
}