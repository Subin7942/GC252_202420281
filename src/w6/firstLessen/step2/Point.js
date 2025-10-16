class Point {
  constructor(x, y, thickness, options) {
    this.pos = createVector(x, y);
    this.r = options.r || 10;
    this.colour = options.colour || '#fff';
    this.distConstraint = options.distConstraint || 50;
    this.heading = 0;
    this.thickness = thickness;
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
      // push();
      // translate(other.pos.x, other.pos.y);
      // noFill();
      // stroke(this.colour);
      // line(0, 0, toMe.x, toMe.y);
      // pop();
      toMe.setMag(other.distConstraint);
      // push();
      // translate(other.pos.x, other.pos.y);
      // noFill();
      // stroke(this.colour);
      // strokeWeight(4);
      // line(0, 0, toMe.x, toMe.y);
      // noStroke();
      // fill(this.colour);
      // circle(toMe.x, toMe.y, 10);
      // pop();
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

  showThickness() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke('white');
    noFill();
    circle(0, 0, this.thickness);
    pop();
  }

  getPointOnThickness(angle) {
    const pointPos = p5.Vector.fromAngle(this.heading + angle);
    pointPos.setMag(this.thickness * 0.5);
    pointPos.add(this.pos);
    return pointPos;
  }
}
