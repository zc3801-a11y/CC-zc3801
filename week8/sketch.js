let bubbleList = [];
let bubbleColors = [];

class Bubble {
  constructor(x, y, s, c) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.c = c;
    this.speed = random(0.5, 1.5);
  }

//bubble body
  display() {
    stroke(this.c);
    strokeWeight(2);
    fill(this.c);
    ellipse(this.x, this.y, this.s);
  
  //white highlight
  noStroke();
  fill(255, 190);
  ellipse(
    this.x - this.s * 0.2, 
    this.y - this.s * 0.2, 
    this.s * 0.16,
    this.s * 0.25
  );
}

floatUp() {
  this.y -= this.speed;
 }
}

function setup() {
  createCanvas(600, 600);

bubbleColors = [
  color(255, 160, 195, 130),
  color(140, 225, 200, 130),
  color(145, 190, 255, 130),
  color(255, 220, 130, 130),
];

for (let i = 0; i < 5; i++) {
  bubbleList.push(
    new Bubble(80, width - 80, 
      random(150,height - 60), 
      random(50, 110), 
      random(bubbleColors)
    )
  );
}
}


function draw() {
  background(235, 228, 250);
  for (let i = bubbleList.length - 1; i >= 0; i--) {
    bubbleList[i].floatUp();
    
    if (bubbleList[i].y < -bubbleList[i].s / 2) {
      bubbleList.splice(i, 1);
    }
}
for (let i = 0; i < bubbleList.length; i++) {
  bubbleList[i].display();
}
noStroke();
fill(85, 70, 110);
textSize(14);
text("Click: add a bubble | Space: remove oldest", 20, 30);
}

function mousePressed() {
  if(mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    bubbleList.push(
      new Bubble(mouseX, mouseY, random(50, 110), random(bubbleColors))
    );
  }
}

function keyPressed() {
  if (key == " ") {
    bubbleList.splice(0, 1);
    return false; // prevent default behavior of space key (scrolling)
  }
}