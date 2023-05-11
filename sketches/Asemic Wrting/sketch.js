const NOISE_DIFF = 20;

let n_lines = 100;
let n_dots = 80;
let y_padding = 20;
let x_padding = 20;
let x_displacement = 3;
let y_displacement = 3;
let radius = 2;
let max_spaces = 4;
let space_width = 2;
let coupling = 1.1;

function setup() {
  createCanvas(600, 900);
  noiseDetail(4); // Adjust the noise detail for a smoother or rougher result
  strokeWeight(2);
  
}

function draw() {
  smooth();
  background(255);
  fill(0);


  noFill();
  noLoop();
  let padded_width = width - 2 * x_padding;
  let padded_height = height - 2 * y_padding;
  for (let i = 0; i < n_lines; i++) {
    y = y_padding + i * padded_height / (n_lines - 1);
    // determine how many words to place
    let num_words = floor(random(2, max_spaces));
    
    //draw n random segments
    let starts = new Array(num_words);
    let ends = new Array(num_words);
    let total = 0;

    //start at 0
    Array[0]=0;
    for(let i=1; i<=num_words;i++) {
      Array[i] = random(0, 1);
      total = total + Array[i];
    }

    // normalize lengths
    for(let i=1; i<=num_words;i++) {
      Array[i] *= (n_dots-1-space_width*(num_words-1))/total;
    }

    let rem = 0;
    total = 0;
    starts[0]=0;
    ends[num_words-1] = n_dots;

    // addition with remainder
    for(let i=0;i<=num_words;i++) {
      // get the updated remainder
      let new_rem = (Array[i]+rem)%1;

      Array[i] = total + round(Array[i]+rem);

      // only add spaces after the first word
      if(i>0) {
        ends[i-1] = Array[i];
        total = Array[i]+space_width;
              }

      starts[i] = total;
      
       // if we rounded up, subtract 1 from the remainder
      rem = new_rem-round(new_rem);
    }
    
    let word_number = 0;
    let skip_counter = 1;
    
    // word always starts at beginning of section
    beginShape();
    
    for (let j = 0; j < n_dots; j++) {
      //determine if this is the end of our word
      if(j==ends[word_number]) {
        word_number++;
        skip_counter = 2+space_width;
      }
      
      
      x = x_padding + j * padded_width / (n_dots - 1);
     let x_delta = random(-x_displacement, x_displacement);
      let y_delta = (1-coupling)*random(-y_displacement, y_displacement) 
      y_delta -=coupling * x_delta*y_displacement/x_displacement;
      
      if(skip_counter==2+space_width) {
        // This is the end of our shape
        curveVertex(x + x_delta, y + y_delta);
        curveVertex(x + x_delta, y + y_delta);
        endShape();
        skip_counter--;
      } else if (skip_counter<2*space_width & skip_counter>1) {
        // this is the space
        skip_counter--;
      } else if (skip_counter==1) {
        //this is the start of the next word
        beginShape();
        curveVertex(x + x_delta, y + y_delta);
        curveVertex(x + x_delta, y + y_delta);
        skip_counter --;
      } else {
        //this is inside of a word
        curveVertex(x + x_delta, y + y_delta);
      }
      
    }
  }
  
  // Add noise to the image
  loadPixels();
  // for (let i = 0; i < width; i++) {
  //   for (let j = 0; j < height; j++) {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height * 4; j++) {
      let index = (i + j * width) * 4;
      let r = pixels[index];
      let g = pixels[index + 1];
      let b = pixels[index + 2];
      
      // Add noise to the color values
      r += random(-NOISE_DIFF, NOISE_DIFF);
      g += random(-NOISE_DIFF, NOISE_DIFF);
      b += random(-NOISE_DIFF, NOISE_DIFF);
      
      pixels[index] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
    }
  }
  updatePixels();
}