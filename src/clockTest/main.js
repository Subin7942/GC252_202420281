function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);
  let s = second();
  let m = minute();
  let h = hour();

  sDegree = map(s, 0, 60, 0, 360);
  mDegree = map(m, 0, 60, 0, 360);
  hDegree = map(h % 12, 0, 12, 0, 360);

  push();
  translate(width / 2 + 100, height / 2);
  rotate(radians(sDegree));
  strokeWeight(2);
  stroke(255, 0, 0);
  line(0, 0, 150, 0);
  pop();

  nPointedStar(width / 2, height / 2, 5, 200, 100, 0);
}

function nPointedStar(x, y, n, outerRadius, innerRadius, rotation) {
  push();
  let theta = TAU / n;
  beginShape();

  for (let i = 0; i < n; i++) {
    vertex(x + cos(i * theta) * outerRadius, y + sin(i * theta) * outerRadius);
    vertex(
      x + cos((i + 0.5) * theta) * innerRadius,
      y + sin((i + 0.5) * theta) * innerRadius
    );
  }

  endShape(CLOSE);
  pop();
}
