/*Powered by SNEHIL KUMAR*/

let redSlider;
let greenSlider;
let blueSlider;
// let alphaSlider;
let currentColorDiv;
let strokeColorDiv;
let fillColorDiv;
let thickSlider;
let thickSpan;

let strokeRed, strokeGreen, strokeBlue, strokeAlpha;
let fillRed, fillGreen, fillBlue, fillAlpha;
let thickness;

let currentPath=[];
let isDrawing = false;

let cnv;

// let allowToDrawButtonColors = ["transparent", "#FFAB91"];
// let isDrawAllowed = true;

let cnvWidth = 0;
let cnvHeight = 0;






function setup() {
  if(windowWidth >= 601){ // PC
    cnvWidth = windowWidth*0.7;
    cnvHeight = windowHeight*0.7;
  }else if(windowWidth <= 600){  // MOBILE
    cnvWidth = windowWidth*0.8;
    cnvHeight = windowHeight*0.5;
  }

  cnv = createCanvas(cnvWidth, cnvHeight);
  cnv.parent("canvasDiv");


  clear();


  //stroke color
  strokeRed = 208;
  strokeGreen = 180;
  strokeBlue = 235;
  strokeAlpha = 1;
  //fill color
  fillRed = 0;
  fillGreen = 0;
  fillBlue = 0;
  fillAlpha = 0;
  //stroke weight
  thickness = 5;


  cnv.mousePressed(() => {
    isDrawing = true;
    currentPath=[];
  });

  cnv.mouseReleased(() => {
    isDrawing = false;
    currentPath=[];
  });

  cnv.touchStarted(() => {
    isDrawing = true;
    currentPath=[];
  });

  cnv.touchEnded(() => {
    isDrawing = false;
    currentPath=[];
  });


  //Sliders for red, green, blue, and alpha
  redSlider=createSlider(0, 255, strokeRed, 1);
  redSlider.id("redSlider");
  redSlider.parent("two");


  greenSlider=createSlider(0, 255, strokeGreen, 1);
  greenSlider.id("greenSlider");
  greenSlider.parent("two");


  blueSlider=createSlider(0, 255, strokeBlue, 1);
  blueSlider.id("blueSlider");
  blueSlider.parent("two");


  // alphaSlider=createSlider(0, 1, strokeAlpha, 0);
  // alphaSlider.id("alphaSlider");
  // alphaSlider.parent("two");


  redSlider.input(displayCurrentColor);
  greenSlider.input(displayCurrentColor);
  blueSlider.input(displayCurrentColor);
  // alphaSlider.input(displayCurrentColor);




  //Displaying current colors selected
  currentColorDiv = createDiv('Current Color');
  currentColorDiv.class("colorShow");
  currentColorDiv.parent("three");

  strokeColorDiv = createDiv('Stroke Color');
  strokeColorDiv.class("colorShow");
  strokeColorDiv.parent("three");

  fillColorDiv = createDiv('Fill Color');
  fillColorDiv.class("colorShow");
  fillColorDiv.parent("three");




  //Buttons for choosing colors
  let strokeColorButton = createButton('Choose Stroke');
  strokeColorButton.mouseClicked(selectStroke);
  strokeColorButton.parent("four");

  let fillColorButton = createButton('Choose Fill');
  fillColorButton.mouseClicked(selectFill);
  fillColorButton.parent("four");




  //Buttons for no fill and no stroke
  let noStrokeButton = createButton("No Stroke");
  noStrokeButton.mouseClicked(makeNoStroke);
  noStrokeButton.parent("five");

  let noFillButton = createButton("No Fill");
  noFillButton.mouseClicked(makeNoFill);
  noFillButton.parent("five");




  //Slider for thickness of drawing
  createSpan("Stroke Weight: ").parent("six");
  thickSpan = createSpan("" + thickness);
  thickSpan.parent("six");

  thickSlider = createSlider(1, 50, thickness, 1);
  thickSlider.input(selectThickness);
  thickSlider.id("thickSlider");
  thickSlider.parent("six");



  //initially displaying current choice of colors
  displayCurrentColor();
  showFill();
  showStroke();

}






function draw() {
  stroke(strokeRed, strokeGreen, strokeBlue, map(strokeAlpha, 0, 1, 0, 255));
  fill(fillRed, fillGreen, fillBlue, map(fillAlpha, 0, 1, 0, 255));
  strokeWeight(thickness);

  if (isDrawing) {
    let point = {
      x: mouseX,
      y: mouseY
    }
    currentPath.push(point);
  }

  beginShape();
  for(let i=0; i<currentPath.length; i++){
    vertex(currentPath[i].x, currentPath[i].y);
  }
  endShape();
}




function fillCanvas(){
  background(random(255), random(255), random(255), 255);
}




function startStopDrawing(){
  // isDrawAllowed = !isDrawAllowed;
  isLooping() ? noLoop() : loop();
  select("#startStopDrawing").elt.classList.toggle("draw-not-allowed");
}




// Save the Master Piece🖌️
function pleaseSave(){
  saveCanvas(cnv, 'painting', 'png');
}



//clear the master piece🗑️
function pleaseClearArt(){
  clear();
}




function mouseReleased() {
  isDrawing = false;
  currentPath=[];
}



function touchEnded() {
  isDrawing = false;
  currentPath=[];
}





function selectStroke(){
  strokeRed = redSlider.value();
  strokeGreen = greenSlider.value();
  strokeBlue = blueSlider.value();
  strokeAlpha = 1; //alphaSlider.value();
  showStroke();
}



function selectFill(){
  fillRed = redSlider.value();
  fillGreen = greenSlider.value();
  fillBlue = blueSlider.value();
  fillAlpha = 1; //alphaSlider.value();
  showFill();
}



function makeNoStroke(){
  strokeAlpha = 0;
  showStroke();
}



function makeNoFill(){
  fillAlpha = 0;
  showFill();
}






function displayCurrentColor() {
  currentColorDiv.style('background', `rgba(${redSlider.value()}, ${greenSlider.value()}, ${blueSlider.value()}, 1)`);
}



function showStroke(){
  strokeColorDiv.style('background', `rgba(${strokeRed}, ${strokeGreen}, ${strokeBlue}, ${strokeAlpha})`);
}



function showFill() {
  fillColorDiv.style('background', `rgba(${fillRed}, ${fillGreen}, ${fillBlue}, ${fillAlpha})`);
}



function selectThickness(){
  thickness = thickSlider.value();
  thickSpan.html("" + thickness);
}
