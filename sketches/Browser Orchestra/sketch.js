let osc;

function setup() {
  createCanvas(400, 400);
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.start();
}

function draw() {
  background(220);
  let pitch = map(mouseX, 0, width, 100, 1000);
  let volume = map(mouseY, 0, height, 1, 0);
  osc.freq(pitch);
  osc.amp(volume);
}

function mousePressed() {
  if (osc.isPlaying()) {
    osc.stop();
  } else {
    osc.start();
  }
}
