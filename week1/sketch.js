// change the quotes in this array. Be mindful of the quotation marks!
// this is the only part of the file you need to edit!

const quotes = [
  { text: "the intersection where artists and programmers meet, creating a vast degree of potential", source: "SMU" },
  { text: "a school of thought", source: "Tim Rodenbröcker" },
  { text: "the practice of making art with code", source: "Andrew Bryant" },
  { text: "a new interdisciplinary art form", source: "Ahmad Moussa" },
  { text: "code in the contexts of art, play, creativity, and self-expression", source: "Hunter Dyar" },
  { text: "about free exploration", source: "Patrik Hübner" },
  { text: "the intersection of art and technology", source: "Javier Marc" },
  { text: "about experimentation, not functionality", source: "Maura Kelly" }
];
// no need to edit anything below this line! 
// if you have made an error, you can check your history to see what might have gone wrong

// a variable that holds the current quote
let current = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Seed with millis() so each page load gives a different quote.
  randomSeed(millis());
  textSize(32);
  fill(240, 255, 10);
  // calls the function to pick a quote
  pickQuote();
}

function pickQuote() {
  // take a random number and use that to identify what quote to use
  current = quotes[floor(random(quotes.length))];
}

function draw() {
  background(255, 0, 125); // set the background color
  drawQuote();  // draw the quote on screen
}

function drawQuote() {   // draw text
  textAlign(CENTER, CENTER);
  text("Creative Coding is.....", width / 2, height / 2 - 48);
  textStyle(BOLD);
  text("'" + current.text + "'", width / 2, height / 2);
  textAlign(RIGHT, CENTER);
  text("-" + current.source, width - 100, height - 100);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newQuote() {
  pickQuote();
  redraw();
}

function mousePressed() {
  newQuote();
}