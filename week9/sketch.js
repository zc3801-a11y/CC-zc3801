let mic;
let amplitude;
let startbutton;
let micReady = false;
let message = "Click Start to enable your microphone.";

let balloonsSize = 50;
let warningSize = 175;
let popSize = 230;
let popped = false;
let burstFrame = 0;

let quietLevel = 0.025;
let strongLevel = 0.18;

function setup() {
  createCanvas(600, 440);
  textAlign(CENTER, CENTER);

  mic = new p5.AudioIn();
  amplitude = new p5.Amplitude();

  startbutton = createButton("Start");
  startbutton.parent("main");
  startbutton.mousePressed(startOrReset);
}

async function startOrReset() {
  if (micReady) {
    balloonsSize = 50;
    popped = false;
    burstFrame = 0;
    return;
  }

  startbutton.attribute("disabled", "");
  message = "Allow microphone access to start.";

  try {
    await userStartAudio();
    mic.start(function () {
      amplitude.setInput(mic);
      micReady = true;
      startbutton.html("Reset");
      startbutton.removeAttribute("disabled");
    }, showMicError);
  } catch (err) {
    showMicError();
  }
}

function showMicError() {
  message = "Check microphone permissions and try again.";
  startbutton.removeAttribute("disabled");
}

function draw() {
  background(249, 240, 219);

  let blow = 0;
  if (micReady) {
    let level = amplitude.getLevel();
    blow = constrain(map(level, quietLevel, strongLevel, 0, 1), 0, 1);
  }

  if (!popped) {
    balloonsSize += blow * 2.5;

    if (balloonsSize >= popSize) {
      popped = true;
    }
  }

  if (popped) {
    drawBurst();
    message = "Pop! Click Reset to try again.";
  } else {
    drawBalloons(blow);

    if (micReady) {
      message = "Blow into the microphone.";
      if (balloonsSize >= warningSize) {
        message = "Almost full. Stop here or keep blowing.";
      }
    }
  }

  noStroke();
  fill(49, 29, 68);
  textSize(25);
  text("JUST ENOUGH AIR", width / 2, 38);
  textSize(15);
  text(message, width / 2, height - 26);
}

function drawBalloons(blow) {
  let shake = 0;
  if (balloonsSize >= warningSize) {
    shake = random(-9, 9) * blow;
  }

  let balloonHeight = balloonsSize * 1.25;
  let bottom = balloonHeight / 2;
  let balloonColor = lerpColor(color(116, 60, 208), color(255, 72, 143), blow);

  push();
  translate(width / 2 + shake, 205);

  stroke(80, 55, 110);
  strokeWeight(3);
  line(0, bottom, -8, bottom + 38);

  noStroke();
  fill(balloonColor);
  ellipse(0, 0, balloonsSize, balloonHeight);
  triangle(0, bottom - 3, -7, bottom + 8, 7, bottom + 8);

  fill(255, 175);
  ellipse(
    -balloonsSize * 0.21,
    -balloonHeight * 0.2,
    balloonsSize * 0.13,
    balloonHeight * 0.23
  );

  pop();
}

function drawBurst() {
  burstFrame++;
  let distance = 18 + burstFrame * 5;
  let opacity = max(0, 255 - burstFrame * 9);

  noStroke();
  fill(255, 72, 143, opacity);

  for (let i = 0; i < 12; i++) {
    let angle = TWO_PI / 12 * i;
    let x = width / 2 + cos(angle) * distance;
    let y = 205 + sin(angle) * distance;
    triangle(x, y - 8, x - 6, y + 5, x + 7, y + 3);
  }
}