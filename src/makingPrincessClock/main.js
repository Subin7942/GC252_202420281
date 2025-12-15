const canvas = document.querySelector('.canvas-container');

function setup() {
  const renderer = createCanvas(windowWidth, windowHeight);
  renderer.parent(canvas);

  colorMode(HSB);
  rectMode(CENTER);
}

function draw() {
  background('#f6bfddff');

  clock();
  showTime();
  mouseCursor();
}

function mouseCursor() {
  push();
  if (mouseIsPressed) {
    noFill();
    stroke('#ffffff');
  } else {
    fill('#ffffff');
    noStroke();
  }
  nPointedStar(mouseX, mouseY, 5, 20, 10, 0);
  pop();
}

function clock() {
  let s = second();

  // 시계 위 아래
  noStroke();
  fill('#ea7eb9ff');
  circle(width * 0.5, height / 5 + 50, 400);
  circle(width * 0.5, height / 2 + 180, 500);

  // 시계 테두리
  fill('#ea7eb9ff');
  stroke('#f6bfddff');
  circle(width * 0.5, height / 2, 750);
  push();
  stroke('#f6bfddff');
  strokeWeight(3);
  circle(width * 0.5, height / 2, 630);
  noFill();
  strokeWeight(1);
  circle(width * 0.5, height / 2, 730);
  pop();
  noStroke();
  fill('#ea7eb9ff');
  circle(width * 0.5, height / 2, 620);

  // 시계 배경
  if (s < 12) {
    dawn();
  } else if (s < 24) {
    morning();
  } else if (s < 36) {
    midday();
  } else if (s < 48) {
    evening();
  } else {
    night();
  }
  strokeWeight(3);
  stroke('#c44abbff');
  circle(width * 0.5, height / 2, 600);
}

function showTime() {
  let s = second();
  let m = minute();
  let h = hour();

  sDegree = map(s, 0, 60, 0, 360);
  mDegree = map(m, 0, 60, 0, 360);
  hDegree = map(h % 12, 0, 12, 0, 360);

  // 초침
  push();
  strokeWeight(2);
  translate(width / 2, height / 2);
  rotate(radians(sDegree));
  stroke('#ffffff');
  line(0, 0, 250, 0);
  pop();
  // 분침
  push();
  strokeWeight(2);
  translate(width / 2, height / 2);
  rotate(radians(mDegree));
  stroke('#ffffff');
  line(0, 0, 250, 0);
  pop();
  // 시침
  push();
  strokeWeight(2);
  translate(width / 2, height / 2);
  rotate(radians(hDegree));
  stroke('#ffffff');
  line(0, 0, 250, 0);
  pop();
}

function dawn() {
  fill('#B59AEB');
}
function morning() {
  fill('#C8E5F2');
}
function midday() {
  fill('#9AD9EB');
}
function evening() {
  fill('#E69AEB');
}
function night() {
  fill('#8D85E6');
}

// 출처
// https://www.youtube.com/watch?v=rSp5iSTXwAY&list=PL5BF31moSKc7vutVzQe_GRRcayM7_2aZA
function nPointedStar(x, y, n, outerRadius, innerRadius, rotation) {
  push();
  let theta = TAU / n;
  beginShape();

  for (let i = 0; i < n; i++) {
    vertex(
      x + cos(i * theta + rotation) * outerRadius,
      y + sin(i * theta + rotation) * outerRadius
    );
    vertex(
      x + cos((i + 0.5) * theta + rotation) * innerRadius,
      y + sin((i + 0.5) * theta + rotation) * innerRadius
    );
  }

  endShape(CLOSE);
  pop();
}
