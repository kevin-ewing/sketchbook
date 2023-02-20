function setup() {
  colorMode(HSB, 100)
  createCanvas(800, 800);
  background(0,0,100);
  my_color = 0;
  frameRate(120); 
  
  // RECT MODE options
  // rectMode(corner) (DEFAULT)
  // rectMode(corners)
  // rectMode(center)
  // rectMode(radius)
  
  // ELIPSE MODE options
  // elipseMode(corner)
  // elipseMode(corners)
  // elipseMode(center) (DEFAULT)
  // elipseMode(radius)

  
  // COLOR MODE options
  // colorMode(RGB) (DEFUALT)
  // colorMode(HSB) (value)
  // colorMode(HSL) (lightness)
  
  
}

function draw() {
  //stroke(color)
  noStroke()
  smooth();
  
  if (mouseIsPressed) {
    my_color = random(0,100);
  }
  
    // ellipse(mouseX, mouseY, 10, 10);
    // circle(x, y, diam)
    // elipse(x,y,w,h)
    // rect(x,y,w,h)
    // square(x,y,side)
    // point(x,y)
    // triange(x1,y1,x2,y2,x3,y3)
    // quad(x1,y1,x2,y2,x3,y3,x4,y4)
  
  
  // WE CAN ALSO USE ALL OF THE CSS COLOR WAYS
  // color(0,255,0)
  // color('green')
  // color('#00ff00')
  // color('RGB(0,255,0)')
  
  fill(my_color, 40, 100, 20)
  circle(mouseX, mouseY, 100);
  
  
}

// MACH BAND VISUAL EFFECT
// We percieve more contrast between
