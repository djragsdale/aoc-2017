const { log } = require('./utilities');
log('Beginning program...')
const input = require('./day09_input')



// Part A
// let depth = 0
// let scoreCount = 0
// let garbageHasBegun = false
// for (let i = 0; i < input.length; i++) {
// 	if (garbageHasBegun) {
// 		switch (input.charAt(i)) {
// 			case '>':
// 				garbageHasBegun = false
// 				break
// 			case '!':
// 				i++
// 				break
// 			default:
// 				break
// 		}
// 	} else {
// 		switch (input.charAt(i)) {
// 			case '{':
// 				depth++
// 				scoreCount += depth
// 				break
// 			case '}':
// 				depth--
// 				break
// 			case '!':
// 				i++
// 				break
// 			case '<':
// 				garbageHasBegun = true
// 				break
// 			default:
// 				break
// 		}
// 	}
// }
//
// const result = scoreCount


// Part B
let depth = 0
let scoreCount = 0
let garbageHasBegun = false
let garbageCount = 0
for (let i = 0; i < input.length; i++) {
	if (garbageHasBegun) {
		switch (input.charAt(i)) {
			case '>':
				garbageHasBegun = false
				break
			case '!':
				i++
				break
			default:
				garbageCount++
				break
		}
	} else {
		switch (input.charAt(i)) {
			case '{':
				depth++
				scoreCount += depth
				break
			case '}':
				depth--
				break
			case '!':
				i++
				break
			case '<':
				garbageHasBegun = true
				break
			default:
				break
		}
	}
}

const result = garbageCount


log(`The result is: '${result}'.`)
