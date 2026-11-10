

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

  
  let mLength = map(m, 0, 60, 0, maxLength);

  //seconds
  let secondWidth = maxLength / 60;
   fill(244, 191, 255);
  for (let i = 0; i < s; i++) {
  rect(leftMargin + i * secondWidth, 80, secondWidth - 2, 20);
  }
  
  //minutes
  fill(194, 255, 215);
  rect(leftMargin, 190, mLength, 50);

  //hours
  let blockWidth = maxLength / 24;
  for (let i = 0; i < h; i++) {
  if (i == 0) {
    fill(90, 80, 140); 
  }
  if (i == 1) {
    fill(100, 85, 155); 
  }
  if (i == 2) {
    fill(115, 95, 175); 
  }
  if (i == 3) {
    fill(135, 110, 195); 
  }
  if (i == 4) {
    fill(160, 130, 210); 
  }
  if (i == 5) {
    fill(190, 150, 220); 
  }
  if (i == 6) {
    fill(230, 170, 210); 
  }
  if (i == 7) {
    fill(250, 185, 190); 
  }
  if (i == 8) {
    fill(225, 200, 160); 
  }
  if (i == 9) {
    fill(255, 215, 140); 
  }
  if (i == 10) {
    fill(250, 230, 150); 
  }
  if (i == 11) {
    fill(225, 240, 160); 
  }
  if (i == 12) {
    fill(194, 255, 175); 
  }
  if (i == 13) {
    fill(150, 245, 185); 
  }
  if (i == 14) {
    fill(112, 235, 200); 
  }
  if (i == 15) {
    fill(100, 220, 220); 
  }
  if (i == 16) {
    fill(100, 195, 235); 
  }
  if (i == 17) {
    fill(120, 170, 240); 
  }
  if (i == 18) {
    fill(180, 145, 230); 
  }
  if (i == 19) {
    fill(180, 125, 215); 
  }
  if (i == 20) {
    fill(195, 110, 190); 
  }
  if (i == 21) {
    fill(165, 100, 175); 
  }
  if (i == 22) {
    fill(135, 90, 160); 
  }
  if (i == 23) {
    fill(110, 80, 150); 
  }     
  rect(leftMargin + i * blockWidth, 300, blockWidth-3, barHeight);
}
}