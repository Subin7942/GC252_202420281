class Particle {
  pos;
  w;
  colour;
  vel;
  acc;
  constructor(posX, posY, area, minSize = 0.5, colour, speed = 0) {
    this.pos = createVector(posX, posY);
    this.w = random(minSize, area);
    this.colour = colour;
    this.vel = createVector(0, speed);
    this.acc = createVector(0, 0);
  }

  draw() {
    fill(this.colour);
    noStroke();
    push();
    translate(this.pos.x, this.pos.y);
    circle(this.pos.x, this.pos.y, this.w);
    pop();
  }

  applyGravity(x, y) {
    this.acc.add(x, y);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  reset() {
    if (this.pos.y > height) {
      this.pos.y = random(-100, -10);
      this.pos.x = random(width);
      this.vel.set(0, 0.001);
    }
  }
}
