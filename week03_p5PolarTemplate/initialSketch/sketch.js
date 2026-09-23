// For your initial sketch

function setup() {
  createCanvas(500, 500);
    rectMode(CENTER)
}

function draw() {
  background(209);
  
  //put custom fucntion here
drawing01();

noLoop();

}
//nested loop 
function drawing01(){

  const startingX = 30;
  const startingY = 45;
  
  const xSpace = 26;
  const ySpace = 18;

  const columns = 18;
  const rows = 25;

  noStroke();
  fill(35); 

  //loop moves across x axis
    for (let i = 0; i < columns; i++) {
       //loop moves down y axis
    for (let j = 0; j < rows; j++) {
      
      //calculate positions of squares
      let x = i * xSpace + startingX;
      let y = j * ySpace + startingY;

      let wave = sin(
        i * 0.6 +
        j * 0.15 +
        mouseX * 0.03
      );

      let maximumSize = map(
        mouseY,
        0,
        height,
        10,
        24
      );
      
      let squareSize = map(
        wave, -1, 1, 3, maximumSize
      );

      rect(x, y, squareSize, squareSize)

    }

  }
}

function mouseMoved(){
  redraw();
}