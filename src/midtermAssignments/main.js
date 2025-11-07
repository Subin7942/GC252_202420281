const evaders = [];
const numEvaders = 10;
const pursuers = [];
const numPursuers = 5;
const seed = 0;
let newBabies = [];

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
}

function draw() {
  background(0);

  console.log(evaders.length);

  push();
  fill('#ffffff');
  textSize(32);
  text('생존자들: ' + evaders.length, 50, 50);
  pop();

  for (const evader of evaders) {
    evader.update();
    evader.evade(pursuers);
    evader.separate(evaders);
    evader.wrapCoordinates();
    evader.show();

    const closest = evader.findClosestEvader?.(evaders);
    const baby = evader.loveLove(closest ?? null);

    if (baby) newBabies.push(baby);
  }

  evaders.push(...newBabies);
  newBabies = [];

  for (const pursuer of pursuers) {
    pursuer.update();
    pursuer.pursue(evaders);
    pursuer.separate(pursuers);
    pursuer.wrapCoordinates();
    pursuer.show();
    pursuer.showTarget();
    pursuer.eatEvader(evaders);
  }
}
