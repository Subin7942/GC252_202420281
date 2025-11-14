class Food {
  constructor(x, y, r, colour) {
    this.pos = createVector(x, y);
    this.r = r;
    this.colour = colour || '#00ccffff';
  }

  show() {
    rect(this.pos.x, this.pos.y, this.r, this.r);
  }
}
