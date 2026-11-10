
const barHeight = 80;
const leftMargin = 50;

function setup() {
  createCanvas(800, 450);
  noStroke();
  rectMode(CORNER);
}

function draw(){
  background(151, 71, 255); 
  myDrawing(); 
}

function myDrawing() {
  
  let s = second();
  let m = minute();
  let h = hour();
  let maxLength = width - leftMargin * 2;

  let sLength = map(s, 0, 60, 0, maxLength);
  let mLength = map(m, 0, 60, 0, maxLength);
  let hLength = map(h, 0, 24, 0, maxLength);

  //seconds
  fill(244, 191, 255);
  rect(leftMargin, 80, sLength, barHeight);
  
  //minutes
  fill(194, 255, 215);
  rect(leftMargin, 190, mLength, barHeight);

  //hours
  fill(112, 255, 188);
  rect(leftMargin, 300, hLength, barHeight);
}

// Tip: When plotting, strokeWeight() doesn't affect your drawing. 
// To change the thickness of your drawing, change your pen/marker/etc
// - or experiment with code (use a for loop to create an 'outline')

//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------



/*
This template uses the following sketch as a starting point: 
https://editor.p5js.org/golan/sketches/LRTXmDg2q

Additional references/info:
https://github.com/golanlevin/p5.plotSvg
https://github.com/liz-peng/p5.Polar
https://github.com/golanlevin/p5.plotSvg/blob/main/documentation.md#beginrecordsvg
https://github.com/golanlevin/p5.plotSvg/blob/main/documentation.md#endrecordsvg

*/