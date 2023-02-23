const TILES = 50
const STROKE_FACTOR = 4
const DIFF_TILES = 5
const ALPHA = 255

let out1_a;
let out1_b;
let out1_c;
let out1_d;
let out1_e;



function setup() {
  createCanvas(800, 800);
  frameRate(1);
  stroke(255);

  out1_a = createGraphics(height/TILES, width/TILES);
  out1_b = createGraphics(height/TILES, width/TILES);
  out1_b = createGraphics(height/TILES, width/TILES);
  out1_c = createGraphics(height/TILES, width/TILES);
  out1_d = createGraphics(height/TILES, width/TILES);
  out1_e = createGraphics(height/TILES, width/TILES);


  out1_a.strokeWeight((height/TILES)/STROKE_FACTOR);
  out1_a.stroke(255,255,255,ALPHA);
  out1_a.noFill()
  out1_a.circle(out1_a.width, out1_a.height, (height/TILES)*(2/3));
  out1_a.circle(out1_a.width, out1_a.height, (height/TILES)*(4/3));
  out1_a.circle(0, 0, (height/TILES)*(2/3));
  out1_a.circle(0, 0, (height/TILES)*(4/3));

  out1_b.strokeWeight((height/TILES)/STROKE_FACTOR);
  out1_b.noFill()
  out1_b.stroke(255,255,255,ALPHA);
  out1_b.ellipse(0, out1_b.height, (height/TILES)*(2/3), (width/TILES)*(2/3));
  out1_b.ellipse(0, out1_b.height, (height/TILES)*(4/3), (width/TILES)*(4/3));
  out1_b.ellipse(out1_b.width, 0, (height/TILES)*(2/3), (width/TILES)*(2/3));
  out1_b.ellipse(out1_b.width, 0, (height/TILES)*(4/3), (width/TILES)*(4/3));

  // ONES WITH CURVES
  out1_c.strokeWeight((height/TILES)/STROKE_FACTOR);
  out1_c.noFill()
  out1_c.stroke(255,255,255,ALPHA);
  my_curve(out1_c, 0)
  my_curve(out1_c, 2)
  out1_c.ellipse(0, 0, (height/TILES)*(2/3), (width/TILES)*(2/3));
  out1_c.ellipse(out1_c.width, out1_c.width, (height/TILES)*(2/3), (width/TILES)*(2/3));

  out1_d.strokeWeight((height/TILES)/STROKE_FACTOR);
  out1_d.noFill()
  out1_d.stroke(255,255,255,ALPHA);
  my_curve(out1_d, 1)
  my_curve(out1_d, 3)
  out1_d.ellipse(0, out1_d.width, (height/TILES)*(2/3), (width/TILES)*(2/3));
  out1_d.ellipse(out1_d.width, 0, (height/TILES)*(2/3), (width/TILES)*(2/3));

  out1_e.strokeWeight((height/TILES)/STROKE_FACTOR);
  out1_e.noFill()
  out1_e.stroke(255,255,255,ALPHA);
  my_curve(out1_e, 0)
  my_curve(out1_e, 1)
  my_curve(out1_e, 2)
  my_curve(out1_e, 3)
}

function draw() {
    background(0,0,0,255);


    for (let x = 0; x < height; x += height/TILES){
        for (let y = 0; y < width; y += width/TILES){
          rand = random()
          if (rand < 1/DIFF_TILES) {
              image(out1_a, x, y);
          }
          else if (rand < 2/DIFF_TILES) {
              image(out1_b, x, y);
          }
          else if (rand < 3/DIFF_TILES) {
            image(out1_c, x, y);
          }
          else if (rand < 4/DIFF_TILES) {
            image(out1_d, x, y);
          }
          else{
            image(out1_e, x, y);
          }
        }
    }
}

function my_curve(input, num){
  if (num == 0){
    input.beginShape();
    input.vertex(input.width * 2 / 3, 0);
    input.bezierVertex(input.width * (2 / 3), input.height * (1 / 3), input.width * (1 / 3), input.height * (2 / 3), input.width * (1 / 3), input.height);
    input.endShape();
  }
  else if (num == 1){
    input.beginShape();
    input.vertex(input.width * 1 / 3, 0);
    input.bezierVertex(input.width * (1 / 3), input.height * (1 / 3), input.width * (2 / 3), input.height * (2 / 3), input.width * (2 / 3), input.height);
    input.endShape();
  }
  if (num == 2){
    input.beginShape();
    input.vertex(0, input.width * 2 / 3);
    input.bezierVertex(input.height * (1 / 3), input.width * (2 / 3), input.height * (2 / 3), input.width * (1 / 3), input.height, input.width * (1 / 3));
    input.endShape();
  }
  else if (num == 3){
    input.beginShape();
    input.vertex(0, input.width * 1 / 3);
    input.bezierVertex(input.height * (1 / 3), input.width * (1 / 3), input.height * (2 / 3), input.width * (2 / 3), input.height, input.width * (2 / 3));
    input.endShape();
  }

}