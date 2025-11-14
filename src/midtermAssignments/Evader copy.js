class Evader {
  constructor(x, y, options) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = options?.r || 25;
    this.colour = options?.colour || '#00FF00';
    // this.maxSpeed = options?.maxSpeed || 3;
    // this.maxForce = options?.maxForce || 0.05;
    this.maxSpeed = random(1, 4);
    this.maxForce = random(1, 3);
    this.spawn = false;
    this.lastLoveTime = 0;
    this.cooldown = 5000;
  }

  findClosestPursuer(pursuers) {
    let closest = null;
    let minDist = Infinity;
    for (const p of pursuers) {
      const d = this.pos.dist(p.pos);
      if (d < minDist) {
        minDist = d;
        closest = p;
      }
    }
    return closest;
  }

  separate(pursuers) {
    for (const p of pursuers) {
      if (p !== this) {
        const d = this.pos.dist(p.pos);
        const sum = createVector(0, 0);
        if (d > 0 && d < this.r * 2) {
          const towardMe = p5.Vector.sub(this.pos, p.pos);
          towardMe.div(d);
          sum.add(towardMe);
        }
        if (sum.mag() > 0) {
          sum.setMag(this.maxSpeed);
          sum.add(this.pos);
          this.seek(sum);
        }
      }
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  seek(target) {
    const closestEvader = this.findClosestEvader(evaders);

    if (closestEvader) {
      const desired = p5.Vector.sub(closestEvader.pos, this.pos);
      desired.setMag(this.maxSpeed);
      const steering = p5.Vector.sub(desired, this.vel);
      steering.limit(this.maxForce);
      this.applyForce(steering);

      // 사랑 이벤트 호출
      const d = this.pos.dist(closestEvader.pos);
      this.loveLove(closestEvader, d);
    }
  }

  loveLove(closestEvader) {
    const range = 10;
    const col = '#00FF00';
    const now = millis();

    if (!closestEvader) {
      this.spawn = false;
      return null;
    }

    const d = this.pos.dist(closestEvader.pos);

    if (
      closestEvader &&
      !this.spawn &&
      d <= range &&
      this.colour === col &&
      closestEvader.colour === col &&
      now - this.lastLoveTime > this.cooldown
    ) {
      this.lastLoveTime = now;
      this.spawn = true;
      return new Evader(this.pos.x, this.pos.y, { colour: this.colour }); // 생성은 여기서 객체만 반환
    }

    if (closestEvader && this.pos.dist(closestEvader.pos) > range) {
      this.spawn = false;
    }

    return null;
  }

  flee(target) {
    const area = 500;
    const dist = p5.Vector.dist(this.pos, target);

    if (dist <= area) {
      const direction = p5.Vector.sub(this.pos, target);
      direction.setMag(this.maxSpeed);
      const steering = p5.Vector.sub(direction, this.vel);
      steering.limit(this.maxForce);
      this.applyForce(steering);

      if (dist <= this.r * 2) {
        this.maxSpeed = 20;
        this.maxForce = 0.5;
      } else {
        this.maxSpeed = 10;
        this.maxForce = 0.1;
      }
    } else if (dist > area) {
      // this.vel.mult(0.95);
      // this.acc.mult(0);
      this.seek();
    }
  }

  evade(pursuers, prediction = 30) {
    const closest = this.findClosestPursuer(pursuers);
    if (!closest) return;
    const predictedVel = p5.Vector.mult(closest.vel, prediction);
    // 더 작성해야 작동합니다.
    const predictedPos = p5.Vector.add(closest.pos, predictedVel);
    this.flee(predictedPos);
  }

  wrapCoordinates() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    const angle = this.vel.heading();
    let col = this.colour; // 기본 색은 초록

    // 가까운 추적자 감지
    const closest = this.findClosestPursuer(pursuers);
    const detectRange = 300; // 감지 범위
    if (closest && this.pos.dist(closest.pos) <= detectRange) {
      col = 'yellow'; // 가까우면 노랑
    }

    // 도망자 시각화
    push();
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    noStroke();
    fill(col); // 색 적용
    beginShape();
    vertex(0, 0);
    vertex(this.r * Math.cos(radians(-160)), this.r * Math.sin(radians(-160)));
    vertex(this.r * Math.cos(radians(160)), this.r * Math.sin(radians(160)));
    endShape();
    pop();
  }

  findClosestEvader(evaders) {
    let closest = null;
    let minDist = Infinity;
    for (const e of evaders) {
      const d = this.pos.dist(e.pos);
      if (d < minDist) {
        minDist = d;
        closest = e;
      }
    }
    return closest;
  }
}
