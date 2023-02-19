function setup() {
  colorMode(HSB, 100)
  createCanvas(800, 780);
  stroke('#5C4355')
  strokeWeight(8)
}



function draw() {
  //COLORS
  black = '#27211E'
  yellow = '#FCED00'
  grey = '#D5DAE5'
  white = '#F0F8F7'
  blue = '#5D55A4'
  red = '#EF3C30'

  //Starting top left
  my_rect(-10, 50, -10, 180, black)
  my_rect(50, 310, -10, 28, grey)
  my_rect(50, 150, 28, 180, red)
  my_rect(150, 310, 28, 180, white)


  my_rect(310, 512, -10, 115, white)
  my_rect(512, 708, -10, 115, grey)

  my_rect(310, 512, 115, 180, yellow)
  my_rect(512, 708, 115, 180, blue)
  my_rect(708, 810, -10, 180, yellow)
  //First vertical divide is 180


  my_rect(-10, 50, 180, 494, white)
  my_rect(50, 310, 180, 354, blue)
  my_rect(50, 310, 354, 494, black)

  my_rect(310, 512, 180, 354, yellow)
  my_rect(310, 512, 354, 494, white)

  my_rect(512, 708, 180, 354, grey)
  my_rect(512, 708, 354, 626, black)

  my_rect(708, 762, 180, 626, red)
  my_rect(762, 810, 180, 626, white)

  //Second vertical divide is 494

  my_rect(-10, 150, 494, 674, grey)
  my_rect(-10, 150, 674, 800, white)

  my_rect(150, 310, 494, 736, red)
  my_rect(150, 512, 736, 800, black)

  my_rect(310, 512, 494, 626, white)
  my_rect(310, 512, 626, 736, blue)

  my_rect(512, 708, 626, 736, yellow)
  my_rect(512, 708, 736, 800, grey)
  my_rect(708, 810, 626, 800, white)
  
  granulateChannels(10);
}

function my_rect(x1,x2, y1,y2, hex_col){
  // Function that creates a rectangle of color "hex_color" with the top left edge at (x1,y1) and the bottom right edge at (x2,y2)    

  width = Math.abs(x1-x2);
  height = Math.abs(y1-y2);
  
  fill(hex_col);
  rect(x1, y1, width, height);
}


function granulateChannels(amount) {
  loadPixels();
  const d = pixelDensity();
  const pixelsCount = 4 * (width * d) * (height * d);
  for (let i = 0; i < pixelsCount; i += 4) {
      pixels[i] = pixels[i] + random(-amount, amount);
      pixels[i+1] = pixels[i+1] + random(-amount, amount);
      pixels[i+2] = pixels[i+2] + random(-amount, amount);
      // comment in, if you want to granulate the alpha value
      // pixels[i+3] = pixels[i+3] + random(-amount, amount);
  }
  updatePixels();
}