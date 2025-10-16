class Vehicle {
  constructor(x, y, maxSpeed = 10, maxForce = 0.1) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 25;
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  flee(target) {
    const area = 300;
    const dist = p5.Vector.dist(this.pos, target);

    if (dist <= area) {
      const direction = p5.Vector.sub(this.pos, target);
      direction.setMag(this.maxSpeed);
      const steering = p5.Vector.sub(direction, this.vel);
      steering.limit(this.maxForce);
      this.applyForce(steering);

      if (dist <= this.r * 2) {
        this.maxSpeed = 20;
        this.maxForce = 0.5;
      } else {
        this.maxSpeed = 10;
        this.maxForce = 0.1;
      }
    } else if (dist > area) {
      this.vel.mult(0.95);
      this.acc.mult(0);
    }
  }

  wrapCoordinates() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    const angle = this.vel.heading();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    noStroke();
    fill(255);
    beginShape();
    vertex(0, 0);
    vertex(this.r * Math.cos(radians(-160)), this.r * Math.sin(radians(-160)));
    vertex(this.r * Math.cos(radians(160)), this.r * Math.sin(radians(160)));
    endShape();
    pop();
  }
}
