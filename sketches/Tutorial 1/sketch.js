let startColor; 
let endColor;

let divisionSlider;
let startPicker;
let endPicker;

function setup() {
  createCanvas(640, 480);
  noStroke();

  //Slider Setup
  divisionSlider = createSlider(2,200,50,1);
  divisionSlider.position(width/2-150, height - 100);
  divisionSlider.style("width","300px")

  //Color Pickers
  startPicker = createColorPicker("#FF0000")
  startPicker.position(width/2 - 280, height - 105);
  startPicker.style("width","100px")

  endPicker = createColorPicker("#0000ff")
  endPicker.position(width/2 + 190, height - 105);
  endPicker.style("width","100px")

}

function draw() {
  background("white");

  const divisions = divisionSlider.value()
 
  const block_width = width/divisions;

  //RGB COLOR MODE
  colorMode(RGB)

  for (let i = 0; i <= divisions; i ++){
    
    let temp_color = lerpColor(startPicker.color(), endPicker.color(), i/divisions);
    fill(temp_color);
    rect(i*block_width, 0, block_width+1, 100);
  }

  //HSB COLOR MODE
  colorMode(HSB,360)

  for (let i = 0; i <= divisions; i ++){
    let temp_color = lerpColor(startPicker.color(), endPicker.color(), i/divisions);
    fill(temp_color);
    rect(i*block_width, 200, block_width+1, 100);
  }

}