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
    pursuer.show();
    // pursuer.showTarget();
    pursuer.eat(evaders);
    pursuer.points[0].setPos(pursuer.pos);
    pursuer.points[0].setHeading(pursuer.points[1].heading);
    pursuer.points.forEach((aPoint, idx) => {
      if (idx > 0) {
        aPoint.constrainedBy(pursuer.points[idx - 1], true);
      }
      aPoint.show();
    });
  }
}
