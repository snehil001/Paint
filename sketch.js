

let redSlider;
let greenSlider;
let blueSlider;
let alphaSlider;
let currentColorDiv;
let strokeColorDiv;
let fillColorDiv;
let thickSlider;
let thickSpan;

let strokeRed, strokeGreen, strokeBlue, strokeAlpha, fillRed, fillGreen, fillBlue, fillAlpha, thickness;

let allPath = [];
let currentPath=[];
let isDrawing = false;


function setup() {
  let cnv = createCanvas(windowWidth, windowHeight/2);
  cnv.parent("canvasDiv");
  
  
  /*
  //our master piece buffer
  art=createGraphics(width, height);
  
  //a extra buffer on top of art buffer to show mouse trails
  layer=createGraphics(width, height);
  */
  

  //stroke color
  strokeRed = 208;
  strokeGreen = 180;
  strokeBlue = 235;
  strokeAlpha = 255;
  //fill color
  fillRed = 0;
  fillGreen = 0;
  fillBlue = 0;
  fillAlpha = 0;
  //stroke weight
  thickness = 5;
  
  /*
  //the inside of the shape is made transparent
  art.fill(0,0);
  //some border color of the shape drawn is given
  art.stroke(artStrokeRed, artStrokeGreen, artStrokeBlue, artStrokeAlpha);
  art.strokeWeight(artStrokeWeight);
  art.clear();
  */
  /*
  //the inside of trailing circles is transparent
  layer.noFill();
  //the border color of the trailing circles is black
  layer.stroke(0);
  layer.clear();
  */
 
  
  
  let saveButton = createButton('Save Master Piece');
  saveButton.mouseClicked(pleaseSave);
  saveButton.parent("one");
  
  let clearButton = createButton('🗑️');
  clearButton.mouseClicked(pleaseClearArt);
  clearButton.parent("one");

  
  
  redSlider=createSlider(0, 255, strokeRed, 1);
  redSlider.id("redSlider");
  redSlider.parent("two");
 
  greenSlider=createSlider(0, 255, strokeGreen, 1);
  greenSlider.id("greenSlider");
  greenSlider.parent("two");
  


  blueSlider=createSlider(0, 255, strokeBlue, 1);
  blueSlider.id("blueSlider");
  blueSlider.parent("three");

  alphaSlider=createSlider(0, 255, strokeAlpha, 1);
  alphaSlider.id("alphaSlider");
  alphaSlider.parent("three");


  redSlider.input(displayCurrentColor);
  greenSlider.input(displayCurrentColor);
  blueSlider.input(displayCurrentColor);
  alphaSlider.input(displayCurrentColor);
  

  
  currentColorDiv = createDiv('Current Color');
  currentColorDiv.class("colorShow");
  currentColorDiv.parent("four");

  strokeColorDiv = createDiv('Stroke Color');
  strokeColorDiv.class("colorShow");
  strokeColorDiv.parent("four");

  fillColorDiv = createDiv('Fill Color');
  fillColorDiv.class("colorShow");
  fillColorDiv.parent("four");
  
  

  let strokeColorButton = createButton('Choose Stroke Color');
  strokeColorButton.mouseClicked(selectStroke);
  strokeColorButton.parent("five");
  
  let fillColorButton = createButton('Choose Fill Color');
  fillColorButton.mouseClicked(selectFill);
  fillColorButton.parent("five")
  
  
  
  let noStrokeButton = createButton("No Stroke");
  noStrokeButton.mouseClicked(makeNoStroke);
  noStrokeButton.parent("six");
  
  let noFillButton = createButton("No Fill");
  noFillButton.mouseClicked(makeNoFill);
  noFillButton.parent("six");
  

 

  thickSlider = createSlider(1, 20, thickness, 1);
  thickSlider.input(selectThickness);
  thickSlider.id("thickSlider");
  thickSlider.parent("seven")
  
  createSpan("Stroke Weight: ").parent("seven");
  thickSpan = createSpan("" + thickness);
  thickSpan.parent("seven");
  
  
  displayCurrentColor();
  showFill();
  showStroke();
}






function draw() {
  stroke(strokeRed, strokeGreen, strokeBlue, strokeAlpha);
  fill(fillRed, fillGreen, fillBlue, fillAlpha);
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






function displayCurrentColor(){
  currentColorDiv.style('background', `rgba(${redSlider.value()}, ${greenSlider.value()}, ${blueSlider.value()}, ${alphaSlider.value()})`);
}






//overridding
function mousePressed(){
  isDrawing = true;
  currentPath=[];
  allPath.push(currentPath);
}


/*
//overridding
function mouseDragged(){
  layer.ellipse(mouseX, mouseY, 5, 5);
}
*/


//overriding
function mouseReleased(){
  isDrawing = false;
 // pleaseClearTrails();
}








function pleaseSave(){
  saveCanvas(cnv, 'painting', 'png');
}



/*
//clear the trailing circles
function pleaseClearTrails(){
  layer.clear();
  clear();
}
*/



//clear the master piece🗑️
function pleaseClearArt(){
  clear();
}






function selectStroke(){
  strokeRed = redSlider.value();
  strokeGreen = greenSlider.value();
  strokeBlue = blueSlider.value();
  strokeAlpha = alphaSlider.value();
  showStroke();
}



function selectFill(){
  fillRed = redSlider.value();
  fillGreen = greenSlider.value();
  fillBlue = blueSlider.value();
  fillAlpha = alphaSlider.value();
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








function convertDecToHex(...colors)
{
  let res="#";
  for(let color of colors){
    res = res + getPartHexOf(color);
  }
  return res;
}


function getPartHexOf(r){
  return getHexValue(parseInt(r/16))+""+ getHexValue(r%16);
}


function getHexValue(r){
  switch(r){
    case 0: return "0";
    case 1: return "1";
    case 2: return "2";
    case 3: return "3";
    case 4: return "4";
    case 5: return "5";
    case 6: return "6";
    case 7: return "7";
    case 8: return "8";
    case 9: return "9";
    case 10: return "a";
    case 11: return "b";
    case 12: return "c";
    case 13: return "d";
    case 14: return "e";
    case 15: return "f";
  }
}


function convertHexToDec(
  inputColorString)
{
  let colorString=inputColorString.substring(1);
  
  let resColorArr = [];
  
  for(let i = 0; i < colorString.length - 1; i += 2)
  {
    partColorString = colorString.substring(i,i+2);
    
    let colorValue = 16 * getDecValue(partColorString.charAt(0)) + getDecValue(partColorString.charAt(1));
    
    resColorArr.push(colorValue);
  }
  return resColorArr;
}




function getDecValue(s){
  let res=0;
  s = s.toLowerCase();
  switch(s){
    case '0': res=0; break;
    case '1': res=1; break; 
    case '2': res=2; break;
    case '3': res=3; break;
    case '4': res=4; break;
    case '5': res=5; break;
    case '6': res=6; break; 
    case '7': res=7; break;
    case '8': res=8; break;
    case '9': res=9; break;
    case 'a': res=10; break;
    case 'b': res=11; break;
    case 'c': res=12; break;
    case 'd': res=13; break;
    case 'e': res=14; break;
    case 'f': res=15; break;
  }
  return parseInt(res);
}