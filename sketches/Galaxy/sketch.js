function setup() {
  colorMode(HSB, 100);
  createCanvas(1000, 1000);
  background(0,0,0);
}



function draw() {
  const originx = gaussianRandom(500,20)
  const originy = gaussianRandom(500,15)
  const angle = Math.random()*360
  const swirl = gaussianRandom(0,.5)
  const base_hue = Math.random()*100

  for (let i = 0; i < 50000; i++) {
    const x = gaussianRandom(500,100)
    const y = gaussianRandom(500,40)

    const distance = getDistance(originx,originy,x,y)
    const scaled_angle = (distance * swirl) + angle
    const rotated = my_rotate(originx, originy, x, y, scaled_angle)

    const star_size = (1000-distance)*.001
    const my_hue = gaussianRandom(base_hue,20)
    const my_sat = gaussianRandom(8, 20)
    const my_alpha = gaussianRandom(80, 10)

    my_color = color(my_hue, my_sat, 100, my_alpha)
    star(rotated[0],rotated[1], star_size, my_color)
  } 

  noLoop();

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