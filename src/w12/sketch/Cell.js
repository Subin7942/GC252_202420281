class Cell {
  pos = [0, 0];
  size = [0, 0];
  state = 0;
  nextState = 0;
  neighbors = [null, null, null, null, null, null, null, null];

  constructor(x, y, w, h, state = 0) {
    this.pos = [x, y];
    this.size = [w, h];
    this.state = state;
  }

  setNeighbors(tl, t, tr, r, br, b, bl, l) {
    this.neighbors[0] = tl;
    this.neighbors[1] = t;
    this.neighbors[2] = tr;
    this.neighbors[3] = r;
    this.neighbors[4] = br;
    this.neighbors[5] = b;
    this.neighbors[6] = bl;
    this.neighbors[7] = l;
  }

  computeNextState() {
    const neighbors0 = this.neighbors.filter(
      (aNeightbor) => aNeightbor && aNeightbor.state === 0
    );
    const neighbors1 = this.neighbors.filter(
      (aNeightbor) => aNeightbor && aNeightbor.state === 1
    );
    const neighbors2 = this.neighbors.filter(
      (aNeightbor) => aNeightbor && aNeightbor.state === 2
    );

    // const cellA = neighbors0.length ? random(neighbors0) : null;
    // const cellB = neighbors1.length ? random(neighbors1) : null;
    // const cellC = neighbors2.length ? random(neighbors2) : null;

    const candidates = [...neighbors0, ...neighbors1, ...neighbors2];

    if (candidates.length > 0) {
      const chosen = random(candidates);
      if (
        (this.state === 0 && chosen.state === 2) || // 가위 > 보
        (this.state === 1 && chosen.state === 0) || // 바위 > 가위
        (this.state === 2 && chosen.state === 1) // 보 > 바위
      ) {
        this.nextState = this.state; // 내가 이김
      } else if (
        (this.state === 0 && chosen.state === 1) || // 가위 < 바위
        (this.state === 1 && chosen.state === 2) || // 바위 < 보
        (this.state === 2 && chosen.state === 0) // 보 < 가위
      ) {
        this.nextState = chosen.state; // 내가 짐
      } else {
        this.nextState = this.state; // 무승부
      }
    }
  }

  updateState() {
    this.state = this.nextState;
  }

  isHovered(mX, mY) {
    return (
      mX >= this.pos[0] &&
      mX <= this.pos[0] + this.size[0] &&
      mY >= this.pos[1] &&
      mY <= this.pos[1] + this.size[1]
    );
  }

  toggleState() {
    this.state = !this.state;
  }

  render(isHovered = false) {
    strokeWeight(2);
    stroke(isHovered ? 'red' : 200);
    if (this.state == 0) {
      fill('#ffaddeff');
    } else if (this.state == 1) {
      fill('#fff8c2ff');
    } else if (this.state == 2) {
      fill('#8dd1ffff');
    }
    rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
  }
}
