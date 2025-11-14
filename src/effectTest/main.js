const palette = ['#c93f3fff', '#ff6363ff', '#fa2f2fff', '#DD0303'];
let ps = [];

function setup() {
  createCanvas(600, 400);

  for (let n = 0; n < 100; n++) {
    ps.push(new Blood(0.5 * width, 0.5 * height, 30, random(1, 5)));
  }
}

function draw() {
  background('#f0f0f0ff');

  ps.forEach((aBlood, idx) => {
    aBlood.applyGravity(0, 0.001);
    aBlood.update();
    aBlood.drawRect();
  });
}
