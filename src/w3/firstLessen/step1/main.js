let aBall;
let pallete = ['#FF0066', '#6A0066', '#934790', '#E8D4B7'];
let balls = [];

function setup() {
  createCanvas(600, 400);

  balls.push(new Ball(width / 2, height / 2, 100, 7, pallete[0]));
  balls.push(new Ball(width / 2, height / 2, 50, 10, pallete[1]));
  balls.push(new Ball(width / 2, height / 2, 200, 3, pallete[2]));
  balls.push(new Ball(width / 2, height / 2, 150, 2, pallete[3]));
}

function draw() {
  background(255);

  // for (idx = 0; idx < balls.length; idx++) {
  //   balls[idx].update();
  //   balls[idx].resolveWallCollision();
  //   balls[idx].show();
  // }

  // for(let aBall of balls) {
  //   aBall.update();
  //   aBall.resolveWallCollision();
  //   aBall.show();
  // }

  balls.forEach((aBall) => {
    aBall.update();
    aBall.resolveWallCollision();
    aBall.show();
  });

  fill('black');
  noStroke();
  circle(mouseX, mouseY, 50);
}

function mousePressed() {
  // createBall();
  for (let idx = balls.length - 1; idx >= 0; idx--) {
    if (balls[idx].isHovered()) {
      balls.splice(idx, 1);
    }
  }
}

function createBall() {
  // balls.forEach((aBall) => {
  //   aBall.reset(mouseX, mouseY);
  // });
  let dist = [mouseX, width - mouseX, mouseY, height - mouseY];
  let minDist = min(dist);
  let randomDiameter = random(2 * minDist);
  if (randomDiameter > 100) {
    randomDiameter = 100;
  }
  let randomSpeed = random(3, 10);
  balls.push(
    new Ball(
      mouseX,
      mouseY,
      randomDiameter,
      randomSpeed,
      pallete[balls.length % pallete.length]
    )
  );
}
