class Ball {
  pos;
  vel;

  constructor(w, h, colour) {
    this.pos = createVector(this.w / 2, this.h / 2);
    this.vel = p5.Vector.random2D().setMag(speed);
    this.w = w;
    this.h = h;
    this.c = colour;
  }

  init() {
    this.pos.set(this.w / 2, this.h / 2);
    const randomAngle = Math.random() * 360;
    this.vel.setHeading(radians(randomAngle));
    this.vel.setMag(speed);
    balls.splice(Ball, balls.length);
  }

  applyGravity() {
    this.vel.y += gravity;
  }

  update() {
    this.pos.add(this.vel);
  }

  resolveWallCollision() {
    if (this.pos.x < diameter / 2 || this.pos.x > this.w - diameter / 2) {
      this.pos.x =
        this.pos.x < diameter / 2 ? diameter / 2 : this.w - diameter / 2;
      this.vel.x *= -restitution;
    }
    if (this.pos.y < diameter / 2 || this.pos.y > this.h - diameter / 2) {
      this.pos.y =
        this.pos.y < diameter / 2 ? diameter / 2 : this.h - diameter / 2;
      this.vel.y *= -restitution;
    }
  }

  show() {
    noStroke();
    fill(this.c);
    circle(this.pos.x, this.pos.y, diameter);
  }
}
