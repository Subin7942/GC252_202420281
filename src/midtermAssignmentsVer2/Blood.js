class Blood {
  pos;
  vel;
  acc;
  w;
  h;
  r;
  angle;
  colour;
  constructor(posX, posY, velAngleRange, speed, minSize = 4) {
    this.pos = createVector(posX, posY);
    const randomAngle = -90 + random(-0.5 * velAngleRange, 0.5 * velAngleRange);
    this.vel = createVector(speed, 0);
    this.vel.rotate(radians(randomAngle));
    this.acc = createVector(0, 0);
    this.r = minSize;
    this.angle = random(360);
    const paletteIdx = floor(random(palette.length));
    this.colour = palette[paletteIdx];
  }

  applyGravity(x, y) {
    this.acc.add(x, y);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  drawRect() {
    fill(this.colour);
    noStroke();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(radians(this.angle));
    ellipse(0, 0, this.r);
    pop();
  }
}
