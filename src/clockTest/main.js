function setup() {
  createCanvas(500, 500);
}

function draw() {
  var color1 = color(180, 86, 114);
  var color2 = color(175, 238, 238);
  // setGradient(0, 0, width, height, color1, color2);

  c1 = color('#ffffffff');
  c2 = color('#ff34b1ff');

  let colour = lerpColor(c1, c2, 0.2);
  noStroke();
  fill('#ffffffff');
  rect(0, 0, width, height);
  fill(colour);
  rect(0, 0, width, (height / 3) * 2);
  fill('#ff34b1ff');
  rect(0, 0, width, height / 3);

  // background(colour);
}

function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (var i = y; i <= y + h; i++) {
    var inter = map(i, y, y + h, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}
