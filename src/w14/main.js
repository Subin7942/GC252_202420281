const sketchContainer = document.querySelector('.sketch-container');

function setup() {
  // createCanvas(600, 600);
  const renderer = createCanvas(800, 800);
  renderer.parent(sketchContainer);

  strokeWidth = (0.5 * width) / (strokeNum - 1);
}

let strokeNum = 50;
let strokeWidth;
let seed = 20;

function draw() {
  randomSeed(seed);
  background(255);
  strokeWeight(strokeWidth);

  stroke('#9CC6DB');
  drawPattern(strokeNum);
  stroke('#F1E2E2');
  drawPattern(strokeNum, [3 * random(strokeWidth), 0]);
  // drawPattern(strokeNum, [mouseX, mouseY]);
}

function drawPattern(strokeNum = 2, begin = [0, 0], size = [width, height]) {
  if (strokeNum <= 1) {
    return;
    // 코딩에선 0으로 값을 나눠서 터지는 경우가 많다
  }
  const [bx, by] = begin;
  const [w, h] = size;
  for (let n = 0; n < strokeNum; n++) {
    const t = n / (strokeNum - 1);
    // const t = map(n, 0, strokeNum -1, 0, 1);
    const x1 = width * t + bx;
    const x2 = x1;
    // const x2 = x1 + bx;
    const y1 = 0 + by;
    const y2 = height + by;

    line(x1, y1, x2, y2);
  }
}
