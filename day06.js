const { anyAreTrue, isUndefined, log } = require('./utilities');
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
	// log('checking cache for', key)
	// return !!allocationCache[arrToString(arr)]
	return anyAreTrue(allocationCache.map((cache) => !!cache[key]))
}

// Part A
// function cacheIt(arr) {
// 	allocationCache[allocationCache.length - 1][arrToString(arr)] = true
// 	if (Object.keys(allocationCache[allocationCache.length - 1]).length > 150) {
// 		allocationCache.push({})
// 	}
// }
// function reallocateForIndex(arr, idx) {
// 	let _table = [...arr]
// 	let stack = arr[idx]
// 	_table[idx] = 0
// 	let i = idx + 1
// 	while (stack > 0) {
// 		if (i >= _table.length) {
// 			i = 0
// 		}
// 		_table[i]++
// 		stack--
// 		i++
// 	}
// 	return _table
// }
//
// let count = 0
// const MAX_COUNT = 100000
// let allocationTable = [...input]
// while (!wasPreviouslyUsed(allocationTable) && count < MAX_COUNT) {
// 	cacheIt(allocationTable)
// 	// log('checking cache for', arrToString(arr))
// 	let indexToReallocate = allocationTable
// 		.reduce((acc, next, idx) => next > allocationTable[acc] ? idx : acc, 0)
// 	allocationTable = reallocateForIndex(allocationTable, indexToReallocate)
//
// 	count++
// }
// const result = count

// Part B
function cacheIt(arr, idx) {
	allocationCache[allocationCache.length - 1][arrToString(arr)] = idx + 1
	if (Object.keys(allocationCache[allocationCache.length - 1]).length > 150) {
		allocationCache.push({})
	}
}
function retrieveFromCache(arr) {
	const key = arrToString(arr)

	return allocationCache
		.map((cache) => cache[key])
		.reduce((acc, next) => isUndefined(next) ? acc : (next - 1), -1)
}
function reallocateForIndex(arr, idx) {
	let _table = [...arr]
	let stack = arr[idx]
	_table[idx] = 0
	let i = idx + 1
	while (stack > 0) {
		if (i >= _table.length) {
			i = 0
		}
		_table[i]++
		stack--
		i++
	}
	return _table
}

let count = 0
const MAX_COUNT = 100000
let allocationTable = [...input]
while (!wasPreviouslyUsed(allocationTable) && count < MAX_COUNT) {
	cacheIt(allocationTable, count)
	// log('checking cache for', arrToString(arr))
	let indexToReallocate = allocationTable
		.reduce((acc, next, idx) => next > allocationTable[acc] ? idx : acc, 0)
	allocationTable = reallocateForIndex(allocationTable, indexToReallocate)

	count++
}

const initialIndex = retrieveFromCache(allocationTable)

const result = count - initialIndex




log(`The result is: '${result}'.`)
