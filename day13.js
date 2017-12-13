const { log, range } = require('./utilities');
log('Beginning program...')
const input = require('./day13_input')
	.split('\n')
	.map((str) => str.split(/[\s,\:]+/)) // : ,
	.map((arr) => arr.map((id) => parseInt(id, 10)))
	.map((arr) => ({ depth: arr[0], range: arr[1] }))


// Where the scanner STARTS a turn
const getScannerPosition = (depth, range, moveCount) => {
	const _moveCount = moveCount % ((range - 1) * 2)
	let position = 0
	let velocity = 1
	for (let i = 1; i <= _moveCount; i++) {
		position += velocity
		if (position === range - 1 || position === 0) {
			velocity *= -1
		}
	}
	return position
}


// Part A
// const lastIdx = input[input.length - 1].depth
// let currentScannerIdx = 0
// let severity = 0
// range(lastIdx).forEach((idx) => {
// 	if (input[currentScannerIdx].depth === idx) {
// 		const scanner = input[currentScannerIdx]
// 		const scannerPosition = getScannerPosition(scanner.depth, scanner.range, idx)
// 		if (scannerPosition === 0) {
// 			severity += scanner.depth * scanner.range
// 		}
// 		currentScannerIdx++
// 	}
// })
// const result = severity

// Part B
const lastDepth = input[input.length - 1].depth
const MAX_DELAY = 10000000
let delayRequired = 637588 // Tried this answer, it said it was too low 457408
let matchFound = false
while (!matchFound && delayRequired <= MAX_DELAY) {
	let currentScannerIdx = 0
	let severity = 0
	range(lastDepth).forEach((idx) => {
		if (input[currentScannerIdx].depth === idx) {
			const scanner = input[currentScannerIdx]
			const scannerPosition = getScannerPosition(scanner.depth, scanner.range, idx + delayRequired)
			if (scannerPosition === 0) {
				severity += scanner.depth * scanner.range
			}
			currentScannerIdx++
		}
	})

	if (severity > 0) {
		// log(`delay ${delayRequired} had severity ${severity}`)
		delayRequired += 1
	} else {
		log(`delay ${delayRequired} had severity ${severity}`)
		matchFound = true
	}
}

const result = matchFound ? delayRequired : 'null'



log(`The result is: '${result}'.`)
