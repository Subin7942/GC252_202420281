const balls = [];
const diameter = 50;
const speed = 5;
const gravity = 0.8;
const restitution = 0.7;
const w = 800;
const h = 600;
let ballMake = false;

const colours = ['#BF1A1A', '#FF6C0C', '#FFE08F', '#060771'];

const canvas = document.querySelector('.canvas-container');

function setup() {
  const renderer = createCanvas(w, h);
  renderer.parent(canvas);
}

function draw() {
  background('#969696ff');
  const mi = millis() / 1000;
  const s = second();
  const m = minute();

  balls.forEach((aBall) => {
    aBall.applyGravity();
    aBall.update();
    aBall.resolveWallCollision();
    aBall.show();
  });

  if (s % 1 === 0) {
    ballMake = true;
  } else {
    ballMake = false;
  }

  if (ballMake && frameCount % 60 === 0) {
    const randomColourIdx = Math.floor(random() * colours.length);
    const randomColour = colours[randomColourIdx];
    balls.push(new Ball(w, h, randomColour));
  }

  console.log(balls.length);

  push();
  fill('black');
  textSize(30);
  text(frameCount, width * 0.5, height * 0.5);
  text(s + '초', width * 0.6, height * 0.1);
  text(m + '분', width * 0.4, height * 0.1);
  text(mi, 0, height * 0.1);
  pop();

  // 1분씩 공 초기화
  if (s === 0) {
    balls.splice(Ball, balls.length);
  }
}
