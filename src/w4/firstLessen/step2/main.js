let pos;
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
  pos = createVector(width / 2, height / 2);
  console.log('pos:', pos);
  console.log(pos.x, pos.y);
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
  pos.add(vel);

  // 벽 충돌 체크
  if (pos.x < diameter / 2 || pos.x > width - diameter / 2) {
    pos.x = pos.x < diameter / 2 ? diameter / 2 : width - diameter / 2;
    vel.x *= -restitution;
  }
  if (pos.y < diameter / 2 || pos.y > height - diameter / 2) {
    pos.y = pos.y < diameter / 2 ? diameter / 2 : height - diameter / 2;
    vel.y *= -restitution;
  }

  // 원 그리기
  noStroke();
  fill('skyblue');
  circle(pos.x, pos.y, diameter);

  // vel 표현 (원 위치 기준)
  stroke('white');
  line(pos.x, pos.y, pos.x + vel.x * 10, pos.y + vel.y * 10);
  stroke('red');
  line(pos.x, pos.y, pos.x + vel.x * 10, pos.y);
  stroke('green');
  line(pos.x, pos.y, pos.x, pos.y + vel.y * 10);
}

function mousePressed() {
  init();
}
