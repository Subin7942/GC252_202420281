const evaders = [];
const numEvaders = 10;
const pursuers = [];
const numPursuers = 5;
const seed = 0;

let pallete = ['#FF0066', '#6A0066', '#934790', '#E8D4B7'];
let balls = [];
let gravity;

let target;

function setup() {
  createCanvas(1500, 800);
  target = createVector(mouseX, mouseY);
  randomSeed(seed);

  for (let n = 0; n < numEvaders; n++) {
    evaders.push(new Evader(random(width), random(height)));
  }
  for (let n = 0; n < numPursuers; n++) {
    pursuers.push(new Pursuer(random(width), random(height)));
  }

  for (let n = 0; n < 100; n++) {
    createBall(
      0.5 * width,
      0.5 * height,
      pallete[n % pallete.length],
      [0.1, 5]
    );
  }

  gravity = createVector(0, 0.1);
}

function draw() {
  background(0);

  for (const evader of evaders) {
    evader.update();
    evader.evade(pursuers);
    evader.separate(evaders);
    evader.wrapCoordinates();
    evader.show();
  }

  for (const pursuer of pursuers) {
    pursuer.update();
    pursuer.pursue(evaders);
    pursuer.separate(pursuers);
    pursuer.wrapCoordinates();
    pursuer.show();
    pursuer.showTarget();
    pursuer.eatEvader(evaders);
  }

  for (let n = 0; n < 5; n++) {
    createBall(
      0.5 * width,
      0.5 * height,
      pallete[floor(random(pallete.length))],
      [0.1, 5]
    );
  }

  balls.forEach((aBall) => {
    aBall.applyGravity(gravity);
    aBall.update();
  });

  for (let idx = balls.length - 1; idx >= 0; idx--) {
    if (!balls[idx].isInsideCanvas()) {
      balls.splice(idx, 1);
    }
  }

  balls.forEach((aBall) => {
    aBall.show();
  });
}
