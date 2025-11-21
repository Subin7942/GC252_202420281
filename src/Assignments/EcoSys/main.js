const evaders = [];
const numEvaders = 5;
const pursuers = [];
const numPursuers = 3;
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

  fill('#ffffff');
  textSize(25);
  text('먹이들: ' + evaders.length, 10, 30);
  text('마우스 클릭: 먹이 주기', 10, 60);

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
    pursuer.animal.showEyes();
    if (pursuer.eatTimer > 0) {
      text('맛있당', pursuer.pos.x, pursuer.pos.y + 50);
      pursuer.eatTimer--;
    }
  }
}

function mousePressed() {
  evaders.push(new Evader(mouseX, mouseY));
}
