const palette = ['#80A1BA', '#91C4C3', '#B4DEBD', '#FFF7DD'];
const ballNum = 20;
const balls = [];
const diameter = 100;
const speed = 5;

let gravity;
const restitution = 0.9;

let hoveredBall = null;
let grabbedBall = null;

let lastVx = 0;
let lastVy = 0;

const sampleNum = 10;
let mouseDeltas = [];

let wind;

function setup() {
  createCanvas(700, 800);
  for (let n = 0; n < ballNum; n++) {
    const randomDiameter = Math.random() * 150 + 50;
    const randomSpeed = Math.random() * 9 + 1;
    const randomPaletteIdx = Math.floor(Math.random() * palette.length);
    const randomColour = palette[randomPaletteIdx];
    balls.push(new Ball(randomDiameter, randomSpeed, randomColour));
  }

  gravity = createVector(0, 0.1);
  wind = createVector(0, 0);
}

function draw() {
  background(0);

  wind.set(0, 0);
  if (grabbedBall) {
    grabbedBall.drag(mouseX, mouseY);
    mouseDeltas.push(createVector(mouseX - pmouseX, mouseY - pmouseY));
    if (mouseDeltas.legnth > sampleNum) {
      mouseDeltas.shift();
    }
  } else if (mouseIsPressed) {
    // 바람 부는 거
    wind.set(mouseX, mouseY);
    wind.sub(width / 2, height / 2);
    const windMag = wind.mag();
    const normalizedWindMap = windMag / (0.5 * width);
    wind.setMag(1000 * normalizedWindMap);
  }

  balls.forEach((aBall, idx) => {
    aBall.applyForce(wind);
    aBall.applyGravity(gravity);
    aBall.update();
    for (let otherIdx = idx + 1; otherIdx < balls.length; otherIdx++) {
      const otherBalls = balls[otherIdx];
      aBall.resolveBallCollision(otherBalls);
    }
    aBall.resoveWallCollision();
  });

  if (!grabbedBall) {
    hoveredBall = null;
    for (let idx = balls.length - 1; idx >= 0; idx--) {
      const aBall = balls[idx];
      if (aBall.isMouseInside(mouseX, mouseY)) {
        hoveredBall = aBall;
        break;
      }
    }
  }

  balls.forEach((aBall) => {
    aBall.show(aBall === hoveredBall);
    aBall.showDebug();
  });

  // 바람의 움직임
  stroke('white');
  line(0.5 * width, 0.5 * height, 0.5 * width + wind.x, 0.5 * height + wind.y);
}

function mousePressed() {
  if (keyIsPressed && key === 'Shift') {
    balls.forEach((aBall) => {
      const randomSpeed = Math.random() * 9 + 1;
      aBall.init(mouseX, mouseY, randomSpeed);
    });
  } else {
    // null이 있으면 false 그 외엔 true
    if (hoveredBall) {
      grabbedBall = hoveredBall;
      grabbedBall.grab(mouseX, mouseY);
      mouseDeltas = [];
    }
  }
}

function mouseReleased() {
  if (grabbedBall) {
    // 어떤 값을 0으로 나누면 컴퓨터 터짐

    if (mouseDeltas.length > 0) {
      const averageMouseDelta = createVector(0, 0);
      mouseDeltas.forEach((aMousePos) => {
        averageMouseDelta.add(aMousePos);
      });
      averageMouseDelta.div(mouseDeltas.length);
      grabbedBall.ungrab(averageMouseDelta.x, averageMouseDelta.y);
      lastVx = averageMouseDelta.x;
      lastVy = averageMouseDelta.y;
    } else {
      grabbedBall.ungrab(0, 0);
      lastVx = 0;
      lastVy = 0;
    }
    grabbedBall = null;
  }
}
