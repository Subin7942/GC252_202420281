class Point {
  constructor(x, y, options) {
    this.pos = createVector(x, y);
    this.r = options.r || 10;
    this.colour = options.colour || '#fff';
    this.distConstraint = options.distConstraint || 50;
    this.heading = 0;
  }

  setPos(pos) {
    this.pos.set(pos);
  }

  setHeading(heading) {
    this.heading = heading;
  }

  constrainedBy(other, isStrong = false) {
    const toMe = p5.Vector.sub(this.pos, other.pos);
    if (isStrong || toMe.mag() > other.distConstraint) {
      toMe.setMag(other.distConstraint);

      const newPos = p5.Vector.add(toMe, other.pos);
      this.pos.set(newPos);
      this.setHeading(toMe.mult(-1).heading());
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    noStroke();
    fill(this.colour);
    beginShape();
    vertex(this.r, 0);
    vertex(0, this.r);
    vertex(-this.r, 0);
    vertex(0, -this.r);
    endShape(CLOSE);
    arc(0, 0, 2 * this.r, 2 * this.r, radians(90), radians(270));
    // circle(0, 0, 2 * this.r);
    pop();
  }

  showDistConstraint() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(this.colour);
    noFill();
    circle(0, 0, 2 * this.distConstraint);
    pop();
  }
}
