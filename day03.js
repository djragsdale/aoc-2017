const { isUndefined, log } = require('./utilities')
const input = require('./day03_input')

// // Part A
// let width = 1
// while (Math.pow(width, 2) < input) {
// 	width += 2
// }
// const center = (width + 1) / 2
// const snakeLength = input - Math.pow(width - 2, 2)
//
// let tailLength = snakeLength
// log(tailLength)
// while ((tailLength - width - 1) > 0) {
// 	tailLength = tailLength - width + 1
// }
// const result = (center - 1) + Math.abs(center - tailLength - 1)


// Part B
// VALID
function getRingCountByIndex(idx) {
	return getRingCountByWidth(getSpiralWidthByIndex(idx))
}

function getRingCountByWidth(width) {
	return (width + 1) / 2
}

// VALID
function getRingCountByCoordinates({ x, y }) {
	return (getSpiralWidthByCoordinates({ x, y }) + 1) / 2
}

// VALID
function getSpiralWidthByIndex(idx) {
	let width = 1
	while (Math.pow(width, 2) < idx) {
		width += 2
	}
	return width
}

// VALID
function getSpiralWidthByCoordinates({ x, y }) {
	return (Math.max(Math.abs(x), Math.abs(y)) * 2) + 1
}

// VALID
const indexCache = { 0: { 0: 1 }}
function getIndex({ x, y }) {
	if (isUndefined(indexCache[x])) {
		indexCache[x] = {}
	}
	if (isUndefined(indexCache[x][y])) {
		const spiralWidth = getSpiralWidthByCoordinates({ x, y })
		const sideLength = spiralWidth - 1
		const adjustedRingCount = getRingCountByCoordinates({ x, y }) - 1
		let maxIndex = Math.pow(spiralWidth, 2)

		// FIX
		if (y === (0 - adjustedRingCount)) {
			// Bottom side
			indexCache[x][y] = maxIndex - adjustedRingCount + x
		} else {
			maxIndex -= sideLength

			if (x === (0 - adjustedRingCount)) {
				// Left side
				indexCache[x][y] = maxIndex - adjustedRingCount - y
			} else {
				maxIndex -= sideLength

				if (y === adjustedRingCount) {
					// Top side
					indexCache[x][y] = maxIndex - adjustedRingCount - x
				} else {
					maxIndex -= sideLength

					// Right side
					indexCache[x][y] = maxIndex - adjustedRingCount + y
				}
			}
		}
	}
	return indexCache[x][y]
}

// VALID
const coordinateCache = { 1: { x: 0, y: 0 }}
function getCoordinates(idx) {
	if (isUndefined(coordinateCache[idx])) {
		const spiralWidth = getSpiralWidthByIndex(idx)
		const sideLength = spiralWidth - 1
		const ringCount = getRingCountByWidth(spiralWidth)
		let tailLength = idx - Math.pow(spiralWidth - 2, 2)
		let baseCoord = { x: ringCount - 1, y: (1 - ringCount) }
		// Right side
		baseCoord.y += Math.min(tailLength, sideLength)
		tailLength -= sideLength
		// Top side
		if (tailLength > 0) {
			baseCoord.x -= Math.min(tailLength, sideLength)
			tailLength -= sideLength
		}
		// Left side
		if (tailLength > 0) {
			baseCoord.y -= Math.min(tailLength, sideLength)
			tailLength -= sideLength
		}
		// Bottom side
		if (tailLength > 0) {
			baseCoord.x += Math.min(tailLength, sideLength)
			tailLength -= sideLength
		}
		coordinateCache[idx] = baseCoord
	}
	return coordinateCache[idx]
}

// VALID
const valueCache = { 0: { 0: 1 }}
function getValueByCoordinates({ x, y }) {
	if (isUndefined(valueCache[x])) {
		valueCache[x] = {}
	}
	if (isUndefined(valueCache[x][y])) {
		let index = getIndex({ x, y })
		let value = [
				{ dx: 1, dy: 0 },
				{ dx: 1, dy: 1 },
				{ dx: 0, dy: 1 },
				{ dx: -1, dy: 1 },
				{ dx: -1, dy: 0 },
				{ dx: -1, dy: -1 },
				{ dx: 0, dy: -1 },
				{ dx: 1, dy: -1 },
			]
			.reduce((acc, { dx, dy }) => {
				if (getIndex({ x: (x + dx), y: (y + dy) }) > index) {
					return acc
				} else {
					return acc + getValueByCoordinates({ x: (x + dx), y: (y + dy) })
				}
			}, 0)
		valueCache[x][y] = value
	}
	return valueCache[x][y]
}

// VALID
function getValueByIndex(idx) {
	return getValueByCoordinates(getCoordinates(idx))
}

let width = 1
let nextValue = getValueByIndex(Math.pow(width, 2))
while (nextValue < input) {
	width += 2
	nextValue = getValueByIndex(Math.pow(width, 2))
}
log(`Result ring has width ${width}`)
let index = Math.pow(width, 2)
let result = nextValue
while (nextValue > input) {
	result = nextValue
	index--
	nextValue = getValueByIndex(index)
}





log(`The result is: '${result}'.`)
// log(`The result is: '${result.x} ${result.y}'.`)
