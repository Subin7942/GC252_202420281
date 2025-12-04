const canvasContainer = document.getElementById('canvas-container');
let renderer;

const INITIAL_W = 800;
const INITIAL_H = 600;
const INITIAL_RATIO = INITIAL_W / INITIAL_H;

const cellsPerRow = 80;
let cellsPerColumn;
const cells = [];
let cellSize;

let hoveredCell = null;

function getIdx(r, c) {
  return r * cellsPerRow + c;
}

let lastTime = 0;
const interval = 10;

function setup() {
  renderer = createCanvas(INITIAL_W, INITIAL_H);
  renderer.parent(canvasContainer);
  renderer.elt.style.aspectRatio = `${INITIAL_W} / ${INITIAL_H}`;

  new ResizeObserver(() => {
    const { width: containerWidth, height: containerHeight } =
      canvasContainer.getBoundingClientRect();
    renderer.elt.style.width = `${containerWidth}px`;
    renderer.elt.style.height = `${containerWidth / INITIAL_RATIO}px`;
  }).observe(canvasContainer);

  cellSize = width / cellsPerRow;
  cellsPerColumn = Math.floor(height / cellSize);

  for (let r = 0; r < cellsPerColumn; r++) {
    for (let c = 0; c < cellsPerRow; c++) {
      const x = c * cellSize;
      const y = r * cellSize;
      const randomState = Math.floor(random(0, 3));
      const newCell = new Cell(x, y, cellSize, cellSize, randomState);
      cells.push(newCell);
    }
  }

  cells.forEach((cell, idx) => {
    const row = Math.floor(idx / cellsPerRow);
    const col = idx % cellsPerRow;
    const tl = row > 0 && col > 0 ? cells[getIdx(row - 1, col - 1)] : null;
    const t = row > 0 ? cells[getIdx(row - 1, col)] : null;
    const tr =
      row > 0 && col < cellsPerRow - 1 ? cells[getIdx(row - 1, col + 1)] : null;
    const r = col < cellsPerRow - 1 ? cells[getIdx(row, col + 1)] : null;
    const br =
      row < cellsPerColumn - 1 && col < cellsPerRow - 1
        ? cells[getIdx(row + 1, col + 1)]
        : null;
    const b = row < cellsPerColumn - 1 ? cells[getIdx(row + 1, col)] : null;
    const bl =
      row < cellsPerColumn - 1 && col > 0
        ? cells[getIdx(row + 1, col - 1)]
        : null;
    const l = col > 0 ? cells[getIdx(row, col - 1)] : null;
    cell.setNeighbors(tl, t, tr, r, br, b, bl, l);
  });
}

function draw() {
  background(250);
  cells.forEach((aCell) => {
    aCell.computeNextState();
  });

  if (millis() - lastTime > interval) {
    cells.forEach((aCell) => {
      aCell.updateState();
    });
    lastTime = millis();
  }
  cells.forEach((cell) => cell.render(cell === hoveredCell));

  const cell0 = cells.filter((aCell) => aCell.state === 0).length;
  const cell1 = cells.filter((aCell) => aCell.state === 1).length;
  const cell2 = cells.filter((aCell) => aCell.state === 2).length;
  const total = cell0 + cell1 + cell2;
  const width0 = (cell0 / total) * width;
  const width1 = (cell1 / total) * width;
  const width2 = (cell2 / total) * width;
  const rectH = 100;
  push();
  fill('#ffaddeff');
  rect(0, height - rectH, width0, rectH);
  fill('#fff8c2ff');
  rect(width0, height - rectH, width1, rectH);
  fill('#8dd1ffff');
  rect(width0 + width1, height - rectH, width2, rectH);
  pop();
  push();
  fill('white');
  stroke('#343434ff');
  const percent0 = Math.floor((cell0 / total) * 100);
  const percent1 = Math.floor((cell1 / total) * 100);
  const percent2 = Math.floor((cell2 / total) * 100);
  text(percent0 + '%', 10, height - rectH + 50);
  text(percent1 + '%', width0 + 10, height - rectH + 50);
  text(percent2 + '%', width0 + width1 + 10, height - rectH + 50);
  pop();
}

function mouseMoved() {
  hoveredCell = null;
  for (let idx = 0; idx < cells.length; idx++) {
    if (cells[idx].isHovered(mouseX, mouseY)) {
      hoveredCell = cells[idx];
      break;
    }
  }
  // console.log(hoveredCell);
}

function mousePressed() {
  hoveredCell?.toggleState();
}
