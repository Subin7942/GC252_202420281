const canvas = document.querySelector('.canvas-container');
let num1, num2, num3, num4, num5, num6, num7, num8, num9, num10, num11, num12;
let fontR, fontB;
let princess, princess_saying;
let pTime = 0;
let pTimeMax = 0;
let lace, scarf;
let clockCW, clockCH;
let clockImg;
let sHand, mHand, hHand;
let cloud;

let ps = [];

function preload() {
  cloud = loadImage('./assets/clockCloud.png');
  sHand = loadImage('./assets/s-8.png');
  mHand = loadImage('./assets/m-8.png');
  hHand = loadImage('./assets/h-8.png');
  clockImg = loadImage('./assets/clock-8.png');
  scarf = loadImage('./assets/rect-8.png');
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
  const renderer = createCanvas(1680, 930);
  renderer.parent(canvas);

  clockCW = width / 2 - 330;
  clockCH = height / 2;

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

  imageMode(CENTER);
  colorMode(HSB);
  rectMode(CENTER);
  ellipseMode(CENTER);
}

function draw() {
  background('#f6bfddff');
  let s = second();
  console.log(s);

  clock();
  showTime();
  clockNumber();
  schedule();
  princessImage();

  // 위아래 장식 레이스
  image(lace, width / 2, height / 2, width, height);
  push();
  translate(width / 2, height / 2);
  rotate(radians(180));
  image(lace, 0, 0, width, height);
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
    image(princess, 400, height / 2 + 210, 500, 500);
    image(princess_saying, 150, height / 2, 300, 150);
    pTime--;
  }
}

function schedule() {
  let s = second();
  let m = minute();
  let h = hour();
  let textW = width / 2 + 200;
  let textW2 = width / 2 + 200;
  let timeTextH = height / 2 - 180;
  let textMH = height / 2 + 10;
  let textBH = height / 2 + 110;
  let textSH1 = height / 2 + 160;
  let textSH2 = height / 2 + 160 + 30;

  // 배경 스카프
  push();
  noStroke();
  fill('#ffffff');
  image(scarf, width / 2 + 430, height / 2, 670, 800);
  pop();

  noStroke();
  fill('#ffffff');
  textFont(fontB);
  textSize(45);
  fill('#ea7eb9ff');
  text('시간이 벌써 ' + (h % 12) + '시 ' + m + '분!!', textW, timeTextH);
  textSize(32);
  text('공주님이 지금 해야할 일은?', textW, textMH);
  textSize(45);
  if (7 === h) {
    text('일어나서 몸단장하기', textW, textBH);
    textSize(20);
    text('공주님은 일찍 일어나서 깔끔한 모습을 유지해야해요.', textW2, textSH1);
    text('피곤한 몸을 이끌고 화장실로 가보아요.', textW2, textSH2);
  } else if (8 === h) {
    text('"아침 식사하고 산책하기"', textW, textBH);
    textSize(20);
    text('공주님은 아침 식사를 하며 건강한 하루를 시작해요.', textW2, textSH1);
    text('토스트나 샐러드를 먹고', textW2, textSH2);
    text('상쾌한 아침 산책을 떠나요!', textW2, textSH2 + 30);
  } else if (9 === h) {
    text('"책 읽으며 마음의 양식 쌓기"', textW - 40, textBH);
    textSize(20);
    text(
      '공주님은 책을 통해 세상의 다양한 이야기를 접한답니다.',
      textW2,
      textSH1
    );
    text('책을 읽으며 마음 속에 지혜와 용기를 키워가요!', textW2, textSH2);
  } else if (10 === h) {
    text('"자수 놓기"', textW, textBH);
    textSize(20);
    text('공주님은 손재주도 좋아요.', textW2, textSH1);
    text('아리따운 자수로 감각과 심미안을 길러봐요.', textW2, textSH2);
    text('공주님의 작품은 모두가 좋아해요.', textW2, textSH2 + 30);
  } else if (11 === h) {
    text('"예쁜 목소리로 노래하기"', textW, textBH);
    textSize(20);
    text('공주님은 노래로 세상과 소통해요.', textW2, textSH1);
    text('노래를 부르며 다양한 감정을 노래해봐요.', textW2, textSH2);
  } else if (12 === h) {
    text('"건강한 음식으로 식사하기"', textW - 30, textBH);
    textSize(20);
    text('공주님의 아리따운 외모는 좋은 음식에서 온답니다.', textW2, textSH1);
    text('허구한날 마라탕과 치킨만 먹지 말고', textW2, textSH2);
    text('영양가 있는 식사를 해요!', textW2, textSH2 + 30);
  } else if (13 === h) {
    text('"산책하며 동물들과 인사하기"', textW - 50, textBH);
    textSize(20);
    text('공주님은 동물들과도 친하게 지낸답니다.', textW2, textSH1);
    text('얼른 밖에 나가 숲속 친구들에게 인사해요!', textW2, textSH2);
  } else if (14 === h) {
    text('"열씨미 공부하기"', textW, textBH);
    textSize(20);
    text('공주님은 공부를 열심히 해서 매우 지혜로워요.', textW2, textSH1);
    text('아리따운 외모뿐만 아니라 지성또한 공주의 미덕이죠.', textW2, textSH2);
  } else if (15 === h) {
    text('"귀부인들과 티타임 가지기"', textW - 30, textBH);
    textSize(20);
    text(
      '공주님은 귀족들과 담소를 나누며 세상에 대해 알아가요.',
      textW2,
      textSH1
    );
    text('귀부인들은 공주님의 스승처럼 고마우신 분들이죠.', textW2, textSH2);
  } else if (16 === h) {
    text('"마을 탐방하기"', textW, textBH);
    textSize(20);
    text('공주님은 사람들 몰래 마을을 탐방해요.', textW2, textSH1);
    text('아리따운 외모 탓에 사람들은 쉽게 알아챘지만', textW2, textSH2);
    text('귀여운 공주님을 위해 모른 척 해주죠.', textW2, textSH2 + 30);
  } else if (17 === h) {
    text('"꽃에 물 주기"', textW, textBH);
    textSize(20);
    text('공주님은 꽃을 좋아해요.', textW2, textSH1);
    text('꽃을 보면 마음이 편안해진답니다.', textW2, textSH2);
  } else if (18 === h) {
    text('"부모님과 저녁식사하기"', textW, textBH);
    textSize(20);
    text('공주님은 부모님과도 사이가 아주 좋아요.', textW2, textSH1);
    text('사랑하는 부모님과 함께 저녁식사를 하는 것은', textW2, textSH2);
    text('매우 즐겁죠.', textW2, textSH2 + 30);
  } else if (19 === h) {
    text('"운동으로 건강 유지하기"', textW, textBH);
    textSize(20);
    text('공주님은 건강한 신체를 유지하기 위해 운동을 해요.', textW2, textSH1);
    text('아리따운 몸매를 유지하기 위해', textW2, textSH2);
    text('스트레칭과 요가를 해봐요!', textW2, textSH2 + 30);
  } else if (h === 20) {
    text('"깨끗이 씻고 하루를 마무리"', textW - 30, textBH);
    textSize(20);
    text('공주님은 오늘 보람찬 하루를 보냈어요.', textW2, textSH1);
    text('몸을 깨끗이 하고 일기를 쓰며 하루를 정리해봐요', textW2, textSH2);
  } else if (21 <= h || h <= 6) {
    text('"잠자기"', textW, textBH);
    textSize(20);
    text('공주님의 좋은 피부는 깊은 잠에서 온답니다.', textW2, textSH1);
    text('오늘 하루는 어땠나요?', textW2, textSH2);
    text('푹 자고 내일도 아리따운 하루를 보내요!', textW2, textSH2 + 30);
  }
}

