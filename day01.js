const utilities = require('./utilities');
let input = require('./day01_input').split('');

input = [...input, input[0]];

// Part A
// const validValues = input.map((elem, idx, arr) => elem === arr[idx + 1] ? elem : 0);
// Part B
const halfLength = (input.length - 1) / 2;
const validValues = input.map((elem, idx, arr) => elem === (arr[idx + halfLength] || arr[idx - halfLength]) ? elem : 0);

const result = validValues.reduce((prev, next) => ~~prev + ~~next, 0);

utilities.log(`The result is: '${result}'.`);
