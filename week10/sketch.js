let handPose;
    let video;
    let startButton;

    let fingerX;
    let fingerY;
    let handVisible = false;

    let centerX = 320;
    let centerY = 220;
    let drinkAngle = 0;
    let stirSpeed = 0;

    let lastFingerX = 0;
    let lastFingerY = 0;
    let lastFingerDistance = 0;

    function setup() {
      createCanvas(640, 440).parent("main");

      startButton = createButton("Start camera");
      startButton.parent("main");
      startButton.mousePressed(startCamera);
    }

    async function startCamera() {
      startButton.attribute("disabled", "");
      setStatus("Loading hand tracking…");

      try {
        handPose = await ml5.handPose({ maxHands: 1 });

        setStatus("Allow camera access to start.");
        video = createCapture(VIDEO, startTracking);
        video.size(640, 440);
        video.hide();
      } catch (error) {
        setStatus("Could not start. Check camera access and try again.");
        startButton.removeAttribute("disabled");
      }
    }

    function startTracking() {
      handPose.detectStart(video, gotHands);
      startButton.hide();
      setStatus("Circle the glass with your index finger.");
    }

    function setStatus(message) {
      document.getElementById("status").textContent = message;
    }

    function gotHands(results) {
      handVisible = results.length > 0;

      if (!handVisible) {
        lastFingerDistance = 0;
        return;
      }

      let finger = results[0].index_finger_tip;

      // Match the camera coordinates to the canvas and mirror the x position.
      fingerX = width - map(finger.x, 0, video.elt.videoWidth, 0, width);
      fingerY = map(finger.y, 0, video.elt.videoHeight, 0, height);

      // Measure the finger position from the center of the glass.
      let x = fingerX - centerX;
      let y = fingerY - centerY;
      let fingerDistance = dist(x, y, 0, 0);

      // Skip stirring near the center or outside the glass.
      if (fingerDistance < 30 || fingerDistance > 175) {
        lastFingerDistance = 0;
        return;
      }

      if (lastFingerDistance > 0) {
        // Positive values turn clockwise, negative values turn counterclockwise.
        let turn = lastFingerX * y - lastFingerY * x;
        turn = turn / (lastFingerDistance * fingerDistance);

        stirSpeed = lerp(
          stirSpeed,
          constrain(turn, -0.2, 0.2),
          0.45
        );
      }

      lastFingerX = x;
      lastFingerY = y;
      lastFingerDistance = fingerDistance;
    }

    function draw() {
      background(41, 24, 28);
      translate(centerX, centerY);

      // Glass and shadow.
      noStroke();
      fill(27, 15, 19);
      ellipse(5, 13, 360, 344);

      fill(103, 56, 51);
      circle(0, 0, 328);

      fill(222, 170, 126);
      circle(0, 0, 314);

      fill(113, 43, 42);
      circle(0, 0, 300);

      // Layers of color in the drink.
      for (let i = 0; i < 15; i++) {
        fill(138 + i * 5, 42 + i * 6, 35 + i * 2);
        circle(0, 0, 288 - i * 17);
      }

      drinkAngle += stirSpeed;
      stirSpeed = lerp(stirSpeed, 0, 0.045);

      // The ice and lemon rotate together.
      push();
      rotate(drinkAngle);
      drawIce(-55, -43, -0.28);
      drawIce(58, -30, 0.42);
      drawIce(23, 67, -0.35);
      drawLemon(-72, 48);
      pop();

      // Highlights on the rim.
      noFill();
      stroke(255, 225, 178, 130);
      strokeWeight(2);
      arc(0, 0, 311, 311, PI + 0.13, PI + 1.45);
      arc(0, 0, 311, 311, 0.17, 0.88);

      // Show the tracked index fingertip as a small dot.
      if (handVisible) {
        noStroke();
        fill(255, 230, 169);
        circle(fingerX - centerX, fingerY - centerY, 10);
      }
    }

    function drawIce(x, y, angle) {
      push();
      translate(x, y);
      rotate(angle);
      rectMode(CENTER);

      noStroke();
      fill(255, 213, 149, 135);
      rect(0, 0, 65, 62, 12);

      fill(255, 240, 203, 100);
      rect(-4, -6, 49, 44, 8);

      stroke(255, 248, 219, 170);
      line(-21, 16, -21, -16);
      line(-21, -16, 12, -16);
      pop();
    }

    function drawLemon(x, y) {
      push();
      translate(x, y);
      rotate(-0.35);

      noStroke();
      fill(255, 195, 60);
      arc(0, 0, 81, 81, 0, PI, PIE);

      fill(255, 223, 128);
      arc(0, 0, 69, 69, 0, PI, PIE);

      stroke(255, 242, 180);
      strokeWeight(2);
      for (let angle = PI / 5; angle < PI; angle += PI / 5) {
        line(0, 0, cos(angle) * 33, sin(angle) * 33);
      }

      pop();
    }