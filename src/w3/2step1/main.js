let x, y;
let w, h;
let angle;
let colour;
const area = 20;
const palette = ['#FEF3E2', '#FAB12F', '#FA812F', '#DD0303'];

function setup() {
  createCanvas(800, 600);
}

function drawRect() {
  fill(colour);
  noStroke();
  push();
  translate(x, y);
  rotate(radians(angle));
  rect(0.5 * w, 0.5 * h, w, h);
  pop();
}

function draw() {
  background(127);

  randomSeed(10);
  for (let n = 0; n < 1000; n++) {
    x = random(width);
    y = random(height);
    w = random(4, area);
    h = area / w;
    angle = random(360);
    let paletteIdx = floor(random(palette.length));
    colour = palette[paletteIdx];
    drawRect();
  }
}
