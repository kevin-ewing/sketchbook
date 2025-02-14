var bkgdColor, textColor, strokeColor, sideSolidColor;
var colorSet = [];

var inputText = [];
var tFont = [];
var tFontData = [];
var myFont = [];
var tFontFactor = [];
// var starterText = "A\nSAD\nWILD\nTHING";
// var starterText = "FUTURE\nWHAT\nEVER";
var starterText = "BUY\nTHE\nMAGIC\nBEANS";
// var starterText = "WE\nARE\nALREADY\nINFNITE";

var pgTextSize = 100;
var res = 8;
var pauseLength = 30;

var culmLength = [];
var coreBase;
var baseAnimA = 60;
var animA = 60;     ////// INTRO
var baseAnimB = 0;
var animB = animA;     ////// STAY
var baseAnimC = 60;
var animC = animB + 60;     ////// OUTRO
var maxDelay = -20;

var stageAdirect = 2;
var stageAstrength = 3;

var stageBdirect = 2;
var stageBstrength = 3;

var wWindowMin, wWindowMax;
var scaler = 0.6;

var widgetOn = true;

var fullW, fullH;

var extrudeType = 1;
var tumbleDepthLength = -75;
var tumbleAmount = 1;
var zoomDepthLength = -500;
var punchDepthLength = -50;
var punchDistance = 100;
var punchInvert = false;

var mouseCenterOnToggle = false;
var mouseCenter;
var maxDist = 100;

var orbitOnToggle = false;
var capsOnToggle = true;
var strokeOnToggle = false;
var strokeW = 1.1;

var sidesType = 2;
var selFont = 0;

let enableOrbit = true;

var saveMode = 0;
var recording = false;

var cwidth, cheight
var recMessageOn = false;
var frate = 30;
var recordedFrames = 0;
var numFrames = 300;

var thisDensity = 1;

function preload(){
  tFontData[0] = loadBytes("boost_resources/Milligram-Medium.ttf");
  tFont[0] = loadFont("boost_resources/Milligram-Medium.ttf");

  tFontFactor[0] = 0.73;
}

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);

  thisDensity = pixelDensity();

  cwidth = width;
  cheight = height;

  mouseCenter = createVector(0, 0);

  for(var m = 0; m < 7; m++){
    myFont[m] = opentype.parse(tFontData[m].bytes.buffer);
  }

  wWindowMin = width/8,
  wWindowMax = width;
  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);

  textColor = color('#ffffff');
  strokeColor = color('#000000');
  bkgdColor = color('#000000');
  sideSolidColor = color('#f26666');

  colorSet[0] = color('#ffffff');
  colorSet[1] = color('#4e7cd9');
  colorSet[2] = color('#02733e');
  colorSet[3] = color('#f23030');
  colorSet[4] = color('#f26666');

  frameRate(frate);
  curveDetail(res);

  strokeJoin(ROUND);
  strokeCap(ROUND);
  rectMode(CENTER);

  document.getElementById("textArea").value = starterText;
  setText();

  const uiElement = select('#widget'); // replace with your HTML element's ID or class
  uiElement.mouseOver(() => enableOrbit = false);
  uiElement.mouseOut(() => enableOrbit = true);
}

function draw(){
  if(extrudeType == 0){
    ortho();
  } else {
    perspective();
  }

  background(bkgdColor);

  if(enableOrbit && orbitOnToggle){
    orbitControl();
  }

  push();
    coreBase.run();
  pop();

  // fill(0,0,255);
  // textSize(20);
  // textFont(tFont[0]);
  // text(round(frameRate()), -width/2 + 50, height/2 - 50);

  runRecording();
}

function mousePressed(){
  if(mouseCenterOnToggle && enableOrbit){
    mouseCenter.set(mouseX - width/2, mouseY - height/2);

    coreBase.liveReset();
    coreBase.tickerReset();
  }
}

function quadLerp(p0, p1, p2, t){
  return ((1-t)*(1-t)) * p0 + 2 * ((1-t) * t * p1) + t * t * p2;
}

function windowResized(){
  resizeForPreview();
}

function resizeForPreview(){
  var tempWidth, tempHeight;

  if(saveMode == 0){
    resizeCanvas(windowWidth, windowHeight, WEBGL);
  } else if(saveMode == 1){
    if(windowWidth > windowHeight * 9/16){
      tempHeight = windowHeight;
      tempWidth = windowHeight * 9/16;
    } else {
      tempWidth = windowWidth;
      tempHeight = windowWidth * 16/9;
    }
    resizeCanvas(tempWidth, tempHeight, WEBGL);
  } else if(saveMode == 2){
    if(windowWidth < windowHeight){
      tempWidth = windowWidth;
      tempHeight = windowWidth;
    } else {
      tempHeight = windowHeight;
      tempWidth = windowHeight;
    }
    resizeCanvas(tempWidth, tempHeight, WEBGL);
  }

  cwidth = width;
  cheight = height;

  wWindowMin = width/8,
  wWindowMax = width;
  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);

  setText();
}

function resizeForSave(){
  if(saveMode == 0){
    resizeCanvas(windowWidth, windowHeight, WEBGL);
  } else if(saveMode == 1){
    resizeCanvas(1080, 1920, WEBGL);
  } else if(saveMode == 2){
    resizeCanvas(1080, 1080, WEBGL);
  }

  wWindowMin = width/8,
  wWindowMax = width;
  wWindow = map(scaler, 0, 1, wWindowMin, wWindowMax);

  setText();
}