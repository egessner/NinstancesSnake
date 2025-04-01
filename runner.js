/**
 * - CreateSnakeArray()
 *  - given a number of instances of snake n, create square of games.
 *    we'll need a yPad and an xPad to use context.transform on and a scale to
 *    use context.scale on. pass those as params in the constructor and then
 *    slightly alter the draw function to encorporate these and we wont have
 *    much else to change in snake.js
 */
/* eslint linebreak-style: ['error', 'windows'] */
// GLOBALS
const canvas = document.getElementById('mainCanvas');
const button = document.getElementById('restartButton');

let n;
let snakeArr;

/**
 * @description init everythingt and begin each snake instance
 */
function main() {
  const numSnakeGames = document.getElementById('n');
  n = numSnakeGames.value;

  const context = canvas.getContext('2d');
  context.setTransform(1, 0, 0, 1, 0, 0); // reset
  context.clearRect(0, 0, canvas.width, canvas.height);

  document.addEventListener('keypress', onKeyPress);
  button.addEventListener('click', main);

  if (snakeArr) {
    snakeArr.forEach((row) => row.forEach((snake) => snake.killGame()));
  }

  createSnakeArray();
  snakeArr.forEach((row) => row.forEach((snake) => snake.run()));
  // snakeArr[0][0].run();

  // todo on key press and all that shit

}

/**
 * @description Since our canvas is a square, we should be able to just take
 * the root of the # games we want to play, round up and that will work i think
 */
function createSnakeArray() {
  const sqr = Math.ceil(Math.sqrt(n));
  // const scale = sqr / Math.pow(sqr, 2);
  const scale = canvas.width / (40 * sqr);

  // create the array
  snakeArr = [];
  for (let i = 0; i < sqr; i++) {
    snakeArr[i] = new Array(sqr).fill(null);
  }
  // fill the array
  for (let y = 0; y < snakeArr.length; y++) {
    const yPad = (canvas.height / sqr) * y;
    for (let x = 0; x < snakeArr[y].length; x++) {
      const xPad = (canvas.width / sqr) * x;
      // only fill the array with n games of snake
      if ((y * sqr) + x <= n - 1) {
        snakeArr[y][x] = new Snake(scale, xPad, yPad);
      }
    }
  }
  // remove null values
  snakeArr = snakeArr.map((row) => row.filter((snake) => snake != null));
  console.log(snakeArr);
}

/**
 * @description On key press wrapper
 * @param {*} keypress
 */
function onKeyPress(keypress) {
  let newDirection;
  switch (keypress.code) {
    case 'KeyW':
      newDirection = 1;
      break;
    case 'KeyD':
      newDirection = 2;
      break;
    case 'KeyS':
      newDirection = 3;
      break;
    case 'KeyA':
      newDirection = 4;
      break;
  }
  if (newDirection) {
    snakeArr.forEach((row) => row.forEach((snake) => snake.turn(newDirection)));
    // snake.turn(newDirection);
  }
}
main();
