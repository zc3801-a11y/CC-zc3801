// p5Polar Template
// https://github.com/liz-peng/p5.Polar
// https://liz-peng.github.io/p5.Polar/
// Review the index.html for the <script></script> 

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(209);
  
  noStroke();
  fill(35);
  
  setCenter(width/2, height/2);

  for (let i = 0; i < 7; i ++) {
    polarSquares(
  32 + i * 5, 6 + i, 45 + i * 29,
  function (...args) {
    args[2] =
      6 +
      i +
      sin(
        args[0] * 0.5 +
        mouseX * 0.03 +
        i * 0.5
      ) *
      (mouseY / 85);

    return args;
  }
);
  }

  
}
