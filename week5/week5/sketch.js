const barHeight = 70;
const leftMargin = 50;

function setup() {
  createCanvas(800, 450);
  noStroke();
  rectMode(CORNER);
}

function draw() {
  background(151, 71, 255);

  // Draw the clock every frame.
  myDrawing();
}

function myDrawing() {
  // Get the current time.
  let s = second();
  let m = minute();
  let h = hour();

  // Leave equal margins on both sides.
  let maxLength = width - leftMargin * 2;

  // Convert time into the length of each bar.
  let secondLength = map(s, 0, 60, 0, maxLength);
  let minuteLength = map(m, 0, 60, 0, maxLength);
  let hourLength = map(h, 0, 24, 0, maxLength);

  // Seconds
  fill(244,191,255);
  rect(leftMargin, 80, secondLength, barHeight);

  // Minutes
  fill(194, 255, 215);
  rect(leftMargin, 190, minuteLength, barHeight);

  // Hours
  fill(112, 255, 188);
  rect(leftMargin, 300, hourLength, barHeight);
}