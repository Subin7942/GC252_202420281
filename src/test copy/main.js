const evaders = [];
const numEvaders = 3;
const pursuers = [];
const numPursuers = 2;
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
    const x = random(width);
    const y = random(height);
    pursuers.push(new Pursuer(x, y));
  }
}

function draw() {
  background(0);

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
    evader.loveLove();
    evader.wrapCoordinates();
    evader.show();
    //evader.showTarget();
  }

  for (const pursuer of pursuers) {
    pursuer.update();
    pursuer.pursue(evaders);
    pursuer.separate(pursuers);
    pursuer.wrapCoordinates();

    // pursuer.show();

    // pursuer.showTarget();
    pursuer.eat(evaders);
    pursuer.animal.setHeadPos(pursuer.pos);
    pursuer.animal.update();

    // pursuer.animal.showSpine();

    // pursuer.animal.showThickness();

    pursuer.animal.showBodyShape();
  }
}
