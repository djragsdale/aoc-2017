const { anyAreTrue, log } = require('./utilities');
log('Beginning program...')
const input = require('./day06_input')
	.split('\t')
	.map((elem) => parseInt(elem, 10))

function arrToString(arr) {
	return arr.join(' ')
}

const allocationCache = [{}]
function wasPreviouslyUsed(arr) {
	const key = arrToString(arr)
	// log('checking cache', arrToString(arr), !!allocationCache[arrToString(arr)])
	// return !!allocationCache[arrToString(arr)]
	return anyAreTrue(allocationCache.map((cache) => !!cache[key]))
}

function cacheIt(arr) {
	allocationCache[allocationCache.length - 1][arrToString(arr)] = true
	if (Object.keys(allocationCache[allocationCache.length - 1]).length > 150) {
		allocationCache.push({})
	}
}

// Part A
function reallocatedForIndex(arr, idx) {
	let _table = [...arr]
	let stack = arr[idx]
	let i = idx + 1
	while (stack > 0) {
		if (i >= arr.length) {
			i = 0
		}
		_table[i]++
		stack--
		i++
	}
	return _table
}

let count = 0
const MAX_COUNT = 300
let allocationTable = [...input]
while (!wasPreviouslyUsed(allocationTable) && count < MAX_COUNT) {
	cacheIt(allocationTable)
	let indexToReallocate = allocationTable
		.reduce((acc, next, idx) => next > allocationTable[acc] ? idx : acc, 0)
	allocationTable = reallocatedForIndex(allocationTable, indexToReallocate)

	count++
}
const result = count

// Part B





log(`The result is: '${result}'.`)
