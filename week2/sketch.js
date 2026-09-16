function setup() {
  createCanvas(510, 650);
  angleMode(DEGREES);

  generateDrawing();
}

function draw() {
  background();
}

function mousePressed() {
  generateDrawing();
}
//background colors 
function generateDrawing() {
  let backgroundColors = [[245, 230, 184], [238, 223, 166], [247, 237, 204], [232, 213, 154],[255, 243, 196]];
  let randomBackgroundColors = shuffle(backgroundColors);

//shapes colors
let shapeColors = [[189, 13, 0], [255, 205, 41], [30, 197, 252], [0, 0, 0]];
let randomShapeColors = shuffle(shapeColors);

//positions
let positions = [[width * 0.25, height * 0.25], [width * 0.75, height * 0.25], [width * 0.25, height * 0.75], [width * 0.75, height * 0.25], [width * 0.7, height * 0.7]];
let randomPositions = shuffle(positions);

//sizes
let sizes = [0.5, 0.7, 0.85, 1];
let randomSizes = shuffle(sizes);

//draw background
  background(randomBackgrounds[0]);
  noStroke();

//rectangles
push ();
rectMode(CENTER);
translate(randomPositions[0][0], randomPositions[0][1]);
rotate (random(-45, 45));
scale(randomSizes[0]);
fill(randomShapeColors[0]);
rect(0, 0, maxSize, maxSize * 0.5);
pop();

//circles
push ();
translate(randomPositions[1][0], randomPositions[1][1]);
scale(randomSizes[1]);
fill(randomShapeColors[1]);
ellipse(0, 0, maxSize);
pop();

//triangles
push ();
translate(randomPositions[2][0], randomPositions[2][1]);
rotate (random(-45, 45));
scale(randomSizes[2]);
fill(randomShapeColors[2]);
triangle(0, -maxSize / 2, -maxSize / 2, maxSize / 2,maxSize / 2, maxSize / 2);
pop();

//black bar
push ();
rectMode(CENTER);
translate(randomPositions[3][0], randomPositions[3][1]);
rotate (random(-70, 70));
scale(randomSizes[3]);
fill(randomShapeColors[3]);
rect(0, 0, maxSize, maxSize * 0.18);
pop();

}
