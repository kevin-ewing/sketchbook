const slices = 12;
const numShapes = 700;
const frameCountMultiplier = 0.04;

let mask;
let shape;

function setup() {
    createCanvas(800, 800);
    pixelDensity(1);
    noStroke();

    shape = calcStuff(width,height,slices);
    mask = triangleMask(shape.a,shape.o);
}

function draw() {
    background(255);

    loadPixels();
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let r = noise(x * 0.03, y * 0.03, frameCount * frameCountMultiplier) * 255;
        let g = noise(x * 0.02, y * 0.02, frameCount * frameCountMultiplier) * 255;
        let b = noise(x * 0.01, y * 0.01, frameCount * frameCountMultiplier) * 255;
        let index = (x + y * width) * 4;
        pixels[index] = r;
        pixels[index + 1] = g;
        pixels[index + 2] = b;
        pixels[index + 3] = 255;
      }
    }
    updatePixels();

    // try removing this line to see what happens
    mirror();
}

function mirror() {
    // copy a section of the canvas
    img = get(0,0,shape.a,shape.o);
    // cut it into a triangular shape
    img.mask(mask);

    push();
    // move origin to centre
    translate(width/2,height/2);
    // turn the whole sketch over time
    rotate(radians(frameCount/3));

    for(var i=0; i<slices; i++) {
      if(i%2==0) {
        push();
        scale(1,-1); // mirror
        image(img,0,0); // draw slice
        pop();
      } else {
        rotate(radians(360/slices)*2); // rotate
        image(img,0,0); // draw slice
      }
    }
    pop();
}

function calcStuff(width, height, s) {
  let a = sqrt(sq(width/2)+sq(height/2));
  let theta = radians(360 / s);
  let o = tan(theta) * a;
  let h = a / cos(theta);
  return {a: round(a), o: round(o), h: round(h)};
}




function triangleMask(w,h) {
    mask = createImage(w,h);
    mask.loadPixels();
    for (i = 0; i < mask.width; i++) {
        for (j = 0; j < mask.height; j++) {
            if(i >= map(j,0,h,0,w)-1) // -1 removes some breaks
                mask.set(i, j, color(255));
        }
    }
    mask.updatePixels();
    return mask;
}