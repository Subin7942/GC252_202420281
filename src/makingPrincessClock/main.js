const canvas = document.querySelector('.canvas-container');
let num1, num2, num3, num4, num5, num6, num7, num8, num9, num10, num11, num12;
let fontR, fontB;
let princess, princess_saying;
let pTime = 0;
let pTimeMax = 0;
let lace;

let ps = [];

function preload() {
  princess = loadImage('./assets/princess-8.png');
  princess_saying = loadImage('./assets/princess_saying-8.png');
  lace = loadImage('./assets/lace-8.png');
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
  let s = second();
  console.log(s);

  clock();
  showTime();
  clockNumber();
  push();
  noStroke();
  fill('#ffffff');
  rect(width / 2 + 450, height / 2, 600, 700);
  pop();
  schedule();

  princessImage();
  image(lace, 0, 0, width, height);
  push();
  translate(width / 2, height / 2);
  rotate(radians(180));
  image(lace, -width / 2, -height / 2, width, height);
  pop();

  ps.forEach((aParticle) => {
    aParticle.draw();
    aParticle.applyGravity(0, 0.001);
    aParticle.update();
    aParticle.reset();
  });
}

function princessImage() {
  let s = second();
  pTimeMax = 10;
  if (s % 10 === 0) {
    pTime = pTimeMax;
  }
  if (pTime > 0) {
    image(princess, width / 2 - 700, height / 2, 500, 500);
    image(princess_saying, width / 2 - 830, height / 2, 300, 150);
    pTime--;
  }
}

function schedule() {
  let s = second();
  let m = minute();
  let h = hour();

  noStroke();
  fill('#ffffff');
  textFont(fontB);
  textSize(45);
  fill('#ea7eb9ff');
  text(
    '시간이 벌써 ' + (h % 12) + '시 ' + m + '분!!',
    width / 2 + 180,
    height / 2 - 250 + 50
  );
  textSize(32);
  text('공주님이 지금 해야할 일은?', width / 2 + 180, height / 2 + 20);
  textSize(45);
  if (7 === h) {
    text('일어나서 세안하기', width / 2 + 180, height / 2 + 100 + 20);
    textSize(20);
    text(
      '공주님은 일찍 일어나서 깨끗히 몸단장을 해야해요.',
      width / 2 + 180,
      height / 2 + 50 + 100 + 20
    );
    text(
      '피곤한 몸을 이끌고 화장실로 가보아요.',
      width / 2 + 180,
      height / 2 + 80 + 100 + 20
    );
  } else if (8 === h) {
    text('"아침 식사하고 산책하기"', width / 2 + 180, height / 2 + 100 + 20);
    textSize(20);
    text(
      '공주님은 아침 식사를 하며 건강한 하루를 시작해요.',
      width / 2 + 180,
      height / 2 + 50 + 100 + 20
    );
    text(
      '토스트나 샐러드를 먹고 상쾌한 아침 산책을 떠나요!',
      width / 2 + 180,
      height / 2 + 80 + 100 + 20
    );
  } else if (9 <= h && h <= 11) {
    text(
      '"책 읽으며 마음의 양식 쌓기"',
      width / 2 + 180,
      height / 2 + 100 + 20
    );
    textSize(20);
    text(
      '공주님은 책을 통해 세상의 다양한 이야기를 접한답니다.',
      width / 2 + 180,
      height / 2 + 50 + 100 + 20
    );
    text(
      '책을 읽으며 마음 속에 지혜와 용기를 키워가요!',
      width / 2 + 180,
      height / 2 + 80 + 100 + 20
    );
  } else if (12 === h) {
    text('"건강한 음식으로 식사하기"', width / 2 + 180, height / 2 + 100 + 20);
    textSize(20);
    text(
      '공주님의 아리따운 외모는 건강한 음식에서 비롯된답니다.',
      width / 2 + 180,
      height / 2 + 50 + 100 + 20
    );
    text(
      '허구한날 마라탕과 치킨만 먹지 말고 영양가 있는 식사를 해요!',
      width / 2 + 180,
      height / 2 + 80 + 100 + 20
    );
  } else if (13 === h) {
    text('"산책하며 동물들과 인사하기"', width / 2 + 180, height / 2 + 100);
    textSize(20);
    text(
      '공주님은 동물들과도 친하게 지낸답니다.',
      width / 2 + 180,
      height / 2 + 50 + 100 + 20
    );
    text(
      '얼른 밖에 나가 숲속 친구들에게 인사해요!',
      width / 2 + 180,
      height / 2 + 80 + 100 + 20
    );
  } else if (14 <= h && h <= 17) {
    text('"열씨미 공부하기"', width / 2 + 180, height / 2 + 100 + 20);
    textSize(20);
    text(
      '공주님은 공부를 열심히 해서 매우 지혜로워요.',
      width / 2 + 180,
      height / 2 + 50 + 100 + 20
    );
    text(
      '아리따운 외모뿐만 아니라 지성또한 공주의 미덕이죠.',
      width / 2 + 180,
      height / 2 + 80 + 100 + 20
    );
  } else if (18 === h) {
    text('"부모님과 저녁식사하기"', width / 2 + 180, height / 2 + 100 + 20);
    textSize(20);
    text(
      '공주님은 부모님과도 사이가 아주 좋아요.',
      width / 2 + 180,
      height / 2 + 50 + 100 + 20
    );
    text(
      '사랑하는 부모님과 함께 저녁식사를 하는 것은 매우 즐겁죠',
      width / 2 + 180,
      height / 2 + 80 + 100 + 20
    );
  } else if (19 <= h && h <= 20) {
    text('"운동으로 건강 유지하기"', width / 2 + 180, height / 2 + 100 + 20);
    textSize(20);
    text(
      '공주님은 건강한 신체를 유지하기 위해 운동을 해요.',
      width / 2 + 180,
      height / 2 + 50 + 100 + 20
    );
    text(
      '아리따운 몸매를 유지하기 위해 스트레칭과 요가를 해봐요!',
      width / 2 + 180,
      height / 2 + 80 + 100 + 20
    );
  } else if (21 <= h || h <= 6) {
    text('"잠자기"', width / 2 + 180, height / 2 + 100 + 20);
    textSize(20);
    text(
      '공주님의 좋은 피부는 깊은 잠에서 온답니다.',
      width / 2 + 180,
      height / 2 + 50 + 100 + 20
    );
    text(
      '오늘 하루는 어땠나요? 푹 자고 내일도 아리따운 하루를 보내요!',
      width / 2 + 180,
      height / 2 + 80 + 100 + 20
    );
  }
}

