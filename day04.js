const { log } = require('./utilities');
const input = require('./day04_input')
	.split('\n')
	.map((elem) => elem
		.split(' ')
	)

// Part A
// function validatePassPhrase(arr) {
// 	const wordCache = {}
// 	for (const word of arr) {
// 		if (wordCache[word]) {
// 			return false
// 		} else {
// 			wordCache[word] = true
// 		}
// 	}
// 	return true
// }
//
// const result = input
// 	.map((elem) => validatePassPhrase(elem))
// 	.reduce((acc, next) => next === true ? acc + 1 : acc, 0)

// Part B
function isAnagram(str0, str1) {
	const letterCount = {}
	str0.split('').forEach((letter) => {
		if (!letterCount[letter]) {
			letterCount[letter] = 1
		} else {
			letterCount[letter] = letterCount[letter] + 1
		}
	})

	for (let i = 0; i < str1.length; i++) {
		const letter = str1.charAt(i)
		if (!letterCount[letter]) {
			return false
		} else {
			letterCount[letter] = letterCount[letter] - 1
		}
	}
	for (const letter in letterCount) {
		if (letterCount[letter] > 0) {
			return false
		}
	}
	return true
}

function validatePassPhrase(arr, idx) {
	const wordCache = {}
	const length = arr.length
	for (const word of arr) {
		if (wordCache[word]) {
			return false
		} else {
			wordCache[word] = true
		}
	}
	for (let i = 0; i < (length - 1); i++) {
		for (let j = i + 1; j < length; j++) {
			if (isAnagram(arr[i], arr[j])) {
				return false
			}
		}
	}
	return true
}

const result = input
	.map((elem, idx) => validatePassPhrase(elem, idx))
	.reduce((acc, next) => next === true ? acc + 1 : acc, 0)





log(`The result is: '${result}'.`)
