// matter.js는 중심에서 부터 길이 계산

const elem = document.querySelector('#matter-box');
console.log(elem);
// querySelectorAll을 하면 arrey로 데려옴

// module aliases

// const Engine = Matter.Engine,
//   Render = Matter.Render,
//   Runner = Matter.Runner,    시간에 대한 것, 물체가 떨어지고 상호작용하는 시간들
//   Bodies = Matter.Bodies,
//   Composite = Matter.Composite;   공간에 대한 것
const { Engine, Render, Runner, Bodies, Composite } = Matter;
// 리액트 문법으로 바꿈
// 겹치는 함수 있으면 '함수이름':'새로운 이름'으로 바꿀 수 있음

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
  element: elem,
  // html의 어디에 넣을 건지
  engine: engine,
  // 변수와 필드값이 같으면 생략 가능
  // engine, 이렇게 끝내도 됨
});

// create two boxes and a ground
const boxA = Bodies.rectangle(400, 200, 80, 80);
const boxB = Bodies.rectangle(450, 50, 80, 80);
const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
// {}는 오브젝트

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);
// 화면에 요소들과 공간을 넣어줌

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