function clockNumber() {
  push();
  translate(clockCW, clockCH);
  rotate(radians(30));
  image(num1, 0, -250, 40, 80);
  pop();
  push();
  translate(clockCW, clockCH);
  rotate(radians(60));
  image(num2, 0, -250, 40, 80);
  pop();
  push();
  translate(clockCW, clockCH);
  rotate(radians(90));
  image(num3, 0, -250, 40, 80);
  pop();
  push();
  translate(clockCW, clockCH);
  rotate(radians(120));
  image(num4, 0, -250, 40, 80);
  pop();
  push();
  translate(clockCW, clockCH);
  rotate(radians(150));
  image(num5, 0, -250, 40, 80);
  pop();
  push();
  translate(clockCW, clockCH);
  rotate(radians(180));
  image(num6, 0, -250, 40, 80);
  pop();
  push();
  translate(clockCW, clockCH);
  rotate(radians(210));
  image(num7, 0, -250, 40, 80);
  pop();
  push();
  translate(clockCW, clockCH);
  rotate(radians(240));
  image(num8, 0, -250, 40, 80);
  pop();
  push();
  translate(clockCW, clockCH);
  rotate(radians(270));
  image(num9, 0, -250, 40, 80);
  pop();
  push();
  translate(clockCW, clockCH);
  rotate(radians(300));
  image(num10, 0, -250, 40, 80);
  pop();
  push();
  translate(clockCW, clockCH);
  rotate(radians(330));
  image(num11, 0, -250, 40, 80);
  pop();
  push();
  translate(clockCW, clockCH);
  rotate(radians(360));
  image(num12, 0, -250, 40, 80);
  pop();
}

function clock() {
  let s = second();
  let h = hour();

  image(clockImg, clockCW, clockCH, 900, 900);

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
  circle(clockCW, clockCH, 600);
  image(cloud, clockCW, clockCH, 600, 600);

  stroke('#ffffff');
  noFill();
  strokeWeight(0.5);
  circle(clockCW, clockCH, 400);
  circle(clockCW, clockCH, 390);
  circle(clockCW, clockCH, 580);
  circle(clockCW, clockCH, 430);
  circle(clockCW, clockCH, 230);
  circle(clockCW, clockCH, 225);
}

function showTime() {
  let s = second();
  let m = minute();
  let h = hour();

  let sDegree = map(s, 0, 60, 0, 360);
  let mDegree = map(m, 0, 60, 0, 360);
  let hDegree = map(h % 12, 0, 12, 0, 360);
  push();
  noStroke();
  fill('#ffffff');
  circle(clockCW, clockCH, 8);
  noFill();
  stroke('#ffffff');
  strokeWeight(1);
  circle(clockCW, clockCH, 12);
  pop();

  // 초침
  push();
  strokeWeight(2);
  translate(clockCW, clockCH);
  rotate(radians(sDegree));
  stroke('#ffffff');
  image(sHand, 0, -135, 40, 270);
  pop();
  // 분침
  push();
  strokeWeight(2);
  translate(clockCW, clockCH);
  rotate(radians(mDegree));
  stroke('#ffffff');
  image(mHand, 0, -100, 40, 200);
  pop();
  // 시침
  push();
  strokeWeight(2);
  translate(clockCW, clockCH);
  rotate(radians(hDegree));
  stroke('#ffffff');
  image(hHand, 0, -70, 40, 140);
  pop();
}

function dawn() {
  fill('#267c7cff');
}
function morning() {
  fill('#bed9ffff');
}
function midday() {
  fill('#67cfffff');
}
function evening() {
  fill('#E69AEB');
}
function night() {
  fill('#442e82ff');
}
