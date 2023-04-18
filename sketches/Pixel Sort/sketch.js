let img;
let sorted = false;

function preload() {
  let url = "https://source.unsplash.com/random/600x600?nature";
  img = loadImage(url);
}

function draw() {
  background(220);
  if (img) {
    image(img, 0, 0);
  }
}

function setup() {
  createCanvas(800, 800);

  img.resize(400, 400);

  noSmooth();
}

function draw() {
  img.loadPixels();

  for (let i = 0; i < 10000; i++) {
    sortPixels();
  }

  img.updatePixels();

  image(img, 0, 0, width, height);
}

function sortPixels() {
  const x = random(img.width);
  const y = random(img.height - 1);
  let dis = random(1,10);

  const colorOne = img.get(x, y);

  const colorTwo = img.get(x + dis,y);

  const totalOne = red(colorOne) + green(colorOne) + blue(colorTwo);
  const totalTwo = red(colorTwo) + green(colorTwo) + blue(colorTwo);

  if (totalOne < totalTwo) {
    img.set(x, y, colorTwo);
    img.set(x + dis, y, colorOne);
  }

}

