const { log } = require('./utilities');
log('Beginning program...')
const input = require('./day12_input')
	.split('\n')
	.map((str) => str.split(/[\s,\<\>\-]+/)) // <-> ,
	.map((arr) => arr.map((id) => parseInt(id, 10)))



// Part A
// let inGroup = [0]
// let newlyAdded = [0]
// const maxRounds = 2000
// let roundCount = 0
// while (newlyAdded.length > 0 && roundCount < maxRounds) {
// 	if (roundCount % 100 === 0) {
// 		log(`entering round ${roundCount} with ${inGroup.length} matches`)
// 	}
// 	const _found = []
// 	newlyAdded.forEach((id) => {
// 		input
// 			.filter((arr) => arr.filter((connection) => connection === id).length > 0)
// 			.forEach((arr) => _found.push(arr[0]))
// 	})
// 	newlyAdded = [...new Set(_found.filter((id) => inGroup.indexOf(id) < 0))]
// 	inGroup = [...inGroup, ...newlyAdded]
// 	roundCount++
// }
// const result = `${inGroup.length} in ${roundCount} rounds`

// Part B
let groups = []
let nextId = 0
const maxGroups = 2000
let groupCount = 0
while (nextId <= input[input.length - 1][0] && groupCount < maxGroups) {
	if (groupCount % 100 === 0) {
		log(`entering round ${groupCount} at id ${nextId}`)
	}
	let inGroup = [nextId]
	let newlyAdded = [nextId]
	const maxRounds = 2000
	let roundCount = 0
	while (newlyAdded.length > 0 && roundCount < maxRounds) {
		// if (roundCount % 100 === 0) {
		// 	log(`entering round ${roundCount} with ${inGroup.length} matches`)
		// }
		const _found = []
		newlyAdded.forEach((id) => {
			input
				.filter((arr) => arr.filter((connection) => connection === id).length > 0)
				.forEach((arr) => _found.push(arr[0]))
		})
		newlyAdded = [...new Set(_found.filter((id) => inGroup.indexOf(id) < 0))]
		inGroup = [...inGroup, ...newlyAdded]
		roundCount++
	}
	groups.push(inGroup)
	for (let i = 0; i < input.length + 100; i++) {
		const isInAGroup = groups
			.map((group) => group
					.reduce((acc, next) => acc || (next === i), false))
			.reduce((acc, next) => acc || next, false)
		if (!isInAGroup) {
			nextId = i
			break
		}
	}
	groupCount++
}
result = groups.length



log(`The result is: '${result}'.`)
