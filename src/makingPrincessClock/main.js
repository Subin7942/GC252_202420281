const canvas = document.querySelector('.canvas-container');
let num1, num2, num3, num4, num5, num6, num7, num8, num9, num10, num11, num12;
let fontR, fontB;

let ps = [];

function preload() {
  num1 = loadImage('./romanNumber/1x/1-8.png');
  num2 = loadImage('./romanNumber/1x/2-8.png');
  num3 = loadImage('./romanNumber/1x/3-8.png');
  num4 = loadImage('./romanNumber/1x/4-8.png');
  num5 = loadImage('./romanNumber/1x/5-8.png');
  num6 = loadImage('./romanNumber/1x/6-8.png');
  num7 = loadImage('./romanNumber/1x/7-8.png');
  num8 = loadImage('./romanNumber/1x/8-8.png');
  num9 = loadImage('./romanNumber/1x/9-8.png');
  num10 = loadImage('./romanNumber/1x/10-8.png');
  num11 = loadImage('./romanNumber/1x/11-8.png');
  num12 = loadImage('./romanNumber/1x/12-8.png');
  fontR = loadFont('./assets/Eulyoo1945-Regular.otf');
  fontB = loadFont('./assets/Eulyoo1945-SemiBold.otf');
}

function setup() {
  const renderer = createCanvas(windowWidth, windowHeight);
  renderer.parent(canvas);

  for (let n = 0; n < 1500; n++) {
    ps.push(
      new Particle(
        random(width),
        random(height),
        5,
        0.5,
        '#ffffff',
        random(0.001, 0.1)
      )
    );
  }

  colorMode(HSB);
  rectMode(CENTER);
}

function draw() {
  background('#f6bfddff');

  clock();
  showTime();
  mouseCursor();
  clockNumber();
  timer();

  ps.forEach((aParticle) => {
    aParticle.draw();
    aParticle.applyGravity(0, 0.001);
    aParticle.update();
    aParticle.reset();
  });
}

function timer() {
  let s = 0;
  let m = 0;
  let h = 0;
  noStroke();
  fill('#000000ff');
  rect(width / 8 + 10, height / 2, 400, 800);
  fill('#ffffff');
  textFont(fontB);
  textSize(32);
  text('공주가 해야할 일!!', width / 8 - 180, height / 8);
  textFont(fontR);
  textSize(24);
  text('- 잠 많이 자기(미녀는 잠꾸러깅><)', width / 8 - 180, height / 8 + 80);
  text('- 공부 많이 하기(똑똑이 짱 멋쪄..)', width / 8 - 180, height / 8 + 120);
  text('- 아리따운 마음씨 가지기(필쑤!!!)', width / 8 - 180, height / 8 + 160);

  text(
    '타이머: ' + h + ':' + m + ':' + s,
    width / 8 - 180,
    height / 8 + 160 + 80
  );

  if (mouseIsPressed) {
    // 초, 분, 시 계산
    if (frameRate === 60) {
      s++;
      if (s === 60) {
        s = 0;
      }
    }
    if (s === 0) {
      m++;
      if (m === 60) {
        m = 0;
      }
    }
    if (m === 0) {
      h++;
    }
  }
}

function clockNumber() {
  push();
  translate(width / 2, height / 2);
  rotate(radians(30));
  image(num1, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2, height / 2);
  rotate(radians(60));
  image(num2, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2, height / 2);
  rotate(radians(90));
  image(num3, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2, height / 2);
  rotate(radians(120));
  image(num4, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2, height / 2);
  rotate(radians(150));
  image(num5, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2, height / 2);
  rotate(radians(180));
  image(num6, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2, height / 2);
  rotate(radians(210));
  image(num7, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2, height / 2);
  rotate(radians(240));
  image(num8, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2, height / 2);
  rotate(radians(270));
  image(num9, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2, height / 2);
  rotate(radians(300));
  image(num10, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2, height / 2);
  rotate(radians(330));
  image(num11, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2, height / 2);
  rotate(radians(360));
  image(num12, -20, -300, 40, 80);
  pop();
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
  let h = hour();

  // 시계 장식
  noFill();
  stroke('#ea7eb9ff');
  // 위쪽
  push();
  strokeWeight(2);
  circle(width * 0.5 - 130, height / 5 + 40, 270);
  circle(width * 0.5 + 130, height / 5 + 40, 270);
  pop();
  strokeWeight(3);
  circle(width * 0.5, height / 5 + 110, 500);
  circle(width * 0.5, height / 5 + 100, 500);
  circle(width * 0.5, height / 5 + 10, 270);
  // 아래쪽
  strokeWeight(3);
  push();
  strokeWeight(2);
  circle(width * 0.5 - 130, height / 2 + 250, 270);
  circle(width * 0.5 + 130, height / 2 + 250, 270);
  pop();
  circle(width * 0.5, height / 2 + 180, 500);
  circle(width * 0.5, height / 2 + 170, 500);
  circle(width * 0.5, height / 2 + 270, 270);
  ellipse(width * 0.5, height / 2, 90, 900);
  push();
  strokeWeight(2);

  pop();
  push();
  translate(width * 0.5, height * 0.5);
  rotate(radians(10));
  ellipse(0, 0, 50, 800);
  rotate(radians(-20));
  ellipse(0, 0, 50, 800);
  pop();
  // 왼
  circle(width * 0.5 - 110, height / 2, 600);
  // 오
  circle(width * 0.5 + 110, height / 2, 600);

  // 시계 테두리
  fill('#ea7eb9ff');
  noStroke();
  circle(width * 0.5, height / 2, 750);
  push();
  stroke('#f6bfddff');
  strokeWeight(3);
  circle(width * 0.5, height / 2, 630);
  noFill();
  strokeWeight(1);
  circle(width * 0.5, height / 2, 730);
  pop();

  // 시계 배경
  if (4 < h && h < 7) {
    dawn();
  } else if (7 <= h && h < 11) {
    morning();
  } else if (11 <= h && h < 17) {
    midday();
  } else if (17 <= h && h < 20) {
    evening();
  } else {
    night();
  }
  strokeWeight(3);
  stroke('#d263a8ff');
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
  rotate(radians(mDegree - 90));
  stroke('#ffffff');
  line(0, 0, 150, 0);
  pop();
  // 시침
  push();
  strokeWeight(2);
  translate(width / 2, height / 2);
  rotate(radians(hDegree - 90));
  stroke('#ffffff');
  line(0, 0, 60, 0);
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
