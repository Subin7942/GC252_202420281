class Ball {
  posX = 0;
  posY = 0;
  diameter = 100;
  speed = 5;
  velX = 1;
  velY = 1;
  colour = 0;
  constructor(x, y, diameter, speed, colour) {
    this.posX = x;
    this.posY = y;
    this.diameter = diameter;
    this.speed = speed;
    this.colour = colour;
    this.resetVelocity();
  }

  update() {
    this.posX += this.velX;
    this.posY += this.velY;
  }

  resolveWallCollision() {
    if (this.posX > width - this.diameter * 0.5) {
      this.velX *= -1;
    } else if (this.posX < this.diameter * 0.5) {
      this.velX *= -1;
    }
    if (this.posY > height - this.diameter * 0.5) {
      this.velY *= -1;
    } else if (this.posY < this.diameter * 0.5) {
      this.velY *= -1;
    }
  }

  show() {
    if (this.isHovered()) {
      fill(this.colour);
      noStroke();
    } else {
      stroke(this.colour);
      noFill();
    }

    circle(this.posX, this.posY, this.diameter);
  }

  reset(x, y) {
    this.posX = x;
    this.posY = y;
    this.resetVelocity();
  }

  resetVelocity() {
    let randomAngle = random(360);
    this.velX = cos(radians(randomAngle)) * this.speed;
    this.velY = sin(radians(randomAngle)) * this.speed;
  }

  isHovered() {
    let dX = this.posX - mouseX;
    let dY = this.posY - mouseY;
    let dist = sqrt(dX * dX + dY * dY);
    return dist < this.diameter * 0.5;
    // *는 일반 곱하기 지만 **는 제곱이다
  }
}
