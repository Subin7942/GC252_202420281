let aPos;
const diameter = 100;
const speed = 5;
let vel;
const gravity = 0.1;
const restitution = 0.9; // 반발계수

function setup() {
  createCanvas(700, 800);
  init();
}

function init() {
  aPos = createVector(width / 2, height / 2);
  console.log('pos:', aPos);
  console.log(aPos.x, aPos.y);
  const randomAngle = Math.random() * 360;
  vel = p5.Vector.fromAngle(radians(randomAngle), speed);
  console.log('vel:', vel);
  console.log(vel.x, vel.y);
}

function draw() {
  background(0);

  // 중력 적용 = 속도에 가속도(중력) 더하기
  vel.y += gravity;

  // 원 위치 업데이트
  aPos.add(vel);

  // 벽 충돌 체크
  if (aPos.x < diameter / 2 || aPos.x > width - diameter / 2) {
    aPos.x = aPos.x < diameter / 2 ? diameter / 2 : width - diameter / 2;
    vel.x *= -restitution;
  }
  if (aPos.y < diameter / 2 || aPos.y > height - diameter / 2) {
    aPos.y = aPos.y < diameter / 2 ? diameter / 2 : height - diameter / 2;
    vel.y *= -restitution;
  }

  // 원 그리기
  noStroke();
  fill('skyblue');
  circle(aPos.x, aPos.y, diameter);

  // vel 표현 (원 위치 기준)
  stroke('white');
  line(aPos.x, aPos.y, aPos.x + vel.x * 10, aPos.y + vel.y * 10);
  stroke('red');
  line(aPos.x, aPos.y, aPos.x + vel.x * 10, aPos.y);
  stroke('green');
  line(aPos.x, aPos.y, aPos.x, aPos.y + vel.y * 10);
}

function mousePressed() {
  init();
}
