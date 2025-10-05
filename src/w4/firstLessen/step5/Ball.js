class Ball {
  pos;
  vel;
  diameter;
  colour;
  isMouseInside;
  constructor(diameter, speed, colour) {
    this.pos = createVector(width / 2, height / 2);
    this.vel = p5.Vector.random2D().setMag(speed);
    this.diameter = diameter;
    this.colour = colour;
    this.isMouseInside = false;
  }

  init(x, y, speed) {
    this.pos.set(x, y);
    const randomAngle = Math.random() * 360;
    this.vel.setHeading(radians(randomAngle));
    this.vel.setMag(speed);
  }

  applyGravity() {
    this.vel.y += gravity;
  }

  update() {
    this.pos.add(this.vel);
  }

  resoveWallCollision() {
    if (
      this.pos.x < this.diameter / 2 ||
      this.pos.x > width - this.diameter / 2
    ) {
      this.pos.x =
        this.pos.x < this.diameter / 2
          ? this.diameter / 2
          : width - this.diameter / 2;
      this.vel.x *= -restitution;
    }
    if (
      this.pos.y < this.diameter / 2 ||
      this.pos.y > height - this.diameter / 2
    ) {
      this.pos.y =
        this.pos.y < this.diameter / 2
          ? this.diameter / 2
          : height - this.diameter / 2;
      this.vel.y *= -restitution;
    }
  }

  setMouseInside(x, y) {
    const dx = x - this.pos.x;
    const dy = y - this.pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    this.isMouseInside = distance < this.diameter / 2;

    // distance = dx ** 2 + dy ** 2 요것도 제곱근 구하는 거
    // (dx ** 2 + dy ** 2)**(1/2) 요건 루트

    // 이거 버그임
    // const distance = this.pos.dist(createVector(x, y));

    // const distance = createVector(x, y).dist(this.pos);

    // const mousePos = createVector(x, y);
    // const distance = p5.Vector.dist(mousePos, this.pos);
    // this.isMouseInside = distance <= this.diameter / 2;
  }

  show() {
    if (this.isMouseInside) {
      stroke(this.colour);
      noFill();
    } else {
      noStroke();
      fill(this.colour);
    }
    circle(this.pos.x, this.pos.y, this.diameter);
  }

  showDebug() {
    stroke('white');
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.vel.x * 10,
      this.pos.y + this.vel.y * 10
    );
    stroke('red');
    line(this.pos.x, this.pos.y, this.pos.x + this.vel.x * 10, this.pos.y);
    stroke('green');
    line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.vel.y * 10);
  }
}
