const {
  Engine,
  Runner,
  Composites,
  MouseConstraint,
  Mouse,
  Composite,
  Bodies,
  Common,
} = Matter;

Common.setDecomp(decomp);

let arrow = '40 0 40 20 100 20 100 80 40 80 40 100 0 50',
  chevron = '100 0 75 50 100 100 25 100 0 50 25 0',
  star = '50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38',
  horseShoe =
    '35 7 19 17 14 38 14 58 25 79 45 85 65 84 65 66 46 67 34 59 30 44 33 29 45 23 66 23 66 7 53 7';

function convertToVertexSet(str) {
  return str
    .trim()
    .split(/\s+/)
    .map(Number)
    .reduce((acc, val, idx, arr) => {
      if (idx % 2 === 0) acc.push({ x: val, y: arr[idx + 1] });
      return acc;
    }, []);
}

arrow = convertToVertexSet(arrow);
chevron = convertToVertexSet(chevron);
star = convertToVertexSet(star);
horseShoe = convertToVertexSet(horseShoe);

let stack;
let walls;

const canvasContainer = document.getElementById('canvas-container');

function setup() {
  const renderer = createCanvas(800, 600);
  renderer.parent(canvasContainer);

  // create engine
  const engine = Engine.create(),
    world = engine.world;
  // create runner

  stack = Composites.stack(20, 20, 10, 5, 0, 0, (x, y) => {
    const rand = random();
    if (rand < 0.25) {
      return Bodies.fromVertices(x, y, arrow);
    } else if (rand < 0.5) {
      return Bodies.fromVertices(x, y, chevron);
    } else if (rand < 0.75) {
      return Bodies.fromVertices(x, y, horseShoe);
    } else {
      return Bodies.fromVertices(x, y, star);
    }
  });
  Composite.add(world, stack);

  walls = [
    Bodies.rectangle(0.5 * width, 0, width, 50, { isStatic: true }),
    Bodies.rectangle(0.5 * width, height, width, 50, { isStatic: true }),
    Bodies.rectangle(0, 0.5 * height, 50, height, { isStatic: true }),
    Bodies.rectangle(width, 0.5 * height, 50, height, { isStatic: true }),
  ];
  Composite.add(world, walls);

  console.log(stack);
  console.log(walls);

  console.log(renderer.elt);
  const mouse = Mouse.create(renderer.elt);
  // 마우스 집는 거랑 집히는 위치 같게 해줌
  mouse.pixelRatio = pixelDensity();
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: 0.2 },
  });
  Composite.add(world, mouseConstraint);

  const runner = Runner.create();
  Runner.run(runner, engine);
}

function draw() {
  background(0);
  noStroke();
  fill('red');
  circle(width / 2, height / 2, 100);
  // fill('white');
  noStroke();
  fill(250);
  stack.bodies.forEach((aBody) => {
    aBody.parts.forEach((aPart, idx) => {
      if (idx === 0) return; // skip the first part which is the parent body
      beginShape();
      aPart.vertices.forEach((aVertex) => {
        vertex(aVertex.x, aVertex.y);
      });
      endShape(CLOSE);
    });
  });

  walls.forEach((aBody) => {
    beginShape();
    aBody.vertices.forEach((aVertex) => {
      vertex(aVertex.x, aVertex.y);
    });
    endShape(CLOSE);
  });
}
