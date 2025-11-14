const palette = ['#c93f3fff', '#ff6363ff', '#fa2f2fff', '#DD0303'];
let bl = [];
let foods = [];

const evaders = [];
const numEvaders = 10;
const pursuers = [];
const numPursuers = 5;
const seed = 0;

let target;

function setup() {
  createCanvas(windowWidth, windowHeight);
  target = createVector(mouseX, mouseY);
  randomSeed(seed);

  for (let n = 0; n < numEvaders; n++) {
    evaders.push(new Evader(random(width), random(height)));
  }
  for (let n = 0; n < numPursuers; n++) {
    pursuers.push(new Pursuer(random(width), random(height)));
  }
  // for (let n = 0; n < 100; n++) {
  //   bl.push(new Blood(0.5 * width, 0.5 * height, 30, random(1, 5)));
  // }
}

function draw() {
  background(0);
  // bl.forEach((aBlood, idx) => {
  //   aBlood.applyGravity(0, 0.001);
  //   aBlood.update();
  //   aBlood.drawRect();
  // });

  console.log(evaders.length);
  push();
  fill('#ffffff');
  textSize(25);
  text('생존자들: ' + evaders.length, 10, 30);
  pop();

  for (const evader of evaders) {
    evader.update();
    evader.evade(pursuers);
    evader.separate(evaders);
    evader.wrapCoordinates();
    evader.show();
    evader.showTarget();
  }

  for (const pursuer of pursuers) {
    pursuer.update();
    pursuer.pursue(evaders);
    pursuer.separate(pursuers);
    pursuer.wrapCoordinates();
    pursuer.show();
    pursuer.showTarget();
    pursuer.eat(evaders);
  }

  for (const food of foods) {
    food.show();
  }
}

function mousePressed() {
  foods.push(new Food(mouseX, mouseY, 10, '#00ccffff'));
}
