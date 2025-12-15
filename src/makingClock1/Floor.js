class Floor {
  constructor(x, y, w, h) {
    this.pos = createVector(this.x / 2, this.y / 2);
    this.w = w;
    this.h = h;
  }

  show() {
    fill('black');
    rect(this.pos.x, this.pos.y, this.w, this.y);
  }
}
