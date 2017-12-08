const { anyAreTrue, isUndefined, log } = require('./utilities');
log('Beginning program...')
const input = require('./day08_input')
	.split('\n')
	.map((elem) => elem.split(' '))


const registers = {}
function lineIsTrue(line) {
	const compareValue = parseInt(line[6], 10)
	const operator = line[5]
	const compareVar = registers[line[4]] || 0

	switch (operator) {
		case '<':
			return compareVar < compareValue
		case '<=':
			return compareVar <= compareValue
		case '>':
			return compareVar > compareValue
		case '>=':
			return compareVar >= compareValue
		case '!=':
			return compareVar != compareValue
		default:
			return compareVar === compareValue
	}
}
// Part A
// input.forEach((line) => {
// 	if (lineIsTrue(line)) {
// 		const amount = parseInt(line[2], 10)
// 		const direction = line[1]
// 		const incrementVar = line[0]
// 		if (!registers[incrementVar]) {
// 			registers[incrementVar] = 0
// 		}
// 		if (direction === 'dec') {
// 			registers[incrementVar] -= amount
// 		} else {
// 			registers[incrementVar] += amount
// 		}
// 	}
// })


// const result = Object.keys(registers).reduce((acc, key) => registers[key] > acc ? registers[key] : acc, 0)

// Part B
let highestValueThroughout = 0
input.forEach((line) => {
	if (lineIsTrue(line)) {
		const amount = parseInt(line[2], 10)
		const direction = line[1]
		const incrementVar = line[0]
		if (!registers[incrementVar]) {
			registers[incrementVar] = 0
		}
		if (direction === 'dec') {
			registers[incrementVar] -= amount
		} else {
			registers[incrementVar] += amount
		}
		if (registers[incrementVar] > highestValueThroughout) {
			highestValueThroughout = registers[incrementVar]
		}
	}
})

const result = highestValueThroughout


log(`The result is: '${result}'.`)
