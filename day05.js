const { log } = require('./utilities');
const input = require('./day05_input')
	.split('\n')
	.map((elem) => parseInt(elem, 10))

const list = [...input]
const maxIndex = list.length
let count = 0
const maxCount = 100000000
let noBreak = true
let idx = 0
// Part A
// while (noBreak && idx > -1 && idx < maxIndex && count < maxCount) {
// 	list[idx]++
// 	idx = idx + list[idx] - 1
// 	count++
// }
// const result = count

// Part B
while (noBreak && idx > -1 && idx < maxIndex && count < maxCount) {
	const _idx = idx
	idx = _idx + list[_idx]
	list[_idx] = list[_idx] < 3 ? list[_idx] + 1 : list[_idx] - 1
	count++
}
const result = count




log(`The result is: '${result}'.`)
