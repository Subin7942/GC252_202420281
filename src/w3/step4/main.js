let pallete = ['#FF2DD1', '#FDFFB8', '#4DFFBE', '#63C8FF'];
let emitters = [];
let gravity;

function setup() {
  createCanvas(600, 400);
  emitters.push(new Emitter(0.5 * width, 0.5 * height));

  gravity = createVector(0, 0.1);
}

function draw() {
  background(0);

  if (mouseIsPressed && frameCount % 10 === 0) {
    emitters.push(new Emitter(mouseX, mouseY));
  }

  emitters.forEach((anEmitter) => {
    anEmitter.emit();
    anEmitter.loop(gravity);
    anEmitter.show();
  });

  fill('white');
  noStroke();
  // rect(mouseX - 10, mouseY - 20, 20, 40);
  push();
  translate(mouseX, mouseY);
  rotate(radians(45));
  rect(0 - 10, 0 - 20, 20, 40);
  pop();
}

function mousePressed() {
  console.log(emitters[0].balls.length);
}
