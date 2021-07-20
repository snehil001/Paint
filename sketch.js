let cnv;
let sb;
let cb;
let ccb;
let cd;

let art;
let layer;

let redSlider;
let greenSlider;
let blueSlider;
let alphaSlider;
let colorDisplayP;


function setup() {
  cnv = createCanvas(windowWidth, windowHeight/2);
  cnv.parent("canvasDiv");
  
  art=createGraphics(width, height);

  layer=createGraphics(width, height);

  art.fill(208, 231, 251);
  art.stroke(208, 231, 251);
  art.clear();
  
  layer.stroke(0);
  layer.noFill();
  layer.clear();
 
  sb=createButton('Save it!');
  sb.mouseClicked(pleaseSave);
 
  cb = createButton('Clear Canvas');
  cb.mouseClicked(pleaseClearCanvas);
  
  ccb = createButton('Clear Circles');
  ccb.mouseClicked(pleaseClearCircles);
  
  cd = createButton('Clear Drawing');
  cd.mouseClicked(pleaseClearDrawing);
  
  let chb1 = createButton('ChooseColor');
  chb1.mouseClicked(selectFill);
  
 /* let chb2 = createButton('strokeColor');
  chb2.mouseClicked(selectStroke);
  */
  
  
  createP('Red, Green');
  redSlider=createSlider(0, 255, 208, 1);

  greenSlider=createSlider(0, 255, 231, 1);
  createP("Blue, Alpha");
  blueSlider=createSlider(0, 255, 251, 1);
 
  alphaSlider=createSlider(0, 255, 255, 1);

  colorDisplayP = createP('Your color');
  colorDisplayP.style('width', '50px');
  colorDisplayP.style('height', '50px');
  
}



function draw() {
  art.vertex(mouseX, mouseY);
  image(art, 0, 0);
  image(layer,0, 0);
  colorDisplayP.style('background', DecToHex(redSlider.value(), greenSlider.value(), blueSlider.value(), alphaSlider.value())
  );
}



//over ridding
function mousePressed(){
  art.beginShape(); 
}



//overridding
function mouseDragged(){
  layer.ellipse(mouseX, mouseY, 5, 5);

}


//overriding
function mouseReleased(){
  art.endShape();
}



function pleaseSave(){
  saveCanvas(cnv, 'painting', 'png');
}




function pleaseClearCircles(){
  layer.clear();
  clear();
}



function pleaseClearCanvas(){
  art.clear();
  layer.clear();
  clear();
}



function pleaseClearDrawing(){
  art.clear();
  clear();
}




function selectFill(){
  let r=redSlider.value();
  let g=greenSlider.value();
  let b=blueSlider.value();
  let a=alphaSlider.value();
  art.fill(r,g,b,a);
  art.stroke(r,g,b,a);
}




/*function selectStroke(){
  let r = redSlider.value();
  let g = greenSlider.value();
  let b = blueSlider.value();
  let a = alphaSlider.value();
  art.stroke(r, g, b, a);
}
*/


function DecToHex(r, g, b,a){
  let res="#";
 res += getHex(parseInt(r/16))+""+getHex(r%16);
res += getHex(parseInt(g/16))+""+getHex(g%16);
res += getHex(parseInt(b/16))+""+getHex(b%16);
 res += getHex(parseInt(a/16))+""+getHex(a%16);
  return res;
}

function getHex(r){
  switch(r){
    case 0: return "0"; break;
    case 1: return "1"; break;
    case 2: return "2"; break;
    case 3: return "3"; break;
    case 4: return "4"; break;
    case 5: return "5"; break;
    case 6: return "6"; break;
    case 7: return "7"; break;
    case 8: return "8"; break;
    case 9: return "9"; break;
    case 10: return "a"; break;
    case 11: return "b"; break;
    case 12: return "c"; break;
    case 13: return "d"; break;
    case 14: return "e"; break;
    case 15: return "f"; break;
  }
}


function convertToDec(
  inputColorString)
{
  let colorString=inputColorString.substring(1);
  
  let resColorArr=[];
  
  for(let i=0; i<5; i+=2){
    let redString=colorString.substring(i,i+2);
    let redColor = 16*decValue(redString.charAt(0)) +
    decValue(redString.charAt(1));
    resColorArr.push(redColor);
  }
  return resColorArr;
}




function decValue(s){
  let res=0;
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
    case 'A':
    case 'a': res=10; break;
    case 'B':
    case 'b': res=11; break; 
    case 'C':
    case 'c': res=12; break;
    case 'D':
    case 'd': res=13; break;
    case 'E':
    case 'e': res=14; break;
    case 'F':
    case 'f': res=15; break;
  }
  return parseInt(res);
}