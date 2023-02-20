function setup() {
  colorMode(HSB, 100);
  createCanvas(1000, 1000);


}



function draw() {
  background(0,0,0);
  let base_hue = Math.random()*100


  for (let i = 0; i < 10000; i++) {
    let x = random(width); // random x position within the canvas
    let y = random(height); // random y position within the canvas
    let my_hue = gaussianRandom(base_hue,.1)
    let my_sat = gaussianRandom(8, 20)
    let my_alpha = gaussianRandom(30, 30)
    let star_size = Math.random()*1.5

    my_color = color(my_hue, my_sat, 100, my_alpha)
    star(x,y, star_size, my_color)
  }


  let originx = gaussianRandom(500,20)
  let originy = gaussianRandom(500,15)
  let angle = Math.random()*360
  let swirl = gaussianRandom(0,.5)

  for (let i = 0; i < 100000; i++) {
    let x = gaussianRandom(500,100)
    let y = gaussianRandom(500,40)

    let distance = getDistance(originx,originy,x,y)
    let scaled_angle = (distance * swirl) + angle
    let rotated = my_rotate(originx, originy, x, y, scaled_angle)

    let star_size = (Math.pow((1000-distance),2)*.000002)
    let my_hue = gaussianRandom(base_hue,20)
    let my_sat = gaussianRandom(8, 20)
    let my_alpha = gaussianRandom(30, 30)

    my_color = color(my_hue, my_sat, 100, my_alpha)

    if (star_size > 0){
      star(rotated[0],rotated[1], star_size, my_color)
    }
  } 

  circularGradient(originx,originy, 100)

  noLoop();

}


function circularGradient(x, y, r) {
  let gradient = drawingContext.createRadialGradient(x, y, 0, x, y, r);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  drawingContext.fillStyle = gradient;
  drawingContext.arc(x, y, r, 0, 2 * PI);
  drawingContext.fill();
}


function star(x,y, size, color){
  strokeWeight(size)
  stroke(color)
  point(x,y)
}


// https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve 
function gaussianRandom(mean=0, stdev=1) {
  let u = 1 - Math.random(); //Converting [0,1) to (0,1)
  let v = Math.random();
  let z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  // Transform to the desired mean and standard deviation:
  return z * stdev + mean;
}

// https://stackoverflow.com/questions/17410809/how-to-calculate-rotation-in-2d-in-javascript
function my_rotate(cx, cy, x, y, angle) {
  var radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [nx, ny];
}

function getDistance(xA, yA, xB, yB) { 
	const xDiff = xA - xB; 
	const yDiff = yA - yB; 
	return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}