function clockNumber() {
  push();
  translate(width / 2 - 300, height / 2);
  rotate(radians(30));
  image(num1, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2 - 300, height / 2);
  rotate(radians(60));
  image(num2, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2 - 300, height / 2);
  rotate(radians(90));
  image(num3, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2 - 300, height / 2);
  rotate(radians(120));
  image(num4, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2 - 300, height / 2);
  rotate(radians(150));
  image(num5, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2 - 300, height / 2);
  rotate(radians(180));
  image(num6, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2 - 300, height / 2);
  rotate(radians(210));
  image(num7, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2 - 300, height / 2);
  rotate(radians(240));
  image(num8, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2 - 300, height / 2);
  rotate(radians(270));
  image(num9, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2 - 300, height / 2);
  rotate(radians(300));
  image(num10, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2 - 300, height / 2);
  rotate(radians(330));
  image(num11, -20, -300, 40, 80);
  pop();
  push();
  translate(width / 2 - 300, height / 2);
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
  circle(width * 0.5 - 300 - 130, height / 5 + 40, 270);
  circle(width * 0.5 - 300 + 130, height / 5 + 40, 270);
  pop();
  strokeWeight(3);
  circle(width * 0.5 - 300, height / 5 + 110, 500);
  circle(width * 0.5 - 300, height / 5 + 100, 500);
  circle(width * 0.5 - 300, height / 5 + 10, 270);
  // 아래쪽
  strokeWeight(3);
  push();
  strokeWeight(2);
  circle(width * 0.5 - 300 - 130, height / 2 + 250, 270);
  circle(width * 0.5 - 300 + 130, height / 2 + 250, 270);
  pop();
  circle(width * 0.5 - 300, height / 2 + 180, 500);
  circle(width * 0.5 - 300, height / 2 + 170, 500);
  circle(width * 0.5 - 300, height / 2 + 270, 270);
  ellipse(width * 0.5 - 300, height / 2, 90, 900);
  push();
  strokeWeight(2);

  pop();
  push();
  translate(width * 0.5 - 300, height * 0.5);
  rotate(radians(10));
  ellipse(0, 0, 50, 800);
  rotate(radians(-20));
  ellipse(0, 0, 50, 800);
  pop();
  // 왼
  circle(width * 0.5 - 300 - 110, height / 2, 600);
  // 오
  circle(width * 0.5 - 300 + 110, height / 2, 600);

  // 시계 테두리
  fill('#ea7eb9ff');
  noStroke();
  circle(width * 0.5 - 300, height / 2, 750);
  push();
  stroke('#f6bfddff');
  strokeWeight(3);
  circle(width * 0.5 - 300, height / 2, 630);
  noFill();
  strokeWeight(1);
  circle(width * 0.5 - 300, height / 2, 730);
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
  circle(width * 0.5 - 300, height / 2, 600);
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
  translate(width / 2 - 300, height / 2);
  rotate(radians(sDegree - 90));
  stroke('#ffffff');
  line(0, 0, 250, 0);
  pop();
  // 분침
  push();
  strokeWeight(2);
  translate(width / 2 - 300, height / 2);
  rotate(radians(mDegree - 90));
  stroke('#ffffff');
  line(0, 0, 150, 0);
  pop();
  // 시침
  push();
  strokeWeight(2);
  translate(width / 2 - 300, height / 2);
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
